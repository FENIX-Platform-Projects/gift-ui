define(["underscore"],function (_) {

    "use strict";

    return {

        //environment : "production",
        environment : "develop",

        cache : false,

        lang : "EN",

        consumption: {
            service: {
                production: "http://fenixservices.fao.org/d3s",
                develop: "http://fenix.fao.org/d3s"
            },
            requestBody: {
                "dsd.contextSystem": {
                    "enumeration": ["gift"]
                },
                "meContent.resourceRepresentationType": {
                    "enumeration": ["dataset"]
                }
            }
        },

        populationFilter: {

            selectors: {

                gender: {

                    cl: {
                        uid: "GIFT_Gender_filter"
                    },

                    selector: {
                        id: "input",
                        type: "radio",
                        source: [
                            {label: "All", value: "none"}
                        ],
                        default: ["none"]
                    },
                    template: {
                        title: "Gender"
                    },

                    format: {
                        output: "codes"
                    }
                },

                special_condition: {

                    cl: {
                        uid: "GIFT_SpecialConditions_filter"
                    },

                    selector: {
                        id: "input",
                        type: "checkbox",
                        default: ["1", "2", "3", "4"]
                    },

                    template: {
                        title: "Special Condition"
                    },

                    dependencies: {
                        "@gender,age": [
                            {
                                id: "disableSpecialCondition",
                                event: "select",
                                args: {
                                    payloadIncludes: ["gender", "age", "ageGranularity"],
                                    forbiddenGender: "1",
                                    forbiddenAgeGranularity: "month",
                                    threshold: 14
                                }
                            }
                        ]
                    },

                    constraints: {
                        presence: {message: "Please select at least one value."}
                    },

                    format: {
                        output: "codes"
                    }
                },

                ageGranularity: {

                    selector: {
                        id: "input",
                        type: "radio",
                        source: [
                            {label: "Year", value: "year"},
                            {label: "Month", value: "month"}
                        ],
                        default: ["year"]
                    },

                    template: {
                        title: "Age Granularity"
                    }
                },

                age: {

                    selector: {
                        id: "range",
                        config: {
                            min: 0,
                            max: 120,
                            step: 0.5,
                            from: 0,
                            to: 120,
                            type: "double",
                            grid: true,
                            force_edges: true,
                            prettify: function (num) {
                                return num;
                            }
                        }
                    },

                    template: {
                        title: "Age"
                    },

                    dependencies: {
                        ageGranularity: [{id: "updateAge", event: "select"}]
                    },

                    format: {
                        output: "number"
                    }
                }
            },

            dependencies: {

                disableSpecialCondition: function (payload, o) {

                    var threshold = parseInt(o.args.threshold),
                        forbiddenGender = o.args.forbiddenGender,
                        forbiddenAgeGranularity = o.args.forbiddenAgeGranularity,
                        selectedValues = payload.values || {},
                        //age selector
                        to = _.findWhere(selectedValues.age, {parent: "to"}) || {},
                        toValue = !isNaN(parseInt(to.value)) ? parseInt(to.value) : -1,
                        //gender selector
                        gender = selectedValues.gender,
                        toDisable = false,
                        //age granularity
                        ageGranularity = selectedValues.ageGranularity[0];

                    //if 'to' value is less then threshold
                    if (toValue < threshold) {
                        toDisable = true
                    }

                    //if gender is forbidden
                    if (_.contains(gender, forbiddenGender)) {
                        toDisable = true
                    }

                    //if 'to' value is less then threshold
                    if (forbiddenAgeGranularity === ageGranularity) {
                        toDisable = true
                    }

                    if (!!toDisable) {
                        this._callSelectorInstanceMethod(o.target, "disable");
                    } else {
                        this._callSelectorInstanceMethod(o.target, "enable");
                    }

                },

                updateAge: function (payload, o) {

                    var granularity = payload.values[0],
                        yearConfig = {
                            min: 0,
                            max: 120,
                            from: 0,
                            to: 120,
                            step: 0.5
                        },
                        monthConfig = {
                            min: 0,
                            max: 60,
                            from: 0,
                            to: 60,
                            step: 1
                        };

                    switch (granularity.toLowerCase()) {
                        case "year" :
                            this._callSelectorInstanceMethod(o.target, "update", yearConfig);
                            break;
                        case "month" :
                            this._callSelectorInstanceMethod(o.target, "update", monthConfig);
                            break;
                    }
                }
            }
        },

        othersFilter: {

            selectors: {

                country: {
                    cl: {
                        uid: "GAUL0",
                        version: "2014"
                    },
                    selector: {
                        id: "tree",
                        hideSummary: true
                    },

                    template: {
                        title: "Country"
                    },
                    format: {
                        dimension: "meContent.seCoverage.coverageGeographic",
                        output: "code"
                    }
                },

                time: {

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
                        title: "Time"
                    },

                    dependencies: {
                        country: [{id: "test", event: "select"}]
                    },

                    format: {
                        dimension: "meContent.seCoverage.coverageTime",
                        output: "time"
                    }
                },

                referenceArea: {

                    cl: {
                        uid: "GIFT_ReferenceArea_filter"
                    },

                    selector: {
                        id: "input",
                        type: "radio",
                        source: [
                            {label: "All", value: "none"}
                        ],
                        default: ["none"]
                    },
                    template: {
                        title: "Reference Area"
                    }
                },

                coverageSector: {

                    cl: {
                        uid: "GIFT_CoverageSector_filter"
                    },

                    selector: {
                        id: "input",
                        type: "radio",
                        source: [
                            {label: "All", value: "none"}
                        ],
                        default: ["none"]

                    },
                    template: {
                        title: "Coverage Sector"
                    }
                },

                foodex2_code: {

                    cl: {
                        uid: "GIFT_Foods",
                        level: 2
                    },

                    selector: {
                        id: "tree",
                        hideSummary: true
                    },
                    template: {
                        title: "Food"
                    }
                }
            }
        }
    }
});