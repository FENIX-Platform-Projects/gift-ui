define(['jquery','underscore','loglevel','handlebars', 
    '../../config/config',
    '../../config/consumption',
    '../html/consumption/map.hbs',
    //'i18n!nls/consumption',
    '../json/consuption/gaul0_centroids.json',
    'leaflet',
    '../lib/leaflet.markercluster-src',
    'fenix-ui-map',

], function ($, _, log, Handlebars,
    C,
    ConsC,
    template,
    //i18nLabels,
    gaul0Centroids,
    L,
    LeafletMarkecluster,
    FenixMap
) {
    "use strict";

    var LANG = C.lang;//requirejs.s.contexts._.config.i18n.locale.toUpperCase();

    var s = {
            READY_CONTAINER: "#ready-container",
            MAP_CONTAINER: "#consumption_map",
            MAP_LEGEND: "#consumption_map_legend"
        },
        confidentialityCodelistUrl = C.SERVICE_BASE_ADDRESS+'/msd/resources/uid/GIFT_STATUS',
        confidentialityDataUrl = C.SERVICE_BASE_ADDRESS+'/msd/resources/find?full=true',
        confidentialityDataPayload = {
            "dsd.contextSystem": {
                "enumeration": ["gift"]
            },
            "meContent.resourceRepresentationType": {
                "enumeration": ["dataset"]
            }
        };

    function Map() {

        log.setLevel("trace");

        this._importThirdPartyCss();

        this.initialize();

        this._initVariables();

        this._attach();

    }

    Map.prototype._renderMap = function () {

       console.log("Render map here")

    };


    Map.prototype.initialize = function (params) {

        var self = this;

        $.extend(true, this, params);

        self.confidentialityCodelist = {};
        self.legend_items = [];
        
        $.ajax({
            async: false,                
            dataType: 'json',
            url: confidentialityCodelistUrl,
            contentType: "application/json; charset=utf-8",
            success: function(res) {

                //confidentialityCodelist = res.data;

                self.confidentialityCodelist = _.groupBy(res.data, function(obj) {
                    return obj.code;
                });

                _.each(res.data, function(obj) {
                    if(ConsC.codelistStyles[ obj.code ].visible) {
                        self.legend_items.push({
                            code: obj.code,
                            title: obj.title[ LANG ],
                            className: ConsC.codelistStyles[ obj.code ].className,
                            order: ConsC.codelistStyles[ obj.code ].order
                        });
                    }
                });
                
                self.legend_items = _.sortBy(self.legend_items,'order');
            }
        });

        $.ajax({
            async: false,                
            dataType: 'json',
            url: confidentialityDataUrl,
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(C.CONSUMPTION.body),
            success: function(res) {

                self._dataByCountry = _.groupBy(res, function(d) {
                    return d.meContent.seCoverage.coverageGeographic.codes[0].code;
                });

            }
        });
    };

/*
TODO
    Map.prototype.getTemplateData = function () {
        return {
            title: i18nLabels.title,
            legend_items: this.legend_items
        };
    };*/

    Map.prototype._initVariables = function () {

        var self = this;

        this.$el = $(s.READY_CONTAINER);

        this.$map = this.$el.find(s.MAP_CONTAINER);
        this.$legend = this.$el.find(s.MAP_LEGEND);
        
        this.mapCodesGroup = [];

        _.each(self._dataByCountry, function(meta) {
            _.each(meta, function(m) {
                if(m.meAccessibility && _.has(m.meAccessibility,'seConfidentiality')) {
                    self.mapCodesGroup.push({
                        confid: m.meAccessibility.seConfidentiality.confidentialityStatus.codes[0].code,
                        title: m.title[ LANG ],
                        codes: m.meContent.seCoverage.coverageGeographic.codes
                    });
                }
            });
        });

        this.gaul0Centroids = gaul0Centroids;

        this.gaul0Centroids_adm0_code = _.groupBy(this.gaul0Centroids.features, function(feature) {
            return feature.properties.adm0_code;
        });

        this.mapLocsByAdm0Code = {};

        _.each(this.gaul0Centroids_adm0_code, function(feature, code) {
            self.mapLocsByAdm0Code[ code ] = feature[0].geometry.coordinates.reverse();
        });
    };

    Map.prototype._attach = function () {

        var self = this;

        //TODO FenixMap.guiMap.disclaimerfao_en = i18nLabels.disclaimer;

        this.fenixMap = new FenixMap.map(this.$map, 
            ConsC.mapOpts, 
            ConsC.mapOptsLeaflet
        );

        this.fenixMap.createMap(18,0);

        var codesByCountry = {};

        for(var i in this.mapCodesGroup)
        {
            var group = this.mapCodesGroup[i];
            if(group.codes)
            {
                for(var n in group.codes) {
                    var country = group.codes[n],
                        countryCode = country.code,
                        countryName = country.label.EN;

                    if(!codesByCountry[countryCode])
                        codesByCountry[countryCode] = [];

                    codesByCountry[countryCode].push({
                        countryCode: countryCode,
                        countryName: countryName,
                        confids: [ group.confid ],
                        title: this.mapCodesGroup[i]
                    });
                }
            }
        }
        var layerGroup = L.markerClusterGroup({
            showCoverageOnHover: true,
            maxClusterRadius: 30,
            iconCreateFunction: function(cluster) {
                
                //return L.MarkerClusterGroup.prototype._defaultIconCreateFunction(cluster);
                var childCount = cluster.getChildCount();

                var size = '';
                if (childCount < 10)
                    size += 'small';
                else if (childCount < 100)
                    size += 'medium';
                else
                    size += 'large';

                var r = 20*childCount;  //40

                return L.divIcon({
                    html: '<div><span>'+( childCount + 1 )+'</span></div>',
                    className: 'marker-cluster marker-cluster-'+size,
                    iconSize: new L.point(r, r)
                });
            }
        });

        this.iconMarkerFunc = layerGroup._defaultIconCreateFunction;

        _.each(codesByCountry, function(item, countryCode) {
            self._getMarker(item).addTo( layerGroup );
        });

        layerGroup.addTo(this.fenixMap.map);

        self._renderMapLegend();
    };

    Map.prototype._getMarker = function(items) {

        var self = this;

        var loc = this.mapLocsByAdm0Code[ items[0].countryCode ],
            /*icon = this.iconMarkerFunc({
                getChildCount: function() {
                    return items.length;
                }
            }),*/
            icon = L.MarkerClusterGroup.prototype._defaultIconCreateFunction({
                getChildCount: function() {
                    return items.length;
                }
            }),
            m = L.marker(loc, { icon: icon });

        m.items = items;

        var popupHTML = '<label class="text-primary">'+items[0].countryName+'</label>';
        

        popupHTML += '<ul class="list-group">';

        _.each(items, function(item) {
            popupHTML += _.map(item.confids, function(code, k) {
                
                return '<li style="list-style:none;margin-bottom:5px">'+
                    '<i class="label label-'+ConsC.codelistStyles[ code ].className+'">&nbsp; &nbsp;</i>'+
                    '&nbsp;&nbsp;'+
                    '<a href="#">'+item.title.title+'</a>'+
                '</li>';//*/
            }).join('');
        });
        
        popupHTML +='</ul>';

        m.bindPopup(popupHTML, { closeButton:false });

        return m;
    };

    Map.prototype._renderMapLegend = function() {
        var self = this;

        _.extend(L.control({position:'topleft'}), {
            onAdd: function(map) {
                var tmpDiv = L.DomUtil.create('div','leaflet-control leaflet-control-legend');
                self.$legend.appendTo(tmpDiv);
                return tmpDiv;
            }
        }).addTo(self.fenixMap.map);
    };


    Map.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');
        require('leaflet/dist/leaflet.css');
        require('fenix-ui-map/dist_grunt/fenix-ui-map.min.css');
        require('../lib/MarkerCluster.Default.css');
        require('../lib/MarkerCluster.css');

        //host override
        require('../css/gift.css');


    };

    return new Map();
});