define([
    "jquery",
    "loglevel",
    "../config/config",
    "./charts/foodConsumption/bubble",
    "./charts/foodConsumption/donut",
    "./charts/foodConsumption/donut",
    "./charts/foodSafety/column",
    "./charts/nutrition/percentage",
    "./charts/nutrition/macronutrients",
    "./charts/nutrition/donut",
    "./charts/foodConsumption/treemap"
], function ($, log, C, Bubble, Donut, DonutHole, Column, Percentage, PieMacronutrients, PieThreeLevDrilldown, LargeTreeMap) {
    "use strict";

    var s = {
        BUBBLE_FOOD: "#bubble-food",
        //BUBBLE_LABELS : "bubble",
        BUBBLE_BEVERAGES: "#bubble-beverages",
        donutHole_chart: {
            DONUT_CONTAINER_ID: "hole_donut",
            DONUT_LABELS_ID: "holeDonut",
        },
        macronutrients_chart: {
            MACRONUTRIENTS_PIE_CONTAINER_ID: "macronutrients-pie",
            MACRONUTRIENTS_PIE_LABELS_ID: "macronutrientsPie",
        },
        column_average_chart: {
            COLUMN_CONTAINER_ID: "column-average",
            COLUMN_LABELS_ID: "columnAverage",
            COLUMN_BAR_ID: "#column-average-progress-bar",
            COLUMN_PERCENTAGE_ID: "#column-average-percentage",
            COLUMN_PERCENTAGE_ITEM_ID: "#column-average-percentage-item",
            COLUMN_AMOUNT_LOW: "#column_average_amount_low",
            COLUMN_AMOUNT_MIDDLE: "#column_average_amount_middle",
            COLUMN_AMOUNT_HIGH: "#column_average_amount_high"
        },
        column_standard_chart: {
            COLUMN_CONTAINER_ID: "column-standard",
            COLUMN_LABELS_ID: "columnStandard",
            COLUMN_BAR_ID: "#column-standard-progress-bar",
            COLUMN_PERCENTAGE_ID: "#column-standard-percentage",
            COLUMN_PERCENTAGE_ITEM_ID: "#column-standard-percentage-item",
            COLUMN_AMOUNT_LOW: "#column_standard_amount_low",
            COLUMN_AMOUNT_MIDDLE: "#column_standard_amount_middle",
            COLUMN_AMOUNT_HIGH: "#column_standard_amount_high"
        },
        percentage_chart: {
            PERCENTAGE_CONTAINER_ID: "stacked-percentage",
            PERCENTAGE_LABELS_ID: "stackedPercentage",
            BAR_PERCENTAGE_ID: "#stacked-bar-percentage"
        },
        pieThreeLevDrilldown_chart: {
            PIE_CONTAINER_ID: "pieThreeLevDrilldown",
            PIE_LABELS_ID: "pieThreeLevDrilldown"
        },
        largeTreeMap_chart: {
            LARGE_TREE_MAP_CONTAINER_ID: "largeTree",
            LARGE_TREE_MAP_LABELS_ID: "largeTree"
        },

        height: 300,
        width: 300,
        language: "EN"
    };

    function Charts() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._renderCharts();

    }

    Charts.prototype._renderCharts = function () {

        //donut chart
        //this._renderDonutChart();
        //bubble chart
        //this._renderBubbleChart();
        //column chart
        //this._renderStandardColumnChart();
        // this._renderAverageColumnChart();
        //donut hole
        //this._renderDonutHoleChart();
        //percentage chart
        //this._renderPercentageChart();
        //macronutrients chart
        //this._renderMacronutrientsChart();
        //pie three levels drilldown
        this._renderThreeLevDrilldownChart();
        //large tree map
        //this._renderLargeTreeMapChart();
    };

    Charts.prototype._renderDonutChart = function () {

        var instance = new Donut({
            elID: s.DONUT_CONTAINER_ID,
            cache: C.cache,
            environment: C.environment,
            uid: "GIFT_afc_000042BUR201001",
            selected_items: ["IRON"],
            height: s.height,
            width: s.width,
            language: s.language
        });

        instance.on("ready", function () {
            console.log('the chart has been Loaded')
        })
    };

    Charts.prototype._renderMacronutrientsChart = function () {

        var param = {
            selected_items: {
                "gender": "2",
                "special_condition": ["2"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
                // "age_month": {
                //     "from": 10.5,
                //     "to": 67
                // }
            }
        }

        var instance = new PieMacronutrients({
            elID: s.macronutrients_chart.MACRONUTRIENTS_PIE_CONTAINER_ID,
            labelsId: s.macronutrients_chart.MACRONUTRIENTS_PIE_LABELS_ID,
            cache: C.cache,
            environment: C.environment,
            uid: "GIFT_afc_000042BUR201001",
            selected_items: param.selected_items,
            height: s.height,
            width: s.width,
            language: s.language
        });

        instance.on("ready", function () {
            console.log('the chart has been Loaded')
        })
    };

    Charts.prototype._renderDonutHoleChart = function () {

        //age_year OR age_month
        var param = {
            selected_items: {
                "item": "ENERGY",
                "gender": "2",
                "special_condition": ["2"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
                // "age_month": {
                //     "from": 10.5,
                //     "to": 670
                // }
            }
        }

        var instance = new DonutHole({
            elID: s.donutHole_chart.DONUT_CONTAINER_ID,
            labelsId: s.donutHole_chart.DONUT_LABELS_ID,
            cache: C.cache,
            environment: C.environment,
            uid: "GIFT_afc_000042BUR201001",
            selected_items: param.selected_items,
            height: s.height,
            width: s.width,
            language: s.language
        });

        instance.on("ready", function () {
            console.log('the chart has been Loaded')
        })
    };

    Charts.prototype._renderLargeTreeMapChart = function () {

        //age_year OR age_month
        var param = {
            selected_items: {
                "item": "FOOD_AMOUNT_PROC",
                "gender": null,
                "special_condition": ["2"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
            }
        }

        var instance = new LargeTreeMap({
            elID: s.largeTreeMap_chart.LARGE_TREE_MAP_CONTAINER_ID,
            labelsId: s.largeTreeMap_chart.LARGE_TREE_MAP_LABELS_ID,
            cache: C.cache,
            environment: C.environment,
            uid: "GIFT_afc_000042BUR201001",
            selected_items: param.selected_items,
            height: s.height,
            width: s.width,
            levels_number: 2,
            language: s.language
        });

        instance.on("ready", function () {
            console.log('the chart has been Loaded')
        })
    };

    Charts.prototype._renderThreeLevDrilldownChart = function () {

        //age_year OR age_month
        var param = {
            selected_config: {
                "gender": "2",
                "special_condition": ["2"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
            },
            selected_items: ["ZINC"]
        }

        //"IRON", "CALC", "FOLA", "VITA", "ZINC"

        var instance = new PieThreeLevDrilldown({
            elID: s.pieThreeLevDrilldown_chart.PIE_CONTAINER_ID,
            labelsId: s.pieThreeLevDrilldown_chart.PIE_LABELS_ID,
            title: 'IRON',
            cache: C.cache,
            environment: C.environment,
            uid: "GIFT_afc_000042BUR201001",
            selected_config: param.selected_config,
            selected_items: param.selected_items,
            height: s.height,
            width: s.width,
            language: s.language
        });

        instance.on("ready", function () {
            console.log('the chart has been Loaded')
        })
    };

    Charts.prototype._renderBubbleChart = function () {

        var foodModel = {
            "holderEl": "#bubble-food-holder",
            // "environment": "production",
            "environment": "develop",
            "process": {
                "name": "gift_population_filter",
                "parameters": {
                    "special_condition": ["1", "2", "3", "4"],
                    "age_year": {"from": 0, "to": 120},
                    "item": "FOOD_AMOUNT_PROC"
                },
                "sid": [{"uid": "GIFT_afc_000042BUR201001"}]
            },
            "model": {
                "title": {"EN": "Burkina Faso - 2010 - IRD/HarvestPlus"},
                "dsd": {"rid": "66_3567"},
                "rid": "12_2006",
                "uid": "000042BUR201001",
                "meContent": {
                    "description": {"EN": "The main objective of the study was to obtain reliable information on current levels of micronutrient deficiency and quantitative estimates of the intakes of sorghum and nutrients of interest, e.g. iron, zinc, and vitamin A, among women and children aged 36–59 months in rural Burkina Faso."},
                    "resourceRepresentationType": "dataset",
                    "seReferencePopulation": {
                        "referenceArea": {
                            "codes": [{
                                "code": "2",
                                "label": {"EN": "Sub-national"}
                            }],
                            "idCodeList": "GIFT_ReferenceArea",
                            "extendedName": {"EN": "WHO-FAO GIFT, area of reference"}
                        }
                    },
                    "seCoverage": {
                        "coverageSectors": {
                            "codes": [{"code": "1", "label": {"EN": "Only rural"}}],
                            "idCodeList": "GIFT_CoverageSector",
                            "extendedName": {"EN": "WHO-FAO GIFT, coverage sectors"}
                        },
                        "coverageSectorsDetails": {"EN": ""},
                        "coverageTime": {"from": 1480978800000, "to": 1480978800000},
                        "coverageGeographic": {
                            "version": "2014",
                            "codes": [{
                                "code": "42",
                                "label": {
                                    "PT": "Burkina Faso",
                                    "FR": "Burkina Faso",
                                    "AR": "بوركينا فاسو",
                                    "EN": "Burkina Faso",
                                    "RU": "Буркина-Фасо",
                                    "ES": "Burkina Faso",
                                    "ZH": "布基纳法索"
                                }
                            }],
                            "idCodeList": "GAUL0",
                            "extendedName": {"EN": "Global administrative unit layer country level"}
                        }
                    },
                    "keywords": [""],
                    "resourceRepresentationTypeLabel": {"EN": "Dataset"}
                },
                "languageDetails": {"EN": ""},
                "contacts": [{
                    "position": {"EN": "Directeur de Recherche"},
                    "organization": {"EN": "Institut de Recherche pour le Développement"},
                    "contactInfo": {
                        "phone": "",
                        "emailAddress": "yves.martin-prevel@ird.fr",
                        "contactInstruction": {"EN": ""},
                        "address": "911 Avenue Agropolis, 34394 Montpellier, France"
                    },
                    "pointOfContact": "Yves Martin-Prével",
                    "specify": {"EN": ""},
                    "organizationUnit": {"EN": "Research Unit 204 Nutripass"}
                }],
                "additions": {
                    "DataAnalysisInformation": {
                        "ExclusionRecruitment": {"EN": "Eligible households were those living permanently in the village, having a pair of ‘mother + child aged 36-59 months’ and agreeing to participate in the study. There were no exclusion criteria. The desirable number of households was then selected for the survey, among the eligible ones, using a random number digits table."},
                        "ExclusionDataCleaning": {"EN": "The cut-off points described in the method section to define over/under reporters according to observed energy intakes were applied on all 24H recalls. This led to the exclusion of 106 recalls among children (8.1%) and 53 recalls among mothers (4.1%), all seasons and provinces combined, including repetitions."},
                        "MethodReporting": {"EN": "Outliers (over or under-reporters) were identified using an adaptation of the arbitrary threshold method proposed by Willett."},
                        "ReportingIndividualLevel": {"underReportingPercentage": 0, "overReportingPercentage": 0},
                        "ReportingGroupLevel": {
                            "underReporting": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "no", "label": {"EN": "No"}}]
                            },
                            "overReporting": {"idCodeList": "YesNo", "codes": [{"code": "no", "label": {"EN": "No"}}]}
                        },
                        "DataAlreadyCorrected": {
                            "idCodeList": "YesNo",
                            "codes": [{"code": "yes", "label": {"EN": "Yes"}}]
                        },
                        "AssessmentIntake": {"EN": "The calculation of ‘usual intakes’ for energy and all nutrients (probability approach) using intra- and inter-subjects variances, estimated from those subjects who had a repeated 24H recall, was performed once outliers were removed, at each season and on the whole sample of mothers or children. From these usual intakes for each nutrient, the probability of adequacy (PA) of the intake was calculated using the EAR and their distribution in the population (see Table 2). As this approach can only be applied to nutrients with a symmetric distribution, the PA for iron was calculated using values given in Table A 7 which were adapted from IOM (2000) to give PA for various levels of iron intakes for two different levels of bioavailability. Considering the dietary pattern encountered in Burkina Faso, the lowest bioavailability was assumed for iron and zinc. Usual intakes and PA were calculated using an adaptation of the STATA syntax developed for the needs of the Women’s Dietary Diversity Project (WDDP) further developed in Arimond et al., 2008."}
                    },
                    "sampledPopulationInformation": {
                        "sampleSize": 960,
                        "statisticalPopulation": {"idCodeList": "GIFT_StatisticalPopulation", "codes": [{"code": "2"}]},
                        "PopulationGroups": [{"PopulationGroupsList": {"EN": "Women of reproductive age"}}, {"PopulationGroupsList": {"EN": "Children aged 36–59 months"}}],
                        "SampleSizeGroups": 480,
                        "PurposedlyGroupsDetails": {"EN": ""},
                        "MinumumAge": 3,
                        "MaximumAge": 59
                    },
                    "FoodCompositionInformation": {
                        "FoodComsumption": {"EN": "The food composition table (FCT) was a revised version of the one built for a previous study carried out by the Institut de Recherche pour le Développement [16] updated using data from the World Food Dietary Assessment System (University of California at Berkeley International Minilist) and the National Nutrient Database for Standard Reference of the United States Department of Agriculture (Release 20, 2007)."},
                        "MacroDietaryComponents": {
                            "idCodeList": "GIFT_Macronutrients",
                            "codes": [{"code": "1", "label": {"EN": "Total energy"}}, {
                                "code": "2",
                                "label": {"EN": "Total energy"}
                            }, {"code": "3", "label": {"EN": "Total energy"}}, {
                                "code": "6",
                                "label": {"EN": "Total energy"}
                            }]
                        },
                        "MicroDietaryComponents": {
                            "idCodeList": "GIFT_Micronutrients",
                            "codes": [{"code": "01", "label": {"EN": "Vitamin B12 (Cobalamin)"}}, {
                                "code": "02",
                                "label": {"EN": "Vitamin B12 (Cobalamin)"}
                            }, {"code": "03", "label": {"EN": "Vitamin B12 (Cobalamin)"}}, {
                                "code": "04",
                                "label": {"EN": "Vitamin B12 (Cobalamin)"}
                            }, {"code": "05", "label": {"EN": "Vitamin B12 (Cobalamin)"}}, {
                                "code": "06",
                                "label": {"EN": "Vitamin B12 (Cobalamin)"}
                            }, {"code": "07", "label": {"EN": "Vitamin B12 (Cobalamin)"}}, {
                                "code": "09",
                                "label": {"EN": "Vitamin B12 (Cobalamin)"}
                            }, {"code": "11", "label": {"EN": "Vitamin B12 (Cobalamin)"}}, {
                                "code": "10",
                                "label": {"EN": "Vitamin B12 (Cobalamin)"}
                            }]
                        }
                    },
                    "AdditionalInformation": {
                        "VariablesAvailability": {
                            "Age": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "yes", "label": {"EN": "Yes"}}]
                            },
                            "Sex": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                            "BodyWeight": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                            "BodyHeight": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                            "PhysicalActivityLevel": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "no", "label": {"EN": "No"}}]
                            },
                            "InterviewDate": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "yes", "label": {"EN": "Yes"}}]
                            },
                            "GeographicalLocalization": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "no", "label": {"EN": "No"}}]
                            }
                        },
                        "OtherVariablesAvailability": {
                            "SocioDemographic": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "yes", "label": {"EN": "Yes"}}]
                            },
                            "EducationLiteracy": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "yes", "label": {"EN": "Yes"}}]
                            },
                            "Ethnicity": {"idCodeList": "YesNo", "codes": [{"code": "no", "label": {"EN": "No"}}]}
                        }
                    },
                    "SamplingInformation": {
                        "typeOfCollection": {
                            "idCodeList": "GIFT_TypeOfCollection",
                            "codes": [{"code": "5"}]
                        }, "SamplingInformationDetails": {"EN": ""}
                    },
                    "GeneralInformation": {
                        "Resource": [{
                            "ResourceType": {
                                "idCodeList": "GIFT_ResourceType",
                                "codes": [{"code": "3", "label": {"EN": "Scientific article"}}]
                            },
                            "ResourceDetails": {"EN": ""},
                            "ResourceCite": {"EN": "Martin-Prevel Y, Allemand P, Nikiema L, Ayassou KA, Ouedraogo HG, Moursi M, et al. (2016) Biological Status and Dietary Intakes of Iron, Zinc and Vitamin A among Women and Preschool Children in Rural Burkina Faso. PLoS ONE 11(3): e0146810. doi:10.1371/journal.pone.0146810 / Arsenaut J, Nikiema L, Allemand P, Ayassou K, Lanou H, Moursi M, et al. Seasonal differences in food and nutrients intakes among young children and their mothers in rural Burkina Faso. Journal of Nutritional Science. 2014; 3(e55):1–9. doi: 10.1017/jns.2014.53"},
                            "ResourceLink": {"EN": "http://journals.plos.org/plosone/article/asset?id=10.1371/journal.pone.0146810.PDF / https://www.cambridge.org/core/journals/journal-of-nutritional-science/article/seasonal-differences-in-food-and-nutrient-intakes-among-young-children-and-their-mothers-in-rural-burkina-faso/76DF1AD3B7317597E2A4B569D1BB3A01"}
                        }]
                    },
                    "SurveyInformation": {
                        "GeographicalCoverageDetails": {"EN": ""},
                        "StudyAreasDetails": {"EN": ""},
                        "SeasonsCoverage": {"EN": ""},
                        "AssessmentMethod": {
                            "idCodeList": "GIFT_DietaryMethod",
                            "codes": [{"code": "1", "label": {"EN": "24-hour recall"}}]
                        },
                        "AssessmentMethodDetails": {"EN": ""},
                        "RepeatedDietary": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                        "SizeOfSample": {"EN": ""},
                        "NumberOfRepeated": 1,
                        "AverageTime": 2,
                        "SurveyAdministrationMethod": {
                            "idCodeList": "GIFT_DataCollection",
                            "codes": [{"code": "1", "label": {"EN": "Paper questionnaire"}}]
                        },
                        "SurveyAdministrationMethodDetails": {"EN": ""}
                    },
                    "FoodConsumptionInformation": {
                        "FoodCoverageTotal": {
                            "idCodeList": "YesNo",
                            "codes": [{"code": "yes", "label": {"EN": "Yes"}}]
                        },
                        "FoodCoverageDetails": {"EN": ""},
                        "DrinkingWater": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                        "SupplementInformation": {
                            "idCodeList": "YesNo",
                            "codes": [{"code": "no", "label": {"EN": "No"}}]
                        },
                        "SupplementInformationDetails": {"EN": ""},
                        "NumberOfFood": 274,
                        "PortionSizes": {"EN": "A pre-determined preferred method of measurement was decided for each food or ingredient (i.e. direct weighing, standardize, calibrated household measures, photos, prices, units, etc.)."},
                        "RecipesManagement": {"EN": "Two types of recipes:\n- Individual recipes: raw quantities for all ingredients, including water, as well as the total volume of the mixed dish, had to be estimated on the field by the respondent with the help of the enumerator.\n- Standard recipes: direct observation of cooking methods of these dishes and weighing of all ingredients, as well as recording of weight and volume of the final cooked dish."},
                        "QuantitiesReported": {
                            "idCodeList": "GIFT_QuantityReporting",
                            "codes": [{
                                "code": "2",
                                "label": {"EN": "Edible amount consumed after processing"}
                            }, {"code": "4", "label": {"EN": "Edible amount consumed after processing"}}]
                        },
                        "QuantitiesReportedDetails": {"EN": ""}
                    }
                },
                "meInstitutionalMandate": {
                    "legalActsAgreements": {"EN": ""},
                    "institutionalMandateDataSharing": {"EN": ""}
                },
                "meAccessibility": {
                    "seConfidentiality": {
                        "confidentialityStatus": {
                            "codes": [{
                                "code": "5",
                                "label": {"EN": "Data available in FAO/WHO GIFT"}
                            }],
                            "idCodeList": "GIFT_ConfidentialityStatus",
                            "extendedName": {"EN": "WHO-FAO GIFT, available confidentiality status"}
                        }
                    }
                },
                "meMaintenance": {"seUpdate": {"updateDate": 1480941512434}},
                "meStatisticalProcessing": {
                    "seDataSource": {
                        "sePrimaryDataCollection": {"samplingProcedure": {"EN": ""}},
                        "seSecondaryDataCollection": {"organization": {"EN": "IRD - Research Unit 204 Nutripass"}}
                    }, "seDataCompilation": {"missingData": {"EN": ""}, "weights": {"EN": ""}}
                },
                "language": {
                    "version": "1998",
                    "codes": [{"code": "eng", "label": {"EN": "English"}}],
                    "idCodeList": "GIFT_ISO639-2",
                    "extendedName": {"EN": "International Standard Organization - Language"}
                }
            }
        };

        this.foodBubble = new Bubble($.extend({
            el: s.BUBBLE_FOOD,
            cache: C.cache,
            type: "foods",
            environment: C.environment
        }, foodModel));

        var beveragesModel = {
            "type": "beverages",
            "process": {
                "name": "gift_population_filter",
                "parameters": {
                    "special_condition": ["1", "2", "3", "4"],
                    "age_year": {"from": 0, "to": 120},
                    "item": "FOOD_AMOUNT_PROC"
                },
                "sid": [{"uid": "GIFT_afc_000023BGD201001"}]
            },
            "model": {
                "language": {
                    "version": "1998",
                    "idCodeList": "GIFT_ISO639-2",
                    "codes": [{"code": "eng", "label": {"EN": "English"}}],
                    "extendedName": {"EN": "International Standard Organization - Language"}
                },
                "title": {"EN": "Bangladesh - 2007/2008 - HarvestPlus/UC Davis"},
                "dsd": {"rid": "66_4001"},
                "rid": "12_2464",
                "uid": "000023BGD201001",
                "meContent": {
                    "description": {"EN": "#"},
                    "resourceRepresentationType": "dataset",
                    "seReferencePopulation": {
                        "referenceArea": {
                            "idCodeList": "GIFT_ReferenceArea",
                            "codes": [{"code": "5", "label": {"EN": "Other (please specify)"}}],
                            "extendedName": {"EN": "WHO-FAO GIFT, area of reference"}
                        }
                    },
                    "seCoverage": {
                        "coverageSectors": {
                            "idCodeList": "GIFT_CoverageSector",
                            "codes": [{"code": "3", "label": {"EN": "Both rural and urban"}}],
                            "extendedName": {"EN": "WHO-FAO GIFT, coverage sectors"}
                        },
                        "coverageSectorsDetails": {"EN": ""},
                        "coverageTime": {"from": 1481065200000, "to": 1481065200000},
                        "coverageGeographic": {
                            "version": "2014",
                            "idCodeList": "GAUL0",
                            "codes": [{
                                "code": "23",
                                "label": {
                                    "PT": "Bangladesh",
                                    "FR": "Bangladesh",
                                    "AR": "بنغلاديش",
                                    "EN": "Bangladesh",
                                    "RU": "Бангладеш",
                                    "ES": "Bangladesh",
                                    "ZH": "孟加拉国"
                                }
                            }],
                            "extendedName": {"EN": "Global administrative unit layer country level"}
                        }
                    },
                    "keywords": [""],
                    "resourceRepresentationTypeLabel": {"EN": "Dataset"}
                },
                "languageDetails": {"EN": ""},
                "contacts": [{
                    "organization": {"EN": "HarvestPlus"},
                    "position": {"EN": ""},
                    "role": "distributor",
                    "contactInfo": {
                        "address": "",
                        "phone": "",
                        "emailAddress": "fao-who-gift@fao.org",
                        "contactInstruction": {"EN": ""}
                    },
                    "pointOfContact": "",
                    "specify": {"EN": ""},
                    "organizationUnit": {"EN": ""},
                    "roleLabel": {"FR": "Distributeur", "EN": "Distributor"}
                }],
                "additions": {
                    "DataAnalysisInformation": {
                        "ExclusionRecruitment": {"EN": ""},
                        "ExclusionDataCleaning": {"EN": ""},
                        "MethodReporting": {"EN": ""},
                        "ReportingIndividualLevel": {"underReportingPercentage": 0, "overReportingPercentage": 0},
                        "ReportingGroupLevel": {
                            "underReporting": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "no", "label": {"EN": "No"}}]
                            },
                            "overReporting": {"idCodeList": "YesNo", "codes": [{"code": "no", "label": {"EN": "No"}}]}
                        },
                        "DataAlreadyCorrected": {
                            "idCodeList": "YesNo",
                            "codes": [{"code": "no", "label": {"EN": "No"}}]
                        },
                        "AssessmentIntake": {"EN": ""}
                    },
                    "sampledPopulationInformation": {
                        "sampleSize": 1,
                        "statisticalPopulation": {"idCodeList": "GIFT_StatisticalPopulation", "codes": [{"code": "1"}]},
                        "PurposedlyGroupsDetails": {"EN": ""}
                    },
                    "FoodCompositionInformation": {"FoodComsumption": {"EN": ""}},
                    "AdditionalInformation": {
                        "VariablesAvailability": {
                            "Age": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "yes", "label": {"EN": "Yes"}}]
                            },
                            "Sex": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                            "BodyWeight": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                            "BodyHeight": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                            "PhysicalActivityLevel": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "no", "label": {"EN": "No"}}]
                            },
                            "InterviewDate": {"idCodeList": "YesNo", "codes": [{"code": "no", "label": {"EN": "No"}}]},
                            "GeographicalLocalization": {
                                "idCodeList": "YesNo",
                                "codes": [{"code": "no", "label": {"EN": "No"}}]
                            }
                        }
                    },
                    "SamplingInformation": {
                        "typeOfCollection": {
                            "idCodeList": "GIFT_TypeOfCollection",
                            "codes": [{"code": "8"}]
                        }, "SamplingInformationDetails": {"EN": ""}
                    },
                    "SurveyInformation": {
                        "GeographicalCoverageDetails": {"EN": ""},
                        "StudyAreasDetails": {"EN": ""},
                        "SeasonsCoverage": {"EN": ""},
                        "AssessmentMethod": {
                            "idCodeList": "GIFT_DietaryMethod",
                            "codes": [{"code": "1", "label": {"EN": "24-hour recall"}}]
                        },
                        "AssessmentMethodDetails": {"EN": ""},
                        "RepeatedDietary": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                        "SizeOfSample": {"EN": ""},
                        "SurveyAdministrationMethod": {
                            "idCodeList": "GIFT_DataCollection",
                            "codes": [{"code": "1", "label": {"EN": "Paper questionnaire"}}]
                        },
                        "SurveyAdministrationMethodDetails": {"EN": ""}
                    },
                    "FoodConsumptionInformation": {
                        "FoodCoverageTotal": {
                            "idCodeList": "YesNo",
                            "codes": [{"code": "yes", "label": {"EN": "Yes"}}]
                        },
                        "FoodCoverageDetails": {"EN": ""},
                        "DrinkingWater": {"idCodeList": "YesNo", "codes": [{"code": "yes", "label": {"EN": "Yes"}}]},
                        "SupplementInformation": {
                            "idCodeList": "YesNo",
                            "codes": [{"code": "no", "label": {"EN": "No"}}]
                        },
                        "SupplementInformationDetails": {"EN": ""},
                        "NumberOfFood": 1,
                        "PortionSizes": {"EN": ""},
                        "RecipesManagement": {"EN": ""},
                        "QuantitiesReported": {
                            "idCodeList": "GIFT_QuantityReporting",
                            "codes": [{"code": "5", "label": {"EN": "Other"}}]
                        },
                        "QuantitiesReportedDetails": {"EN": ""}
                    }
                },
                "meInstitutionalMandate": {
                    "legalActsAgreements": {"EN": ""},
                    "institutionalMandateDataSharing": {"EN": ""}
                },
                "meAccessibility": {
                    "seConfidentiality": {
                        "confidentialityStatus": {
                            "idCodeList": "GIFT_ConfidentialityStatus",
                            "codes": [{"code": "1", "label": {"EN": "Off"}}],
                            "extendedName": {"EN": "WHO-FAO GIFT, available confidentiality status"}
                        }
                    }
                },
                "meMaintenance": {"seUpdate": {"updateDate": 1481024288914}},
                "meStatisticalProcessing": {
                    "seDataSource": {
                        "sePrimaryDataCollection": {"samplingProcedure": {"EN": ""}},
                        "seSecondaryDataCollection": {"organization": {"EN": "#"}}
                    }, "seDataCompilation": {"missingData": {"EN": ""}, "weights": {"EN": ""}}
                }
            }
        }

        this.beveragesBubble = new Bubble($.extend({
            el: s.BUBBLE_BEVERAGES,
            cache: C.cache,
            environment: C.environment,
            type: "beverages"
        }, beveragesModel));

    };

    Charts.prototype._renderAverageColumnChart = function () {

        var amount_id = {
            low: s.column_average_chart.COLUMN_AMOUNT_LOW,
            middle: s.column_average_chart.COLUMN_AMOUNT_MIDDLE,
            high: s.column_average_chart.COLUMN_AMOUNT_HIGH
        }

        var param = {
            selected_items: {
                "item": "FOOD_AMOUNT_PROC",
                "gender": "2",
                "special_condition": ["1"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
            },
            selected_group: {
                "percentileSize": 5,
                "group": "02",
                "subgroup": "0201",
                "food": null
            },
            process_name: "gift_average_percentile"
        }

        var instance = new Column({
            elID: s.column_average_chart.COLUMN_CONTAINER_ID,
            labelsId: s.column_average_chart.COLUMN_LABELS_ID,
            columnAmountID: amount_id,
            columnBarID: s.column_average_chart.COLUMN_BAR_ID,
            columnPercentageID: s.column_average_chart.COLUMN_PERCENTAGE_ID,
            columnPercentageItemID: s.column_average_chart.COLUMN_PERCENTAGE_ITEM_ID,
            columnPercentageItemLabel: 'DRIED FRUIT',
            cache: C.cache,
            environment: C.environment,
            uid: "GIFT_afc_000042BUR201001",
            selected_items: param.selected_items,
            selected_group: param.selected_group,
            process_name: param.process_name,
            language: s.language
        });

        instance.on("ready", function () {
            console.log('the chart has been Loaded')
        })
    };

    Charts.prototype._renderStandardColumnChart = function () {

        var amount_id = {
            low: s.column_standard_chart.COLUMN_AMOUNT_LOW,
            middle: s.column_standard_chart.COLUMN_AMOUNT_MIDDLE,
            high: s.column_standard_chart.COLUMN_AMOUNT_HIGH
        }

        var param = {
            selected_items: {
                "item": "FOOD_AMOUNT_PROC",
                "gender": "2",
                "special_condition": ["1"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
                // "age_month": {
                //     "from": 10.5,
                //     "to": 67
                // }
            },
            selected_group: {
                "percentileSize": 5,
                "group": "02",
                "subgroup": "0201",
                "food": null
            },
            process_name: "gift_std_percentile"
        }

        var instance = new Column({
            elID: s.column_standard_chart.COLUMN_CONTAINER_ID,
            labelsId: s.column_standard_chart.COLUMN_LABELS_ID,
            columnAmountID: amount_id,
            columnBarID: s.column_standard_chart.COLUMN_BAR_ID,
            columnPercentageID: s.column_standard_chart.COLUMN_PERCENTAGE_ID,
            columnPercentageItemID: s.column_standard_chart.COLUMN_PERCENTAGE_ITEM_ID,
            columnPercentageItemLabel: 'DRIED FRUIT',
            cache: C.cache,
            environment: C.environment,
            uid: "GIFT_fc_000042BUR201001",
            selected_items: param.selected_items,
            selected_group: param.selected_group,
            process_name: param.process_name,
            language: s.language
        });

        instance.on("ready", function () {
            console.log('the chart has been Loaded')
        })
    };

    Charts.prototype._renderPercentageChart = function () {

        var param = {
            selected_items: {
                "item": "VITA",
                "gender": "2",
                "special_condition": ["1"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
                // "age_month": {
                //     "from": 10.5,
                //     "to": 67
                // }
            }
        }

        var instance = new Percentage({
            elID: s.percentage_chart.PERCENTAGE_CONTAINER_ID,
            labelsId: s.percentage_chart.PERCENTAGE_LABELS_ID,
            barID: s.percentage_chart.BAR_PERCENTAGE_ID,
            cache: C.cache,
            environment: C.environment,
            uid: "GIFT_afc_000042BUR201001",
            selected_item_label: "VITAMINA A",
            selected_items: param.selected_items,
            language: s.language
        });

        instance.on("ready", function () {
            console.log('the chart has been Loaded')
        })
    };

    Charts.prototype._importThirdPartyCss = function () {

        //host override
        require('../css/gift.css');

    };

    return new Charts();
});