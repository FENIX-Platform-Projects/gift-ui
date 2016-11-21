define(function () {

    "use strict";

    function Base() {
        this._importThirdPartyCss();
    }

    //style
    Base.prototype._importThirdPartyCss = function () {
        //
        // //Bootstrap
        // require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');

    };

    return new Base();

});