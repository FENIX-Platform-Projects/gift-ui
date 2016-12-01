define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/statistics/config",
    "../html/statistics/template.hbs",
    "../nls/labels",
    "fenix-ui-catalog",
    "fenix-ui-metadata-viewer"
], function ($, log, _, C, SC, template, labels, Catalog, MetadataViewer) {

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

        this._importThirdPartyCss();

        this._validateConfig();

        this._initVariables();

        this._attach();

        this._unbindEventListeners();

        this._renderCatalog();

        this._bindEventListeners();

    }


    Statistics.prototype._validateConfig = function () {
        if (!C.lang) {
            alert("Please specify a valid LANGUAGE in config/config.js");
        }

        if (!SC.catalog) {
            alert("Please specify a valid CATALOG configuration in config/readyToUse/config.js");
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

    };


    Statistics.prototype._initVariables = function () {

        this.$el = $(s.EL);


        this.lang = C.lang.toLowerCase();
        this.environment = C.environment;
        this.cache = C.cache;

    };

    Statistics.prototype._attach = function () {
        this.$el.html(template(labels[C.lang.toLowerCase()]));
        this.$meta = this.$el.find(s.METADATA_CONTENT);
        this.$metamodal = this.$el.find(s.METADATA_MODAL);

    };

    Statistics.prototype._renderCatalog = function () {

        // extend the filter
        var pluginRegistry = $.extend(true, SC.populationFilter, SC.othersFilter);
        SC.catalog.pluginRegistry = pluginRegistry.selectors;
        SC.catalog.selectorsDependencies = pluginRegistry.dependencies;

        console.log(" ====================== _renderCatalog ================");
        console.log(SC.catalog.pluginRegistry);

        this.catalog = new Catalog($.extend(true, SC.catalog, {
            el: this.$el.find(s.CATALOG_HOLDER),
            cache: this.cache,
            environment: this.environment,
            hideCloseButton: true
        }));
    };

    Statistics.prototype._unbindEventListeners = function () {
        if (this.catalog && $.isFunction(this.catalog.dispose)) {
            this.catalog.dispose();
        }
    };


    Statistics.prototype._bindEventListeners = function () {
        this.catalog.on("download", _.bind(this._onCatalogDownload, this));
        this.catalog.on("metadata", _.bind(this._onCatalogView, this));
    };

    Statistics.prototype._onCatalogDownload = function (payload) {

        if (!payload.model) {
            alert("Invalid dataset");
            return;
        }

        if(payload.model.uid){
            var url = "http://fenixrepo.fao.org/data/gift/survey/GIFT_Survey_"+payload.model.uid+".zip";
            var link = document.createElement('a');
            link.href = url;
            link.click();
            link.remove();
        }
    };

    Statistics.prototype._onCatalogView = function (payload) {

        if (!payload.model) {
            alert("Invalid dataset");
            return;
        }

        // Use the bridge to get the metadata
        this.$metamodal.modal('show');
        this.metadataViewer = new MetadataViewer({
            model: payload.model,
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




       /* var link = document.createElement('a');
        link.href = "#";
        link.id = "myButton";
        link.class = "btn btn-primary"
        link.onclick = function(e) {
            e.preventDefault();

            var content = "#modal-body";
            //var content = "#test";

            var metadataViewer = new MetadataViewer({
                model:payload.model,
                lang: this.lang,
                environment: this.environment,
                el: content,
                hideExportButton: false,
                expandAttributesRecursively: ['meContent'],
                popover: {
                    placement: 'left'
                }
            })
                .on("ready", function (model) {
                    log.warn("listening 'ready' event");
                    log.warn(model);

                    $('#myModal').modal();

                    $(s.DISPOSE_BTN).on("click", function () {
                        metadataViewer.dispose();
                    })
                });

            /!*var metadataViewer = new MetadataViewer({
                model: payload.model,
                lang: this.lang,
                el: content,
                environment: this.environment
            });*!/

          // $('#myModal').modal();
        };
        link.click();
        link.remove();*/



       /* var link = document.createElement('button');
        link.type = "button"
        link['data-target'] = "#myModal";
        link[' data-toggle'] = "modal";
        link.class = "btn btn-primary btn-lg";
        link.click();
        link.remove();*/

        /*var metadataViewer = new MetadataViewer({
            model: payload.model,
            lang: this.lang,
            el: s.METADATA_VIEWER_HOLDER,
            environment: this.environment
        });

        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
            Launch demo modal
        </button>*/

    };

    return new Statistics();
});