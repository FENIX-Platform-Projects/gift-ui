define(["underscore"], function (_) {
    "use strict";

    var foodGroupsFilter = {

        foodex2_code: {

            cl: {
                uid: "GIFT_FoodGroups"
            },

            selector: {
                id: "tree",
                hideFilter: true,
                hideButtons: true,
                hideSummary: true,
                config: {
                    core: {
                        multiple: false
                    },
                    plugins: null

                }
            }
        }

    };

    return {

        bubbleChartColors_foods : ["#204f74", "#bf9100", "#c1000b", "#558138", "#bc8476", "#6c5980", "#853a12", "#853a12", "#60d581", "#58a1c5", "#c45a1a", "#fffa32", "#56a2c9", "#7b7f77"],

        bubbleChartColors_beverages : ["blue","blue","blue","blue","blue","blue","blue"],

        catalog: {
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

        //forceShowDashboardSection: true,

        foodSafetyFilter: foodGroupsFilter,

        foodConsumptionFilter: foodGroupsFilter
    }
});