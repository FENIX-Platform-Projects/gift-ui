define(
    function () {

        var IANA = {uid: 'IANAcharacterSet'},
            GAUL = {uid: 'GAUL0', version: "2014"},
            Languages = {uid: 'ISO639-2', version: "1998"},
            TypeOfCollection = {uid: 'GIFT_TypeOfCollection' },
            StatusConfidenciality = {uid: 'GIFT_ConfidentialityStatus' },
            AreaOfReference = {uid: 'GIFT_ReferenceArea' },
            GIFT_StatisticalPopulation = {uid: 'GIFT_StatisticalPopulation'},
            GIFT_DataCollection = {uid: 'GIFT_DataCollection'},
            CoverageSector = {uid: 'GIFT_CoverageSector'},
            GIFT_Items = {uid: 'GIFT_Items' },
            //TODO
            GIFT_TypeOfResource = {uid: 'GIFT_ResourceType' },
            GIFT_AssessmentMethod = {uid: 'GIFT_DietaryMethod' },
            GIFT_QuantityReporting = {uid: 'GIFT_QuantityReporting'},
            GIFT_Macronutrients = {uid: 'GIFT_Macronutrients'},
            GIFT_Micronutrients = {uid: 'GIFT_Micronutrients'},
            YESNO = { uid: "YesNo" }

        return {

            "template": {
                "title": "Identification",
                "description": "Basic survey information"
            },

            "selectors": {
                "title": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "title",
                                "label": "Survey name"
                            }
                        ]
                    },
                    "template": {
                        "title": "Survey name",
                        "description": "Provide the name of the survey or the title of the study it was conducted for",

                    },
                    "format": {
                        "output": "label"
                    },
                    "constraints": {"presence": true}

                },
                "creationDate": {
                    "selector": {
                        "id": "time"
                    },
                    "template": {
                        "title": "Creation Date",
                        "description": "Creation date of the resource.",

                    },
                    "format": {
                        "output": "date"
                    },
                    "constraints": {"presence": true}
                },
                "language": {
                    "cl": Languages,
                    "selector": {
                        "id": "dropdown",
                        "default": ['eng']
                    },
                    "template": {
                        "title": "Language of the submitted dataset",
                        "description": "Specify the language used in the dataset for textual information (e.g. food names, recipe names)",

                    },
                    "format": {
                        "output": "codes"
                    },
                    "constraints": {"presence": true}
                },
                "languageDetails": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "languageDetails",
                                "label": "Dataset language - additional information"
                            }
                        ]
                    },
                    "template": {
                        "title": "Dataset language - additional information",
                        "description": "Provide comments and additional details about the language used for the dataset textual information. This field is addressed to highlight some particular characteristics of the language used in the dataset or its inconsistencies if any. For example to alert that the dataset contains textual information in some specific dialect or local language or that it is not completely homogeneous in the language used.",

                    },
                    "format": {
                        "output": "label"
                    }
                },
                "characterSet": {

                    "cl": IANA,

                    "selector": {
                        "id": "dropdown",
                        "default": ['106']
                    },

                    "template": {
                        "title": "Character-set",
                        "description": "Full name of the character coding standard used by the resource.",

                    },
                    "format": {
                        "output": "codes"
                    },

                    "constraints": {"presence": true}
                },
                "metadataStandardName": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "default": "FENIX",
                        "source": [
                            {
                                "value": "metadataStandardName",
                                "label": "Used metadata standard"
                            }
                        ]
                    },
                    "template": {
                        "title": "Used metadata standard",
                        "description": "Name of the metadata standard specifications used. In FENIX framework this field would be pre-compiled by 'FENIX'.",

                    },
                    "format": {
                        "output": "string"
                    },
                    "constraints": {"presence": true}
                },
                "metadataStandardVersion": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "default": "1.0",
                        "source": [
                            {
                                "value": "metadataStandardVersion",
                                "label": "Version of metadata standard"
                            }
                        ]
                    },
                    "template": {
                        "title": "Version of metadata standard",
                        "description": "Version of the metadata standard specifications used.",

                    },
                    "format": {
                        "output": "string"
                    }
                },
                "metadataLanguage": {
                    "cl": Languages,
                    "selector": {
                        "id": "dropdown",
                        "default": ['eng']
                    },
                    "template": {
                        "title": "Language(s) used for metadata",
                        "description": "Version of the metadata standard specifications used.",

                    },
                    "format": {
                        "output": "codes"
                    }
                },
                "noDataValue": {
                    "selector": {
                        "id": "input",
                        "type": "text",
                        "source": [
                            {
                                "value": "noDataValue",
                                "label": "Value assigned to missing values, if any"
                            }
                        ]
                    },
                    "template": {
                        "title": "Value assigned to missing values, if any",
                        "description": "Value assigned to the cells to represent the absence of data, e.g. \"NA\", \"000\".",

                    },
                    "format": {
                        "output": "string"
                    }
                },
                "contacts": {

                    classNames: "well",

                    template: {
                        title: "Contacts",
                        description: "Information on the person(s) to be contacted for further queries regarding the dataset and dataset analysis"
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
                                "description": "Provide the name of the organization the Contact Person represents"

                            },
                            "format": {
                                "output": "label"
                            }
                        },
                        "organizationUnit": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [{"value": "organizationUnit", "label": "Organization - Unit/Division"}]

                            },
                            "template": {
                                "title": "Organization - Unit/Division",
                                "description": "Specify the addressable subdivision within the organization"

                            },
                            "format": {
                                "output": "label"
                            }

                        },
                        "position": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [{"value": "organizationUnit", "label": "Designation"}]

                            },
                            "template": {
                                "title": "Designation",
                                "description": "Specify what is the Contact Person's role or the position."

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
                                "description": "Provide Contact Person's surname, given name, and the title separated by a delimiter."

                            },
                            "format": {
                                "output": "string"
                            }

                        },
                        "role": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [{"value": "role", "label": "Function/Role"}]
                            },
                            "template": {
                                "title": "Function/Role",
                                "description": "Specify what is the Contact Person's function performed concerning the dataset"

                            },
                            "format": {
                                "output": "label"
                            }

                        },
                        "specify": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [{"value": "specify", "label": "Specify"}]

                            },
                            "template": {
                                "title": "Specify",
                                "description": "Textual metadata element that allows to specify the role performed by the responsible party."
                            },
                            "format": {
                                "output": "label"
                            }

                        },

                        "phone": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [{"value": "phone", "label": "Telephone number"}]
                            },
                            "template": {
                                "title": "Telephone number",
                                "description": "Provide the telephone numbers at which the Contact Person or the Organisation may be contacted",

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
                                "description": "Provide the physical address at which the Contact Person or the organization may be contacted",

                            },
                            "format": {
                                "output": "template",
                                "path": "contactInfo.address"
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
                                "description": "Provide Contact Person's e-mail address",

                            },
                            "format": {
                                "output": "template",
                                "path": "contactInfo.emailAddress"
                            }
                        },
                        "contactInstruction": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [{"value": "contactInstruction", "label": "Additional information"}]
                            },
                            "template": {
                                "title": "Additional information",
                                "description": "Provide any supplemental instructions on how or when to liaise with the contact person or the organization",

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

                }
            },

            "sections": {

                "meContent": {
                    "title": "Content",
                    "description": "This section includes a summary of the content of the resource and the description of the geographical, time and sector coverage.",
                    "selectors": {
                        "keywords": {
                            "selector": {
                                "id": "input",
                                "type": "text"
                            },
                            "template": {
                                "title": "Keywords",
                                "description": "List commonly used word(s), formalized word(s) or phrase(s) used to describe the survey",

                            },
                            "format": {
                                "output": "array"
                            }

                        },
                        "description": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [
                                    {
                                        "value": "description",
                                        "label": "Objective of the data collection"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Objective of the data collection",
                                "description": "Provide a brief description of the main motivation leading to the data collection, e.g. need for information on food consumption, research questions.",

                            },
                            "format": {
                                "output": "label"
                            },
                            "constraints": {"presence": true}

                        },
                    },
                    "sections": {
                        "seReferencePopulation": {
                            "title": "Reference Population",
                            "selectors": {
                                "statisticalPopulation": {
                                    cl: GIFT_StatisticalPopulation,
                                    "selector": {
                                        "id": "dropdown"
                                    },
                                    "template": {
                                        "title": "Study population",
                                        "description": "Specify the population group which was the basis for sampling",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "referenceArea": {
                                    "cl": AreaOfReference,
                                    "selector": {
                                        "id": "dropdown"
                                    },
                                    "template": {
                                        "title": "Geographical/administrative coverage of the study",
                                        "description": "Specify what was the type of geographical or administrative units, within which the sampling was performed.",
                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                }
                            },
                            "validator": {
                                "valReferencePopulation": true
                            }
                        },
                        "seCoverage": {
                            "title": "Coverage",
                            "selectors": {
                                "coverageSectors": {
                                    "cl": CoverageSector,
                                    "selector": {
                                        "id": "dropdown"
                                    },
                                    "template": {
                                        "title": "Typology of the geographical area covered by the study",
                                        "description": "Rural and/or urban",
                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "coverageSectorsDetails": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{
                                            "value": "coverageSectorsDetails",
                                            "label": "Definition of rural and urban"
                                        }]
                                    },
                                    "template": {
                                        "title": "Definition of rural and urban",
                                        "description": "Provide criteria considered to define rural and urban areas for the data collection",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "coverageGeographic": {
                                    "cl": GAUL,
                                    "selector": {
                                        "id": "dropdown"
                                    },
                                    "template": {
                                        "title": "Study areas",
                                        "description": "Specify the geographical/administrative area(s) covered by the study",

                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "coverageTime": {
                                    "template": {
                                        "title": "Data collection period",
                                        "description": "Select the date on which data collection started and ended for this survey",
                                    },
                                    "incremental": true,
                                    "selectors": {
                                        "from" : {
                                            "selector": {
                                                "id": "time"
                                            },
                                            "template": {
                                                "title": "From"
                                            },
                                            "format": {
                                                "output": "date"
                                            },
                                            "constraints": {"presence": true}
                                        },
                                        "to": {
                                            "selector": {
                                                "id": "time"
                                            },
                                            "template": {
                                                "title": "To"
                                            },
                                            "format": {
                                                "output": "date"
                                            },
                                            "constraints": {"presence": true}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

                "meInstitutionalMandate": {
                    "title": "Institutional data sharing policy",
                    "selectors": {
                        "legalActsAgreements": {
                            "selector": {
                                "id": "input",
                                "type": "textarea",
                                "source": [
                                    {
                                        "value": "legalActsAgreements",
                                        "label": "Institutional data sharing policy"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Institutional data sharing policy",
                                "description": "Provide references (citations or website link) to legal acts or other formal or informal agreements regulating data sharing in the organisation/institution/firm that is the data owner",

                            },
                            "format": {
                                "output": "label"
                            }
                        },
                        "institutionalMandateDataSharing": {
                            "selector": {
                                "id": "input",
                                "type": "textarea",
                                "source": [
                                    {
                                        "value": "institutionalMandateDataSharing",
                                        "label": "Existing data sharing arrangements"
                                    }
                                ]
                            },
                            "template": {
                                "title": "Existing data sharing arrangements",
                                "description": "Provide references (citations or website link) to already existing data sharing agreements with other organisations/institutions/firms.",

                            },
                            "format": {
                                "output": "label"
                            }
                        }
                    }
                },
                "meStatisticalProcessing": {
                    "title": "Statistical Processing",
                    "sections": {
                        "seDataSource": {
                            "title": "Data source",
                            "sections": {
                                "sePrimaryDataCollection": {
                                    "title": "Primary Data Collection",
                                    "selectors": {
                                        "typeOfCollection": {
                                            "cl": TypeOfCollection,
                                            "selector": {
                                                "id": "dropdown"
                                            },
                                            "template": {
                                                "title": "Sample selection method",
                                                "description": "Name the method used in selecting the sample for the study.",

                                            },
                                            "format": {
                                                "output": "codes"
                                            },
                                            "constraints": {"presence": true}
                                        },
                                        "samplingProcedure": {
                                            "selector": {
                                                "id": "input",
                                                "type": "text",
                                                "source": [
                                                    {
                                                        "value": "samplingProcedure",
                                                        "label": "Sampling design"
                                                    }
                                                ]
                                            },
                                            "template": {
                                                "title": "Sampling design",
                                                "description": "Describe the procedure followed in order to select the study sample (clusters, level of representativeness,sample frame, etc.)",

                                            },
                                            "format": {
                                                "output": "label"
                                            }
                                        },
                                        "dataCollection": {
                                            "cl": GIFT_DataCollection,
                                            "selector": {
                                                "id": "dropdown",
                                                "default": ["1"]
                                            },
                                            "template": {
                                                "title": "Survey administration method",
                                                "description": "Name the method used to gather data from the respondents during the interview (e.g. paper questionnaire, electronic questionnaire)",

                                            },
                                            "format": {
                                                "output": "codes"
                                            }
                                        },
                                        "organization": {
                                            "selector": {
                                                "id": "input",
                                                "type": "textarea",
                                                "source": [
                                                    {
                                                        "value": "organization",
                                                        "label": "Name of the organisation who performed the field work"
                                                    }
                                                ]
                                            },
                                            "template": {
                                                "title": "Name of the organisation who performed the field work",
                                                "description": "Provide the name of the institution/organisation/firm who coordinated the field work. By field work it is understood data collection, logistic, tools for data collection, enumerator's training, etc.",

                                            },
                                            "format": {
                                                "output": "label"
                                            },
                                            "constraints": {"presence": true}
                                        },
                                    }
                                }
                            }
                        },
                        "seDataCompilation": {
                            "title": "Data Compilation",
                            "selectors": {
                                "missingData": {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "missingData",
                                                "label": "Actions taken in case of missing data"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Missing data",
                                        "description": "Describe actions (if any) taken in case of missing data, under which circumstance missing data were estimated or imputed and when the cells were left without entries.",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "weights": {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "weights",
                                                "label": "Use of sample weights"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Use of sample weights",
                                        "description": "Describe the weights system (if any) used in order to produce accurate statistical results. In case sample weights were used in the study, describe the criteria for using weights in analysis, e.g. the formulas and coefficients developed and how they were applied to data",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "dataAdjustment": {
                                    "selector": {
                                        "id": "textarea",
                                        "type": "text",
                                        "source": [{"value": "dataAdjustment", "label": "Any other alteration from the original data"}]
                                    },
                                    "template": {
                                        "title": "Any other alteration from the original data",
                                        "description": "Report (if any) any adjustments or alterations of the original dataset",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                }
                            }
                        }
                    }
                },
                "meAccessibility": {
                    "title": "Confidentiality",
                    "sections": {
                        "seConfidentiality": {
                            "title": "Confidentiality",
                            "description": "This section information on the level of confidentiality and the applied policy for releasing the resource. This metadata sub-entity concerns legislation (or any other formal provision) related to statistical confidentiality applied to the resource as well as the actual confidentiality data treatment applied (also with regard to the aggregated data disseminated).",
                            "selectors": {
                                "confidentialityStatus": {
                                    "cl": StatusConfidenciality,
                                    "selector": {
                                        "id": "dropdown",
                                        "default": ["1"]
                                    },
                                    "template": {
                                        "title": "Availability of the dataset",
                                        "description": "Coded information describing the status of the dataset towards FAO/WHO GIFT and setting the public visibility on the web platform.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                }
                            }
                        }
                    }

                },
                "meMaintenance": {
                    "title": "Maintenance",
                    "description": "This section provides information about the frequency of resource upgrade and metadata maintenance.",
                    "sections": {
                        "seMetadataMaintenance": {
                            "title": "Metadata Maintenance",
                            "description": "This section involves maintenance operations concerning the periodic update of metadata to ensure that the resource is properly described.",
                            "selectors": {
                                "metadataLastUpdate": {
                                    "selector": {
                                        "id": "time"
                                    },
                                    "template": {
                                        "title": "Metadata last update",
                                        "description": "Most recent date of update of the metadata.",

                                    },
                                    "format": {
                                        "output": "date"
                                    }
                                }
                            }
                        }
                    }
                },

                "additions": {
                    "template": {
                        "title": "Free extension area",
                    },
                    "sections": {
                        "GeneralInformation" : {
                            "template": {
                                "title": "General Information",
                            },
                            "selectors": {
                                "ResourceType" : {
                                    "cl": GIFT_TypeOfResource,
                                    "selector": {
                                        "id": "dropdown",
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "template": {
                                        "title": "Type of resource",
                                        "description": "List datasets, reports, publications and other types of documents which provide information and/or were derived from the survey and the data",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "ResourceDetails" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "ResourceDetails",
                                                "label": "Type of resource - details"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "ResourceType" : [{id : "readOnlyIfNotValue", event: "select", args : {value : "other"}}]
                                    },
                                    "template": {
                                        "title": "Type of resource - details",
                                        "description": "Provide detailed information on the resources listed above",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "ResourceCite" : {
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
                                        "description": "Specify the preferred way to cite the resource listed above",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "ResourceLink" : {
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
                                        "description": "Provide links under which the resource listed above can be accessed, or information on how else it can be accessed",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "SurveyInformation" : {
                            "template": {
                                "title": "Survey information",
                            },
                            "selectors": {
                                "SeasonsCoverage" : {
                                    "selector": {
                                        "id": "textarea",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "SeasonsCoverage",
                                                "label": "Seasons coverage"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Seasons coverage",
                                        "description": "List the seasons covered by the survey (e.g. spring, rainy season, lean season, etc.)",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "AssessmentMethod" : {
                                    "cl": GIFT_AssessmentMethod,
                                    "selector": {
                                        "id": "dropdown",
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "template": {
                                        "title": "Dietary assessment method",
                                        "description": "Specify the main dietary assessment method used for data collection",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "AssessmentMethodDetails" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "AssessmentMethodDetails",
                                                "label": "Dietary assessment method - details"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "AssessmentMethod" : [{id : "readOnlyIfNotValue", event: "select", args : {value : "other"}}]
                                    },
                                    "template": {
                                        "title": "Dietary assessment method - details",
                                        "description": "Provide detailed information on the main dietary assessment and, if relevant, complementary dietary assessment methods used for data collection",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "RepeatedDietary" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source": YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "template": {
                                        "title": "Repeated dietary recall/record",
                                        "description": "Provide information whether or not the dietary recall/record was repeated on the same individuals during the study",

                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": { "presence": true }
                                },
                                "SizeOfSample": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "SizeOfSample",
                                                "label": "Size of the sample on which the recall/record was repeated"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "RepeatedDietary" : [{id : "readOnlyIfNotValue", event: "select", args : {value : true}}]
                                    },
                                    "template": {
                                        "title": "Size of the sample on which the recall/record was repeated",
                                        "description": "Specify on how many respondents the dietary recall/record was repeated. This could be presented as a number of respondents or a percentage of the total number of respondents.",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "NumberOfRepeated" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "NumberOfRepeated",
                                                "label": "Number of repeated recalls/records per subject"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "RepeatedDietary" : [{id : "readOnlyIfNotValue", event: "select", args : {value : true}}]
                                    },
                                    "template": {
                                        "title": "Number of repeated recalls/records per subject",
                                        "description": "Specify how many times was the dietary recall/record repeated on each subject",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "AverageTime" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "AverageTime",
                                                "label": "Average time interval between subsequent recalls/records"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "RepeatedDietary" : [{id : "readOnlyIfNotValue", event: "select", args : {value : true}}]
                                    },
                                    "template": {
                                        "title": "Average time interval between subsequent recalls/records",
                                        "description": "Specify what was the average time interval between the following the dietary recalls/records",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "SampledPopulationInformation" : {
                            "template": {
                                "title": "Sampled population information",
                            },
                            "selectors": {
                                "SampleSize": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "SampleSize",
                                                "label": "Sample size"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Sample size",
                                        "description": "Total number of subjects for which at least one dietary recall/record was collected",

                                    },
                                    "format": {
                                        "output": "label"
                                    },
                                    "constraints": {"presence": true }
                                },
                                "PopulationGroups": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "PopulationGroups",
                                                "label": "Specific population groups surveyed"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "statisticalPopulation" : [{id : "readOnlyIfNotValue", event: "select", args : {value : 2}}]
                                    },
                                    "template": {
                                        "title": "Specific population groups surveyed",
                                        "description": "List the specific population groups that have been covered by the study (e.g. women in reproductive age, children under 5 years, elderly, etc.)",

                                    },
                                    "format": {
                                        "output": "array"
                                    }
                                },
                                "SampleSizeGroups": {
                                    "selector": {
                                        "id": "input",
                                        "type": "numeric",
                                        "source": [ {
                                                "value": "SampleSizeGroups",
                                                "label": "Sample size of the specific population group surveyed"
                                        } ],
                                        "config": { "readonly": true }
                                    },
                                    "template": {
                                        "title": "Sample size of the specific population group surveyed",
                                        "description": "Provide the sample size of the specific population group added above",

                                    },
                                    "format": {
                                        "output": "label"
                                    },
                                    "dependencies": {
                                        "RepeatedDietary" : [{id : "readOnlyIfNotValue", event: "select", args : {value : true}}]
                                    }
                                },
                                "PurposedlyGroups": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "title",
                                                "label": "Purposedly over-sampled population groups"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Purposedly over-sampled population groups",
                                        "description": "List population groups (if any) that have been purposely oversampled in order to limit the sample size, or improve the representativeness of the study for this populations (e.g. pregnant women, lactating women, children under 5 years)",

                                    },
                                    "format": {
                                        "output": "array"
                                    }
                                },
                                "PurposedlyGroupsDetails": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "title",
                                                "label": "Purposedly over-sampled population groups - details"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "PurposedlyGroups" : [{id : "readOnlyIfNotValue", event: "select", args : {value : ''}}]
                                    },
                                    "template": {
                                        "title": "Purposedly over-sampled population groups - details",
                                        "description": "Provide details on the purposely oversampled groups and the reasons for oversampling",

                                    },
                                    "format": {
                                        "output": "array"
                                    }
                                },
                                "MinumumAge": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "MinumumAge",
                                                "label": "Minimum age in the dataset (in years)"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Minimum age in the dataset (in years)",
                                        "description": "Provide the age of the youngest individual whose food consumption data is included in the dataset",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "MaximumAge": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "MaximumAge",
                                                "label": "Maximum age in the dataset (in years)"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Maximum age in the dataset (in years)",
                                        "description": "Provide the age of the oldest individual whose food consumption data is included in the dataset",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "DataAnalysisInformation" : {
                            "template": {
                                "title": "Data analysis information",
                            },
                            "selectors": {
                                "ExclusionRecruitment": {
                                    "selector": {
                                        "id": "textarea",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "ExclusionRecruitment",
                                                "label": "Exclusion criteria during recruitment"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Exclusion criteria during recruitment",
                                        "description": "Describe the exclusion criteria (if any) which were applied during sample selection in order to exclude respondents whose data could potentially bias results of the study",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "ExclusionDataCleaning": {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "ExclusionDataCleaning",
                                                "label": "Exclusion criteria during data cleaning"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Exclusion criteria during data cleaning",
                                        "description": "Describe the exclusion criteria (if any) which were applied during data cleaning in order to exclude recalls/records which could potentially bias results of the study",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "MethodReporting": {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "MethodReporting",
                                                "label": "Method used to assess over-/under-reporting"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Method used to assess over-/under-reporting",
                                        "description": "Describe methods (if any) that were used to assess unreliably low or high food intake data from the collected recalls/records",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "PercentageUnderReporting": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "PercentageUnderReporting",
                                                "label": "Percentage of under-reporting at individual level"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Percentage of under-reporting at individual level",
                                        "description": "Report the percentage of individuals in the sample, whose data was identified as under-reported according to the applied methods of assessing under and over-reporting",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "PercentageOverReporting": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "PercentageOverReporting",
                                                "label": "Percentage of over-reporting at individual level"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Percentage of over-reporting at individual level",
                                        "description": "Report the percentage of individuals in the sample, whose data was identified as over-reported according to the applied methods of assessing under and over-reporting",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "DataAlreadyCorrected": {
                                    "selector": {
                                        "id": "dropdown",
                                        "source": YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "template": {
                                        "title": "Data already corrected to assess usual intake",
                                        "description": "Provide information whether or not the data has been processed/manipulated in order to show usual intake",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "AssessmentIntake": {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "AssessmentIntake",
                                                "label": "Assessment of usual intake"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "DataAlreadyCorrected" : [{id : "readOnlyIfNotValue", event: "select", args : {value : true}}]
                                    },
                                    "template": {
                                        "title": "Assessment of usual intake",
                                        "description": "Describe the procedures (if any) applied to the dataset in order to obtain information on usual intake",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "FoodConsumptionInformation" : {
                            "template": {
                                "title": "Food consumption information",
                            },
                            "selectors": {
                                "FoodCoverageTotal" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source": YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "template": {
                                        "title": "Total food coverage",
                                        "description": "Provide information whether or not the survey covered whole diet, or it excluded some foods or food groups",

                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "constraints": {"presence": true }
                                },
                                "FoodCoverageDetails" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "FoodCoverageDetails",
                                                "label": "Food coverage - details"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "FoodCoverageTotal" : [{id : "readOnlyIfNotValue", event: "select", args : {value : false}}]
                                    },
                                    "template": {
                                        "title": "Food coverage - details",
                                        "description": "Specify which foods or food groups (if any) were not covered by the study",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "DrinkingWater" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source": YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "template": {
                                        "title": "Quantification of drinking water",
                                        "description": "Provide information whether or not water drunk by the respondents has been quantified in the study",

                                    },
                                    "format": {
                                        "output": "label"
                                    },
                                    "constraints": {"presence": true }
                                },
                                "SupplementInformation" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source": YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "template": {
                                        "title": "Information on supplement intakes",
                                        "description": "Provide information whether or not the information on the use/consumption of dietary supplements has been collected",

                                    },
                                    "format": {
                                        "output": "label"
                                    },
                                    "constraints": {"presence": true }
                                },
                                "SupplementInformationDetails" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "SupplementInformationDetails",
                                                "label": "Information on supplement intakes - details"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "SupplementInformation" : [{id : "readOnlyIfNotValue", event: "select", args : {value : true}}]
                                    },
                                    "template": {
                                        "title": "Information on supplement intakes - details",
                                        "description": "Provide information whether or not the information on the use/consumption of dietary supplements has been collected",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "NumberOfFood" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "NumberOfFood",
                                                "label": "Number of different food items in the food list"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Number of different food items in the food list",
                                        "description": "Provide the number of unique different food items that have been reported as consumed in the dataset",

                                    },
                                    "format": {
                                        "output": "label"
                                    },
                                    "constraints": {"presence": true }
                                },
                                "PortionSizes" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "PortionSizes",
                                                "label": "Method used to estimate portion sizes"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Method used to estimate portion sizes",
                                        "description": "Describe methods (if any) which were used to prompt and facilitate estimating the portion size of the recalled foods by the respondents",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "RecipesManagement" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "RecipesManagement",
                                                "label": "Management of recipes and mixed dishes"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Management of recipes and mixed dishes",
                                        "description": "Describe the way composite dishes and recipes were handled, e.g. individual or standard recipes, break-down into ingredients or reported as mixed dishes, estimation of quantities, use of yield factors, etc.",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "QuantitiesReported" : {
                                    "cl": GIFT_QuantityReporting,
                                    "selector": {
                                        "id": "dropdown"
                                    },
                                    "template": {
                                        "title": "Quantities reported as",
                                        "description": "Provide information on the form in which the food item, ingredient and recipe quantities are reported in the dataset, e.g. raw or processed (cooked) and whole or only edible parts",

                                    },
                                    "format": {
                                        "output": "label"
                                    },
                                    "constraints": {"presence": true }
                                },
                                "QuantitiesReportedDetails" : {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "QuantitiesReportedDetails",
                                                "label": "Quantities reported as - details"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "QuantitiesReported" : [{id : "readOnlyIfNotValue", event: "select", args : {value : true}}]
                                    },
                                    "template": {
                                        "title": "Quantities reported as - details",
                                        "description": "",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "FoodCompositionInformation" : {
                            "template": {
                                "title": "Food composition information",
                            },
                            "selectors": {
                                "rolex": {
                                    enumeration: YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        config: {
                                            maxItems: 1
                                        }
                                    },

                                    "format": {
                                        "output": "label"
                                    }

                                },

                                "specify": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [{"value": "specify", "label": "Specify"}],
                                        config: {
                                            readonly: true
                                        }

                                    },

                                    "format": {
                                        "output": "label"
                                    },
                                    dependencies: {
                                        rolex: [{id: "readOnlyIfNotValue", event: "select", args: {value: "Yes"}}]
                                    },

                                },
                                "FoodComsumption": {
                                    "selector": {
                                        "id": "input",
                                        "type": "textarea",
                                        "source": [
                                            {
                                                "value": "FoodComsumption",
                                                "label": "Food composition table used"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Food composition table used",
                                        "description": "Provide reference to the food composition data which has been used to derive nutrient intake information from food consumption data. If several food composition tables were, please reference them all.",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "NumberOfFood": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "NumberOfFood",
                                                "label": "Number of food items reported in the composition table"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Number of food items reported in the composition table",
                                        "description": "Provide the final number of food for which food composition data was compiled in order to derive nutrient intake information from food consumption data",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "MacroDietaryComponents": {
                                    "cl": GIFT_Macronutrients,
                                    "selector": {
                                        "id": "dropdown"
                                    },
                                    "template": {
                                        "title": "Macronutrients and dietary components available in the dataset",
                                        "description": "List macronutrients and dietary components for which dietary intake has been calculated in the dataset",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "MacroDietaryComponentsDetails": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "MacroDietaryComponentsDetails",
                                                "label": "Macronutrients and dietary components available in the dataset - details"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    dependencies: {
                                        MacroDietaryComponents: [{id: "readOnlyIfNotValue", event: "select", args: {value: "other"}}]
                                    },
                                    "template": {
                                        "title": "Macronutrients and dietary components available in the dataset - details",
                                        "description": "List additional macronutrients and dietary components reported here above as 'other'",

                                    },
                                    "format": {
                                        "output": "array"
                                    }
                                },
                                "MicroDietaryComponents": {
                                    "cl": GIFT_Micronutrients,
                                    "selector": {
                                        "id": "dropdown",
                                    },
                                    "template": {
                                        "title": "Micronutrients available in the dataset",
                                        "description": "List micronutrients for which dietary intake has been calculated in the dataset",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                },
                                "MicroDietaryComponentsDetails": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "MicroDietaryComponentsDetails",
                                                "label": "Micronutrients and minerals available in the dataset - details"
                                            }
                                        ],
                                        "config": { "readonly": true }
                                    },
                                    "dependencies": {
                                        "MicroDietaryComponents" : [{id : "readOnlyIfNotValue", event: "select", args : {value : 13}}]
                                    },
                                    "template": {
                                        "title": "Micronutrients and minerals available in the dataset - details",
                                        "description": "List additional micronutrients reported here above as 'other'",

                                    },
                                    "format": {
                                        "output": "array"
                                    }
                                }
                            }
                        },

                        "AdditionalInformation" : {
                            "template": {
                                "title": "Additional information",
                            },
                            "selectors": {
                                "Age" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "constraints": {"presence": true },
                                    "template": {
                                        "title": "Age"
                                    }
                                },
                                "Sex" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "constraints": {"presence": true },
                                    "template": {
                                        "title": "Sex"
                                    }
                                },
                                "BodyWeight" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "constraints": {"presence": true },
                                    "template": {
                                        "title": "BodyWeight"
                                    }
                                },
                                "BodyHeight" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "constraints": {"presence": true },
                                    "template": {
                                        "title": "BodyHeight"
                                    }
                                },
                                "PhysicalActivityLevel" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "constraints": {"presence": true },
                                    "template": {
                                        "title": "PhysicalActivityLevel"
                                    }
                                },
                                "InterviewDate" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "constraints": {"presence": true },
                                    "template": {
                                        "title": "InterviewDate"
                                    }
                                },
                                "GeographicalLocalization" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "constraints": {"presence": true },
                                    "template": {
                                        "title": "GeographicalLocalization"
                                    }
                                },
                                "SocioDemographic" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "template": {
                                        "title": "SocioDemographic"
                                    }
                                },
                                "EducationLiteracy" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "template": {
                                        "title": "EducationLiteracy"
                                    }
                                },
                                "Ethnicity" : {
                                    "selector": {
                                        "id": "dropdown",
                                        "source" : YESNO,
                                        "config" : { "maxItems" : 1 }
                                    },
                                    "format": {
                                        "output": "boolean"
                                    },
                                    "template": {
                                        "title": "Ethnicity"
                                    }
                                }
                            }
                        }

                    }

                }
            }
        }

    });

