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
    //"../html/statistics/modals/statistics_downloadData_modal_content.hbs",
    "../nls/labels",
    "fenix-ui-catalog",
    "fenix-ui-bridge",
    "fenix-ui-metadata-viewer",
    "fenix-ui-reports",
    "handlebars",
    "select2"
], function ($, log, _, C, SC, CatalogTemplate, template, fileTypeDropdownTemplate, fileTypesSourceLink, labels, Catalog, Bridge, MetadataViewer, Reports, Handlebars, select2) {

    "use strict";

    var s = {
        EL: "#statistics",
        MODAL_EL : "",
        CATALOG_HOLDER: "#catalog",
        METADATA_VIEWER_HOLDER: "#viewer",
        METADATA_CONTENT: "#statistics_metadata_content",
        METADATA_MODAL: "#statistics_metadata_modal",
        DOWNLOADDATA_MODAL: "#statistics_downloadData_modal",
        DOWNLOADDATA_MODAL_CONTENT: "#statistics_downloadData_modal_content_dynamicPart",
        DOWNLOAD_SELECTOR_TYPE: "#downloadSelectorType",
        FILE_TYPES_DROPDOWN: "#fileTypesDropdown"
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

    Statistics.prototype._getMetadataInfo = function (data, payload) {

        var self = this;
        if((data!=null)&&(typeof data!='undefined')&&(data.model!=null)&&(typeof data.model!="undefined")&&(data.model.uid!=null)&&(typeof data.model.uid!="undefined"))
        {
            require(['../html/statistics/modals/statistics_downloadData_modal_content_'+data.model.uid+'.html'],
                function   (content) {

                    self.$downloadDatamodalContent.html(content);
                    if(data.model.uid=='000023BGD201001'){
                        self.$downloadSelectorType.html(fileTypeDropdownTemplate(labels[C.lang.toLowerCase()]));
                        // $(s.FILE_TYPES_DROPDOWN).selectize({
                        //     create: true,
                        //     sortField: {field: 'text'},
                        //     dropdownDirection: 'up'
                        // });
                        $(s.FILE_TYPES_DROPDOWN).select2({
                            minimumResultsForSearch: Infinity
                        });
                    }
                    else{
                        //Mettere il link
                        self.$downloadSelectorType.html(fileTypesSourceLink(labels[C.lang.toLowerCase()]));
                    }
                    //this.$downloadDatamodalContent.html(modalContent(labels[C.lang.toLowerCase()])).find('#000023BGD201001');
                    self.$downloadDatamodal.modal('show');

                    $("#downloadDataModalButton").click(function() {

                        if(payload.uid){
                            //var url = SC.download.serviceProvider+payload.model.uid+".zip";
                            var url = SC.download.serviceProvider+payload.uid+".zip";
                            var link = document.createElement('a');
                            link.href = url;
                            link.click();
                            link.remove();
                        }
                    });
                });
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