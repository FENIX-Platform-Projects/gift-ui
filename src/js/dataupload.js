define([
    "jquery",
    "loglevel",
    "fenix-ui-uploader",
    "fenix-ui-catalog",
    "../config/config",
    "../config/mde/catalog",

], function ($, log, Uploader, Catalog, C, CataConf) {

    "use strict";

    var s = {
        CATALOG: "#catalog-container",
        DATA_CONTAINER: "#datauploader-container",
        DATA_UPLOADER: "#dataUploader",
        BACKBUTTON: "#fxDUpBack"
    };

    function DataUploader() {
        console.clear();
        log.setLevel("silent");
        //log.setLevel("trace");
        this._bindListener();
        this._importThirdPartyCss();
        $(s.DATA_CONTAINER).hide();
        this._renderCatalog();
    }

    DataUploader.prototype._bindListener = function() {
        var self = this;
        $(s.BACKBUTTON).on('click', function(){
            self._restoreCatalog()
        });
    };

    DataUploader.prototype._restoreCatalog = function() {
        $(s.CATALOG).show();
        $(s.DATA_CONTAINER).hide();
        $(s.BACKBUTTON).prop( "disabled", true );
    };

    DataUploader.prototype._disableCatalog = function() {
        $(s.CATALOG).hide();
        $(s.DATA_CONTAINER).show();
        $(s.BACKBUTTON).prop( "disabled" , false );
    };

    DataUploader.prototype._renderCatalog = function () {

        var self = this;

        this.catalog = new Catalog($.extend({
            el: s.CATALOG,
            environment: C.environment,
            cache: C.cache,
            lang: C.lang,
            hideCloseButton: true

        },CataConf));

        this.catalog.on("select", function(selection){
            self._renderUploader(selection)
        });


    };

    DataUploader.prototype._renderUploader = function (selection) {

        this._disableCatalog();
        this.uploader = new Uploader();

        this.uploader.render({
            container : s.DATA_UPLOADER,
            context: 'gift.bulk',
            server_url : "http://fenixservices.fao.org/gift",
            body_post_process: {
                source : selection.model.uid
            }
        });

        this.uploader.on('fx.upload.finish', function(){
            $(s.BACKBUTTON).prop( "disabled", false );
        });

        this.uploader.on('fx.upload.start', function(){
            $(s.BACKBUTTON).prop( "disabled", true );
        });
    };

    DataUploader.prototype._importThirdPartyCss = function () {

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
        require("../../node_modules/fenix-ui-uploader/dist/fenix-ui-uploader.min.css");
        require("../../node_modules/toastr/build/toastr.min.css");
        //host override
        require('../css/gift.css');

    };

    return new DataUploader();
});