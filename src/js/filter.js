define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../html/readyToUse/filter.hbs",
    "fenix-ui-filter"
], function ($, log, _, C, template, Filter) {

    "use strict";

    var s = {
        FILTER: "#filter",
        VALUES_BTN: "[data-role='values']"
    };

    function FilterSection() {

        console.clear();

        log.setLevel("silent");

        this._importThirdPartyCss();

        $(s.FILTER).append(template());

        var filter = new Filter($.extend(true, {
            el: s.FILTER
        }, C.populationFilter, C.othersFilter))
            .on("click", function () {
                filter.validate();
            });

        $(s.VALUES_BTN).on("click", function () {
            console.log(filter.getValues("fenix"));
        });

    }

    // CSS

    FilterSection.prototype._importThirdPartyCss = function () {

        //Bootstrap
        //require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");


    };

    return new FilterSection();
});