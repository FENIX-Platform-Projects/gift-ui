define(['jquery','underscore','loglevel','handlebars',
    '../config/config',
    '../config/consumption',
    '../html/consumption/map.hbs',
    '../html/consumption/popup.hbs',
    "../html/consumption/modals/fileTypesDropdown.hbs",
    "../html/consumption/modals/fileTypesSourceLink.hbs",
    "../html/consumption/modals/infoForm.hbs",
    // '../nls/consumption',
    "../nls/labels",
    '../json/consumption/gaul0_centroids.json',
    '../json/consumption/world_countries.json',
    //'../json/consumption/countries_targeted',
    '../json/consumption/countries_excluded',
    'leaflet',
    'leaflet-panel-layers',
    '../lib/leaflet.markercluster-src',
    'fenix-ui-map',
    'fenix-ui-metadata-viewer',
    'fenix-ui-reports',
    "fenix-ui-bridge",
    "select2",
    "recaptcha2",
    "./map/LeafletGoogleMutant"
    // "leaflet.gridlayer.googlemutant"
    // "google-maps",
    //"./map/leaflet-google"
    //TODO 'fenix-ui-bridge'

], function ($, _, log, Handlebars,
    C,
    ConsC,
    template,
    tmplPopup,
    fileTypeDropdownTemplate,
    fileTypesSourceLink,
    infoForm,
    labels,
    gaul0Centroids,
    gaul0Countries,
    countriesExcluded,
    L,
    LeafletPanel,
    LeafletMarkecluster,
    FenixMap,
    MetadataViewer,
    Reports,
    Bridge,
    select2,
    reCAPTCHA
) {
    "use strict";
    var LANG = C.lang;

    ConsC.codelistStyles = ConsC.codelistStyles[C.environment];
    
    var serv = C.consumption.service[C.environment],
        confidentialityDataUrl = serv+'/msd/resources/find?full=true',
        confidentialityCodelistUrl = serv+'/msd/resources/uid/GIFT_ConfidentialityStatus';
    
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
            MAP_SURVEY_CARDINALITY: "#consumption_map_surveyCardinality",

            DOWNLOADDATA_MODAL: "#downloadData_modal",
            DOWNLOADDATA_MODAL_CONTENT: "#downloadData_modal_content_dynamicPart",
            DOWNLOAD_SELECTOR_TYPE: "#downloadSelectorType",
            DOWNLOAD_DATA_JUSTIFICATION_FORM: '#downloadDataJustificationForm',
            FILE_TYPES_DROPDOWN: "#fileTypesDropdown",
            FILTER_TYPE_OF_AREA_SELECTOR: "#filterTypeOfAreaSelector",
            FILTER_COVERAGE_SELECTOR: "#filterCoverageSelector",
            FILTER_MAP_BUTTON: "#filterMapButton",
            FILTER_CLEAR_MAP_BUTTON: "#filterClearMapButton",
            FILTER_TYPES_LINK_TAG: "#fileTypesLinkTag",
            DOWNLOAD_DATA_MODAL_BUTTON: "#downloadDataModalButton",
            INFO_FORM_MODAL: "#infoForm_modal",
            INFO_FORM_MODAL_CONTENT_BODY: "#infoForm_modal_contentBody",
            INFO_FORM_SUBMIT: "#infoFormSubmit",
            // DISCLAIMER_URL: "http://fenixservices.fao.org/gift/disclaimer",
            DISCLAIMER_URL: "http://fenixservices.fao.org/dev/gift/disclaimer",

            layersByCodes2 : '',
            metadataSize : 0,

            referenceAreaValues : '0',
            referenceAreaNoNational : ['2','3','4','5'],
            //referenceAreaNoNational : '"2","3","4","5"',
            referenceAreaNoNationalConventional : '5',
            referenceAreaAllConventional : '0',
            coverageAllConventional : '0',
            coverageSectorsValues : '0',
            referenceAreaAll : ['1','2','3','4','5'],
            coverageAll : ['1','2','3']
        };

    function Map() {

        log.setLevel("trace");

        this._dispose();

        this._importThirdPartyCss();

        this._initCodelists();

        this._initVariables();

        this._attach();

        this._bindEventListener();
        console.log(this)
    }

    Map.prototype._bindEventListener = function () {
        var self = this;
        $(s.FILTER_MAP_BUTTON).click(function() {

            var filterCoverageSelectorValue =  self.$filterCoverageSelector.select2('data');
            var filterTypeOfAreaValue =  self.$filterTypeOfArea.select2('data');

            s.referenceAreaValues = filterTypeOfAreaValue[0].id;
            s.coverageSectorsValues = filterCoverageSelectorValue[0].id;
            //s.referenceAreaValues = s.referenceAreaValues.substring(1,s.referenceAreaValues.length-1);

            self._reBuild();
        });

        $(s.FILTER_CLEAR_MAP_BUTTON).click(function() {

            s.referenceAreaValues = '0';
            s.coverageSectorsValues = '0';

            self.$filterTypeOfArea.select2("val", s.referenceAreaValues);

            self.$filterCoverageSelector.select2("val", s.coverageSectorsValues);

            self._reBuild();
        });
    }

    Map.prototype._reBuild = function () {
        console.log(this)
        this._dispose();

        this._initCodelists();

        this._initVariables();

        this._attach();

        this._bindEventListener();
    }

    Map.prototype._initCodelists = function (params) {

        var self = this;

        var i18nLabels = labels[ LANG.toLowerCase() ];

        var html = template(i18nLabels);


        $(s.EL).html(html);
        this.$el = $(s.EL);
        this.$surveyCardinal = this.$el.find(s.MAP_SURVEY_CARDINALITY);

        $.extend(true, this, params);

        self.confidentialityCodelist = {};
        self.legend_items = [];
        self.titleByCodes = {};
        self.metadataByCountry = {};
        self.metadataByUid = {};

        this.reports = new Reports({
            cache: C.cache,
            environment: C.environment,
        });
        
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

        var referenceArea = s.referenceAreaValues;
        var referenceAreaObj = { codes: [{uid: "GIFT_ReferenceArea", codes: [referenceArea]}]};
        if(s.referenceAreaValues == s.referenceAreaNoNationalConventional){
            //referenceArea = s.referenceAreaNoNational;
            referenceAreaObj = { codes: [{uid: "GIFT_ReferenceArea", codes: s.referenceAreaNoNational}]};
        }
        if(s.referenceAreaValues == s.referenceAreaAllConventional){
            //referenceArea = s.referenceAreaNoNational;
            referenceAreaObj = { codes: [{uid: "GIFT_ReferenceArea", codes: s.referenceAreaAll}]};
        }

        var coverageSectors = s.coverageSectorsValues;
        var coverageObj = { codes: [{uid: "GIFT_CoverageSector", codes: [coverageSectors]}]};
        if(s.coverageSectorsValues == s.coverageAllConventional){
            coverageObj = { codes: [{uid: "GIFT_CoverageSector", codes: s.coverageAll}]};
        }


        var mapfilterSelection =
            {
                "dsd.contextSystem": {
                    "enumeration": ["gift"]
                },
                "meContent.resourceRepresentationType": {
                    "enumeration": ["dataset"]
                },
                "meContent.seReferencePopulation.referenceArea": referenceAreaObj,
                "meContent.seCoverage.coverageSectors": coverageObj
                // "meContent.seReferencePopulation.referenceArea": {
                //     //"Type of area" //National=1; Sub-national(2,3,4,5);
                //     codes: [{uid: "GIFT_ReferenceArea", codes: [referenceArea]}]
                // },
                // "meContent.seCoverage.coverageSectors": {
                //     //"Coverage"//"Only rural"=1 //"Only urban"=2 //"Both rural and urban"=3
                //     codes: [{uid: "GIFT_CoverageSector", codes: [s.coverageSectorsValues]}]//"Only rural"
                // }
            }

        $.ajax({
            async: false,
            dataType: 'json',
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            url: confidentialityDataUrl,
            data: JSON.stringify(mapfilterSelection),
            success: function(res) {

                res = _.filter(res, function(d) {
                    return d.meContent && 
                        d.meContent.seCoverage && 
                        d.meContent.seCoverage.coverageGeographic;
                });

                s.metadataSize = res.length;


                self.metadataByOrder =  _.groupBy(res, function(d) {

                    var order = d.meAccessibility.seConfidentiality.confidentialityStatus.codes[0].code;

                    return order;
                });

                self.metadataByCountry = _.groupBy(res, function(d) {

                    var countryCode = d.meContent.seCoverage.coverageGeographic.codes[0].code;

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
        this.$infoFormModal = this.$el.find(s.INFO_FORM_MODAL);
        this.$infoFormContentBody = this.$el.find(s.INFO_FORM_MODAL_CONTENT_BODY);

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

         if(!this.gaul0Centroids_adm0_code) {

             this.gaul0Centroids_adm0_code = _.groupBy(gaul0Centroids.features, function (feature) {
                 return feature.properties.adm0_code;
             });
             this.mapLocsByAdm0Code = {};
             _.each(this.gaul0Centroids_adm0_code, function (feature, code) {
                 self.mapLocsByAdm0Code[code] = feature[0].geometry.coordinates.reverse();
             });

         }


        this.gaul0Countries_adm0_code = _.groupBy(gaul0Countries.features, function (feature) {
            return feature.id;
        });
        this.countryByAdm0Code = {};
        _.each(this.gaul0Countries_adm0_code, function (feature, code) {
            self.countryByAdm0Code['' + code] = feature[0];
        });
            this.bridge = new Bridge({
                environment: C.environment,
                cache: C.cache
            });
    };

    Map.prototype._attach = function () {

        var self = this;

        var i18nLabels = labels[ LANG.toLowerCase() ];

        // var html = template(i18nLabels);
        //
        // $(s.EL).html(html);

        this.$el = $(s.EL);
        this.$map = this.$el.find(s.MAP_CONTAINER);
        this.$legend = this.$el.find(s.MAP_LEGEND);
        this.$meta = this.$el.find(s.MAP_META);
        this.$metamodal = this.$el.find(s.MAP_METAMODAL);
        // this.$surveyCardinal = this.$el.find(s.MAP_SURVEY_CARDINALITY);

        this.$downloadDatamodal = this.$el.find(s.DOWNLOADDATA_MODAL);
        this.$downloadDatamodalContent = this.$el.find(s.DOWNLOADDATA_MODAL_CONTENT);
        this.$downloadSelectorType = this.$el.find(s.DOWNLOAD_SELECTOR_TYPE);

        this.$filterTypeOfArea = this.$el.find(s.FILTER_TYPE_OF_AREA_SELECTOR);
        this.$filterCoverageSelector = this.$el.find(s.FILTER_COVERAGE_SELECTOR);

        this.map = new L.Map(this.$map[0]);

        L.gridLayer.googleMutant({
            minZoom: 2,
            type:'hybrid'
        }).addTo(this.map);

        window.MM = this.map;

        setTimeout(function() {
            self.map.invalidateSize(false);
            self.map.fitWorld();
        },0);

        //this.fenixMap.createMap(10,0,2);
        //L.control.zoom({position:'topright'}).addTo(self.map);
        self._renderDisclaimer(this.map, i18nLabels.disclaimer);

        this.$filterTypeOfArea.select2({
            minimumResultsForSearch: Infinity
        }).select2("val", s.referenceAreaValues);//'"2","3","4","5"'
        //}).select2("val", '2-3-4-5');//'"2","3","4","5"'

        this.$filterCoverageSelector.select2({
            minimumResultsForSearch: Infinity
        }).select2("val", s.coverageSectorsValues);

        // this.$filterCoverageSelector.val(s.coverageSectorsValues);
        // this.$filterTypeOfArea.val(s.referenceAreaValues);

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
        // var grayCountries = _.compact(_.map(countriesExcluded, function(id) {
        //     return self.countryByAdm0Code[ id ];
        // }));
        // L.geoJson(grayCountries, {
        //     style: function(f) {
        //         return ConsC.countryHiddensStyle;
        //     }
        // }).addTo(self.map);

        /* TODO enable for too markers
        self.layerAll = L.markerClusterGroup({
            showCoverageOnHover: true,
            maxClusterRadius: 30,
        }).addTo(this.map);*/

        self.layerAll = L.layerGroup([]).addTo(this.map);

        self.layersByCodes = {};
        s.layersByCodes2 = {};
        s.lunghezza = 0;

        _.each(self.codesByCountry, function(items, countryCode) {

            s.lunghezza= s.lunghezza+ items.length;
            console.log(items.length)
            console.log(s.lunghezza)
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

                if((s.layersByCodes2[ order ]!=null)&&(typeof s.layersByCodes2[ order ]!= 'undefined')) {
                    if(s.layersByCodes2[ order ].hasOwnProperty('surveyCardinality')){
                        s.layersByCodes2[ order ].surveyCardinality++;
                    }
                    else{
                        s.layersByCodes2[ order ].surveyCardinality = 1;
                    }
                }
                else{
                    s.layersByCodes2[ order ] = {};
                    s.layersByCodes2[ order ].surveyCardinality = 1;
                }
                
                var m = self._getMarker(items, code);
                if(m){
                    self.layersByCodes[ code ].layer.addLayer( m );
                }

            });

            var mAll = self._getMarker(items);
            //console.log(mAll.length)
            //console.log(s.metadataSize)
            if(mAll && ConsC.codelistStyles[ items[0].confids[0] ].visible){
                self.layerAll.addLayer( mAll );
            }
        });

        var mAllTotal = 0;
        _.each(s.layersByCodes2, function(item){
            mAllTotal += item.surveyCardinality;
        });
        s.layersByCodes2['10'] = { surveyCardinality : mAllTotal };
        self.$surveyCardinal.html(i18nLabels.surveyCardinality + mAllTotal);

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
            console.log('stampamelo' , s.layersByCodes2)
            console.log(s.lunghezza)
            if((e!=null)&&(typeof e!='undefined')&&(e.order!=null)&&(typeof e.order!='undefined')){
                self.$surveyCardinal.html(i18nLabels.surveyCardinality + s.layersByCodes2[''+e.order].surveyCardinality);
            }

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

        //console.log('centroid found', loc);
        if(!loc) {
            console.log('centroid not found',items[0].countryCode, loc);
            return false;
        }

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
                    var downloadDisplay = 'none';
                        if(code==5){
                            downloadDisplay = 'block';
                        }
                        if(mark.code) {
                            if(mark.code == code) {
                                mark.itemsValue.push({
                                    code: code,
                                    className: ConsC.codelistStyles[ code ] ? ConsC.codelistStyles[ code ].className : '',
                                    title: item.title.title,
                                    uid: item.uid,
                                    download: '- '+labels[LANG.toLowerCase()]['downloadSurvey'],
                                    metadata: '- '+labels[LANG.toLowerCase()]['metadata'],
                                    display: downloadDisplay
                                });
                            }
                        }
                        else {

                            mark.itemsValue.push({
                                code: code,
                                className: ConsC.codelistStyles[ code ] ? ConsC.codelistStyles[ code ].className : '',
                                title: item.title.title,
                                uid: item.uid,
                                download: '- '+labels[LANG.toLowerCase()]['downloadSurvey'],
                                metadata: '- '+labels[LANG.toLowerCase()]['metadata'],
                                display: downloadDisplay
                            });

                        }
                }

            })
        });

        // console.log(labels[LANG.toLowerCase()])
        // console.log(labels[LANG.toLowerCase()]['downloadSurvey'])
        var $popup = $(tmplPopup({
            countryName: mark.countryName,
            items: mark.itemsValue
        }));

        $popup.find("[data-link='metadata']").on('click', function(e) {
            e.preventDefault();

            var uid = $(e.target).data('uid'),
                meta = self.metadataByUid[ uid ][0];

            self._renderMeta(meta);
        });

        $popup.find("[data-link='survey']").on('click', function(e) {
            e.preventDefault();

            var uid = $(e.target).data('uid'),
                meta = self.metadataByUid[ uid ][0];

            self.bridge.getMetadata({uid: uid, params: {"full":true}}).then(_.bind(self._getMetadataInfo, self, uid));
        });

        mark.bindPopup($popup[0]);

        return mark;
    };

    Map.prototype._renderMeta = function(model) {

        var self = this;
        self.$metamodal.modal('show');

        self.metadataViewer = new MetadataViewer({
            model: model,
            el: this.$meta,
            lang: C.lang,
            environment: C.environment,
            bridge: C.mdsdService,
            hideExportButton: false,
            specialFields : C.mdsdSpecialFields,
            expandAttributesRecursively: ['meContent'],
            popover: {
                placement: 'left'
            }
        }).on("export", _.bind(function (model) {

            var s = model.uid,
                version = version,
                filename = s.replace(/[^a-z0-9]/gi, '_').toLowerCase();

            var payload = {

                resource: {
                    metadata: {
                        uid: s,
                        version: version
                    }
                },

                "input": {
                    "plugin": "inputMD",
                    "config": {
                        "template": "gift"

                    }
                },

                "output": {
                    "plugin": "outputMD",
                    "config": {
                        "full": false,
                        lang: C.lang.toUpperCase(),
                        "template": "fao",
                        "fileName": filename + ".pdf"
                    }
                }
            };

            log.info("Configure FENIX export: table");

            log.info(payload);

            self.reports.export({
                format: "table",
                config: payload
            });

        }, this));

        $(s.MAP_METAMODAL).on('hidden.bs.modal', function (e) {
            self.metadataViewer.dispose();
        })

    };

    /*Previous Version*/
    Map.prototype._getMetadataInfoPreviousVersio = function (uid, data) {

        var self = this;
        if((data!=null)&&(typeof data!='undefined')&&(data.uid!=null)&&(typeof data.uid!="undefined"))
        {
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: s.DISCLAIMER_URL+ '?uid='+data.uid+'&lang=en',
                //url:'http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer?uid='+data.uid+'&lang=en',
                contentType: "application/json; charset=utf-8",
                success: function(content) {
                    self.$downloadDatamodalContent.html(content);
                    if(data.uid=='000023BGD201001'){
                        self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[LANG.toLowerCase()]));
                        $(s.FILE_TYPES_DROPDOWN).select2({
                            minimumResultsForSearch: Infinity
                        });
                    }
                    else{

                        var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();
                        //Add the link
                        self.$downloadSelectorType.html(fileTypesSourceLink(labels[LANG.toLowerCase()]));
                        $(s.FILTER_TYPES_LINK_TAG).on('click', function() {
                            try{
                                _gaTracker('send', 'event', 'GIFT Link Redirect',
                                    data.uid, /* datasetID:datasetType */
                                    self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
                            }
                            catch (ex){
                                console.log('Google Analytics Exception')
                            }
                            finally {
                                console.log('Google Analytics Exception')
                            }
                        });
                    }
                    //this.$downloadDatamodalContent.html(modalContent(labels[C.lang.toLowerCase()])).find('#000023BGD201001');
                    self.$downloadDatamodal.modal('show');

                    $(s.DOWNLOAD_DATA_MODAL_BUTTON).click(function() {

                        var fileTypes = $(s.FILE_TYPES_DROPDOWN).select2('data');
                        var dataSetTypes = '';
                        for(var i=0;i<fileTypes.length;i++)
                            dataSetTypes += ','+fileTypes[i].id;
                        dataSetTypes = dataSetTypes.substring(1);
                        var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();

                        if(data.uid){

                            try{
                                _gaTracker('send', 'event', 'GIFT Download',
                                    data.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                                    self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
                            }
                            catch (ex){
                                console.log('Google Analytics Exception')
                            }
                            finally {
                                console.log('Google Analytics Exception')
                                //var url = SC.download.serviceProvider+payload.model.uid+".zip";
                                var url = ConsC.download.serviceProvider+data.uid+".zip";
                                var link = document.createElement('a');
                                link.href = url;
                                link.click();
                                link.remove();
                            }

                            // _gaTracker('send', 'event', 'GIFT Download',
                            //     data.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                            //     self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
                            // //var url = SC.download.serviceProvider+payload.model.uid+".zip";
                            // var url = ConsC.download.serviceProvider+data.uid+".zip";
                            // var link = document.createElement('a');
                            // link.href = url;
                            // link.click();
                            // link.remove();
                        }
                    });
                },
                error: function (err) {
                    console.log(err)
                }
            });


            // require(['../html/consumption/modals/downloadData_modal_content_'+data.uid+'.hbs'],
            //     function   (content) {
            //         self.$downloadDatamodalContent.html(content);
            //         if(data.uid=='000023BGD201001'){
            //             self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[LANG.toLowerCase()]));
            //             $(s.FILE_TYPES_DROPDOWN).select2({
            //                 minimumResultsForSearch: Infinity
            //             });
            //         }
            //         else{
            //
            //             var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();
            //
            //             _gaTracker('send', 'event', 'GIFT Link Redirect',
            //                 data.uid, /* datasetID:datasetType */
            //                 self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
            //
            //             //Mettere il link
            //             self.$downloadSelectorType.html(fileTypesSourceLink(labels[LANG.toLowerCase()]));
            //         }
            //         //this.$downloadDatamodalContent.html(modalContent(labels[C.lang.toLowerCase()])).find('#000023BGD201001');
            //         self.$downloadDatamodal.modal('show');
            //
            //         $("#downloadDataModalButton").click(function() {
            //
            //             var data = $(s.FILE_TYPES_DROPDOWN).select2('data');
            //             var dataSetTypes = '';
            //             for(var i=0;i<data.length;i++)
            //                 dataSetTypes += ','+data[i].id;
            //             dataSetTypes = dataSetTypes.substring(1);
            //             var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();
            //
            //             if(data.uid){
            //
            //                 _gaTracker('send', 'event', 'GIFT Download',
            //                     data.uid + ':' + dataSetTypes, /* datasetID:datasetType */
            //                     self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
            //                 //var url = SC.download.serviceProvider+payload.model.uid+".zip";
            //                 var url = ConsC.download.serviceProvider+data.uid+".zip";
            //                 var link = document.createElement('a');
            //                 link.href = url;
            //                 link.click();
            //                 link.remove();
            //             }
            //         });
            //     });
        }
    };

    Map.prototype._renderDownloadDisclainer = function (uid, data) {
        var self = this;
        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: s.DISCLAIMER_URL+'?uid='+data.uid+'&lang=en',
            // url:'http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer?uid='+data.uid+'&lang=en',
            contentType: "application/json; charset=utf-8",
            success: function(content) {

                self.$downloadDatamodalContent.html(content);
                self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[C.lang.toLowerCase()]));
                // $(s.FILE_TYPES_DROPDOWN).select2({
                //     minimumResultsForSearch: Infinity
                // });
                // if(data.model.uid=='000023BGD201001'){
                //     self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[C.lang.toLowerCase()]));
                //     $(s.FILE_TYPES_DROPDOWN).select2({
                //         minimumResultsForSearch: Infinity
                //     });
                // }
                // else{
                //
                //     var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();
                //     //Add the link
                //     self.$downloadSelectorType.html(fileTypesSourceLink(labels[C.lang.toLowerCase()]));
                //     $(s.FILTER_TYPES_LINK_TAG).on('click', function() {
                //         try{
                //             // _gaTracker('send', 'event', 'GIFT Link Redirect',
                //             //     data.model.uid, /* datasetID:datasetType */
                //             //     self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
                //         }
                //         catch (ex){
                //             console.log('Google Analytics Exception')
                //         }
                //         finally {
                //             console.log('Google Analytics Exception')
                //         }
                //     });
                // }
                //this.$downloadDatamodalContent.html(modalContent(labels[C.lang.toLowerCase()])).find('#000023BGD201001');

                self.$downloadDatamodal.modal('show');


                // var onloadCallback = function () {
                //     grecaptcha.render('downloadDataModalButton', {
                //         'sitekey': '6LcWShkUAAAAAM-SqHBq4qX7Mj3CdA7Wn7noPbLC',
                //         'callback': self.onSubmit
                //     });
                // };

                $(s.DOWNLOAD_DATA_MODAL_BUTTON).click(function() {

                    //var fileTypes = $(s.FILE_TYPES_DROPDOWN).select2('data');
                    var fileTypes = '';
                    var dataSetTypes = '';
                    // for(var i=0;i<fileTypes.length;i++)
                    //     dataSetTypes += ','+fileTypes[i].id;
                    // dataSetTypes = dataSetTypes.substring(1);
                    var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();
                    console.log(data)
                    console.log(data.title[C.lang.toLowerCase()])
                    //Recaptcha call
                    $.ajax({
                        type: "POST",
                        // url: "http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer/notify",
                        url: s.DISCLAIMER_URL +'/notify',
                        data: JSON.stringify(
                            {
                                "captchaResponse": self.infoUser.recaptchaResponse,
                                "name": self.infoUser.name,
                                "surveyTitle": data.title? data.title[C.lang.toUpperCase()]: '',
                                "email": self.infoUser.email,
                                "uid": data.uid? data.uid: '',
                                "lang": C.lang.toLowerCase()
                            }
                        ),
                        dataType: "json",
                        contentType: "application/json; charset=UTF-8"
                    }).done(function (response) {
                        self.recaptchaResponse = response;
                        console.log("OK");

                    }).fail(function () {
                        console.log("VERIFY FAILED");
                    });

                    if(data.uid){

                        try{
                            _gaTracker('send', 'event', 'GIFT Download',
                                data.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                                self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
                        }
                        catch (ex){
                            console.log('Google Analytics Exception')
                        }
                        finally {
                            console.log('Google Analytics Exception')
                            //var url = SC.download.serviceProvider+payload.model.uid+".zip";
                            var url = ConsC.download.serviceProvider+data.uid+".zip";
                            var link = document.createElement('a');
                            link.href = url;
                            link.click();
                            link.remove();
                        }

                        // _gaTracker('send', 'event', 'GIFT Download',
                        //     data.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                        //     self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
                        // //var url = SC.download.serviceProvider+payload.model.uid+".zip";
                        // var url = ConsC.download.serviceProvider+data.uid+".zip";
                        // var link = document.createElement('a');
                        // link.href = url;
                        // link.click();
                        // link.remove();
                    }
                });
            },
            error: function (err) {
                console.log(err)
            }
        });
    };

    Map.prototype._infoFormCreation = function (uid, data) {
        // infoForm
        var self = this;
        this.$infoFormContentBody.html(infoForm(labels[C.lang.toLowerCase()]));

        //this._rederDisclainer(data, payload);

        var recaptcha = '';
        self.infoUser = {recaptchaResponse : false};
        $('#infoFormError').hide();

        var onSubmit = function (token) {
            console.log(token)
            console.log('captcha succeeded!');
            // console.log(grecaptcha.getResponse());
            //self.recaptchaResponse = token;

            var formName = $('#name').val();
            var formEmail = $('#email').val();
            var formInstitution = $('#institution').val();

            if((formName!=null)&&(typeof formName!= 'undefined')&&(formName.length>0)&&(formEmail!=null)&&(typeof formEmail!= 'undefined')&&(formEmail.length>0)&&(formInstitution!=null)&&(typeof formInstitution!= 'undefined')&&(formInstitution.length>0))
            {
                self.infoUser = {name: formName, email: formEmail, institution : formInstitution, recaptchaResponse : token};
            }
        };

        self.onSubmit = onSubmit;
        recaptcha=new reCAPTCHA('captcha_element',{
            siteKey:'6LcWShkUAAAAAM-SqHBq4qX7Mj3CdA7Wn7noPbLC'
            // secretKey:'your-secret-key'
        })

        grecaptcha.render('captcha_element', {
            'sitekey': '6LcWShkUAAAAAM-SqHBq4qX7Mj3CdA7Wn7noPbLC',
            'callback': self.onSubmit
        });

        $(s.INFO_FORM_SUBMIT).click(function() {

            if((self.infoUser.name!=null)&&(typeof self.infoUser.name!= 'undefined')&&(self.infoUser.name.length>0)&&(self.infoUser.email!=null)&&(typeof self.infoUser.email!= 'undefined')&&(self.infoUser.email.length>0)&&(self.infoUser.institution!=null)&&(typeof self.infoUser.institution!= 'undefined')&&(self.infoUser.institution.length>0)&&(self.infoUser.recaptchaResponse!=false))
            {
                self._renderDownloadDisclainer(uid, data);
                self.$infoFormModal.modal('hide');
            }
            else {
                $('#infoFormError').show();
            }
        });

        self.$infoFormModal.modal('show');

    }

    Map.prototype._getMetadataInfo = function (uid, data) {

        var self = this;
        if((data!=null)&&(typeof data!='undefined')&&(data.uid!=null)&&(typeof data.uid!="undefined"))
        {
            self._infoFormCreation(uid, data);
        }
    };

    Map.prototype._getMetadataInfoOld = function (uid, data) {

        var self = this;
        if((data!=null)&&(typeof data!='undefined')&&(data.uid!=null)&&(typeof data.uid!="undefined"))
        {
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: s.DISCLAIMER_URL+'?uid='+data.uid+'&lang=en',
                //url:'http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer?uid='+data.uid+'&lang=en',
                contentType: "application/json; charset=utf-8",
                success: function(content) {
                    self.$downloadDatamodalContent.html(content);
                    self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[LANG.toLowerCase()]));
                    $(s.FILE_TYPES_DROPDOWN).select2({
                        minimumResultsForSearch: Infinity
                    });
                    // if(data.uid=='000023BGD201001'){
                    //     self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[LANG.toLowerCase()]));
                    //     $(s.FILE_TYPES_DROPDOWN).select2({
                    //         minimumResultsForSearch: Infinity
                    //     });
                    // }
                    // else{
                    //
                    //     var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();
                    //     //Add the link
                    //     self.$downloadSelectorType.html(fileTypesSourceLink(labels[LANG.toLowerCase()]));
                    //     $(s.FILTER_TYPES_LINK_TAG).on('click', function() {
                    //         try{
                    //             _gaTracker('send', 'event', 'GIFT Link Redirect',
                    //                 data.uid, /* datasetID:datasetType */
                    //                 self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
                    //         }
                    //         catch (ex){
                    //             console.log('Google Analytics Exception')
                    //         }
                    //         finally {
                    //             console.log('Google Analytics Exception')
                    //         }
                    //     });
                    // }
                    //this.$downloadDatamodalContent.html(modalContent(labels[C.lang.toLowerCase()])).find('#000023BGD201001');
                    self.$downloadDatamodal.modal('show');

                    $(s.DOWNLOAD_DATA_MODAL_BUTTON).click(function() {

                        var fileTypes = $(s.FILE_TYPES_DROPDOWN).select2('data');
                        var dataSetTypes = '';
                        for(var i=0;i<fileTypes.length;i++)
                            dataSetTypes += ','+fileTypes[i].id;
                        dataSetTypes = dataSetTypes.substring(1);
                        var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();

                        if(data.uid){

                            try{
                                _gaTracker('send', 'event', 'GIFT Download',
                                    data.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                                    self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
                            }
                            catch (ex){
                                console.log('Google Analytics Exception')
                            }
                            finally {
                                console.log('Google Analytics Exception')
                                //var url = SC.download.serviceProvider+payload.model.uid+".zip";
                                var url = ConsC.download.serviceProvider+data.uid+".zip";
                                var link = document.createElement('a');
                                link.href = url;
                                link.click();
                                link.remove();
                            }

                            // _gaTracker('send', 'event', 'GIFT Download',
                            //     data.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                            //     self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
                            // //var url = SC.download.serviceProvider+payload.model.uid+".zip";
                            // var url = ConsC.download.serviceProvider+data.uid+".zip";
                            // var link = document.createElement('a');
                            // link.href = url;
                            // link.click();
                            // link.remove();
                        }
                    });
                },
                error: function (err) {
                    console.log(err)
                }
            });


            // require(['../html/consumption/modals/downloadData_modal_content_'+data.uid+'.hbs'],
            //     function   (content) {
            //         self.$downloadDatamodalContent.html(content);
            //         if(data.uid=='000023BGD201001'){
            //             self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[LANG.toLowerCase()]));
            //             $(s.FILE_TYPES_DROPDOWN).select2({
            //                 minimumResultsForSearch: Infinity
            //             });
            //         }
            //         else{
            //
            //             var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();
            //
            //             _gaTracker('send', 'event', 'GIFT Link Redirect',
            //                 data.uid, /* datasetID:datasetType */
            //                 self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
            //
            //             //Mettere il link
            //             self.$downloadSelectorType.html(fileTypesSourceLink(labels[LANG.toLowerCase()]));
            //         }
            //         //this.$downloadDatamodalContent.html(modalContent(labels[C.lang.toLowerCase()])).find('#000023BGD201001');
            //         self.$downloadDatamodal.modal('show');
            //
            //         $("#downloadDataModalButton").click(function() {
            //
            //             var data = $(s.FILE_TYPES_DROPDOWN).select2('data');
            //             var dataSetTypes = '';
            //             for(var i=0;i<data.length;i++)
            //                 dataSetTypes += ','+data[i].id;
            //             dataSetTypes = dataSetTypes.substring(1);
            //             var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();
            //
            //             if(data.uid){
            //
            //                 _gaTracker('send', 'event', 'GIFT Download',
            //                     data.uid + ':' + dataSetTypes, /* datasetID:datasetType */
            //                     self.infoUser.email+ ', ' +self.infoUser.institution + ', ' + justification);
            //                 //var url = SC.download.serviceProvider+payload.model.uid+".zip";
            //                 var url = ConsC.download.serviceProvider+data.uid+".zip";
            //                 var link = document.createElement('a');
            //                 link.href = url;
            //                 link.click();
            //                 link.remove();
            //             }
            //         });
            //     });
        }
    };

    Map.prototype._dispose = function () {

        if (this.bridge && $.isFunction(this.bridge.dispose)) {
            this.bridge.dispose();
        }

        if(this.$el)
            this.$el.children().remove();
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

        require("../../node_modules/select2/dist/css/select2.css");
        //host override
        require('../css/gift.css');
    };

    return new Map();
});