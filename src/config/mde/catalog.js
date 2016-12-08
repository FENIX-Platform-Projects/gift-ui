define(function () {

    'use strict';

    var coverageTime = {};

    return {

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
            },
            coverageTime: {
                selector: {
                    id: "range",
                    config: {
                        min: 1983,
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