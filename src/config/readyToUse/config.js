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
                hideRemoveButton : true
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
            "1401": "#2268FD",
            "1402": "#3A79FD",
            "1403": "#538AFD",
            "1404": "#6C9AFD",
            "1405": "#84ABFE",
            "1406": "#9DBCFE"
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

        color_gradient :{
            "#B4730A" : ["#b4730a","#bb8122","#c38f3a","#ca9d53","#d2ab6c","#d9b984","#e1c79d","#e8d5b5","#f0e3ce","#f7f1e6","#ffffff"],
            "#B4490A" : ["#b4490a","#bb5b22","#c36d3a","#ca7f53","#d2916c","#d9a484","#e1b69d","#e8c8b5","#f0dace","#f7ece6","#ffffff"],
            "#602400" : ["#602400","#6f3919","#7f4f32","#8f654c","#9f7b66","#af917f","#bfa799","#cfbdb2","#dfd3cc","#efe9e5","#ffffff"],
            "#016F79" : ["#016f79","#1a7d86","#338b93","#4d9aa1","#66a8ae","#80b7bc","#99c5c9","#b2d3d6","#cce2e4","#e5f0f1","#ffffff"],
            "#FF9000" : ["#ff9000","#ff9b19","#ffa632","#ffb14c","#ffbc66","#ffc77f","#ffd299","#ffddb2","#ffe8cc","#fff3e5","#ffffff"],
            "#2E4372" : ["#2e4372","#425580","#57688e","#6c7b9c","#818eaa","#96a1b8","#abb3c6","#c0c6d4","#d5d9e2","#eaecf0","#ffffff"],
            "#AB0101" : ["#ab0101","#b31a1a","#bb3333","#c44d4d","#cc6666","#d58080","#dd9999","#e5b2b2","#eecccc","#f6e5e5","#ffffff"],
            "#833434" : ["#833434","#8f4848","#9b5c5c","#a87070","#b48585","#c19999","#cdadad","#d9c2c2","#e6d6d6","#f2eaea","#ffffff"],
            "#1F510F" : ["#1f510f","#356226","#4b733e","#628557","#78966f","#8fa887","#a5b99f","#bbcab7","#d2dccf","#e8ede7","#ffffff"],
            "#52980A" : ["#52980a","#63a222","#74ac3a","#85b653","#97c16c","#a8cb84","#b9d59d","#cbe0b5","#dceace","#edf4e6","#ffffff"],
            "#988E20" : ["#988e20","#a29936","#aca44c","#b6af62","#c1bb79","#cbc68f","#d5d1a5","#e0ddbc","#eae8d2","#f4f3e8","#ffffff"],
            "#D14969" : ["#d14969","#d55b78","#da6d87","#de7f96","#e391a5","#e8a4b4","#ecb6c3","#f1c8d2","#f5dae1","#faecf0","#ffffff"],
            "#720D3D" : ["#720d3d","#802550","#8e3d63","#9c5577","#aa6d8a","#b8869e","#c69eb1","#d4b6c4","#e2ced8","#f0e6eb","#ffffff"],
            "#0A58FD" : ["#0a58fd","#2268fd","#3a79fd","#538afd","#6c9afd","#84abfe","#9dbcfe","#b5ccfe","#ceddfe","#e6eefe","#ffffff"],
            "#180479" : ["#180479","#2f1d86","#463693","#5d4fa1","#7468ae","#8b81bc","#a29ac9","#b9b3d6","#d0cce4","#e7e5f1","#ffffff"],
            "#1C182E" : ["#1c182e","#322f42","#494657","#605d6c","#767481","#8d8b96","#a4a2ab","#bab9c0","#d1d0d5","#e8e7ea","#ffffff"],
            "#201E27" : ["#201e27","#36343c","#4c4a52","#626167","#79787d","#8f8e93","#a5a5a8","#bcbbbe","#d2d2d3","#e8e8e9","#ffffff"],

            "#2268FD" : ["#0a58fd","#2268fd","#3a79fd","#538afd","#6c9afd","#84abfe","#9dbcfe","#b5ccfe","#ceddfe","#e6eefe","#ffffff"],
            "#3A79FD" : ["#0a58fd","#2268fd","#3a79fd","#538afd","#6c9afd","#84abfe","#9dbcfe","#b5ccfe","#ceddfe","#e6eefe","#ffffff"],
            "#538AFD" : ["#0a58fd","#2268fd","#3a79fd","#538afd","#6c9afd","#84abfe","#9dbcfe","#b5ccfe","#ceddfe","#e6eefe","#ffffff"],
            "#6C9AFD" : ["#0a58fd","#2268fd","#3a79fd","#538afd","#6c9afd","#84abfe","#9dbcfe","#b5ccfe","#ceddfe","#e6eefe","#ffffff"],
            "#84ABFE" : ["#0a58fd","#2268fd","#3a79fd","#538afd","#6c9afd","#84abfe","#9dbcfe","#b5ccfe","#ceddfe","#e6eefe","#ffffff"],
            "#9DBCFE" : ["#0a58fd","#2268fd","#3a79fd","#538afd","#6c9afd","#84abfe","#9dbcfe","#b5ccfe","#ceddfe","#e6eefe","#ffffff"]
        },

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

                    // cl : {
                    //     uid: "ISO3"
                    // },

                    selector : {
                        id : "dropdown",
                        hideSummary : true,
                        blacklist: [2,5,9,10,14,15,16,22,25,30,32,36,38,39,48,52,53,54,55,56,80,81,82,86,87,88,91,95,96,98,100,101,102,104,109,110,112,120,127,128,129,131,134,136,146,149,151,158,161,164,168,174,176,178,184,185,190,193,197,200,206,207,210,216,218,219,228,230,234,244,247,251,258,265,266,267,268,33364,40760,40762,40764,40781,61013,74578,147296],
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