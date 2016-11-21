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
    'leaflet_markecluster',
    'fenix-ui-map',
    'fenix-ui-map-config',
    'text!gaul0Centroids',
    'amplify'
], function (require,$, _, Handlebars, View, template, i18nLabels, E, C,
    LeafletMarkecluster,
    FenixMap,
    FenixConfig,
    gaul0Centroids
) {

    var LANG = requirejs.s.contexts._.config.i18n.locale.toUpperCase(),
        s = {
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

    function defToLayer(def) {
        return L.tileLayer(def.url, def);
    };

    var baselayers = {
            "Cartodb": {
                url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                title_en: "CartoDB light",                    
                subdomains: 'abcd',                    
                maxZoom: 19
            }
        },
        mapOpts = {
            baselayers: baselayers,
            boundaries: true,
            plugins: {
                disclaimerfao: false,
                geosearch: true,
                legendcontrol: false,
                scalecontrol: false,
                mouseposition: false,
                controlloading : true,
                zoomcontrol: 'topright'
            },
            guiController: {
                overlay: false,
                baselayer: false,
                wmsLoader: false
            }
        },
        mapOptsLeaflet = {
            scrollWheelZoom: false,
            zoom: 2,
            minZoom: 2,
            maxZoom: 5,
            maxBounds: [[84.67351256610522, -174.0234375], [-58.995311187950925, 223.2421875]]
        };

    var confidentialityCodelistStyles = {
        //MAP CODES with Boostrap themes
            'F': { className:"success", order: 1},// green
            'D': { className:"danger",  order: 2},// red
            'P': { className:"warning", order: 3},// orange
            'A': { className:"primary", order: 4},// blue
            'N': { className:"default", order: 5},// gray
            'Z': { className:"", hidden: true}
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
                    })

//console.log('CONSUMPTION codes', self.confidentialityCodelist);

                    _.each(confidentialityCodelist, function(obj) {
                        //console.log(obj.code)
                        if(!confidentialityCodelistStyles[ obj.code ].hidden) {
                            self.legend_items.push({
                                code: obj.code,
                                title: obj.title[ LANG ],
                                className: confidentialityCodelistStyles[ obj.code ].className,
                                order: confidentialityCodelistStyles[ obj.code ].order
                            });
                        }
                    });
                    
                    self.legend_items = _.sortBy(self.legend_items,'order');
                }
            });

            //console.log('confidentialityCodelist', confidentialityCodelist)

            $.ajax({
                async: false,                
                dataType: 'json',
                url: confidentialityDataUrl,
                method: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(C.CONSUMPTION.body),
                success: function(res) {

//console.log('CONSUMPTION AJAX',res);
                    //var res = _.filter(res, function(d) {
                    //    return _.has(d,'meAccessibility');
                    //});

                    self._dataByCountry = _.groupBy(res, function(d) {
                        return d.meContent.seCoverage.coverageGeographic.codes[0].code;
                    });

//console.log('CONSUMPTION self._dataByCountry', self._dataByCountry);

                }
            });//*/

        },

        // Automatically render after initialize
        autoRender: true,

        className: 'consumption',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
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

//console.log('self._dataByCountry',self._dataByCountry)

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

//            console.log('this.mapCodesGroup',this.mapCodesGroup);

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
            this._configurePage();

            FM.guiMap.disclaimerfao_en = i18nLabels.disclaimer;

            this.fenixMap = new FM.Map(this.$map, mapOpts, mapOptsLeaflet);
            this.fenixMap.createMap(18,0);

            /*L.control.layers(baselayers, null, {
                collapsed: false
            }).addTo(this.fenixMap.map);*/

            var codesByCountry = {};

            for(var i in this.mapCodesGroup) {
                var group = this.mapCodesGroup[i];

                if(group.codes) {
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

                    //console.log(cluster, childCount)

                    var c = ' marker-cluster-';
                    if (childCount < 10) {
                        c += 'small';
                    } else if (childCount < 100) {
                        c += 'medium';
                    } else {
                        c += 'large';
                    }

                    var r = 20*childCount;  //40

                    return L.divIcon({
                        html: '<div><span>'+( childCount + 1 )+'</span></div>',
                        className: 'marker-cluster'+c,
                        iconSize: new L.point(r, r)
                    });
                },
                /*iconCreateFunction: function(cluster) {

                    return L.MarkerClusterGroup.prototype._defaultIconCreateFunction({
                        getChildCount: function() {

                            var count = 0;
                            _.each(cluster._markers, function(m) {
                                count += m.items.length;
                            });

                            return cluster.getChildCount() + count;
                        }
                    });
                }*/
            });

            this.iconMarkerFunc = layerGroup._defaultIconCreateFunction;

            _.each(codesByCountry, function(item, countryCode) {
                self._getMarker(item).addTo( layerGroup );
            });

            layerGroup.addTo(this.fenixMap.map);

            self._renderMapLegend();
        },

        _getMarker: function(items) {
            
            //items is an ARRAY!!

            var self = this;

            var loc = this._getLocByCode(items[0].countryCode),
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

            var popupHTML = '<label class="text-primary">'+items[0].countryName+'</label>'+
            '<ul class="list-group">';

///title, uid
            _.each(items, function(item) {
                //TODO MAKE TEMPLATE
                popupHTML += _.map(item.confids, function(code, k) {
                    
                    var tit = item.title.title,
                        url = '#';

                    return '<li style="list-style:none;margin-bottom:5px">'+
                        '<i class="label label-'+confidentialityCodelistStyles[ code ].className+'">&nbsp; &nbsp;</i>'+
                        '&nbsp;&nbsp;'+
                        '<a href="'+url+'">'+tit+'</a>'+
                    '</li>';//*/
                }).join('');
            });
            
            popupHTML +='</ul>';

            m.bindPopup(popupHTML, { closeButton:false });

            return m;
        },

        _getLocByCode: function(code) {

            return this.mapLocsByAdm0Code[ code ];
        },

        _configurePage: function () {

          /*  if (this.id !== undefined) {
                this._onStartingSelected(this.id);
            }*/
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


        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }
    });

    return ConsumptionView;
});
