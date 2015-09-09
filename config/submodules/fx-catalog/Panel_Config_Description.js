/* global define */

define([
    'text!templates/filter/surveyComponent.hbs',
    'text!templates/filter/geoComponent.hbs',
    'text!templates/filter/populationComponent.hbs',
    'text!templates/filter/foodComponent.hbs',
    'text!json/filter/geoSelector_leafletStyle.json'
], function (SurveyTemplate, GeoTemplate, PopulationTemplate, FoodTemplate, GEOJSONStyle) {

    'use strict';

    return {
        /**
         * Configuration for the filters of the catalog, what the need to display and the templates
         */

        "population-GIFT": {
            "id": "population-GIFT",
            "type": "text",
            "label": {
                "EN": "Population",
                "DE": "Population",
                "ES": "Population",
                "FR": "Population"
            },
            "component": {
                "rendering": {
                    "placeholder": {
                        "EN": "Population",
                        "DE": "Population",
                        "ES": "Population",
                        "FR": "Population"
                    },
                    "htmlattributes": {
                        "className": "form-control"
                    }
                },
                ageRange: {
                    "sourceType": "period",
                    "defaultsource": {
                        YEARS: {from: 0, to: 70},
                        MONTHS: {from: 0, to: 840}
                    }
                }
            },
            "template": {
                "overallStructure": PopulationTemplate
            }
        },

        "geo-GIFT": {
            "id": "geo-GIFT",
            "type": "enumeration",
            "label": {
                "EN": "Geographic",
                "DE": "Geographic",
                "ES": "Geographic",
                "FR": "Geographic"
            },

            "component": {
                "source": {

                    "uid": "RepresentationType"
                }
            },
            "template": {
                "overallStructure": GeoTemplate,
                "style": JSON.parse(GEOJSONStyle)
            }
        },

        "survey-GIFT": {
            "id": "survey-GIFT",
            "type": "codes",
            "label": {
                "EN": "Survey",
                "ES": "Survey",
                "DE": "Survey",
                "FR": "Survey"
            },
            "component": {
                years: {
                    "sourceType": "period",
                    "defaultsource": {"from": 1983, "to": 2015}
                }
                /*  "source": {
                 "uid": "GAUL_ReferenceArea",
                 "version": "1.0"
                 }*/
            },
            "template": {
                "overallStructure": SurveyTemplate
            }
        },
        "food-GIFT": {
            "id": "food-GIFT",
            "type": "codes",
            "label": {
                "EN": "Food",
                "ES": "Food",
                "DE": "Food",
                "FR": "Food"
            },
            "component": {
                "source": {
                    "uid": "GIFT_Foods"
                }
            },
            "template": {
                "overallStructure": FoodTemplate
            }
        }
    };
});


