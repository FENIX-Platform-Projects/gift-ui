define([
    "jquery",
    "loglevel",
    "../../config/config"
], function ($, log, C) {

    "use strict";

    function ReadyToUse() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._renderReadyToUse();

    }

    ReadyToUse.prototype._renderReadyToUse = function () {

       console.log("Render Ready to Use here")

    };

    ReadyToUse.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');

    };

    return new ReadyToUse();
});