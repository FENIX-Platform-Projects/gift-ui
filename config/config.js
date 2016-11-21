define(function () {

    "use strict";

    return {

        environment : "production",

        cache : false,

        lang : "EN",

        //from old consuption
		SERVICE_BASE_ADDRESS: "http://fenix.fao.org/d3s",
		CONSUMPTION: {
            body: {
                "dsd.contextSystem": {
                    "enumeration": ["gift"]
                },
                "meContent.resourceRepresentationType": {
                    "enumeration": ["dataset"]
                }
            }
        }
    }
});