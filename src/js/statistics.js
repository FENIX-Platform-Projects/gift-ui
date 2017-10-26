define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/statistics/config",
    "../config/nodemodules/fenix-ui-catalog/statistics-template.hbs",
    "../html/statistics/template.hbs",
    "../html/statistics/modals/fileTypesDropdown.hbs",
    "../html/statistics/modals/fileTypesSourceLink.hbs",
    "../html/statistics/modals/infoForm.hbs",
    //"../html/statistics/modals/statistics_downloadData_modal_content.hbs",
    "../nls/labels",
    "fenix-ui-catalog",
    "fenix-ui-bridge",
    "fenix-ui-metadata-viewer",
    "fenix-ui-reports",
    "handlebars",
    "select2",
// ], function ($, log, _, C, SC, CatalogTemplate, template, fileTypeDropdownTemplate, fileTypesSourceLink, labels, Catalog, Bridge, MetadataViewer, Reports, Handlebars, select2, reCAPTCHA) {
    "recaptcha2"
], function ($, log, _, C, SC, CatalogTemplate, template, fileTypeDropdownTemplate, fileTypesSourceLink, infoForm, labels, Catalog, Bridge, MetadataViewer, Reports, Handlebars, select2, reCAPTCHA) {

    "use strict";

    var s = {
        EL: "#statistics",
        MODAL_EL : "",
        CATALOG_HOLDER: "#catalog",
        METADATA_VIEWER_HOLDER: "#viewer",
        METADATA_CONTENT: "#statistics_metadata_content",
        METADATA_MODAL: "#statistics_metadata_modal",
        DOWNLOADDATA_MODAL: "#downloadData_modal",
        INFO_FORM_MODAL: "#infoForm_modal",
        DOWNLOADDATA_MODAL_CONTENT: "#downloadData_modal_content_dynamicPart",
        INFO_FORM_MODAL_CONTENT_BODY: "#infoForm_modal_contentBody",
        DOWNLOAD_SELECTOR_TYPE: "#downloadSelectorType",
        FILE_TYPES_DROPDOWN: "#fileTypesDropdown",
        DOWNLOAD_DATA_JUSTIFICATION_FORM: '#downloadDataJustificationForm',
        FILTER_TYPES_LINK_TAG: "#fileTypesLinkTag",
        DOWNLOAD_DATA_MODAL_BUTTON: "#downloadDataModalButton",
        INFO_FORM_SUBMIT: "#infoFormSubmit"
    };

    function Statistics() {

        // if (!require.cache[require.resolveWeak("ckeditor")]) {
        //     //window.CKEDITOR_BASEPATH = '/ckeditor/';
        //     //console.log(window.CKEDITOR_BASEPATH)
        //     //require('ckeditor');
        //     console.log(window.CKEDITOR_BASEPATH)
        //     //
        //     //var CKEDITOR_BASEPATH = '../../node_modules/ckeditor/';
        //     require(["ckeditor"], function() {
        //         //window.CKEDITOR_BASEPATH = '../../node_modules/ckeditor/';
        //         console.log(window.CKEDITOR_BASEPATH)
        //         console.log('end')
        //     })
        // }

        console.clear();

        log.setLevel("silent");

        this._dispose();

        this._importThirdPartyCss();

        this._validateConfig();

        this._attach();

        this._initVariables();

        this._unbindEventListeners();

        this._renderCatalog();

        this._bindEventListeners();

    }


    Statistics.prototype._validateConfig = function () {
        if (!C.lang) {
            alert("Please specify a valid LANGUAGE in config/config.js");
        }

        if (!SC.catalog) {
            alert("Please specify a valid CATALOG configuration in config/statistics/config.js");
        }

        if (!C.populationFilter && !C.othersFilter) {
            alert("Please specify a valid FILTER configuration in config/config.js");
        }

        if ($(s.EL).length === 0) {
            alert("Please specify a valid container [" + s.EL + "]");
        }
    };

    Statistics.prototype._dispose = function () {
        if (this.catalog && $.isFunction(this.catalog.dispose)) {
            this.catalog.dispose();
        }

        if (this.bridge && $.isFunction(this.bridge.dispose)) {
            this.bridge.dispose();
        }
    };

    Statistics.prototype._initVariables = function () {
        this.$el = $(s.EL);
        this.$meta = this.$el.find(s.METADATA_CONTENT);
        this.$metamodal = this.$el.find(s.METADATA_MODAL);
        this.$downloadDatamodal = this.$el.find(s.DOWNLOADDATA_MODAL);
        this.$downloadDatamodalContent = this.$el.find(s.DOWNLOADDATA_MODAL_CONTENT);
        this.$downloadSelectorType = this.$el.find(s.DOWNLOAD_SELECTOR_TYPE);
        this.$infoFormModal = this.$el.find(s.INFO_FORM_MODAL);
        this.$infoFormContentBody = this.$el.find(s.INFO_FORM_MODAL_CONTENT_BODY);
        // this.$downloadSelectorType.html('<div>prova!!!!!!!!!!</div>')
        //this.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[C.lang.toLowerCase()]));

        this.catalogTemplate = CatalogTemplate(labels[C.lang.toLowerCase()]);

        this.lang = C.lang.toLowerCase();
        this.environment = C.environment;
        this.cache = C.cache;

        this.bridge = new Bridge({
            environment: this.environment,
            cache: this.cache
        });

        this.reports = new Reports({
            cache: this.cache,
            environment: this.environment,
        });

    };

    Statistics.prototype._attach = function () {
        $(s.EL).html(template(labels[C.lang.toLowerCase()]));

    };

    Statistics.prototype._renderCatalog = function () {

        // Filter
        var filter = $.extend(true, C.populationFilter, C.othersFilter);
        var selectors = this._populateSelectorLabels(filter.selectors);

        SC.catalog.pluginRegistry = selectors;
        SC.catalog.selectorsDependencies = filter.dependencies;
        SC.catalog.template = Handlebars.compile(this.catalogTemplate);

        var model = $.extend(true, {}, SC.catalog, {
            el: this.$el.find(s.CATALOG_HOLDER),
            cache: this.cache,
            environment: this.environment,
            hideCloseButton: true
        });

        this.catalog = new Catalog(model);
    };


    Statistics.prototype._populateSelectorLabels = function (selectors) {
        _.each(selectors, _.bind(function (obj, key) {

            if (!obj.template) {
                obj.template = {};
            }
            //Add title labels
            obj.template.title = labels[this.lang][ "selector_" + key];

            // Add message labels
            if(obj.constraints && obj.constraints.presence){
                obj.constraints.presence.message = labels[this.lang][ "selector_" + key+"_message"];
            }

        }, this));

        return selectors;

    };

    Statistics.prototype._unbindEventListeners = function () {
        if(this.catalog){
            this.catalog.off("download", _.bind(this._onCatalogDownload, this));
            this.catalog.off("metadata", _.bind(this._onCatalogMetadata, this));
        }
    };


    Statistics.prototype._bindEventListeners = function () {
        this.catalog.on("download", _.bind(this._onCatalogDownload, this));
        this.catalog.on("metadata", _.bind(this._onCatalogMetadata, this));
    };

    Statistics.prototype._onCatalogDownload = function (payload) {

        if (!payload.model) {
            alert("Invalid dataset");
            return;
        }

        this.bridge.getMetadata({uid: payload.model.uid, params: {"full":true}}).then(_.bind(this._getMetadataInfo, this, payload));
        //this.bridge.getMetadata({uid: payload.model.uid, params: {"full":true}}).then(_.bind(this._openQuillEditor, this));

        // if(payload.model.uid){
        //     var url = SC.download.serviceProvider+payload.model.uid+".zip";
        //     var link = document.createElement('a');
        //     link.href = url;
        //     link.click();
        //     link.remove();
        // }
    };

    /*Prvious version*/
    Statistics.prototype._getMetadataInfoPreviousVersion = function (data, payload) {

        var self = this;
        if((data!=null)&&(typeof data!='undefined')&&(data.model!=null)&&(typeof data.model!="undefined")&&(data.model.uid!=null)&&(typeof data.model.uid!="undefined"))
        {
            $.ajax({
                type: 'GET',
                dataType: 'text',
                //url:'http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer?uid=000023BGD201001&lang=en',
                url:'http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer?uid='+data.model.uid+'&lang=en',
                contentType: "application/json; charset=utf-8",
                success: function(content) {

                    self.$downloadDatamodalContent.html(content);
                    if(data.model.uid=='000023BGD201001'){
                        self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[C.lang.toLowerCase()]));
                        $(s.FILE_TYPES_DROPDOWN).select2({
                            minimumResultsForSearch: Infinity
                        });
                    }
                    else{

                        var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();
                        //Add the link
                        self.$downloadSelectorType.html(fileTypesSourceLink(labels[C.lang.toLowerCase()]));
                        $(s.FILTER_TYPES_LINK_TAG).on('click', function() {
                            try{
                                // _gaTracker('send', 'event', 'GIFT Link Redirect',
                                //     data.model.uid, /* datasetID:datasetType */
                                //     'user' + (new Date().getTime()) % 5 + '@email.com, ' + justification);
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

                    // var onSubmit = function (token) {
                    //     alert('onsubmit')
                    //     console.log('captcha succeeded!');
                    //
                    //     $.ajax({
                    //         type: "POST",
                    //         url: "http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer/notify",
                    //         data: JSON.stringify(
                    //             {
                    //                 "captchaResponse": grecaptcha.getResponse(),
                    //                 "name": "Salvatore",
                    //                 "surveyTitle": "A Beautiful Title",
                    //                 "email": "spiderman@fao.org",
                    //                 "uid": "000253UGA201001",
                    //                 "lang": "en"
                    //             }
                    //         ),
                    //         dataType: "json",
                    //         contentType: "application/json; charset=UTF-8"
                    //     }).done(function () {
                    //         console.log("OK");
                    //     }).fail(function () {
                    //         console.log("VERIFY FAILED");
                    //     });
                    // };
                    //
                    // self.onSubmit = onSubmit;
                    // var onloadCallback = function () {
                    //     grecaptcha.render('downloadDataModalButton', {
                    //         'sitekey': '6LcWShkUAAAAAM-SqHBq4qX7Mj3CdA7Wn7noPbLC',
                    //         'callback': self.onSubmit
                    //     });
                    // };

                    $(s.DOWNLOAD_DATA_MODAL_BUTTON).click(function() {

                        var fileTypes = $(s.FILE_TYPES_DROPDOWN).select2('data');
                        var dataSetTypes = '';
                        for(var i=0;i<fileTypes.length;i++)
                            dataSetTypes += ','+fileTypes[i].id;
                        dataSetTypes = dataSetTypes.substring(1);
                        var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();

                        // var url = SC.download.serviceProvider+payload.uid+".zip";
                        // console.log(url)
                        // var link = document.createElement('a');
                        // link.href = url;
                        // link.click();
                        // link.remove();
                        if(payload.uid){
                            // _gaTracker('send', 'event', 'GIFT Download',
                            //     payload.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                            //     'user' + (new Date().getTime()) % 5 + '@email.com, '+justification);

                            //var url = SC.download.serviceProvider+payload.model.uid+".zip";

                            try{
                                _gaTracker('send', 'event', 'GIFT Download',
                                    payload.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                                    'user' + (new Date().getTime()) % 5 + '@email.com, ' + justification);
                            }
                            catch (ex){
                                console.log('Google Analytics Exception')
                            }
                            finally {
                                console.log('Google Analytics Exception')
                                var url = SC.download.serviceProvider+payload.uid+".zip";
                                console.log(url)
                                var link = document.createElement('a');
                                link.href = url;
                                link.click();
                                link.remove();
                            }
                        }
                    });
                },
                error: function (err) {
                    console.log(err)
                }
            });
            // self.bridge.getResource({uid: data.model.uid, params: {"full":true}});
            // require(['../html/statistics/modals/downloadData_modal_content_'+data.model.uid+'.hbs'],
            //     function   (content) {
            //
            //         self.$downloadDatamodalContent.html(content);
            //         if(data.model.uid=='000023BGD201001'){
            //             self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[C.lang.toLowerCase()]));
            //             // $(s.FILE_TYPES_DROPDOWN).selectize({
            //             //     create: true,
            //             //     sortField: {field: 'text'},
            //             //     dropdownDirection: 'up'
            //             // });
            //             $(s.FILE_TYPES_DROPDOWN).select2({
            //                 minimumResultsForSearch: Infinity
            //             });
            //         }
            //         else{
            //             //Mettere il link
            //             self.$downloadSelectorType.html(fileTypesSourceLink(labels[C.lang.toLowerCase()]));
            //         }
            //         //this.$downloadDatamodalContent.html(modalContent(labels[C.lang.toLowerCase()])).find('#000023BGD201001');
            //         self.$downloadDatamodal.modal('show');
            //
            //         $("#downloadDataModalButton").click(function() {
            //
            //             if(payload.uid){
            //                 //var url = SC.download.serviceProvider+payload.model.uid+".zip";
            //                 var url = SC.download.serviceProvider+payload.uid+".zip";
            //                 var link = document.createElement('a');
            //                 link.href = url;
            //                 link.click();
            //                 link.remove();
            //             }
            //         });
            //     });
        }
    };

    Statistics.prototype._rederDisclainer = function (data, payload) {
        var self = this;
        $.ajax({
            type: 'GET',
            dataType: 'text',
            //url:'http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer?uid=000023BGD201001&lang=en',
            url:'http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer?uid='+data.model.uid+'&lang=en',
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
                //             //     'user' + (new Date().getTime()) % 5 + '@email.com, ' + justification);
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
                    var dataSetTypes = '';
                    // for(var i=0;i<fileTypes.length;i++)
                    //     dataSetTypes += ','+fileTypes[i].id;
                    // dataSetTypes = dataSetTypes.substring(1);
                    var justification = $(s.DOWNLOAD_DATA_JUSTIFICATION_FORM).val();

                    // var url = SC.download.serviceProvider+payload.uid+".zip";
                    // console.log(url)
                    // var link = document.createElement('a');
                    // link.href = url;
                    // link.click();
                    // link.remove();


                    //Recaptcha call
                    $.ajax({
                        type: "POST",
                        url: "http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer/notify",
                        data: JSON.stringify(
                            {
                                "captchaResponse": self.infoUser.recaptchaResponse,
                                "name": self.infoUser.name,
                                "surveyTitle": payload.title? payload.title[C.lang.toUpperCase()]: '',
                                "email": "salvatore.cascone@fao.org",
                                "uid": payload.uid? payload.uid: '',
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

                    if(payload.uid){
                        // _gaTracker('send', 'event', 'GIFT Download',
                        //     payload.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                        //     'user' + (new Date().getTime()) % 5 + '@email.com, '+justification);

                        //var url = SC.download.serviceProvider+payload.model.uid+".zip";

                        try{
                            _gaTracker('send', 'event', 'GIFT Download',
                                payload.uid + ':' + dataSetTypes, /* datasetID:datasetType */
                                'user' + (new Date().getTime()) % 5 + '@email.com, ' + justification);
                        }
                        catch (ex){
                            console.log('Google Analytics Exception')
                        }
                        finally {
                            console.log('Google Analytics Finally')
                            var url = SC.download.serviceProvider+payload.uid+".zip";
                            console.log(url)
                            var link = document.createElement('a');
                            link.href = url;
                            link.click();
                            link.remove();
                        }
                    }
                });
            },
            error: function (err) {
                console.log(err)
            }
        });
    };

    Statistics.prototype._infoFormCreation = function (data, payload) {
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
                self._rederDisclainer(data, payload);
                self.$infoFormModal.modal('hide');
            }
            else {
                $('#infoFormError').show();
            }
        });

        self.$infoFormModal.modal('show');

    }

    Statistics.prototype._getMetadataInfo = function (data, payload) {

    var self = this;
    if((data!=null)&&(typeof data!='undefined')&&(data.model!=null)&&(typeof data.model!="undefined")&&(data.model.uid!=null)&&(typeof data.model.uid!="undefined"))
    {
        self._infoFormCreation(data, payload);

        // self.bridge.getResource({uid: data.model.uid, params: {"full":true}});
        // require(['../html/statistics/modals/downloadData_modal_content_'+data.model.uid+'.hbs'],
        //     function   (content) {
        //
        //         self.$downloadDatamodalContent.html(content);
        //         if(data.model.uid=='000023BGD201001'){
        //             self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[C.lang.toLowerCase()]));
        //             // $(s.FILE_TYPES_DROPDOWN).selectize({
        //             //     create: true,
        //             //     sortField: {field: 'text'},
        //             //     dropdownDirection: 'up'
        //             // });
        //             $(s.FILE_TYPES_DROPDOWN).select2({
        //                 minimumResultsForSearch: Infinity
        //             });
        //         }
        //         else{
        //             //Mettere il link
        //             self.$downloadSelectorType.html(fileTypesSourceLink(labels[C.lang.toLowerCase()]));
        //         }
        //         //this.$downloadDatamodalContent.html(modalContent(labels[C.lang.toLowerCase()])).find('#000023BGD201001');
        //         self.$downloadDatamodal.modal('show');
        //
        //         $("#downloadDataModalButton").click(function() {
        //
        //             if(payload.uid){
        //                 //var url = SC.download.serviceProvider+payload.model.uid+".zip";
        //                 var url = SC.download.serviceProvider+payload.uid+".zip";
        //                 var link = document.createElement('a');
        //                 link.href = url;
        //                 link.click();
        //                 link.remove();
        //             }
        //         });
        //     });
    }
};

    Statistics.prototype._onCatalogMetadata = function (payload) {

        var self = this;

        if (!payload.model) {
            alert("Invalid dataset");
            return;
        }

        this.bridge.getMetadata({uid: payload.model.uid, params: {"full":true}}).then(_.bind(this._openMetadataViewer, this));

    };

    Statistics.prototype._openMetadataViewer = function (data) {

        if (!data) {
            alert("No Metadata");
            return;
        }

        this.$metamodal.modal('show');

        var metadataViewer = new MetadataViewer({
            model: data,
            el: this.$meta,
            bridge: C.mdsdService,
            specialFields : C.mdsdSpecialFields,
            lang: this.lang,
            environment: this.environment,
            hideExportButton: false,
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
                        lang: this.lang.toUpperCase(),
                        "template": "fao",
                        "fileName": filename + ".pdf"
                    }
                }
            };

            log.info("Configure FENIX export: table");

            log.info(payload);

            this.reports.export({
                format: "table",
                config: payload
            });

        }, this));

        $(s.METADATA_MODAL).on('hidden.bs.modal', function (e) {
            metadataViewer.dispose();
        })
    };

    // CSS
    Statistics.prototype._importThirdPartyCss = function () {

        //Bootstrap
        //require('bootstrap/dist/css/bootstrap.css');

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");

        require("../../node_modules/select2/dist/css/select2.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");

        //range selector
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");

        //meta viewer requirements
        require("jquery-treegrid-webpack/css/jquery.treegrid.css");

        // // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // //Catalog
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");

        //GIFT CSS
        require("../css/gift.css");

    };

    return new Statistics();
});