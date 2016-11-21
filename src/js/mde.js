define([
    "jquery",
    "loglevel",
    "fenix-ui-data-management",
    "../config/config",
    "../config/mde/catalog",
    "../config/mde/metadata",

], function ($, log, DataManagement, C, CataConf, MDConf) {

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

        var dataMng = new DataManagement({
            environment: C.environment,
            el: s.DATA_MNG,
            cache: C.cache,
            lang: C.lang,
            metadataEditor: MDConf,
            catalog: CataConf,
            disabledSections: ['btnDSD','btnData'],
            routes: {
                '(/)': 'onLanding',
                '(/)landing(/)': 'onLanding',

                '(/)home(/)': 'onMetadata',
                '(/)add(/)': 'onAdd',

                '(/)metadata(/)': 'onMetadata',

                '(/)close(/)' : 'onClose',
                '(/)delete(/)': 'onDelete',
                '(/)search(/)': 'onSearch',
                '(/)not-found(/)': 'onNotFound',

                '(/)denied(/)': 'onDenied',

                // fallback route
                '(/)*path': 'onDefaultRoute'
            },
            config: {
                contextSystem :"gift",
                datasources : [""],
                resourceRepresentationType: "dataset"
            }
        });

    };

    MDE.prototype._importThirdPartyCss = function () {

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