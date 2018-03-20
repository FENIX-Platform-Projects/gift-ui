define(
    function () {

        var
            //http://fenixservices.fao.org/d3s/msd/resources/uid/GIFT_ReferenceArea
            StatusConfidenciality = {uid: 'GIFT_ConfidentialityStatus'},
            AreaOfReference = {uid: 'GIFT_ReferenceArea'},//TO BE UPDATED
            GAUL = {uid: 'GAUL0', version: "2014"},//Check if has to be updated
            ROLE = {uid: "ResponsiblePartyRole"},
            CoverageSector = {uid: 'GIFT_CoverageSector'},
            TypeOfCollection = {uid: 'GIFT_TypeOfCollection'},
            YESNO = {uid: "YesNo"},
            Languages = {uid: 'GIFT_ISO639-2', version: "1998"},
            GIFT_TypeOfResource = {uid: 'GIFT_ResourceType'},
            GIFT_DataCollection = {uid: 'GIFT_DataCollection'},
            GIFT_StatisticalPopulation = {uid: 'GIFT_StatisticalPopulation'},
            GIFT_QuantityReporting = {uid: 'GIFT_QuantityReporting'},
            GIFT_Macronutrients = {uid: 'GIFT_Macronutrients'},
            GIFT_Micronutrients = {uid: 'GIFT_Micronutrients'},

            DataAdjustment = {uid: 'CL_ADJUSTMENT', version: "1.1"},
            AreaOfReference = {uid: 'GIFT_ReferenceArea'},
            GIFT_Items = {uid: 'GIFT_Items'},
            GIFT_AssessmentMethod = {uid: 'GIFT_DietaryMethod'};

        return {

            "template": {
                "title": "Administrator",
                "description": "Basic survey information"
            },

            "selectors": {
                "uid": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [{"value": "uid", "label": "Uid"}],
                        config: {
                            readonly: true
                        }
                    },
                    "template": {
                        "title": "Uid - Resource identification code",
                        //"hideDescription": true,
                        "description":  "Resource identifier. It is a code that creates the match between the resource and the metadata it is associated to."
                        // "footer": "Resource identifier. It is a code that creates the match between the resource and the metadata it is associated to."
                    },
                    "format": {
                        "output": "string"
                    }
                },
                "creationDate": {
                    "selector": {
                        "id": "time",
                        "disabled": true
                    },
                    "template": {
                        "title": "Creation Date",
                        //"hideDescription": true,
                        "description": "Creation date of the resource."
                    },
                    "format": {
                        "output": "date"
                    },
                    "constraints": {"presence": true}
                },
                "metadataLastUpdate": {
                    "selector": {
                        "id": "time",
                        "disabled": true
                    },
                    "template": {
                        "title": "Metadata Last Update",
                        //"hideDescription": true,
                        "description": "Most recent date of update of the metadata."
                    },
                    "format": {
                        "output": "date"
                    },
                    "constraints": {"presence": true}
                },
                "datasetAvailability": {
                    "cl": StatusConfidenciality,
                    "selector": {
                        "id": "dropdown",
                        "config": {"maxItems": 1},
                        "default": ["1"],
                        "sort": false,
                    },
                    "template": {
                        "title": "Availability of the dataset",
                        //"hideDescription": true,
                        "description": "Coded information describing the status of the dataset towards FAO/WHO GIFT and setting the public visibility on the web platform.",
                    },
                    "format": {
                        "output": "codes"
                    }
                },
            },

            "sections": {
                "generalInformation": {

                    "template": {
                        "title": "General Information"
                    },
                    "selectors" : {
                        "surveyName": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "surveyName",
                                        "label": "Survey name"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Survey name",
                                //"hideDescription": true,
                                "description": "Provide the name of the survey or the title of the study it was conducted for."
                            },
                            "format": {
                                "output": "label"
                            },
                            "constraints": {"presence": true}
                        },
                        "contacts": {

                            classNames: "well",

                            template: {
                                title: "Contact person(s)"
                            },

                            "incremental": true,

                            "selectors": {
                                "organization": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "organization", "label": "Organization"}]
                                    },
                                    "template": {
                                        "title": "Organization",
                                        // "hideDescription": true,
                                        "description": "Provide the name of the organization the contact person represents."
                                    },
                                    "format": {
                                        "output": "label"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "organizationUnit": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "organizationUnit", "label": "Organization - Unit/Division"}]
                                    },
                                    "template": {
                                        "title": "Organization - Unit/Division",
                                        // "hideDescription": true,
                                        "description": "Specify the addressable subdivision within the organization."
                                    },
                                    "format": {
                                        "output": "label"
                                    }

                                },
                                "pointOfContact": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "pointOfContact", "label": "Name"}]
                                    },
                                    "template": {
                                        "title": "Name",
                                        // "hideDescription": true,
                                        "description": "Provide contact person's first name and last name."
                                    },
                                    "format": {
                                        "output": "string"
                                    },
                                    "constraints": {"presence": true}

                                },
                                "position": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "organizationUnit", "label": "Designation"}]
                                    },
                                    "template": {
                                        "title": "Designation",
                                        // "hideDescription": true,
                                        "description": "Specify what is the contact person's role or position."
                                    },
                                    "format": {
                                        "output": "label"
                                    }

                                },
                                "specify": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "role", "label": "Role"}]

                                    },
                                    "template": {
                                        "title": "Role",
                                        // "hideDescription": true,
                                        "description": "Specify what is the contact person's function performed concerning the dataset."
                                    },
                                    "format": {
                                        "output": "label"
                                    }

                                },
                                "emailAddress": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "emailAddress", "label": "E-mail address"}]
                                    },
                                    "template": {
                                        "title": "E-mail address",
                                        // "hideDescription": true,
                                        "description": "Provide contact person's e-mail address."

                                    },
                                    "format": {
                                        "output": "template",
                                        "path": "contactInfo.emailAddress"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "phone": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "phone", "label": "Telephone number"}]
                                    },
                                    "template": {
                                        "title": "Telephone number",
                                        // "hideDescription": true,
                                        "description": "Provide telephone number(s) at which the contact person or the organisation may be contacted."
                                    },
                                    "format": {
                                        "output": "template",
                                        "path": "contactInfo.phone"
                                    }
                                },
                                "address": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "address", "label": "Address"}]
                                    },
                                    "template": {
                                        "title": "Address",
                                        // "hideDescription": true,
                                        "description": "Provide the physical address at which the contact person or the organization may be contacted."
                                    },
                                    "format": {
                                        "output": "template",
                                        "path": "contactInfo.address"
                                    }
                                },

                                "contactInstruction": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "contactInstruction", "label": "Further information"}]
                                    },
                                    "template": {
                                        "title": "Further information",
                                        // "hideDescription": true,
                                        "description": "Provide any supplemental instructions on how or when to liaise with the contact person or the organization."
                                    },
                                    "format": {
                                        "output": "template",
                                        "path": "contactInfo.contactInstruction"
                                    }
                                }
                            },
                            format: {
                                output: "array<contact>"
                            }
                        },
                        "resources": {
                            classNames: "well",

                            template: {
                                title: "Documentation"
                            },

                            "incremental": true,

                            "selectors": {
                                "ResourceType": {
                                    "cl": GIFT_TypeOfResource,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false
                                    },
                                    "template": {
                                        "title": "Type of resource",
                                        //"hideDescription": true,
                                        "description": "List datasets, reports, publications and other type of documents that provide information and/or were derived from the survey and the data.",
                                    },
                                    "format": {
                                        //"output": "codes"
                                        "output": "codes:extended"
                                    }
                                },
                                "ResourceCite": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "ResourceCite",
                                                "label": "Preferred way to cite the resource"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Preferred way to cite the resource",
                                        //"hideDescription": true,
                                        "description": "Specify the preferred way to cite the resource mentioned precedently."
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "ResourceLink": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "ResourceLink",
                                                "label": "Access link to the online resource"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Access link to the online resource",
                                        //"hideDescription": true,
                                        "description": "Provide link(s) under which the resource mentioned precedently can be accessed, or information on how else it can be accessed."
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "ResourceDetails": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "ResourceDetails",
                                                "label": "Type of resource - other"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Type of resource - other",
                                        //"hideDescription": true,
                                        "description": "Provide detailed information on the resource mentioned precedently."
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            },
                            "format": {
                                "output": "array<resource>"
                            }
                        },
                        "keywords": {
                            "selector": {
                                id: "dropdown",
                                config: {
                                    plugins: ['remove_button'],
                                    delimiter: ',',
                                    persist: false,
                                    create: function (input) {
                                        return {value: input, text: input}
                                    }
                                },
                            },
                            "template": {
                                "title": "Keyword(s)",
                                // "hideDescription": true,
                                "description": "List commonly used word(s), formalized word(s) or phrase(s) used to describe the survey.",
                            },
                            "format": {"output": "array"}
                        }
                    },
                    "sections": {
                        "geoCoverage": {
                            "template": {
                                "title": "Geographical Administrative Coverage"
                            },
                            "selectors": {
                                "geographicalCoverage": {
                                    "cl": AreaOfReference,
                                    "selector": {
                                        "id": "dropdown",
                                        "config": {"maxItems": 1},
                                        "sort": false,
                                    },
                                    "template": {
                                        "title": "Geographical/administrative coverage of the data collection",
                                        //"hideDescription": true,
                                        "description": "Specify what was the type of geographical or administrative units, within which the sampling was performed.",
                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "geographicalCoverageDetails": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Geographical/administrative coverage of the study - details",
                                        //"hideDescription": true,
                                        "description": "Specify other geographical/administrative coverage.",
                                    },
                                    "dependencies": {
                                        "geographicalCoverage": [{
                                            id: "mandatoryIfOtherValue",
                                            event: "select",
                                            args: {value: "5"}
                                        }]
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "country": {
                                    "cl": GAUL,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Country surveyed",
                                        //"hideDescription": true,
                                        "description": "Specify the country in which the data collection was performed.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "studyAreaDetails": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Country surveyed - Details",
                                        //"hideDescription": true,
                                        "description": "Provide additional information on the geographical/administrative area(s) within the country covered by the data collection.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "dataCollector": {
                            "template": {
                                "title": "Data collector"
                            },
                            "selectors": {
                                "name": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "name",
                                                "label": "Name of the organisation that performed the field work"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Name of the organisation that performed the field work",
                                        //"hideDescription": true,
                                        "description": "Provide the name of the institution/organisation/firm who coordinated the field work. By field work it is understood data collection, logistic, tools for data collection, enumerator's training, etc."
                                    },
                                    "format": {
                                        "output": "label"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "institutionalHome":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Institutional home",
                                        //"hideDescription": true,
                                        "description": "Specify if the institution/organization/firm who coordinated the field work is the institutional home of dietary assessment activities in the country where the data were collected.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                }
                            }
                        },
                        "language": {
                            "template": {
                                "title": "Language"
                            },
                            "selectors": {
                                "datasetLanguage": {
                                    "cl": Languages,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false
                                    },
                                    "template": {
                                        "title": "Language of the submitted dataset",
                                        //"hideDescription": true,
                                        "description": "Specify language(s) used in the dataset for textual information (e.g. food names, recipe names)",

                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "languageDetails": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "name",
                                                "label": "Dataset language - additional information"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Dataset language - additional information",
                                        //"hideDescription": true,
                                        "description": "Provide comments and additional details about the language(s) used for the dataset textual information. This field is addressed to highlight some particular characteristics of the language used in the dataset or its inconsistencies if any. E.g. to alert that the dataset contains textual information in some specific dialect or local language or that it is not completely homogeneous in the language used."
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "dataSharing": {
                            "template": {
                                "title": "Data sharing"
                            },
                            "selectors": {
                                "legalActsAgreements": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Institutional data sharing policy",
                                        //"hideDescription": true,
                                        "description": "Provide reference(s) (citation(s) or website link(s)) to legal act(s) or other formal or informal agreement(s) regulating data sharing in the organisation/institution/firm that is the data owner.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "institutionalMandateDataSharing": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Existing data sharing arrangement(s)",
                                        //"hideDescription": true,
                                        "description": "Provide reference(s) (citation(s) or website link(s)) to already existing data sharing agreement(s) with other organisations/institutions/firms.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        }
                    }
                },
                "surveyInformation": {

                    "template": {
                        "title": "Survey Information"
                    },
                    "selectors" : {
                        "description": {
                            "selector": {
                                "id": "textarea"
                            },
                            "template": {
                                "title": "Objective of the data collection",
                                //"hideDescription": true,
                                "description": "Provide a brief description of the main motivation leading to the data collection. E.g. need for information on food consumption, research questions."
                            },
                            "format": {
                                "output": "label"
                            },
                            "constraints": {"presence": true}
                        }
                    },
                    "sections": {
                        "dataCollectionPeriod": {
                            "template": {
                                "title": "Data Collection Period"
                            },
                            "selectors": {
                                "seasonCoverage": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Seasons coverage",
                                        //"hideDescription": true,
                                        "description": "List the seasons covered by the survey. E.g. spring, rainy season, lean season, etc."
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "from": {
                                    "template": {
                                        "title": "Data collection period: start",
                                        //"hideDescription": true,
                                        "description": "Select the date on which data collection started for this survey."
                                    },
                                    classNames: "col-xs-6",
                                    selector: {
                                        id: "time"
                                    },
                                    "format": {
                                        "output": "date"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "to": {
                                    "template": {
                                        "title": "Data collection period: end",
                                        //"hideDescription": true,
                                        "description": "Select the date on which data collection ended for this survey."
                                    },
                                    classNames: "col-xs-6",
                                    selector: {
                                        id: "time"
                                    },
                                    "format": {
                                        "output": "date"
                                    },
                                    "constraints": {"presence": true}
                                }
                            }
                        },
                        "dietaryAssessment": {
                            "template": {
                                "title": "Dietary assessment method"
                            },
                            "selectors": {
                                "assessmentMethod":{
                                    "cl": GIFT_AssessmentMethod,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Dietary assessment method",
                                        //"hideDescription": true,
                                        "description": "Specify the main dietary assessment method used for data collection.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "assessmentMethodDetail": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Dietary assessment method - details",
                                        //"hideDescription": true,
                                        "description": "Provide detailed information on the main dietary assessment and, if relevant, complementary dietary assessment methods used for data collection."
                                    },
                                    "format": {
                                        "output": "label"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "dietaryRecall":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Repeated dietary recall/record",
                                        //"hideDescription": true,
                                        "description": "Provide information whether or not the dietary recall/record was repeated on the same individuals during the survey.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "sampleSize": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "name",
                                                "label": "Size of the sample on which the recall/record was repeated"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Size of the sample on which the recall/record was repeated",
                                        //"hideDescription": true,
                                        "description": "Specify on how many respondents the dietary recall/record was repeated. This could be presented as a number of respondents or a percentage of the total number of respondents."
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "repeatedNumber": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "repeatedNumber",
                                                "label": "Number of repeated recalls/records per subject"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Number of repeated recalls/records per subject",
                                        //"hideDescription": true,
                                        "description": "Specify how many times was the dietary recall/record repeated on each subject."
                                    },
                                    "format": {
                                        "output": "number"
                                    }
                                },
                                "averageTime": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "name",
                                                "label": "Average time interval between subsequent recalls/records"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Average time interval between subsequent recalls/records",
                                        //"hideDescription": true,
                                        "description": "Specify what was the average time interval in days between two dietary recalls/records for the same subject."
                                    },
                                    "format": {
                                        "output": "number"
                                    }
                                },
                                "furtherInfo": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Further information",
                                        //"hideDescription": true,
                                        "description": "Specify any additional information, if any, regarding the repetition of dietary recall/record. E.g. further details on the method, sample size, etc."
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "surveyAdministration": {
                            "template": {
                                "title": "Survey Administration method"
                            },
                            "selectors": {
                                "surveyAdministrationMethod":{
                                    "cl": GIFT_DataCollection,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Survey administration method",
                                        //"hideDescription": true,
                                        "description": "Name the method used to gather data from the respondents during the interview. E.g. paper questionnaire, electronic questionnaire.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "surveyAdministrationMethodDetails": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "name",
                                                "label": "Survey administration method - details"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Survey administration method - details",
                                        //"hideDescription": true,
                                        "description": "Specify other survey administration method."
                                    },
                                    "dependencies": {
                                        "surveyAdministrationMethod": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "3"}
                                        },{
                                            id: "mandatoryIfOtherValue",
                                            event: "select",
                                            args: {value: "3"}
                                        }]
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        }
                    }
                },
                "samplingInformation": {

                    "template": {
                        "title": "Sampling Information"
                    },
                    "selectors" : {
                        "coverageSector": {
                            "cl": CoverageSector,
                            "selector": {
                                "id": "dropdown",
                                "config": {"maxItems": 1},
                                "sort": false,
                            },
                            "template": {
                                "title": "Typology of the geographical area covered by the survey",
                                //"hideDescription": true,
                                "description": "E.g. Only rural, Only urban, etc.",
                            },
                            "format": {
                                "output": "codes"
                            },
                            "constraints": {"presence": true}
                        },
                        "coverageSectorDetails": {
                            "selector": {
                                "id": "textarea"
                            },
                            "template": {
                                "title": "Definition of rural and urban",
                                //"hideDescription": true,
                                "description": "Provide criteria considered to define rural and urban areas for the data collection."
                            },
                            "format": {
                                "output": "label"
                            }
                        },
                        "typeOfCollection": {
                            "cl": TypeOfCollection,
                            "selector": {
                                "id": "dropdown",
                                "config": {"maxItems": 1},
                                "sort": false,
                            },
                            "template": {
                                "title": "Sample selection method",
                                //"hideDescription": true,
                                "description": "Name the method used in selecting the sample for the survey.",
                            },
                            "format": {
                                "output": "codes"
                            },
                            "constraints": {"presence": true}
                        },
                        "samplingInformationDetails": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [{"value": "samplingInformationDetails", "label": "Sample selection method - details"}]
                            },
                            "template": {
                                "title": "Sample selection method - details",
                                // "hideDescription": true,
                                "description": "Specify other sample selection method."
                            },
                            "dependencies": {
                                "typeOfCollection": [{
                                    id: "mandatoryIfOtherValue",
                                    event: "select",
                                    args: {value: "8"}
                                }]
                            },
                            "format": {
                                "output": "label"
                            }
                        },
                        "samplingProcedure": {
                            "selector": {
                                "id": "textarea"
                            },
                            "template": {
                                "title": "Sampling design",
                                //"hideDescription": true,
                                "description": "Describe the procedure followed in order to select the survey sample (clusters, level of representativeness,sample frame, etc.)."
                            },
                            "format": {
                                "output": "label"
                            }
                        },
                        "weight": {
                            "selector": {
                                "id": "textarea"
                            },
                            "template": {
                                "title": "Use of sample weights",
                                //"hideDescription": true,
                                "description": "Describe the weights system, if any, used in order to produce accurate statistical results. In case sample weights were used in the survey, describe the criteria for using weights in analysis. E.g. the formulas and coefficients developed and how they were applied to data."
                            },
                            "format": {
                                "output": "label"
                            }
                        }
                    }
                },
                "sampledPopulationInfo":{
                    "template": {
                        "title": "Sampled Population Information"
                    },
                    "selectors" : {
                        "surveyPopulation":{
                            "cl": GIFT_StatisticalPopulation,
                            "selector": {
                                "id": "dropdown",
                                "sort": false,
                                "config": {"maxItems": 1}
                            },
                            "template": {
                                "title": "Population Coverage: Survey population",
                                //"hideDescription": true,
                                "description": "Specify the population group, in terms of age and sex, which was the basis for sampling.",

                            },
                            "format": {
                                "output": "codes"
                            },
                            "constraints": {"presence": true}
                        },
                        "sampleSize": {
                            "selector": {
                                "id": "input",
                                "type": "number",
                                "source": [
                                    {
                                        "value": "sampleSize",
                                        "label": "Population Coverage: Population Coverage: Sample size"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Population Coverage: Sample size",
                                //"hideDescription": true,
                                "description": "Total number of subjects for which at least one dietary recall/record was collected."
                            },
                            "format": {
                                "output": "number"
                            },
                            "constraints": {"presence": true}
                        },
                        "groupsSurveyed": {
                            "selector": {
                                id: "dropdown",
                                config: {
                                    plugins: ['remove_button'],
                                    delimiter: ',',
                                    persist: false,
                                    create: function (input) {
                                        return {value: input, text: input}
                                    }
                                },
                            },
                            "template": {
                                "title": "Population Coverage: Specific population groups surveyed",
                                // "hideDescription": true,
                                "description": "Add a specific population group that was covered by the survey. E.g. women of reproductive age, children under 5 years, elderly above 75 years, etc.",
                            },
                            "format": {output: "grsurveyed"}
                        },
                        "sampleSizeGroups": {
                            "selector": {
                                "id": "input",
                                "type": "number",
                                "source": [
                                    {
                                        "value": "sampleSize",
                                        "label": "Population Coverage: Sample size of the specific population group surveyed"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Population Coverage: Sample size of the specific population group surveyed",
                                //"hideDescription": true,
                                "description": "Provide the sample size of this specific population group."
                            },
                            "format": {
                                "output": "number"
                            }
                        },
                        "populationGroupOverSampled":{
                            "cl": YESNO,
                            "selector": {
                                "id": "dropdown",
                                "sort": false,
                                "config": {"maxItems": 1}
                            },
                            "template": {
                                "title": "Population Coverage: Purposely over-sampled population groups",
                                //"hideDescription": true,
                                "description": "Specify if some population groups, in terms of age and sex, were purposely over-sampled.",

                            },
                            "format": {
                                "output": "codes"
                            }
                        },
                        "purposelyGroups": {
                            "selector": {
                                id: "dropdown",
                                config: {
                                    plugins: ['remove_button'],
                                    delimiter: ',',
                                    persist: false,
                                    create: function (input) {
                                        return {value: input, text: input}
                                    }
                                },
                            },
                            "template": {
                                "title": "Population Coverage: Purposely over-sampled population group",
                                // "hideDescription": true,
                                "description": "Add a population group that have been purposely over-sampled in order to limit the sample size, or improve the representativeness of the survey for this population. E.g. pregnant women, lactating women, children under 5 years, etc.",
                            },
                            "format": {output: "purposegr"}
                        },
                        "purposelyGroupsDetails": {
                            "selector": {
                                "id": "textarea"
                            },
                            "template": {
                                "title": "Population Coverage: Purposely over-sampled population groups - details",
                                //"hideDescription": true,
                                "description": "Provide details on the purposely over-sampled group and the reasons for over-sampling."
                            },
                            "format": {
                                "output": "label"
                            }
                        },
                        "minimumAge": {
                            "selector": {
                                "id": "input",
                                "type": "number",
                                "source": [
                                    {
                                        "value": "minimumAge",
                                        "label": "Age Coverage: Minimum age in the dataset (in years)"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Age Coverage: Minimum age in the dataset (in years)",
                                //"hideDescription": true,
                                "description": "Provide the age of the youngest individual whose food consumption data is included in the dataset."
                            },
                            "format": {
                                "output": "number"
                            }
                        },
                        "maximumAge": {
                            "selector": {
                                "id": "input",
                                "type": "number",
                                "source": [
                                    {
                                        "value": "maximumAge",
                                        "label": "Age Coverage: Maximum age in the dataset (in years)"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Age Coverage: Maximum age in the dataset (in years)",
                                //"hideDescription": true,
                                "description": "Provide the age of the oldest individual whose food consumption data is included in the dataset."
                            },
                            "format": {
                                "output": "number"
                            }
                        }
                    }
                },
                "dataAnalysisInfo":{
                    "template": {
                        "title": "Data Analysis Information"
                    },
                    "sections": {
                        "exclusionCriteria": {
                            "template": {
                                "title": "Exclusion criteria"
                            },
                            "selectors": {
                                "exclusionRecruitment": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Exclusion criteria during recruitment",
                                        //"hideDescription": true,
                                        "description": "Describe the exclusion criteria, if any, which were applied during sample selection in order to exclude respondents whose data could potentially bias results of the survey.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "exclusionDataCleaning": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Exclusion criteria during data cleaning",
                                        //"hideDescription": true,
                                        "description": "Describe the exclusion criteria, if any, which were applied during data cleaning in order to exclude recalls/records which could potentially bias results of the survey.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "missingValue": {
                            "template": {
                                "title": "Missing Values"
                            },
                            "selectors": {
                                "missingData": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Actions taken in case of missing data",
                                        //"hideDescription": true,
                                        "description": "Describe actions, if any, taken in case of missing data, under which circumstance missing data were estimated or imputed and when the cells were left without entries.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "noDataValue": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "surveyName",
                                                "label": "Survey name"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Value assigned to missing values, if any",
                                        //"hideDescription": true,
                                        "description": "Value assigned to the cells to represent the absence of data, e.g. \"NA\", \"000\"."
                                    },
                                    "format": {
                                        "output": "string"
                                    }
                                }
                            }
                        },
                        "assessmentReporting": {
                            "template": {
                                "title": "Assessment of under-/over-reporting"
                            },
                            "selectors": {
                                "dataAnalysed":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Data analysed for identification of under-/over-reporting",
                                        //"hideDescription": true,
                                        "description": "Provide information whether or not the data has been processed/manipulated in order to identify under- and over-reporting.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "methodReporting": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Method used to assess over-/under-reporting",
                                        //"hideDescription": true,
                                        "description": "Describe the method(s) used to assess unreliably low or high food intake data from the collected recalls/records.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "underReportingPercentage": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "underReportingPercentage",
                                                "label": "Percentage of under-reporting at individual level"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Percentage of under-reporting at individual level",
                                        //"hideDescription": true,
                                        "description": "Report the percentage of individuals in the sample whose data was identified as under-reported according to the applied methods of assessing under and over-reporting."
                                    },
                                    "format": {
                                        "output": "number"
                                    }
                                },
                                "overReportingPercentage": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "overReportingPercentage",
                                                "label": "Percentage of over-reporting at individual level"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Percentage of over-reporting at individual level",
                                        //"hideDescription": true,
                                        "description": "Report the percentage of individuals in the sample whose data was identified as over-reported according to the applied methods of assessing under and over-reporting."
                                    },
                                    "format": {
                                        "output": "number"
                                    }
                                },
                                "underReporting":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Under-reporting identified at group level",
                                        //"hideDescription": true,
                                        "description": "Provide information whether or not under-reporting at the group level was identified in the survey."
                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "overReporting":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Over-reporting identified at group level",
                                        //"hideDescription": true,
                                        "description": "Provide information whether or not over-reporting at the group level was identified in the survey."
                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                }
                            }
                        },
                        "assessmentIntake": {
                            "template": {
                                "title": "Assessment of usual intake"
                            },
                            "selectors": {
                                "dataCorrected":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Data already corrected to assess usual intake",
                                        //"hideDescription": true,
                                        "description": "Provide information whether or not the data has been processed/manipulated in order to show usual intake.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "usualIntake": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Assessment of usual intake",
                                        //"hideDescription": true,
                                        "description": "Describe the procedures applied to the dataset in order to obtain information on usual intake.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "alterationData": {
                            "template": {
                                "title": "Any other alteration from the original data"
                            },
                            "selectors": {
                                "otherAlterations": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Any other alteration from the original data",
                                        //"hideDescription": true,
                                        "description": "Report any other adjustments or alterations of the original dataset.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        }
                    }
                },
                "foodConsumptionInfo":{
                    "template": {
                        "title": "Food Consumption Information"
                    },
                    "sections": {
                        "foodCoverage": {
                            "template": {
                                "title": "Food Coverage"
                            },
                            "selectors": {
                                "foodCoverageTotal":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Total food coverage",
                                        //"hideDescription": true,
                                        "description": "Provide information whether or not the survey covered whole diet, or excluded some foods or food groups.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "foodCoverageDetails": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Food coverage - details",
                                        //"hideDescription": true,
                                        "description": "Specify which foods or food groups were covered by the survey.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "drinkingWater": {
                            "template": {
                                "title": "Drinking Water"
                            },
                            "selectors": {
                                "drinkWater":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Quantification of drinking water",
                                        //"hideDescription": true,
                                        "description": "Provide information whether or not water drunk by the respondents has been quantified.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                }
                            }
                        },
                        "supplementation": {
                            "template": {
                                "title": "Supplementation"
                            },
                            "selectors": {
                                "supplementIntake":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Information on supplement intakes",
                                        //"hideDescription": true,
                                        "description": "Provide information whether or not the information on the use/consumption of dietary supplements has been collected.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "supplementIntakeDetail": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Information on supplement intakes - details",
                                        //"hideDescription": true,
                                        "description": "Provide any details on the supplement information that has been collected. E.g. Methodology (quantification, frequency, etc.), number, type, etc.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "foodList": {
                            "template": {
                                "title": "Food List"
                            },
                            "selectors": {
                                "foodCategorization": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Food categorization system used",
                                        //"hideDescription": true,
                                        "description": "Provide the name of the food categorization system(s) used to codify the food list of the survey. Describe the methods used, if any, to adapt the original food categorization system to the specific context of the survey.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "numberOfFood": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "numberOfFood",
                                                "label": "Number of different food items in the food list"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Number of different food items in the food list",
                                        //"hideDescription": true,
                                        "description": "Provide the number of unique different food items that have been reported as consumed in the dataset."
                                    },
                                    "format": {
                                        "output": "number"
                                    }
                                }
                            }
                        },
                        "portionSize": {
                            "template": {
                                "title": "Portion size estimation"
                            },
                            "selectors": {
                                "methodPortionSize": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Method used to estimate portion sizes",
                                        //"hideDescription": true,
                                        "description": "Describe methods, if any, that were used to prompt and facilitate estimation of the portion sizes by the respondents.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "recipe": {
                            "template": {
                                "title": "Recipes and mixed dishes"
                            },
                            "selectors": {
                                "recipeManagement": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Management of recipes and mixed dishes",
                                        //"hideDescription": true,
                                        "description": "Describe the way composite dishes and recipes were handled. E.g. individual or standard recipes, break-down into ingredients or reported as mixed dishes, estimation of quantities, use of yield factors, etc.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "quantityInfo": {
                            "template": {
                                "title": "Information on quantities"
                            },
                            "selectors": {
                                "quantityReported":{
                                    "cl": GIFT_QuantityReporting,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false
                                    },
                                    "template": {
                                        "title": "Quantities reported as",
                                        //"hideDescription": true,
                                        "description": "Provide information on the form(s) in which the food items, ingredients and recipe quantities are reported in the dataset. E.g. raw or processed (cooked) and whole or only edible parts. You can select several options.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "foodConsumptionDetail": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Other form of reporting quantities",
                                        //"hideDescription": true,
                                        "description": "Add a form of reporting quantities present in the dataset.",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        }
                    }
                },
                "foodCompositionInfo":{
                    "template": {
                        "title": "Food Composition Information"
                    },
                    "selectors": {
                        "foodConsumptionTable": {
                            "selector": {
                                "id": "textarea"
                            },
                            "template": {
                                "title": "Food composition table: Food composition table used",
                                //"hideDescription": true,
                                "description": "Provide reference to the food composition data that has been used to derive nutrient intake information from food consumption data. If several food composition tables were used, please reference them all.",
                            },
                            "format": {
                                "output": "label"
                            }
                        },
                        "foodConsumptionTableNumber": {
                            "selector": {
                                "id": "input",
                                "type": "number",
                                "source": [
                                    {
                                        "value": "foodConsumptionTableNumber",
                                        "label": "Number of food items reported in the composition table"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Food composition table: Number of food items reported in the composition table",
                                //"hideDescription": true,
                                "description": "Provide the total number of foods available in the food composition table."
                            },
                            "format": {
                                "output": "number"
                            }
                        },
                        "macronutrients":{
                            "cl": GIFT_Macronutrients,
                            "selector": {
                                "id": "dropdown",
                                "sort": false
                            },
                            "template": {
                                "title": " Macronutrients and dietary components: Macronutrients and dietary components available in the dataset",
                                //"hideDescription": true,
                                "description": "List macronutrients and dietary components for which dietary intake has been calculated in the dataset."
                            },
                            "format": {
                                "output": "codes"
                            }
                        },
                        "macronutrientDetails": {
                            "selector": {
                                id: "dropdown",
                                config: {
                                    plugins: ['remove_button'],
                                    delimiter: ',',
                                    persist: false,
                                    create: function (input) {
                                        return {value: input, text: input}
                                    }
                                },
                            },
                            "template": {
                                "title": " Macronutrients and dietary components: Additional macronutrients and dietary components available in the dataset",
                                // "hideDescription": true,
                                "description": "Add macronutrient or dietary component for which dietary intake has been calculated in the dataset.",
                            },
                            "format": {output: "macrondet"}
                        },
                        "micronutrient":{
                            "cl": GIFT_Micronutrients,
                            "selector": {
                                "id": "dropdown",
                                "sort": false
                            },
                            "template": {
                                "title": "Micronutrients: Micronutrients available in the dataset",
                                //"hideDescription": true,
                                "description": "List micronutrients for which dietary intake has been calculated in the dataset."
                            },
                            "format": {
                                "output": "codes"
                            }
                        },
                        "micronutrientDetails": {
                            "selector": {
                                id: "dropdown",
                                config: {
                                    plugins: ['remove_button'],
                                    delimiter: ',',
                                    persist: false,
                                    create: function (input) {
                                        return {value: input, text: input}
                                    }
                                },
                            },
                            "template": {
                                "title": "Micronutrients: Additional micronutrients and minerals available in the dataset",
                                // "hideDescription": true,
                                "description": "Add micronutrient for which dietary intake has been calculated in the dataset.",
                            },
                            "format": {output: "microndet"}
                        }
                    }
                },
                "additionalInfo":{
                    "template": {
                        "title": "Additional Information"
                    },
                    "sections": {
                        "additionalVariables": {
                            "template": {
                                "title": "Additional variables"
                            },
                            "selectors": {
                                "age":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Age (month or year) or birth date",
                                        "hideDescription": true

                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "sex":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Sex",
                                        "hideDescription": true
                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "weight":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Body weight (reported or measured)",
                                        "hideDescription": true
                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "height":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Body height (reported or measured)",
                                        "hideDescription": true
                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "activityLevel":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Physical activity level (estimated or measured)",
                                        "hideDescription": true
                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "interview":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Date of the interview (day, month, year)",
                                        "hideDescription": true
                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "gps":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Geographic localization (GPS)",
                                        "hideDescription": true
                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "socioDemographic":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Socio-demographic",
                                        "hideDescription": false,
                                        "description": "E.g. occupation, status in the household"
                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "education":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Education/literacy",
                                        "hideDescription": true
                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "ethnicity":{
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Ethnicity",
                                        "hideDescription": true
                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                }
                            }
                        },
                        "additionalAny": {
                            "template": {
                                "title": "Any additional information"
                            },
                            "selectors": {
                                "comment": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Comments",
                                        //"hideDescription": true,
                                        "description": "Add any other information related to the dataset."
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });