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

    //'../globals/GaulLevels',
    'text!gaul0Centroids',

    'amplify'
], function (require,$, _, Handlebars, View, template,   i18nLabels, E, C,

    LeafletMarkecluster,
    FenixMap,
    FenixConfig,

    //GaulLevels,
    gaul0Centroids
    ) {

/*    GaulLevels.getLevel0(function(data) {

        var ids = _.map(data, function(code) {
            return code.id;
        });

        ids = _.first(_.shuffle(ids), 10);
    });*/

    var LANG = requirejs.s.contexts._.config.i18n.locale.toUpperCase(),
        s = {
            READY_CONTAINER: "#ready-container",
            MAP_CONTAINER: "#consumption_map"
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
        },
        mapOpts = {
            plugins: {
                disclaimerfao: true,
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
            },
            baselayers: {
                cartodb: {
                    url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                    title_en: "CartoDB light",                    
                    subdomains: 'abcd',                    
                    maxZoom: 19
                },
                esri_grayscale: {
                    url: "http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
                    title_en: "Esri WorldGrayCanvas",                    
                    maxZoom: 16
                }
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
            'F': { className:"info",    order: 1},
            'N': { className:"warning", order: 2},
            'D': { className:"success", order: 3},
            'A': { className:"primary", order: 4}
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
                        self.legend_items.push({
                            code: obj.code,
                            title: obj.title[ LANG ],
                            className: confidentialityCodelistStyles[ obj.code ].className,
                            order: confidentialityCodelistStyles[ obj.code ].order
                        });
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

//console.log('self._dataByCountry',self._dataByCountry)

            this.mapCodesGroup = [];

            _.each(self._dataByCountry, function(meta) {

                _.each(meta, function(m) {

                    self.mapCodesGroup.push({
                        confid: m.meAccessibility.seConfidentiality.confidentialityStatus.codes[0].code,
                        title: m.title[ LANG ],
                        codes: m.meContent.seCoverage.coverageGeographic.codes
                    });

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
            //this.fenixMap.map.fitWorld({padding: 4});

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
                showCoverageOnHover: false,
                iconCreateFunction: L.MarkerClusterGroup.prototype._defaultIconCreateFunction,
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

            _.each(items, function(item) {
                //TODO MAKE TEMPLATE
                popupHTML += _.map(item.confids, function(code, k) {
                    return '<li class="list-group-item">'+
                        '<i class="label label-'+confidentialityCodelistStyles[ code ].className+'">'+code+'</i>'+
                        '&nbsp;&nbsp;'+
                        item.title.title+
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



        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }
    });

    return ConsumptionView;
});
