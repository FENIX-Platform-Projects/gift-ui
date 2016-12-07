define(function () {
    "use strict";

    function Formatter() {

    }

    Formatter.prototype.format = function (v) {

        if (0 < v && v < 1) {
            return Math.round(v * 10) / 10;
        }

        return Math.round(v);
    };

    return new Formatter();
});