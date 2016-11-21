define(function() {
    "use strict";

    return {

        catalog : {
            pluginRegistry: {
                contextSystem: {
                    selector: {
                        source: [
                            {value: "gift", label: "GIFT"}
                        ],
                        default: ["gift"]
                    }
                },
                dataDomain: {
                    cl: {
                        uid: "GIFT_CoverageSector",
                        level: 1,
                        levels: 1
                    }
                },
                statusOfConfidentiality: {
                    uid: "GIFT_ConfidentialityStatus"
                },
                referenceArea: {
                    uid: "GIFT_ReferenceArea"
                }
            },
            baseFilter: {
                "dsd.contextSystem": {"enumeration": ["gift"]},
                "meContent.resourceRepresentationType": {"enumeration": ["dataset"]}
            },
            defaultSelectors: ["freeText", "dataDomain", "region", "referenceArea"],
            menuExcludedItems: ["accessibility"]
        },

        foodSafetyFilter : {

            food : {
                cl : {
                   uid : "GIFT_FoodGroups"
                },
                selector : {
                    id : "tree",
                    hideFilter : true,
                    hideButtons: true,
                    hideSummary : true
                }
            }

        }

    }
});