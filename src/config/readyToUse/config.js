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
                        uid: "CSTAT_Core",
                        level: 1,
                        levels: 1
                    }
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