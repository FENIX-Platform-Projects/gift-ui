define(function () {

    'use strict';

    var coverageTime = {};

    return {

        pluginRegistry: {
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
            },
            "confidentialityStatus": {
                "cl": {uid: 'GIFT_ConfidentialityStatus'},
                "selector": {
                    "id": "dropdown",
                    "config": {"maxItems": 1},
                    "sort": false,
                },
                "template": {
                    "title": "Availability of the dataset",
                    hideSwitch: true,
                    hideRemoveButton: true
                },
                "format": {
                    metadataAttribute: "meAccessibility.seConfidentiality.confidentialityStatus",
                    "output": "codes"
                }
            }
        },
        baseFilter: {
            "dsd.contextSystem": {"enumeration": ["gift"]},
            "meContent.resourceRepresentationType": {"enumeration": ["dataset"]}
        },
        defaultSelectors: ["freeText", "region", "coverageTime", "confidentialityStatus"],
        menuExcludedItems: ["accessibility"]

    }
});