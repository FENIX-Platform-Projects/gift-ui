define([
    "jquery",
    "loglevel",
    "fenix-ui-data-managment",
    "../../config/config",
    "../../config/catalog",
    "../../config/metadata",

], function ($, log, DataManagment, C, CataConf, MDConf) {

    "use strict";

    var s = {
        DATA_MNG: "#mde"
    };

    function MDE() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._renderMDE();

    }

    MDE.prototype._renderMDE = function () {

       console.log("Render Metadata editor here");

        this.dataMng = new DataManagement({
            environment: C.environment,
            el: s.DATA_MNG,
            cache: C.cache,
            lang: C.lang,
            metadataEditor: MDConf,
            catalog: CataConf,
            disabledSections: ['btnDSD','btnData'],
            config: {
                contextSystem :"gift",
                datasources : [""],
                resourceRepresentationType: "dataset"
            }
        });

    };

    MDE.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');

    };

    return new MDE();
});