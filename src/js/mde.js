define([
    "jquery",
    "loglevel",
    "fenix-ui-data-management",
    "../config/config",
    "../config/mde/catalog",
    // "../config/mde/metadata",
    "../config/mde/newMetadata"
    // "formiojs"
// ], function ($, log, DataManagement, C, CataConf, MDConf, Formio) {
], function ($, log, DataManagement, C, CataConf, MDConf) {

    "use strict";

    var s = {
        DATA_MNG: "#mde"
    };

    function MDE() {

        console.clear();
        // log.setLevel("trace");
        log.setLevel("silent");
        this._importThirdPartyCss();
        this._renderMDE();
    }

    MDE.prototype._renderMDE = function () {

        var userProfile = Window.userProfile;
        console.log(userProfile)
        if(userProfile){
            var gift_company = userProfile.company;

            userProfile.role = userProfile.role.toUpperCase();
            userProfile.username = userProfile.username.toLowerCase();

            if ("ADMIN" === userProfile.role) {
                gift_company = gift_company || 'FAO';
                userProfile.email = userProfile.username.indexOf('@') >= 0 ? userProfile.username : userProfile.username.split('\/')[1] + '@dispostable.com';
            }
            var extraBridgeUser = {
                user : {
                    "name": userProfile.firstname ? userProfile.firstname + " " + userProfile.lastname : userProfile.username,
                    "username": userProfile.username,
                    "role": userProfile.role,
                    "institution": gift_company,
                    "email": userProfile.email || userProfile.username
                }
            }
            console.log(extraBridgeUser)
            console.log("Render Metadata editor here");
            $.extend(true, CataConf, {extraBridge: extraBridgeUser});

            var gift_environment = 'gift';

            var dataMng = new DataManagement({
                environment: C.environment,
                el: s.DATA_MNG,
                cache: C.cache,
                lang: C.lang,
                metadataEditor: MDConf,
                catalog: CataConf,
                resourceManager: 'gift',

                //GIFT
                menuConfig: {
                    "items": [
                        {
                            "attrs": {
                                "id": "landing"
                            },
                            "label": {
                                "EN": "Home",
                                "FR": "Gestion des Données"
                            }
                        },
                        {
                            "attrs": {
                                "id": "metadata"
                            },
                            "label": {
                                "EN": "Metadata",
                                "FR": "Métadonnées"
                            }
                        },
                        {
                            "attrs": {
                                "id": "delete"
                            },
                            "label": {
                                "EN": "Delete",
                                "FR": "Supprimer"
                            }
                        },
                        {
                            "attrs": {
                                "id": "close"
                            },
                            "label": {
                                "EN": "Close",
                                "FR": "Terminer"
                            }
                        }
                    ],
                    "languages": [],
                    "active": [
                        "landing",
                        "search"
                    ]
                },
                metadataConverters: {
                    "array<resource>" : function( key, value, label, result, selectors, id, path) {

                        console.log('documents', value);

                        value = value.map(function (o) {

                            var codes = o['ResourceType'];
                            if (!Array.isArray(codes)) codes = [codes];
                            var labels = label['ResourceType'];
                            var ResourceType = null;

                            if (codes && codes.length > 0) {
                                ResourceType = {
                                    idCodeList : "GIFT_ResourceType",
                                    codes: []
                                };

                                $.each(codes, function(key,code){
                                    ResourceType.codes.push({
                                        "code" : code,
                                        "label" : {
                                            "EN" : labels[code]
                                        }
                                    });
                                });


                            }
                            var ResourceDetails = {};
                            ResourceDetails["EN"] = o.ResourceDetails;

                            var ResourceCite = {};
                            ResourceCite["EN"] = o.ResourceCite;

                            var ResourceLink = {};
                            ResourceLink["EN"] = o.ResourceLink;

                            return {
                                ResourceType : ResourceType,
                                ResourceDetails: ResourceDetails,
                                ResourceCite: ResourceCite,
                                ResourceLink: ResourceLink
                            }
                        });

                        this._assign(result, key, value ? value : undefined);
                    },
                    "array<label>" : function( key, value, label, result, selectors, id, path){
                        value = value.map(function (o) {
                            var ogg = {};
                            $.each(o, function(key, value){
                                var list = {};
                                list["EN"] = value;
                                ogg[key] = list;
                            });
                            return ogg;
                        });
                        this._assign(result, key, value ? value : undefined);
                    },
                    "array<yesno>" : function( key, value, label, result, selectors, id, path){
                        var c = {};
                        var empty = true;

                        $.each(value, function(key, v){
                            if (v[0]) {
                                empty = false;
                                c[key] = {
                                    idCodeList: "YesNo",
                                    codes: [{
                                        code: v[0],
                                        label: {"EN": label[key][v[0]]}
                                    }]
                                };
                            }
                        });
                        if (!empty) this._assign(result, key, c);
                    },
                    "array<number>" : function( key, value, label, result, selectors, id, path){
                        var ogg = {};
                        var empty = true;
                        $.each(value, function (ch, o) {
                            empty = false;
                            ogg[ch] = Number(o[0]);
                        });
                        this._assign(result, key, !empty ? ogg : undefined);
                    },
                    "grsurveyed" : function( key, value, label, result, selectors, id, path){
                        value = value.map(function (o) {
                            var ogg = {};

                            var list = {};
                            list["EN"] = o;
                            ogg["PopulationGroupsList"] = list;
                            return ogg;
                        });
                        console.log(value);

                        this._assign(result, key, value);
                    },
                    "purposegr" : function( key, value, label, result, selectors, id, path){
                        value = value.map(function (o) {
                            var ogg = {};

                            var list = {};
                            list["EN"] = o;
                            ogg["PurposedlyGroupsList"] = list;
                            return ogg;
                        });
                        console.log(value);

                        this._assign(result, key, value);
                    },
                    "macrondet" : function( key, value, label, result, selectors, id, path){
                        value = value.map(function (o) {
                            var ogg = {};

                            var list = {};
                            list["EN"] = o;
                            ogg["MacroDietaryComponentsDetailsList"] = list;
                            return ogg;
                        });
                        console.log(value);

                        this._assign(result, key, value);
                    },
                    "microndet" : function( key, value, label, result, selectors, id, path){
                        value = value.map(function (o) {
                            var ogg = {};

                            var list = {};
                            list["EN"] = o;
                            ogg["MicroDietaryComponentsDetailsList"] = list;
                            return ogg;
                        });
                        console.log(value);

                        this._assign(result, key, value);
                    }
                },
                routes: {
                    '(/)': 'onLanding',
                    '(/)landing(/)': 'onLanding',

                    '(/)home(/)': 'onMetadata',
                    '(/)add(/)': 'onAdd',

                    '(/)metadata(/)': 'onMetadata',

                    '(/)close(/)' : 'onClose',
                    '(/)delete(/)': 'onDeleteMetadata',
                    '(/)search(/)': 'onSearch',
                    '(/)not-found(/)': 'onNotFound',

                    '(/)denied(/)': 'onDenied',

                    // fallback route
                    '(/)*path': 'onDefaultRoute'
                },
                disabledSections: ['btnDSD','btnData'],

                config: {
                    labelMeta: "Save",
                    contextSystem :"gift",
                    datasources : ["D3S"],
                    resourceRepresentationType: "dataset"
                },
                dmEnvironment: gift_environment,
                catalogEnvironment: gift_environment,

                extraBridge :extraBridgeUser
            });
        }

    };

    MDE.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");
        require("../../node_modules/fenix-ui-metadata-editor/dist/fenix-ui-metadata-editor.min.css");
        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");
        require("../../node_modules/fenix-ui-DataEditor/dist/fenix-ui-DataEditor.min.css");
        require("../../node_modules/fenix-ui-DSDEditor/dist/fenix-ui-DSDEditor.min.css");
        require("../../node_modules/fenix-ui-data-management/dist/fenix-ui-data-management.min.css");
        require("../../node_modules/toastr/build/toastr.min.css");
        //host override
        require('../css/gift.css');

    };

    return new MDE();
});