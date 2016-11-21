define([
    "jquery",
    "loglevel",
    "../../config/config"
], function ($, log, C) {

    "use strict";

    function MDE() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._renderMDE();

    }

    MDE.prototype._renderMDE = function () {

       console.log("Render Metadata editor here")

    };

    MDE.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');

    };

    return new MDE();
});