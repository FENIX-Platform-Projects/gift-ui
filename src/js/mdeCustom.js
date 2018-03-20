define([
    "jquery",
    "loglevel",
    "fenix-ui-data-management",
    "../config/config",
    "../config/mde/catalog",
    "../config/mde/metadata",
    "../html/mde/template.hbs",
    "../nls/labels",
    "moment",
    "formiojs",
    "formiojs/utils"
    // "formiojs/form"
    //"formio-service"
// ], function ($, log, DataManagement, C, CataConf, MDConf, Formio, FormioService) {
], function ($, log, DataManagement, C, CataConf, MDConf, template, labels, Moment, Formio, FormioUtils) {

    "use strict";

    var s = {
        DATA_MNG: "#mde",
        form_ids : [
            "form0","form1","form1_0",
            "form1_1","form1_2","form1_3","form1_4","form1_5","form1_6",
            "form2","form2_0","form2_1","form2_2",
            "form3",
            "form4_0","form4_1",
            "form5_0","form5_1","form5_2","form5_3","form5_4",
            "form6_0","form6_1","form6_2","form6_3","form6_4","form6_5","form6_6",
            "form7_0","form7_1","form7_2",
            "form8_0","form8_1"
        ],
        formError_ids : [],
        form_list : {},
        form_data : [],
        default_form : 'form0',
        current_form : '',
        metadataEditorSave_button : '#metadataEditorSave',
        metadataEditorCancel_button : '#metadataEditorCancel',
        metadataEditorClose_button : '#metadataEditorClose',
        metadataEditorSave_error :'#save_error',
        metadataEditorSave_errorText :'',
        sidebarCollapse : '#sidebarCollapse',
        mdesidebar : '#sidebar'
    };

    function MDE() {

        console.clear();
        log.setLevel("trace");

        this._importThirdPartyCss();

        this._attach();
        this._init();
    }

    MDE.prototype._attach = function () {
        $(s.DATA_MNG).html(template(labels[C.lang.toLowerCase()]));
        console.log(document.getElementsByName('Save'));
    }

    MDE.prototype._init = function () {
        s.form_list = {};
        s.form_data = [];
        s.formError_ids = [];
        s.metadataEditorSave_errorText = labels[C.lang.toLowerCase()]['metadataSaveError'];
        this._renderFormioMDE(s.default_form);

        var formsDataConfig = MDConf.forms;
        for(var i=0; i<s.form_ids.length; i++){
            s.form_data[s.form_ids[i]] = formsDataConfig[s.form_ids[i]];
            this._unbindEventListener(s.form_ids[i]);
            this._bindEventListener(s.form_ids[i]);
        }
        $('#'+s.default_form).show();
        $(s.metadataEditorSave_error).hide();

        this._buttonsEventListener();
    }

    MDE.prototype._buttonsEventListener = function (formid) {

        var self = this;
        $(s.sidebarCollapse).on('click', function () {
            $(s.mdesidebar).toggleClass('active');
        });
        $(s.metadataEditorSave_button).on('click', function (element) {
            s.form_data[s.current_form] = s.form_list[s.current_form].data;
            console.log(s.form_list[s.current_form].submission)
            var valid = true;
            for(var i=0; i<s.form_ids.length; i++){
                //console.log(s.form_list[s.form_ids[i]].submission)
                console.log(s.form_ids[i], s.form_data[s.form_ids[i]])
                if(!self._validation(s.form_ids[i], s.form_data[s.form_ids[i]]))
                {
                    var idFormError = s.form_ids[i] + '_menu_error';
                    s.formError_ids.push(labels[C.lang.toLowerCase()]['mdeMenu_'+s.form_ids[i]]);
                    $('#'+idFormError).removeClass('formMenuErrorHide');
                    $('#'+idFormError).addClass('formMenuErrorShow');
                    valid=false;
                }
            }

            if(valid){
               //Save
            }
            else{
                $(s.metadataEditorSave_error).html(s.metadataEditorSave_errorText +'\n'+ s.formError_ids.join());
                $(s.metadataEditorSave_error).show();
            }
        });
    }

    MDE.prototype._validation = function (formid, formData) {
        var valid = false;

        return valid;
    }

    MDE.prototype._formDataBackup = function (formid) {
        if((formid!=null)&&(typeof formid!='undefined')&&(formid.length>0)){
            if((s.form_data[formid]!=null)&&(typeof s.form_data[formid]!='undefined')){
                console.log(s)
                console.log(s.form_list)
                console.log(s.form_list[formid])
                s.form_data[formid] = s.form_list[formid].data;
            }
            else {
                s.form_data[formid] = {};
                s.form_data[formid] = s.form_list[formid].data;
            }
        }
    }

    MDE.prototype._changeForm = function (formid) {

        $('#'+s.current_form).hide();
        this._renderFormioMDE(formid);
        $('#'+s.current_form).show();
    }

    MDE.prototype._unbindEventListener = function (formid) {

        $("#"+formid + "_menu").off("click");
    }

    MDE.prototype._bindEventListener = function (formid) {
        var self = this;
        $("#"+formid + "_menu").on('click', function (element) {
                console.log(element.target.id)
               // self._formDataBackup(s.current_form);
                var underscore = element.target.id.indexOf("_");
                var newForm = element.target.id.substring(0, underscore);
                var appNewForm = newForm;
                var secondUnderscore = element.target.id.substring(underscore+1).indexOf("_");
                if(secondUnderscore>=0)
                {
                    newForm = element.target.id.substring(0, underscore + secondUnderscore + 1);
                }
                self._changeForm(newForm);
            });
    }

    MDE.prototype._renderFormioMDE = function (formId) {

        // var formioService = FormioService.Form;
        //
        // formioService.authenticate('formioUser@gmail.com', 'formioUserPassword').then(function() {
        //
        //     alert('ok!!!')
        //     // Create a new form instance.
        //     // var form = new formioService('https://myapp.form.io/user');
        //     //
        //     // // Iterate through all the submissions.
        //     // form.eachSubmission(function(submission) {
        //     //
        //     //     // Console log the submissions.
        //     //     console.log(submission);
        //     // });
        // });


        //alert("after authenticate")
        s.current_form = formId;
        // console.log(formId);
        // var formioId = formId.replace("_", "/");
        console.log(formId);
         //var singleForm = Formio.createForm(document.getElementById(formId), 'https://hogzcofpqgcxerv.form.io/'+formId.replace("_", "/")).then(function(form) {
         // var singleForm = Formio.createForm(document.getElementById(formId), 'https://hogzcofpqgcxerv.form.io/innertestform').then(function(form) {
         //     var singleForm = Formio.createForm(document.getElementById(formId), 'https://hogzcofpqgcxerv.form.io/wiz').then(function(form) {
        // var singleForm = Formio.createForm(document.getElementById(formId), 'https://oxggjvcxzbsppop.form.io/giftmetadataen').then(function(form) {
        // var singleForm = Formio.createForm(document.getElementById(formId), 'https://oxggjvcxzbsppop.form.io/giftmetadataformen').then(function(form) {
        //TO USE!!!
             var singleForm = Formio.createForm(document.getElementById(formId), 'https://oxggjvcxzbsppop.form.io/giftmetadata2').then(function(form) {
        // var singleForm = Formio.createForm(document.getElementById(formId), 'https://oxggjvcxzbsppop.form.io/giftformtest').then(function(form) {
        //     var singleForm = Formio.createForm(document.getElementById(formId), 'https://oxggjvcxzbsppop.form.io/pppppform').then(function(form) {
//VALIDATION: https://github.com/formio/formio.js/wiki/Form-Renderer
            // if((s.form_data[formId]!=null)&&(typeof s.form_data[formId]!='undefined')){
            //     form.submission = {
            //         data: s.form_data[formId]
            //     };
            // }
            console.log(s.current_form);
            console.log(form)
            s.form_list[s.current_form] = form;
//formId
            // Defaults are provided as follows.
            form.submission = {

                data: {
                    formid: s.current_form,
                    //creationDate: moment().subtract(8, 'days')

                    //Default Value Start
                    creationDate: Moment().format('LLLL'),//http://momentjs.com/docs/
                    metadataLastUpdate: Moment().format('LLLL'),
                    statusOfConfidentiality: "1",
                    languageofthesubmitteddataset: "english",
                    surveyAdministrationMethod: "1",
                    typologyofthegeographicalareacoveredbythesurvey: "3",
                    assessmentOfUnderOverReportingUnderReportingidentifiedatgrouplevel : "no",
                    assessmentOfUnderOverReportingOverReportingidentifiedatgrouplevel : "no",
                    totalfoodcoverage: "yes"


                    //Default Value End
                    // creationDate: "23-08-2010"
                    // statusOfConfidentiality:  {
                    //     "level" : 1,
                    //     "leaf" : true,
                    //     "title" : {
                    //         "EN" : "Existing data potentially suitable to be inserted in FAO/WHO GIFT"
                    //     },
                    //     "code" : "3",
                    //     "rid" : "64_158242"
                    // },
                    // statusOfConfidentiality: "Existing data potentially suitable to be inserted in FAO/WHO GIFT"
                    // statusOfConfidentiality:  {
                    //     "title" : {
                    //         "EN" : "Existing data potentially suitable to be inserted in FAO/WHO GIFT"
                    //     }
                    // }
                   // submit: 'Save'
                }

                // data: {
                //     formid: 'form1',
                //     form0:{
                //         name: 'Joe Wins',
                //         password: '35'
                //     }
                //
                //    //  name: 'Joe Wins',
                //    //  ageField: '35'
                // }
            };

            // Register for the submit event to get the completed submission.
            form.on('submit', function(submission) {
                console.log('Submission was made!', submission);
                alert('submit')
            });

            // Everytime the form changes, this will fire.
            form.on('change', function(changed) {
                console.log('Form was changed', changed);
            });
            form.on('error', function(errors) {
                console.log(errors)
                console.log('We have errors!');
            });
        });

        return singleForm;
    }

    MDE.prototype._renderMDE = function () {

       console.log("Render Metadata editor here");

        var dataMng = new DataManagement({
            environment: C.environment,
            el: s.DATA_MNG,
            cache: C.cache,
            lang: C.lang,
            metadataEditor: MDConf,
            catalog: CataConf,

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
            }
        });

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