define([
    "jquery",
    "loglevel",
    "../../config/config"
], function ($, log, C) {
    "use strict";

    var s = {
        MAP: "#map"
    };

    function Map() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._initVariables();

        this._attach();

    }

    Map.prototype._initVariables = function () {



    };

    Map.prototype._attach = function () {


    };

    Map.prototype._renderMap = function () {

       console.log("Render map here")

    };

    Map.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');

    };

    return new Map();
});