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
                title : "Select a food:",
                hideSwitch : true,
                hideRemoveButton : true,
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
                title : "Select a nutrient:",
                hideSwitch : true,
                hideRemoveButton : true,
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

        treemapColors :["#d4eabc",
            "#91b2e0",
            "#eddaac",
            "#ceb7dd",
            "#a9c3a1",
            "#e7b1c0",
            "#91d0cc",
            "#e2b1a0",
            "#9ad2e6",
            "#c7b794",
            "#b0c1db",
            "#caecd9",
            "#dfd2e2",
            "#b3beb4",
            "#efdccd"],

        catalog: {
            pluginRegistry: {

                freeText: {

                    selector : {
                        id : "input",
                        type : "text"
                    },

                    template : {
                        hideRemoveButton : true,
                        hideSwitch : true
                    },

                    format : {
                        output : "freeText",
                        metadataAttribute: "freetext"
                    }

                },

                region: {

                    cl : {
                        uid: "GAUL0",
                        version: "2014"
                    },

                    selector : {
                        id : "dropdown",
                        hideSummary : true,
                        config : {
                            plugins: ['remove_button'],
                            mode: 'multi'
                        }
                    },

                    template : {
                        hideRemoveButton : true,
                        hideSwitch : true
                    },

                    format : {
                        output : "codes",
                        metadataAttribute: "meContent.seCoverage.coverageGeographic"
                    }
                },

                coverageTime: {
                    selector: {
                        id: "range",
                        default : [{value : 1980, parent : "from"}, {value : new Date().getFullYear(), parent : "from"}],
                        config: {
                            min: 1980,
                            max: new Date().getFullYear(),
                            type: "double",
                            grid: true,
                            force_edges: true,
                            prettify: function (num) {
                                return num;
                            }
                        }
                    },
                    template: {
                        title: "Coverage Time",
                        hideSwitch: true,
                        hideRemoveButton: true
                    },
                    format: {
                        metadataAttribute: "meContent.seCoverage.coverageTime",
                        output: "time"
                    }

                }
            },

            hideAddButton : true,

            columns : {
                title: {
                    path : "title",
                    type: "i18n",
                    title : "Title",
                    width: "80%"
                }
            },

            baseFilter: {
                "dsd.contextSystem": {"enumeration": ["gift"]},
                "meContent.resourceRepresentationType": {"enumeration": ["dataset"]},
                "meAccessibility.seConfidentiality.confidentialityStatus" : {codes: [{uid : "GIFT_ConfidentialityStatus", codes: ["5"]}]}
            },

            defaultSelectors: ["freeText", "region", "coverageTime"]
        },

        //forceShowDashboardSection: true,

        foodSafetyFilter: foodGroupsFilter,

        foodConsumptionFilter: foodGroupsFilter,

        nutritionSourceFilter : itemsFilter
    }
});