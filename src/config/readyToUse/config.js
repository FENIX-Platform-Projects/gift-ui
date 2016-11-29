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

        forceShowDashboardSection: true,

        foodSafetyFilter: foodGroupsFilter,

        foodConsumptionFilter: foodGroupsFilter
    }
});