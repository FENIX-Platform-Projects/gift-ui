define([
  "fenix-ui-bridge"
],function (Bridge) {

    "use strict";

    function Bubble( opts ) {

        this.bridge = new Bridge({
            cache : opts.cache,
            environment : opts.environment
        });

        console.log("Bubble charts render: success");

        //get processed resource
        // keep track of which params are passed
        //this.bridge.getProcessedResource().then(...)

    }

    Bubble.prototype.dispose = function(){

    };

    return Bubble;

});