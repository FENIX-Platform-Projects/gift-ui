define(['jquery','underscore','loglevel','handlebars', 
    '../config/config',
    '../config/consumption',
    '../html/consumption/map.hbs',
    '../html/consumption/popup.hbs',
    '../nls/consumption',
    '../json/consumption/gaul0_centroids.json',
    '../json/consumption/world_countries.json',
    //'../json/consumption/countries_targeted',
    '../json/consumption/countries_excluded',
    'leaflet',
    'leaflet-panel-layers',
    '../lib/leaflet.markercluster-src',
    'fenix-ui-map',
    'fenix-ui-metadata-viewer'

    //TODO 'fenix-ui-bridge'

], function ($, _, log, Handlebars,
    C,
    ConsC,
    template,
    tmplPopup,
    labels,
    gaul0Centroids,
    gaul0Countries,
    countriesExcluded,
    L,
    LeafletPanel,
    LeafletMarkecluster,
    FenixMap,
    MetadataViewer
) {
    "use strict";
    var LANG = C.lang;

    ConsC.codelistStyles = ConsC.codelistStyles[C.environment];
    
    var confidentialityDataUrl = C.consumption.service[C.environment]+'/msd/resources/find?full=true',
        confidentialityCodelistUrl = C.consumption.service[C.environment]+
            //'/msd/resources/uid/GIFT_STATUS',
            '/msd/resources/uid/GIFT_ConfidentialityStatus';
    
    var confidentialityDataPayload = {
            "dsd.contextSystem": {
                "enumeration": ["gift"]
            },
            "meContent.resourceRepresentationType": {
                "enumeration": ["dataset"]
            }
        };

    var s = {
            EL: "#map",
            MAP_CONTAINER: "#consumption_map",
            MAP_LEGEND: "#consumption_map_legend",
            MAP_META: "#consumption_map_meta",
            MAP_METAMODAL: "#consumption_map_modal",       
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
        self.metadataByCountry = {};
        self.metadataByUid = {};
        
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

                    var code = obj.code;

                    if( ConsC.codelistStyles[ code ] && 
                        ConsC.codelistStyles[ code ].visible)
                    {
                        self.legend_items.push({
                            code: code,
                            title: obj.title[ LANG ],
                            className: ConsC.codelistStyles[ code ].className,
                            order: ConsC.codelistStyles[ code ].order
                        });
                    }
                    
                    self.titleByCodes[ code ]= obj.title[ LANG ];
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
            data: JSON.stringify(C.consumption.requestBody),      
            success: function(res) {

                res = _.filter(res, function(d) {

                    if(!d.meContent.seCoverage)
                        console.log('converage field not found',d);
                    return d.meContent && d.meContent.seCoverage && d.meContent.seCoverage.coverageGeographic;
                });

                self.metadataByCountry = _.groupBy(res, function(d) {
                    var countryCode =  d.meContent.seCoverage.coverageGeographic.codes[0].code;
                    return countryCode;
                });

                self.metadataByUid = _.groupBy(res, function(d) {
                    return d.uid;
                });
            }
        });
    };

    Map.prototype._initVariables = function () {

        var self = this;

        this.mapCodesGroup = [];

        _.each(self.metadataByCountry, function(meta) {
            _.each(meta, function(m) {
                if(m.meAccessibility && _.has(m.meAccessibility,'seConfidentiality')) {

                    var confid = m.meAccessibility.seConfidentiality.confidentialityStatus.codes[0].code;

                    if(ConsC.codelistStyles[ confid ].visible) {
                        self.mapCodesGroup.push({
                            uid: m.uid,
                            confid: confid,
                            title: m.title[ LANG ],
                            codes: m.meContent.seCoverage.coverageGeographic.codes
                        });
                    }
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
        this.$metamodal = this.$el.find(s.MAP_METAMODAL);

        //PATH FOR OLD MAP
        //FenixMap.guiMap['disclaimerfao_'+LANG.toLowerCase() ] = i18nLabels.disclaimer;

        /*this.fenixMap = new FenixMap.map(this.$map, 
            ConsC.mapOpts, 
            ConsC.mapOptsLeaflet
        );*/
        //this.map = this.fenixMap.map;
        this.map = L.map(this.$map[0], ConsC.mapOptsLeaflet);

        L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {subdomains: 'abcd', maxZoom: 19 }).addTo(self.map);

        window.MM = this.map;

        setTimeout(function() {
            self.map.invalidateSize(false);
            self.map.fitWorld();
        },0);

        //this.fenixMap.createMap(10,0,2);
        L.control.zoom({position:'topright'}).addTo(self.map);
        self._renderDisclaimer(this.map, i18nLabels.disclaimer);

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

        //LAYER GRAY
        var grayCountries = _.compact(_.map(countriesExcluded, function(id) {
            return self.countryByAdm0Code[ id ];
        }));
        L.geoJson(grayCountries, {
            style: function(f) {
                return ConsC.countryHiddensStyle;
            }
        }).addTo(self.map);

        /* TODO enable for too markers
        self.layerAll = L.markerClusterGroup({
            showCoverageOnHover: true,
            maxClusterRadius: 30,
        }).addTo(this.map);*/

        self.layerAll = L.layerGroup([]).addTo(this.map);

        self.layersByCodes = {};
        _.each(self.codesByCountry, function(items, countryCode) {
            
            _.each(items, function(item) {

                var className,
                    code = item.confids[0],
                    order = ConsC.codelistStyles[ code ] ? ConsC.codelistStyles[ code ].order : 0;

                if(ConsC.codelistStyles[ code ])
                    className = ConsC.codelistStyles[ code ].className;
                else
                    console.log('Value of confidentialityStatus not found', item.confids[0])

                if(!self.layersByCodes[ code ]) {
                    self.layersByCodes[ code ] = {
                        active: false,
                        order: order,
                        name: self.titleByCodes[ code ],
                        icon: '<i class="label label-'+className+' text-primary">&nbsp;</i>',
                        layer: L.layerGroup([])
                    };
                }
                
                self.layersByCodes[ code ].layer.addLayer( self._getMarker(items, code) );

            });

            if(ConsC.codelistStyles[ items[0].confids[0] ].visible)
            self.layerAll.addLayer( self._getMarker(items) );
        });

    //fixed LEGEND field
        self.layersByCodes['All']= {
            active: true,
            order: 10,
            name: i18nLabels['layer_all'],
            icon: '<i class="label label-'+ConsC.codelistStyles['All'].className+' text-primary">&nbsp;</i>',
            layer: self.layerAll
        };

        delete self.layersByCodes[ConsC.codelistStyles.Off];

        self.panelLayers = _.sortBy(_.values(self.layersByCodes),'order');

        self.legendPanel = new LeafletPanel(self.panelLayers, null, {
            compact: true,
            position: 'topleft'
        })
        .on('panel:selected', function(e) {
            self.map.fitWorld();
        })
        .addTo(self.map);
        
        //move panel outside map
        self.$legend.append(self.legendPanel._container);      
    };        

    Map.prototype._renderDisclaimer = function(map, text) {
    
        var control = new L.Control({position: 'bottomright'});
    
        control.onAdd = function(map) {
                var div = L.DomUtil.create('div','leaflet-control-disclaimer fm-icon-box-background'),
                    a = L.DomUtil.create('a','fm-icon-sprite fm-icon-info', div);
                
                a.title = text;
                
                $(a).tooltip({placement:'left'});

                return div;
            };
        control.addTo(map);
    };

    Map.prototype._getMarker = function(items, filterCode) {

        var self = this;

        var loc = this.mapLocsByAdm0Code[ items[0].countryCode ];
            /*icon = L.MarkerClusterGroup.prototype._defaultIconCreateFunction({
                getChildCount: function() {
                    var count = items.length;
                    if(filterCode) {
                        count = _.filter(items, function(i) {
                            return (''+filterCode) === i.confids[0];
                        }).length;
                    }
                    return count;
                }
            });*/

        var childCount = items.length;
        if(filterCode) {
            childCount = _.filter(items, function(i) {
                return (''+filterCode) === i.confids[0];
            }).length;
        }

        var icon = new L.DivIcon({
            html: '<div><span>' + childCount + '</span></div>',
            className: 'marker-cluster marker-cluster-small',
            iconSize: new L.Point(40, 40)
        });

        var mark = new L.Marker(loc, { icon: icon });

        mark.countryName = items[0].countryName;
        mark.items = items;
        mark.code = filterCode;
        mark.itemsValue = [];

        _.each(mark.items, function(item) {
            _.each(item.confids, function(code) {

                if( ConsC.codelistStyles[ code ].visible) {

                    if(mark.code) {
                        if(mark.code == code) {
                            mark.itemsValue.push({
                                code: code,
                                className: ConsC.codelistStyles[ code ] ? ConsC.codelistStyles[ code ].className : '',
                                title: item.title.title,
                                uid: item.uid
                            });
                        }
                    }
                    else {
                        mark.itemsValue.push({
                            code: code,
                            className: ConsC.codelistStyles[ code ] ? ConsC.codelistStyles[ code ].className : '',
                            title: item.title.title,
                            uid: item.uid
                        });
                    }
                }

            })
        });

        var $popup = $(tmplPopup({
            countryName: mark.countryName,
            items: mark.itemsValue
        }));

        $popup.find('a').on('click', function(e) {
            e.preventDefault();

            var uid = $(e.target).data('uid'),
                meta = self.metadataByUid[ uid ][0];

            self._renderMeta(meta);
        });

        mark.bindPopup($popup[0]);

        return mark;
    };

    Map.prototype._renderMeta = function(model) {

        this.$metamodal.modal('show');
        this.metadataViewer = new MetadataViewer({
            model: model,
            el: this.$meta,
            lang: C.lang,
            environment: C.environment,
            hideExportButton: true,
            expandAttributesRecursively: ['meContent'],
            popover: {
                placement: 'left'
            }
        }).on('export', function(e) {
            console.log('EXPORT MODEL',e)
        });
    };

    Map.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");

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
    };

    return new Map();
});