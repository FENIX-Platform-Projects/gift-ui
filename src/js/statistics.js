define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/statistics/config",
    "../config/nodemodules/fenix-ui-catalog/template.hbs",
    "../html/statistics/template.hbs",
    "../nls/labels",
    "fenix-ui-catalog",
    "fenix-ui-bridge",
    "fenix-ui-metadata-viewer",
    "handlebars"
], function ($, log, _, C, SC, CatalogTemplate, template, labels, Catalog, Bridge, MetadataViewer, Handlebars) {

    "use strict";

    var s = {
        EL: "#statistics",
        CATALOG_HOLDER: "#catalog",
        METADATA_VIEWER_HOLDER: "#viewer",
        METADATA_CONTENT: "#statistics_metadata_content",
        METADATA_MODAL: "#statistics_metadata_modal"
    };

    function Statistics() {

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

    // CSS
    Statistics.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // fenix-ui-dropdown
        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");


        //meta viewer requirements
        require("jquery-treegrid-webpack/css/jquery.treegrid.css");


        //Catalog
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");

        //GIFT CSS
        require("../css/gift.css");

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

        this.catalogTemplate = CatalogTemplate(labels[C.lang.toLowerCase()]);

        this.lang = C.lang.toLowerCase();
        this.environment = C.environment;
        this.cache = C.cache;

        this.bridge = new Bridge({
            environment: this.environment,
            cache: this.cache
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

        this.catalog = new Catalog($.extend(true, SC.catalog, {
            el: this.$el.find(s.CATALOG_HOLDER),
            cache: this.cache,
            environment: this.environment,
            hideCloseButton: true
        }));
    };


    Statistics.prototype._populateSelectorLabels = function (selectors) {
        _.each(selectors, _.bind(function (obj, key) {

            if (!obj.template) {
                obj.template = {};
            }
            //Add title labels
            obj.template.title = labels[this.lang][ "selector_" + key];

            console.log(key, obj.template.title);

            // Add message labels
            if(obj.constraints && obj.constraints.presence){
                obj.constraints.presence.message = labels[this.lang][ "selector_" + key+"_message"];
                console.log(key, obj.constraints.presence.message);
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

        if(payload.model.uid){
            var url = SC.download.serviceProvider+payload.model.uid+".zip";
            var link = document.createElement('a');
            link.href = url;
            link.click();
            link.remove();
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
        this.metadataViewer = new MetadataViewer({
            model: data,
            el: this.$meta,
            lang: this.lang,
            environment: this.environment,
            hideExportButton: true,
            expandAttributesRecursively: ['meContent'],
            popover: {
                placement: 'left'
            }
        }).on('export', function(e) {
            console.log('EXPORT MODEL',e)
        });
    };

    return new Statistics();
});