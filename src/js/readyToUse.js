define([
    "jquery",
    "loglevel",
    "../../config/config",
    "../html/readyToUse/template.hbs",
    "../nls/labels"
], function ($, log, C, template, labels) {

    "use strict";

    var s = {
        EL : "#readyToUse"
    }

    function ReadyToUse() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._initVariables();

        this._attach();

    }

    ReadyToUse.prototype._initVariables = function () {

        this.$el = $(s.EL);

        this.lang = C.lang.toLowerCase();

    };

    ReadyToUse.prototype._attach = function () {

        this.$el.html(template(labels[this.lang]));
    };

    ReadyToUse.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');

    };

    return new ReadyToUse();
});