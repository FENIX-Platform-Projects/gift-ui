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

        chartColors : {
            "01": "#B4730A",//Cereals
            "02": "#B4490A",//Roots, tubers and plantains"
            "03": "#602400",//Pulses, seeds and nuts
            "04": "#016F79",//Milk and milk products
            "05": "#FF9000",//Eggs
            "06": "#2E4372",//Fish
            "07": "#AB0101",//Meat
            "08": "#833434",//Insects and grubs
            "09": "#1F510F",//Vegetables
            "10": "#52980A",//Fruits
            "11": "#988E20",//Fats and oils
            "12": "#D14969",//Sweets and sugars
            "13": "#720D3D",//Spices and condiments
            "14": "#0A58FD",//Beverages
            "15": "#180479",//Foods for particular nutritional uses
            "16": "#1C182E",//Food supplements and similar
            "17": "#201E27",//Food additives

            //Beverages
            "1401": "#0A58FD",
            "1402": "#0A58FD",
            "1403": "#0A58FD",
            "1404": "#0A58FD",
            "1405": "#0A58FD",
            "1406": "#0A58FD"
        },

        //http://tools.medialab.sciences-po.fr/iwanthue/
        bubbleChartColors_foods : {
            "01": "#B4730A",//Cereals
            "02": "#B4490A",//Roots, tubers and plantains"
            "03": "#602400",//Pulses, seeds and nuts
            "04": "#016F79",//Milk and milk products
            "05": "#FF9000",//Eggs
            "06": "#2E4372",//Fish
            "07": "#AB0101",//Meat
            "08": "#833434",//Insects and grubs
            "09": "#1F510F",//Vegetables
            "10": "#52980A",//Fruits
            "11": "#988E20",//Fats and oils
            "12": "#D14969",//Sweets and sugars
            "13": "#720D3D",//Spices and condiments
            "14": "#0A58FD",//Beverages
            "15": "#180479",//Foods for particular nutritional uses
            "16": "#1C182E",//Food supplements and similar
            "17": "#201E27"//Food additives
        },

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
                    width: "60%"
                },
                region: {
                    path : "meContent.seCoverage.coverageGeographic",
                    type: "code",
                    title : "Region",
                    width: "20%"
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