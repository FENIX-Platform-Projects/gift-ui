define(function(){
    "use strict";

    function Formatter() {

    }

    Formatter.prototype.format = function( v ) {

        return Math.floor(v);
    };

    Formatter.prototype.formatLabel = function( v ) {

        if (v === 0) {
            return 0;
        }

        if ( 0 < v && v < 1 ){
            return "Less than 1"
        }

        return Math.floor(v);
    };

    return new Formatter();
});