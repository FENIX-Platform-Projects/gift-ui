/*global define, amplify*/
define([
    'require',
    'jquery',
    'underscore',
    'handlebars',    
    'views/base/view',
    'text!templates/consumption/consumption.hbs',
    'i18n!nls/consumption',
    'config/events',
    'config/config',
    'config/consumption',
    'leaflet_markecluster',
    'fenix-ui-map',
    'fenix-ui-map-config',
    'text!gaul0Centroids',
    'amplify'
], function (require,$, _, Handlebars, View, template, i18nLabels, E, C, ConsC,
    LeafletMarkecluster,
    FenixMap,
    FenixConfig,
    gaul0Centroids
) {

    var LANG = requirejs.s.contexts._.config.i18n.locale.toUpperCase();

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

    var ConsumptionView = View.extend({

        initialize: function (params) {

            var self = this;

            View.prototype.initialize.call(this, arguments);

            $.extend(true, this, params);

            self.confidentialityCodelist = {};
            self.legend_items = [];
            
            $.ajax({
                async: false,                
                dataType: 'json',
                url: confidentialityCodelistUrl,
                contentType: "application/json; charset=utf-8",
                success: function(res) {

                    confidentialityCodelist = res.data;

                    self.confidentialityCodelist = _.groupBy(confidentialityCodelist, function(obj) {
                        return obj.code;
                    });

                    _.each(confidentialityCodelist, function(obj) {
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
        },

        autoRender: true,
        className: 'consumption',
        template: template,

        getTemplateData: function () {
            return {
                title: i18nLabels.title,
                legend_items: this.legend_items
            };
        },

        initVariables: function () {

            var self = this;

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

            this.gaul0Centroids = JSON.parse(gaul0Centroids);

            this.gaul0Centroids_adm0_code = _.groupBy(this.gaul0Centroids.features, function(feature) {
                return feature.properties.adm0_code;
            });

            this.mapLocsByAdm0Code = {};

            _.each(this.gaul0Centroids_adm0_code, function(feature, code) {
                self.mapLocsByAdm0Code[ code ] = feature[0].geometry.coordinates.reverse();
            });
        },

        attach: function () {

            var self = this;

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'consumption'});
            this.initVariables();

            FM.guiMap.disclaimerfao_en = i18nLabels.disclaimer;

            this.fenixMap = new FM.Map(this.$map, 
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
        },

        _getMarker: function(items) {

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
        },

        _renderMapLegend: function() {
            var self = this;

            _.extend(L.control({position:'topleft'}), {
                onAdd: function(map) {
                    var tmpDiv = L.DomUtil.create('div','leaflet-control leaflet-control-legend');
                    self.$legend.appendTo(tmpDiv);
                    return tmpDiv;
                }
            }).addTo(self.fenixMap.map);
        },

        dispose: function () {

            View.prototype.dispose.call(this, arguments);
        }
    });

    return ConsumptionView;
});
