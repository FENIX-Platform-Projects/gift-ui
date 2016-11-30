define(['jquery','underscore','loglevel','handlebars', 
    '../config/config',
    '../config/consumption',
    '../html/consumption/map.hbs',
    '../html/consumption/popup.hbs',
    '../nls/consumption',
    '../json/consumption/gaul0_centroids.json',
    '../json/consumption/world_countries.json',
    '../json/consumption/countries_targeted',
    'leaflet',
    'leaflet-panel-layers',
    '../lib/leaflet.markercluster-src',
    'fenix-ui-map',
    'fenix-ui-metadata-viewer'

], function ($, _, log, Handlebars,
    C,
    ConsC,
    template,
    tmplPopup,
    labels,
    gaul0Centroids,
    gaul0Countries,
    countriesTargeted,
    L,
    LeafletPanel,
    LeafletMarkecluster,
    FenixMap,
    MetadataViewer
) {
    "use strict";
    var LANG = C.lang;

    var s = {
            EL: "#map",
            MAP_CONTAINER: "#consumption_map",
            MAP_LEGEND: "#consumption_map_legend",
            MAP_META: "#consumption_map_meta"
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

        this._initCodelists();

        this._initVariables();

        this._attach();
    }

    Map.prototype._initCodelists = function (params) {

        var self = this;

        $.extend(true, this, params);

        self.confidentialityCodelist = {};
        self.legend_items = [];

        self.titleByCodes = {};
        
        $.ajax({
            async: false,                
            dataType: 'json',
            url: confidentialityCodelistUrl,
            contentType: "application/json; charset=utf-8",
            success: function(res) {

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
                    
                    self.titleByCodes[ obj.code ]= obj.title[ LANG ];
                });
                
                self.legend_items = _.sortBy(self.legend_items,'order');
            }
        });

        $.ajax({
            async: false,                
            dataType: 'json',
            method: 'POST',
            contentType: "application/json; charset=utf-8",            
            url: confidentialityDataUrl,
            data: JSON.stringify(C.CONSUMPTION.body),      
            success: function(res) {

                self._dataByCountry = _.groupBy(res, function(d) {
                    var countryCode = d.meContent.seCoverage.coverageGeographic.codes[0].code;
                    return countryCode;
                });
            }
        });
    };

    Map.prototype._initVariables = function () {

        var self = this;

        this.mapCodesGroup = [];

        _.each(self._dataByCountry, function(meta) {
            _.each(meta, function(m) {
                if(m.meAccessibility && _.has(m.meAccessibility,'seConfidentiality')) {
                    
                    var confid = m.meAccessibility.seConfidentiality.confidentialityStatus.codes[0].code;
                    self.mapCodesGroup.push({
                        uid: m.uid,
                        confid: confid,
                        title: m.title[ LANG ],
                        codes: m.meContent.seCoverage.coverageGeographic.codes
                    });
                }
            });
        });

        this.gaul0Centroids_adm0_code = _.groupBy(gaul0Centroids.features, function(feature) {
            return feature.properties.adm0_code;
        });
        this.mapLocsByAdm0Code = {};
        _.each(this.gaul0Centroids_adm0_code, function(feature, code) {
            self.mapLocsByAdm0Code[ code ] = feature[0].geometry.coordinates.reverse();
        });

        this.gaul0Countries_adm0_code = _.groupBy(gaul0Countries.features, function(feature) {
            return feature.id;
        });
        this.countryByAdm0Code = {};
        _.each(this.gaul0Countries_adm0_code, function(feature, code) {
            self.countryByAdm0Code[ ''+code ] = feature[0];
        });

        //console.log(this.countryByAdm0Code)
    };

    Map.prototype._attach = function () {

        var self = this;

        var i18nLabels = labels[ LANG.toLowerCase() ];

        var html = template(i18nLabels);

        $(s.EL).html(html);

        this.$el = $(s.EL);
        this.$map = this.$el.find(s.MAP_CONTAINER);
        this.$legend = this.$el.find(s.MAP_LEGEND);
        this.$meta = this.$el.find(s.MAP_META);

        //PATH FOR OLD MAP
        FenixMap.guiMap['disclaimerfao_'+LANG.toLowerCase() ] = i18nLabels.disclaimer;

        this.fenixMap = new FenixMap.map(s.MAP_CONTAINER, 
            ConsC.mapOpts, 
            ConsC.mapOptsLeaflet
        );

        setTimeout(function() {
            self.fenixMap.map.invalidateSize(false);
            self.fenixMap.map.fitWorld();
            self.fenixMap.map.fire('moveend')
        },100);

        this.fenixMap.createMap();

        self.codesByCountry = {};

        for(var i in this.mapCodesGroup) {
            var group = this.mapCodesGroup[i];

            if(group.codes) {
                for(var n in group.codes) {

                    var country = group.codes[n],
                        countryCode = country.code,
                        countryName = country.label.EN;

                    if(!self.codesByCountry[countryCode])
                        self.codesByCountry[countryCode] = [];

                    self.codesByCountry[countryCode].push({
                        countryCode: countryCode,
                        countryName: countryName,
                        confids: [ group.confid ],
                        uid: group.uid,
                        title: this.mapCodesGroup[i]
                    });
                }
            }
        }

        self.layerCluster = L.markerClusterGroup({
            showCoverageOnHover: true,
            maxClusterRadius: 30,
            //iconCreateFunction: this._iconCreateFunction
        }).addTo(this.fenixMap.map);

        var hiddens = _.compact( _.map(countriesTargeted, function(id) {
            return self.countryByAdm0Code[ id ];
        }) );

        self.layerHiddens = L.geoJson(hiddens, {
            style: function(f) {
                return ConsC.countryHiddensStyle;
            },
            onEachFeature: function(f, layer) {
                if(f.properties && f.properties.name)
                    layer.bindPopup(f.properties.name, { });
            }
        });

        self.layerHiddens.addTo(self.fenixMap.map);

        self.layersByCodes = {};

        _.each(self.codesByCountry, function(items, countryCode) {
            var code = items[0].confids[0],
                className = ConsC.codelistStyles[ code ].className,
                order = ConsC.codelistStyles[ code ].order,
                mark = self._getMarker(items),
                markCluster = self._getMarker(items);

            if(!self.layersByCodes[ code ]) {
                self.layersByCodes[ code ] = {
                    active: false,
                    order: order,
                    name: self.titleByCodes[ code ],
                    icon: '<i class="label label-'+className+' text-primary">&nbsp;</i>',
                    layer: L.layerGroup([])
                };
            }

            self.layersByCodes[ code ].layer.addLayer(mark);
            self.layerCluster.addLayer(markCluster);
        });

        self.layersByCodes['All']= {
            active: true,
            order: 10,
            name: 'All Data by Country',
            icon: '<i class="label label-'+ConsC.codelistStyles['All'].className+' text-primary">&nbsp;</i>',
            layer: self.layerCluster
        };
        
        self.layersByCodesHidden = [{
            active: true,
            order: 1,
            name: self.titleByCodes['Z'],
            icon: '<i class="label label-'+ConsC.codelistStyles['Z'].className+' text-primary">&nbsp;</i>',
            layer: self.layerHiddens
        }];

        self.panelLayers = _.values(self.layersByCodes);

        self.panelLayers = _.sortBy(self.panelLayers,'order');

        self.legendPanel = new LeafletPanel(self.panelLayers, null, {
            compact: true,
            position: 'topleft'
        }).on('panel:selected', function(e) {
            self.fenixMap.map.fitWorld();
        })
        .addTo(self.fenixMap.map);
        
        self.hiddenPanel = new LeafletPanel(null, self.layersByCodesHidden, {
            compact: true,
            className: 'panel-hiddens',
            position: 'topleft'
        })
        .addTo(self.fenixMap.map);

        self.$legend.append(self.legendPanel._container, self.hiddenPanel._container);
    };

/*    Map.prototype._iconCreateFunction = function(cluster) {

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
            html: '<div><span>'+ childCount +'</span></div>',
            className: 'marker-cluster marker-cluster-'+size,
            iconSize: new L.point(r, r)
        });
    };*/

    Map.prototype._getMarker = function(items) {

        var self = this;

        var loc = this.mapLocsByAdm0Code[ items[0].countryCode ],
            icon = L.MarkerClusterGroup.prototype._defaultIconCreateFunction({
            //icon = this._iconCreateFunction({
                getChildCount: function() {
                    return items.length;
                }
            });

        var mark = new L.Marker(loc, { icon: icon });

        mark.items = items;

        var itemsValue = [];
        _.each(items, function(item) {
            _.each(item.confids, function(code) {
                itemsValue.push({
                    className: ConsC.codelistStyles[ code ].className,
                    title: item.title.title,
                    uid: item.uid
                });
            })
        });

        var popupHTML = tmplPopup({
            countryName: items[0].countryName,
            items: itemsValue
        });

        mark.bindPopup(popupHTML, {closeButton: false });

        return mark;
    };

/*    Map.prototype._renderMeta = function() {

        self.metadataViewer = new MetadataViewer({
            el: s.MAP_META,
            //model: valid_model,
            lang: lang,
            environment: environment,
            hideExportButton: false,
            expandAttributesRecursively: ['meContent'],
            popover: {
                placement: 'left'
            }
        });
    };*/

    Map.prototype._importThirdPartyCss = function () {

        //map requirements
        require('leaflet/dist/leaflet.css');
        require('leaflet-panel-layers/src/leaflet-panel-layers.css');
        require('fenix-ui-map/dist/fenix-ui-map.min.css');
        require('../lib/MarkerCluster.Default.css');
        require('../lib/MarkerCluster.css');

        //meta viewer requirements
        require("jquery-treegrid-webpack/css/jquery.treegrid.css");

        //host override
        require('../css/gift.css');

        require('../css/map.css');
    };

    return new Map();
});