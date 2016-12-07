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
                default : ["01"],
                config: {
                    core: {
                        multiple: false
                    },
                    plugins: null

                }
            },

            template : {
                hideHeader : true
            }
        }

    };
    var itemsFilter = {

        items: {

            cl: {
                uid: "GIFT_Items_filter"
            },

            selector: {
                id: "tree",
                hideFilter: true,
                hideButtons: true,
                hideSummary: true,
                default : ["IRON"],
                config: {
                    core: {
                        multiple: false
                    },
                    plugins: null

                }
            },

            template : {
                hideHeader : true
            }
        }

    };

    return {

        //http://tools.medialab.sciences-po.fr/iwanthue/
        bubbleChartColors_foods :["#ffc666",
            "#7e5bd1",
            "#abd950",
            "#a742b2",
            "#afe476",
            "#2d175a",
            "#edd346",
            "#e5acff",
            "#658b00",
            "#ff81b9",
            "#007439",
            "#cc6a0a",
            "#1eece6",
            "#8b6f00",
            "#00bd99",
            "#465005"],

        bubbleChartColors_beverages : [
            "#c1eaff",
            "#213648",
            "#94e2ff",
            "#024955",
            "#c5d6e8",
            "#3a545b",
            "#55cbe3",
            "#406b8e",
            "#6eb3eb",
            "#00768a",
            "#8cafd1",
            "#0080b8",
            "#7096a0",
            "#02abe1",
            "#007ba1"],

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

        foodConsumptionFilter: foodGroupsFilter,

        nutritionSourceFilter : itemsFilter
    }
});