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
        CATALOG: "#catalog",
        DATA_UPLOADER: "#dataUploader"
    };

    function DataUploader() {
        console.clear();
        log.setLevel("trace");
        this._importThirdPartyCss();
        this._render();

    }

    DataUploader.prototype._render = function () {

        this.catalog = new Catalog({
            el: s.CATALOG
        });

        this.uploader = new Uploader();

        this.uploader.render({
            container : s.DATA_UPLOADER,
            context : "4"
        });


    };

    DataUploader.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");
        // fenix filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");
        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");
        //host override
        require('../css/gift.css');

    };

    return new DataUploader();
});