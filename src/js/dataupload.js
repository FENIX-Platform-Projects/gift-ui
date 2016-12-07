define([
    "jquery",
    "loglevel",
    "fenix-ui-uploader",
    "../config/config",
    "../config/mde/catalog",

], function ($, log, Uploader, C, CataConf) {

    "use strict";

    var s = {
        DATA_UPLOADER: "#dataUploader"
    };

    function DataUploader() {
        console.clear();
        log.setLevel("trace");
        this._importThirdPartyCss();
        this._renderMDE();

    }

    DataUploader.prototype._renderMDE = function () {

       console.log("Render Data Uploader editor here");
       this.uploader = new Uploader();
       this.uploader.render({
           container : s.DATA_UPLOADER
       });

    };

    DataUploader.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");
        //host override
        require('../css/gift.css');

    };

    return new DataUploader();
});