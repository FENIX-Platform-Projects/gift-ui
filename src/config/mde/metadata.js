define(
    function () {

        var ROLE = {uid: "ResponsiblePartyRole"},
            GAUL = {uid: 'GAUL0', version: "2014"},
            DataAdjustment = {uid: 'CL_ADJUSTMENT', version: "1.1"},
            Languages = {uid: 'GIFT_ISO639-2', version: "1998"},
            TypeOfCollection = {uid: 'GIFT_TypeOfCollection'},
            StatusConfidenciality = {uid: 'GIFT_ConfidentialityStatus'},
            AreaOfReference = {uid: 'GIFT_ReferenceArea'},
            GIFT_StatisticalPopulation = {uid: 'GIFT_StatisticalPopulation'},
            GIFT_DataCollection = {uid: 'GIFT_DataCollection'},
            CoverageSector = {uid: 'GIFT_CoverageSector'},
            GIFT_Items = {uid: 'GIFT_Items'},
            GIFT_TypeOfResource = {uid: 'GIFT_ResourceType'},
            GIFT_AssessmentMethod = {uid: 'GIFT_DietaryMethod'},
            GIFT_QuantityReporting = {uid: 'GIFT_QuantityReporting'},
            GIFT_Macronutrients = {uid: 'GIFT_Macronutrients'},
            GIFT_Micronutrients = {uid: 'GIFT_Micronutrients'},
            YESNO = {uid: "YesNo"};

        return {

            "template": {
                "title": "Identification",
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
                        "hideDescription": true,
                        "footer": "Resource identifier. It is a code that creates the match between the resource and the metadata it is associated to."
                    },
                    "format": {
                        "output": "string"
                    }
                },
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
                        "hideDescription": true,
                        "footer": "Provide the name of the survey or the title of the study it was conducted for"
                    },
                    "format": {
                        "output": "label"
                    },
                    "constraints": {"presence": true}

                },
                /*
                 "creationDate": {
                 "selector": {
                 "id": "time"
                 },
                 "template": {
                 "title": "Creation Date",
                 "hideDescription": true,
                 "footer": "Creation date of the resource.",

                 },
                 "format": {
                 "output": "date"
                 },
                 "constraints": {"presence": true}
                 },
                 */
                "language": {
                    "cl": Languages,
                    "selector": {
                        "id": "dropdown",
                        "config": {"maxItems": 1},
                        "default": ['eng'],
                        "sort": false,
                    },
                    "template": {
                        "title": "Language of the submitted dataset",
                        "hideDescription": true,
                        "footer": "Specify the language used in the dataset for textual information (e.g. food names, recipe names)",
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
                        "hideDescription": true,
                        "footer": "Provide comments and additional details about the language used for the dataset textual information. This field is addressed to highlight some particular characteristics of the language used in the dataset or its inconsistencies if any. For example to alert that the dataset contains textual information in some specific dialect or local language or that it is not completely homogeneous in the language used.",

                    },
                    "format": {
                        "output": "label"
                    }
                },
                /*
                 "characterSet": {

                 "cl": IANA,

                 "selector": {
                 "id": "dropdown",
                 "default": ['106']
                 },

                 "template": {
                 "title": "Character-set",
                 "hideDescription": true,
                 "footer": "Full name of the character coding standard used by the resource.",

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
                 "hideDescription": true,
                 "footer": "Name of the metadata standard specifications used. In FENIX framework this field would be pre-compiled by 'FENIX'.",

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
                 "hideDescription": true,
                 "footer": "Version of the metadata standard specifications used.",

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
                 "hideDescription": true,
                 "footer": "Version of the metadata standard specifications used.",

                 },
                 "format": {
                 "output": "codes"
                 }
                 },
                 */
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
                        "hideDescription": true,
                        "footer": "Value assigned to the cells to represent the absence of data, e.g. \"NA\", \"000\".",

                    },
                    "format": {
                        "output": "string"
                    }
                },
                "contacts": {

                    classNames: "well",

                    template: {
                        title: "Contact(s)",
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
                                "hideDescription": true,
                                "footer": "Provide the name of the organization the Contact Person represents"

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
                                "hideDescription": true,
                                "footer": "Specify the addressable subdivision within the organization"

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
                                "hideDescription": true,
                                "footer": "Specify what is the Contact Person's role or the position."

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
                                "hideDescription": true,
                                "footer": "Provide Contact Person's surname, given name, and the title separated by a delimiter."

                            },
                            "format": {
                                "output": "string"
                            },
                            "constraints": {"presence": true}

                        },
                        "role": {
                            enumeration: ROLE,
                            "selector": {
                                "id": "dropdown",
                                config: {
                                    maxItems: 1
                                }
                            },
                            "template": {
                                "title": "Function/Role",
                                "hideDescription": true,
                                "footer": "Specify what is the Contact Person's function performed concerning the dataset"
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
                                "hideDescription": true,
                                "footer": "Textual metadata element that allows to specify the role performed by the responsible party."
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
                                "hideDescription": true,
                                "footer": "Provide the telephone numbers at which the Contact Person or the Organisation may be contacted",

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
                                "hideDescription": true,
                                "footer": "Provide the physical address at which the Contact Person or the organization may be contacted",

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
                                "hideDescription": true,
                                "footer": "Provide Contact Person's e-mail address",

                            },
                            "format": {
                                "output": "template",
                                "path": "contactInfo.emailAddress"
                            },
                            "constraints": {"presence": true}
                        },
                        "contactInstruction": {
                            "selector": {
                                "id": "input",
                                "type": "text",
                                "source": [{"value": "contactInstruction", "label": "Additional information"}]
                            },
                            "template": {
                                "title": "Additional information",
                                "hideDescription": true,
                                "footer": "Provide any supplemental instructions on how or when to liaise with the contact person or the organization",

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
                                "hideDescription": true,
                                "footer": "List commonly used word(s), formalized word(s) or phrase(s) used to describe the survey",

                            },
                            "format": {
                                "output": "array"
                            }

                        },
                        "description": {
                            "selector": {
                                "id": "textarea",
                            },
                            "template": {
                                "title": "Objective of the data collection",
                                "hideDescription": true,
                                "footer": "Provide a brief description of the main motivation leading to the data collection, e.g. need for information on food consumption, research questions.",

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
                                "referenceArea": {
                                    "cl": AreaOfReference,
                                    "selector": {
                                        "id": "dropdown",
                                        "config": {"maxItems": 1},
                                        "sort": false,
                                    },
                                    "template": {
                                        "title": "Geographical/administrative coverage of the study",
                                        "hideDescription": true,
                                        "footer": "Specify what was the type of geographical or administrative units, within which the sampling was performed.",
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
                                        "id": "dropdown",
                                        "config": {"maxItems": 1},
                                        "default": ["3"],
                                        "sort": false,
                                    },
                                    "template": {
                                        "title": "Typology of the geographical area covered by the study",
                                        "hideDescription": true,
                                        "footer": "Rural and/or urban",
                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "coverageSectorsDetails": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Definition of rural and urban",
                                        "hideDescription": true,
                                        "footer": "Provide criteria considered to define rural and urban areas for the data collection",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "coverageTime": {
                                    classNames: "row fx-boxed",
                                    "template": {
                                        "title": "Data collection period",
                                        "hideDescription": true,
                                        "footer": "Select the date on which data collection started and ended for this survey",
                                    },
                                    "format": {
                                        "output": "period"
                                    },
                                    selectors: {
                                        from: {
                                            template: {title: "From"},
                                            classNames: "col-xs-6",
                                            selector: {
                                                id: "time"
                                            },
                                            "constraints": {"presence": true}

                                        },
                                        to: {
                                            template: {title: "To"},
                                            classNames: "col-xs-6",
                                            selector: {
                                                id: "time"
                                            },
                                            "constraints": {"presence": true}
                                        }
                                    }
                                },
                                "coverageGeographic": {
                                    "cl": GAUL,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Study areas",
                                        "hideDescription": true,
                                        "footer": "Specify the geographical/administrative area(s) covered by the study",

                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "constraints": {"presence": true}
                                }

                            }
                        }
                    }
                },
                "meInstitutionalMandate": {
                    "template": {
                        "title": "Institutional data sharing policy"
                    },
                    "selectors": {
                        "legalActsAgreements": {
                            "selector": {
                                "id": "textarea"
                            },
                            "template": {
                                "title": "Institutional data sharing policy",
                                "hideDescription": true,
                                "footer": "Provide references (citations or website link) to legal acts or other formal or informal agreements regulating data sharing in the organisation/institution/firm that is the data owner",

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
                                "title": "Existing data sharing arrangements",
                                "hideDescription": true,
                                "footer": "Provide references (citations or website link) to already existing data sharing agreements with other organisations/institutions/firms.",

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
                            "sections": {
                                "sePrimaryDataCollection": {
                                    "title": "Primary Data Collection",
                                    "selectors": {
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
                                                "hideDescription": true,
                                                "footer": "Describe the procedure followed in order to select the study sample (clusters, level of representativeness,sample frame, etc.)",

                                            },
                                            "format": {
                                                "output": "label"
                                            }
                                        }
                                    }
                                },
                                "seSecondaryDataCollection": {
                                    "title": "Secondary Data Collection",
                                    "selectors": {
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
                                                "hideDescription": true,
                                                "footer": "Provide the name of the institution/organisation/firm who coordinated the field work. By field work it is understood data collection, logistic, tools for data collection, enumerator's training, etc.",

                                            },
                                            "format": {
                                                "output": "label"
                                            },
                                            "constraints": {"presence": true}
                                        }
                                    }
                                }
                            }
                        },
                        "seDataCompilation": {
                            "title": "Data Compilation",
                            "selectors": {
                                "missingData": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Actions taken in case of missing data",
                                        "hideDescription": true,
                                        "footer": "Describe actions (if any) taken in case of missing data, under which circumstance missing data were estimated or imputed and when the cells were left without entries",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "weights": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Use of sample weights",
                                        "hideDescription": true,
                                        "footer": "Describe the weights system (if any) used in order to produce accurate statistical results. In case sample weights were used in the study, describe the criteria for using weights in analysis, e.g. the formulas and coefficients developed and how they were applied to data",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "dataAdjustment": {
                                    "cl": DataAdjustment,
                                    "selector": {
                                        "id": "dropdown"
                                    },
                                    "format": {
                                        "output": "codes"
                                    },
                                    "template": {
                                        "title": "Any other alteration from the original data",
                                        "hideDescription": true,
                                        "footer": "Report (if any) any adjustments or alterations of the original dataset",
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
                                        "config": {"maxItems": 1},
                                        "default": ["1"],
                                        "sort": false,
                                    },
                                    "template": {
                                        "title": "Availability of the dataset",
                                        "hideDescription": true,
                                        "footer": "Coded information describing the status of the dataset towards FAO/WHO GIFT and setting the public visibility on the web platform.",

                                    },
                                    "format": {
                                        "output": "codes"
                                    }
                                }
                            }
                        }
                    }

                },
                /*
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
                 "hideDescription": true,
                 "footer": "Most recent date of update of the metadata.",

                 },
                 "format": {
                 "output": "date"
                 }
                 }
                 }
                 }
                 }
                 },
                 */
                "additions": {
                    "template": {
                        "title": "Free extension area"
                    },
                    "sections": {
                        "GeneralInformation": {
                            "template": {
                                "title": "General Information",
                            },
                            "selectors": {
                                "Resource": {
                                    "template": {
                                        "title": "Data, survey reports, publications and scientific papers related to the data"
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
                                                "hideDescription": true,
                                                "footer": "List datasets, reports, publications and other types of documents which provide information and/or were derived from the survey and the data",

                                            },
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        },
                                        "ResourceDetails": {
                                            "selector": {
                                                "id": "input",
                                                "type": "text",
                                                "source": [
                                                    {
                                                        "value": "ResourceDetails",
                                                        "label": "Type of resource - details"
                                                    }
                                                ],
                                                //"config": {"readonly": true}
                                            },
                                            /*
                                             "dependencies": {
                                             "ResourceType": [{
                                             event: 'select',
                                             id: 'readOnlyIfNotValue',
                                             args: {value: "5"}
                                             }]
                                             },
                                             */
                                            "template": {
                                                "title": "Type of resource - details",
                                                "hideDescription": true,
                                                "footer": "Provide detailed information on the resources listed above",

                                            },
                                            "format": {
                                                "output": "label"
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
                                                "hideDescription": true,
                                                "footer": "Specify the preferred way to cite the resource listed above",

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
                                                "hideDescription": true,
                                                "footer": "Provide links under which the resource listed above can be accessed, or information on how else it can be accessed",

                                            },
                                            "format": {
                                                "output": "label"
                                            }
                                        }
                                    },
                                    "format": {
                                        "output": "array<resource>"
                                    }
                                }
                            }
                        },
                        "SurveyInformation": {
                            "template": {
                                "title": "Survey information",
                            },
                            "selectors": {
                                "GeographicalCoverageDetails": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Geographical/administrative coverage of the study - details",
                                        "hideDescription": true,
                                        "footer": "Specify other geographical/administrative coverage",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "StudyAreasDetails": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Study areas - Details",
                                        "hideDescription": true,
                                        "footer": "Provide detailed information on the study area(s)",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "SeasonsCoverage": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Seasons coverage",
                                        "hideDescription": true,
                                        "footer": "List the seasons covered by the survey (e.g. spring, rainy season, lean season, etc.)",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "AssessmentMethod": {
                                    "cl": GIFT_AssessmentMethod,
                                    "selector": {
                                        "id": "dropdown",
                                        "config": {"maxItems": 1},
                                        "sort": false,
                                    },
                                    "template": {
                                        "title": "Dietary assessment method",
                                        "hideDescription": true,
                                        "footer": "Specify the main dietary assessment method used for data collection",

                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "AssessmentMethodDetails": {
                                    "selector": {
                                        "id": "textarea"
                                    },
                                    "template": {
                                        "title": "Dietary assessment method - details",
                                        "hideDescription": true,
                                        "footer": "Provide detailed information on the main dietary assessment and, if relevant, complementary dietary assessment methods used for data collection",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "RepeatedDietary": {
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Repeated dietary recall/record",
                                        "hideDescription": true,
                                        "footer": "Provide information whether or not the dietary recall/record was repeated on the same individuals during the study",

                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
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
                                        "config": {"readonly": true}
                                    },
                                    "dependencies": {
                                        "RepeatedDietary": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "yes"}
                                        }]
                                    },
                                    "template": {
                                        "title": "Size of the sample on which the recall/record was repeated",
                                        "hideDescription": true,
                                        "footer": "Specify on how many respondents the dietary recall/record was repeated. This could be presented as a number of respondents or a percentage of the total number of respondents.",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "NumberOfRepeated": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "NumberOfRepeated",
                                                "label": "Number of repeated recalls/records per subject"
                                            }
                                        ],
                                        "config": {"readonly": true}
                                    },
                                    "dependencies": {
                                        "RepeatedDietary": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "yes"}
                                        }]
                                    },
                                    "template": {
                                        "title": "Number of repeated recalls/records per subject",
                                        "hideDescription": true,
                                        "footer": "Specify how many times was the dietary recall/record repeated on each subject",

                                    },
                                    "constraints": {"numericality": {onlyInteger: true}, "length": {maximum: 3}},
                                    "format": {
                                        "output": "number"
                                    }
                                },
                                "AverageTime": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [
                                            {
                                                "value": "AverageTime",
                                                "label": "Average time interval between subsequent recalls/records"
                                            }
                                        ],
                                        "config": {"readonly": true}
                                    },
                                    "dependencies": {
                                        "RepeatedDietary": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "yes"}
                                        }]
                                    },
                                    "template": {
                                        "title": "Average time interval between subsequent recalls/records",
                                        "hideDescription": true,
                                        "footer": "Specify what was the average time interval between the following the dietary recalls/records",
                                    },
                                    "constraints": {"format": {"pattern": "\\d+(\\.\\d{0,1}){0,1}"}},
                                    "format": {
                                        "output": "number"
                                    }
                                },
                                "SurveyAdministrationMethod": {
                                    "cl": GIFT_DataCollection,
                                    "selector": {
                                        "id": "dropdown",
                                        "config": {"maxItems": 1},
                                        "default": ["1"],
                                        sort: false
                                    },
                                    "template": {
                                        "title": "Survey administration method",
                                        "hideDescription": true,
                                        "footer": "Name the method used to gather data from the respondents during the interview (e.g. paper questionnaire, electronic questionnaire)",
                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "SurveyAdministrationMethodDetails": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "SurveyAdministrationMethodDetails",
                                                "label": "Survey administration method - details"
                                            }
                                        ],
                                        "config": {"readonly": true}
                                    },
                                    "dependencies": {
                                        "SurveyAdministrationMethod": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "3"}
                                        }]
                                    },
                                    "template": {
                                        "title": "Survey administration method - details",
                                        "hideDescription": true,
                                        "footer": "Specify other survey administration method",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },

                            }
                        },
                        "SamplingInformation": {
                            "template": {
                                "title": "Sampling information",
                            },
                            "selectors": {
                                "typeOfCollection": {
                                    "cl": TypeOfCollection,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false,
                                        "config": {"maxItems": 1},
                                    },
                                    "template": {
                                        "title": "Sample selection method",
                                        "hideDescription": true,
                                        "footer": "Name the method used in selecting the sample for the study.",
                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
                                },

                                "SamplingInformationDetails": {
                                    "selector": {
                                        "id": "input",
                                        "type": "text",
                                        "source": [
                                            {
                                                "value": "SamplingInformationDetails",
                                                "label": "Sample selection method - details"
                                            }
                                        ],
                                        "config": {"readonly": true}
                                    },
                                    "dependencies": {
                                        "typeOfCollection": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "8"}
                                        }]
                                    },
                                    "template": {
                                        "title": "Sample selection method - details",
                                        "hideDescription": true,
                                        "footer": "Specify other sample selection method",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "sampledPopulationInformation": {
                            "template": {
                                "title": "Sampled population information"
                            },
                            "selectors": {
                                "sampleSize": {
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
                                        "footer": "Total number of subjects for which at least one dietary recall/record was collected",
                                    },
                                    "constraints": {
                                        "numericality": {onlyInteger: true},
                                        "length": {maximum: 6},
                                        "presence": true
                                    },
                                    "format": {
                                        "output": "number"
                                    }
                                },
                                "statisticalPopulation": {
                                    cl: GIFT_StatisticalPopulation,
                                    "selector": {
                                        "id": "dropdown",
                                        "config": {"maxItems": 1},
                                        "sort": false,
                                    },
                                    "template": {
                                        "title": "Study population",
                                        "hideDescription": true,
                                        "footer": "Specify the population group which was the basis for sampling",

                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "PopulationGroups": {

                                    //disabled : true,

                                    classNames: "well",

                                    "template": {
                                        "title": "Specific population groups surveyed",
                                        "footer": "List the specific population groups that have been covered by the study (e.g. women in reproductive age, children under 5 years, elderly, etc.)",
                                    },
                                    /*
                                     dependencies: {
                                     statisticalPopulation: [{
                                     id: "enableIfValue",
                                     event: "select",
                                     args: {value: "2"}
                                     }]
                                     },
                                     */
                                    "incremental": true,

                                    "selectors": {
                                        "PopulationGroupsList": {
                                            "selector": {
                                                "id": "input",
                                                "type": "text",
                                                "source": [{"value": "PopulationGroupsList"}]
                                            },
                                            "format": {
                                                "output": "label"
                                            }

                                        }
                                    },
                                    format: {
                                        output: "array<label>"
                                    }

                                },
                                "SampleSizeGroups": {
                                    "selector": {
                                        "id": "input",
                                        "type": "number",
                                        "source": [{
                                            "value": "SampleSizeGroups",
                                            "label": "Sample size of the specific population group surveyed"
                                        }],
                                        //"config": {"readonly": true}
                                    },
                                    "template": {
                                        "title": "Sample size of the specific population group surveyed",
                                        "footer": "Provide the sample size of the specific population group added above",
                                    },
                                    "constraints": {"numericality": {onlyInteger: true}, "length": {maximum: 6}},
                                    "format": {
                                        "output": "number"
                                    },
                                    /*
                                     "dependencies": {
                                     "statisticalPopulation": [{
                                     event: 'select',
                                     id: 'readOnlyIfNotValue',
                                     args: {value: "2"}
                                     }]
                                     }
                                     */
                                },
                                "PurposedlyGroups": {

                                    classNames: "well",

                                    "template": {
                                        "title": "Purposedly over-sampled population groups",
                                        "hideDescription": true,
                                        "footer": "List population groups (if any) that have been purposely oversampled in order to limit the sample size, or improve the representativeness of the study for this populations (e.g. pregnant women, lactating women, children under 5 years)",
                                    },

                                    "incremental": true,

                                    "selectors": {
                                        "PurposedlyGroupsList": {
                                            "selector": {
                                                "id": "input",
                                                "type": "text",
                                                "source": [{"value": "PurposedlyGroupsList"}]
                                            },
                                            "format": {
                                                "output": "label"
                                            },
                                            "template": {
                                                "footer": "List population groups (if any) that have been purposely oversampled in order to limit the sample size, or improve the representativeness of the study for this populations (e.g. pregnant women, lactating women, children under 5 years)",
                                            }
                                        }
                                    },
                                    format: {
                                        output: "array<label>"
                                    }

                                },
                                "PurposedlyGroupsDetails": {
                                    "selector": {
                                        "id": "textarea",
                                    },
                                    "template": {
                                        "title": "Purposedly over-sampled population groups - details",
                                        "hideDescription": true,
                                        "footer": "Provide details on the purposely oversampled groups and the reasons for oversampling",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                /*
                                 "PurposedlyGroupsDetails": {

                                 classNames: "well",

                                 "template": {
                                 "title": "Purposedly over-sampled population groups - details",
                                 "hideDescription": true,
                                 "footer": "Provide details on the purposely oversampled groups and the reasons for oversampling",
                                 },

                                 "incremental": true,

                                 "selectors": {
                                 "PurposedlyGroupsDetailsList": {
                                 "selector": {
                                 "id": "input",
                                 "type": "text",
                                 "source": [{"value": "PurposedlyGroupsDetailsList"}]
                                 },
                                 "format": {
                                 "output": "label"
                                 },
                                 "template": {
                                 "footer": "Provide details on the purposely oversampled groups and the reasons for oversampling",
                                 }
                                 }
                                 },
                                 format: {
                                 output: "array"
                                 }

                                 },
                                 */
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
                                        "hideDescription": true,
                                        "footer": "Provide the age of the youngest individual whose food consumption data is included in the dataset",
                                    },
                                    "constraints": {"format": {"pattern": "\\d+(\\.\\d{0,1}){0,1}"}},
                                    "format": {
                                        "output": "number"
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
                                        "hideDescription": true,
                                        "footer": "Provide the age of the oldest individual whose food consumption data is included in the dataset",
                                    },
                                    "constraints": {"format": {"pattern": "\\d+(\\.\\d{0,1}){0,1}"}},
                                    "format": {
                                        "output": "number"
                                    }
                                }
                            }
                        },
                        "DataAnalysisInformation": {
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
                                        "footer": "Describe the exclusion criteria (if any) which were applied during sample selection in order to exclude respondents whose data could potentially bias results of the study",

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
                                        "footer": "Describe the exclusion criteria (if any) which were applied during data cleaning in order to exclude recalls/records which could potentially bias results of the study",

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
                                        "footer": "Describe methods (if any) that were used to assess unreliably low or high food intake data from the collected recalls/records",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "ReportingIndividualLevel": {
                                    classNames: "fx-boxed",
                                    "template": {
                                        "title": "Under-/over-reporting at individual level",
                                    },
                                    "format": {
                                        "output": "array<number>"
                                    },
                                    selectors: {
                                        "underReportingPercentage": {
                                            template: {
                                                title: "Percentage of under-reporting at individual level",
                                                footer: "Report the percentage of individuals in the sample, whose data was identified as under-reported according to the applied methods of assessing under and over-reporting"
                                            },
                                            "constraints": {"format": {"pattern": "\\d+(\\.\\d{0,1}){0,1}"}},
                                            selector: {
                                                id: "input",
                                                type: "number"
                                            },
                                            "format": {
                                                "output": "number"
                                            }

                                        },
                                        "overReportingPercentage": {
                                            template: {
                                                title: "Percentage of over-reporting at individual level",
                                                footer: "Report the percentage of individuals in the sample, whose data was identified as under-reported according to the applied methods of assessing under and over-reporting"
                                            },
                                            "constraints": {"format": {"pattern": "\\d+(\\.\\d{0,1}){0,1}"}},
                                            selector: {
                                                id: "input",
                                                type: "number"
                                            },
                                            "format": {
                                                "output": "number"
                                            }
                                        }
                                    }
                                },
                                "ReportingGroupLevel": {
                                    classNames: "fx-boxed",
                                    "template": {
                                        "title": "Under-/over-reporting at group level",
                                    },
                                    "format": {
                                        "output": "array<yesno>"
                                    },
                                    selectors: {
                                        "underReporting": {
                                            template: {
                                                title: "Under-reporting identified at group level",
                                                footer: "Provide information whether or not under-reporting at the group level was identified in the survey"
                                            },
                                            cl: YESNO,
                                            selector: {
                                                id: "dropdown",
                                                default: ["no"],
                                                "config": {"maxItems": 1}
                                            },
                                            "format": {
                                                "output": "codes:extended"
                                            }

                                        },
                                        "overReporting": {
                                            template: {
                                                title: "Over-reporting identified at group level",
                                                footer: "Provide information whether or not over-reporting at the group level was identified in the survey"
                                            },
                                            cl: YESNO,
                                            selector: {
                                                id: "dropdown",
                                                default: ["no"],
                                                "config": {"maxItems": 1}
                                            },
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        }
                                    }
                                },
                                "DataAlreadyCorrected": {
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        default: ["no"],
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Data already corrected to assess usual intake",
                                        "footer": "Provide information whether or not the data has been processed/manipulated in order to show usual intake",

                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    }
                                },
                                "AssessmentIntake": {
                                    "selector": {
                                        "id": "textarea",
                                        "config": {"readonly": true}
                                    },

                                    "dependencies": {
                                        "DataAlreadyCorrected": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "yes"}
                                        }]
                                    },
                                    "template": {
                                        "title": "Assessment of usual intake",
                                        "footer": "Describe the procedures (if any) applied to the dataset in order to obtain information on usual intake",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "FoodConsumptionInformation": {
                            "template": {
                                "title": "Food consumption information",
                            },
                            "selectors": {
                                "FoodCoverageTotal": {
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        default: ["yes"],
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Total food coverage",
                                        "footer": "Provide information whether or not the survey covered whole diet, or it excluded some foods or food groups",
                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "FoodCoverageDetails": {
                                    "selector": {
                                        "id": "textarea",
                                        "config": {"readonly": true}
                                    },
                                    "dependencies": {
                                        "FoodCoverageTotal": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "no"}
                                        }]
                                    },
                                    "template": {
                                        "title": "Food coverage - details",
                                        "footer": "Specify which foods or food groups (if any) were not covered by the study",
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "DrinkingWater": {
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        default: ["yes"],
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Quantification of drinking water",
                                        "footer": "Provide information whether or not water drunk by the respondents has been quantified in the study",
                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
                                },

                                "SupplementInformation": {
                                    "cl": YESNO,
                                    "selector": {
                                        "id": "dropdown",
                                        default: ["no"],
                                        "config": {"maxItems": 1}
                                    },
                                    "template": {
                                        "title": "Information on supplement intakes",
                                        "footer": "Provide information whether or not the information on the use/consumption of dietary supplements has been collected",
                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "SupplementInformationDetails": {
                                    "selector": {
                                        "id": "textarea",
                                        "config": {"readonly": true}
                                    },
                                    "dependencies": {
                                        "SupplementInformation": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "yes"}
                                        }]
                                    },
                                    "template": {
                                        "title": "Information on supplement intakes - details",
                                        "footer": "Provide information whether or not the information on the use/consumption of dietary supplements has been collected",
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
                                                "label": "Number of different food items in the food list"
                                            }
                                        ]
                                    },
                                    "template": {
                                        "title": "Number of different food items in the food list",
                                        "footer": "Provide the number of unique different food items that have been reported as consumed in the dataset",

                                    },
                                    "format": {
                                        "output": "number"
                                    },
                                    "constraints": {
                                        "numericality": {onlyInteger: true},
                                        "length": {maximum: 5},
                                        "presence": true
                                    },
                                },
                                "PortionSizes": {
                                    "selector": {
                                        "id": "textarea",
                                    },
                                    "template": {
                                        "title": "Method used to estimate portion sizes",
                                        "footer": "Describe methods (if any) which were used to prompt and facilitate estimating the portion size of the recalled foods by the respondents",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "RecipesManagement": {
                                    "selector": {
                                        "id": "textarea",
                                    },
                                    "template": {
                                        "title": "Management of recipes and mixed dishes",
                                        "footer": "Describe the way composite dishes and recipes were handled, e.g. individual or standard recipes, break-down into ingredients or reported as mixed dishes, estimation of quantities, use of yield factors, etc.",

                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                },
                                "QuantitiesReported": {
                                    "cl": GIFT_QuantityReporting,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false
                                    },
                                    "template": {
                                        "title": "Quantities reported as",
                                        "footer": "Provide information on the form in which the food item, ingredient and recipe quantities are reported in the dataset, e.g. raw or processed (cooked) and whole or only edible parts",

                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    },
                                    "constraints": {"presence": true}
                                },
                                "QuantitiesReportedDetails": {
                                    "selector": {
                                        "id": "textarea",
                                        "config": {"readonly": true}
                                    },
                                    "dependencies": {
                                        "QuantitiesReported": [{
                                            id: "readOnlyIfNotValue",
                                            event: "select",
                                            args: {value: "5"}
                                        }]
                                    },
                                    "template": {
                                        "title": "Quantities reported as - details",
                                        "footer": ""
                                    },
                                    "format": {
                                        "output": "label"
                                    }
                                }
                            }
                        },
                        "FoodCompositionInformation": {
                            "template": {
                                "title": "Food composition information",
                            },
                            "selectors": {
                                "FoodComsumption": {
                                    "selector": {
                                        "id": "textarea",
                                    },
                                    "template": {
                                        "title": "Food composition table used",
                                        "hideDescription": true,
                                        "footer": "Provide reference to the food composition data which has been used to derive nutrient intake information from food consumption data. If several food composition tables were, please reference them all.",
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
                                        "hideDescription": true,
                                        "footer": "Provide the final number of food for which food composition data was compiled in order to derive nutrient intake information from food consumption data",
                                    },
                                    "constraints": {"numericality": {onlyInteger: true}, "length": {maximum: 5}},
                                    "format": {
                                        "output": "number"
                                    }
                                },
                                "MacroDietaryComponents": {
                                    "cl": GIFT_Macronutrients,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false
                                    },
                                    "template": {
                                        "title": "Macronutrients and dietary components available in the dataset",
                                        "hideDescription": true,
                                        "footer": "List macronutrients and dietary components for which dietary intake has been calculated in the dataset",

                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    }
                                },
                                "MacroDietaryComponentsDetails": {

                                    classNames: "well",

                                    //disabled : true,

                                    "template": {
                                        "title": "Macronutrients and dietary components available in the dataset - details",
                                        "hideDescription": true,
                                        "footer": "List additional macronutrients and dietary components reported here above as 'other'",
                                    },
                                    /*
                                     dependencies: {
                                     MacroDietaryComponents: [{
                                     id: "enableIfValue",
                                     event: "select",
                                     args: {value: "9"}
                                     }]
                                     },
                                     */
                                    "incremental": true,

                                    "selectors": {
                                        "MacroDietaryComponentsDetailsList": {
                                            "selector": {
                                                "id": "input",
                                                "type": "text",
                                                "source": [{"value": "MacroDietaryComponentsDetailsList"}]
                                            },
                                            "format": {
                                                "output": "label"
                                            },
                                            "template": {
                                                "title": "Macronutrients and dietary components available in the dataset - details",
                                                "hideDescription": true,
                                                "footer": "List additional macronutrients and dietary components reported here above as 'other'",
                                            },
                                        }
                                    },
                                    format: {
                                        output: "array<label>"
                                    }

                                },
                                "MicroDietaryComponents": {
                                    "cl": GIFT_Micronutrients,
                                    "selector": {
                                        "id": "dropdown",
                                        "sort": false
                                    },
                                    "template": {
                                        "title": "Micronutrients available in the dataset",
                                        "hideDescription": true,
                                        "footer": "List micronutrients for which dietary intake has been calculated in the dataset",
                                    },
                                    "format": {
                                        "output": "codes:extended"
                                    }
                                },
                                "MicroDietaryComponentsDetails": {

                                    classNames: "well",

                                    //disabled : true,

                                    "template": {
                                        "title": "Micronutrients and minerals available in the dataset - details",
                                        "hideDescription": true,
                                        "footer": "List additional micronutrients reported here above as 'other'",
                                    },
                                    /*
                                     dependencies: {
                                     MicroDietaryComponents: [{
                                     id: "enableIfValue",
                                     event: "select",
                                     args: {value: "13"}
                                     }]
                                     },
                                     */
                                    "incremental": true,

                                    "selectors": {
                                        "MicroDietaryComponentsDetailsList": {
                                            "selector": {
                                                "id": "input",
                                                "type": "text",
                                                "source": [{"value": "MicroDietaryComponentsDetailsList"}]
                                            },
                                            "format": {
                                                "output": "label"
                                            },
                                            "template": {
                                                "title": "Micronutrients and minerals available in the dataset - details",
                                                "hideDescription": true,
                                                "footer": "List additional micronutrients reported here above as 'other'",
                                            }
                                        }
                                    },
                                    format: {
                                        output: "array<label>"
                                    }

                                }

                            }
                        },
                        "AdditionalInformation": {
                            "template": {
                                "title": "Additional information"
                            },
                            "selectors": {
                                "VariablesAvailability": {
                                    "template": {
                                        "title": "Availability of the following variables at individual level"
                                    },
                                    classNames: "fx-boxed",
                                    "selectors": {
                                        "Age": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Age (month or year) or birth date"
                                            },
                                            "constraints": {"presence": true},
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        },
                                        "Sex": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Sex"
                                            },
                                            "constraints": {"presence": true},
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        },
                                        "BodyWeight": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Body weight (reported or measured)"
                                            },
                                            "constraints": {"presence": true},
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        },
                                        "BodyHeight": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Body height (reported or measured)"
                                            },
                                            "constraints": {"presence": true},
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        },
                                        "PhysicalActivityLevel": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Physical activity level (estimated or measured)"
                                            },
                                            "constraints": {"presence": true},
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        },
                                        "InterviewDate": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Date of the interview (day, month, year)"
                                            },
                                            "constraints": {"presence": true},
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        },
                                        "GeographicalLocalization": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Geographic localization (GPS)"
                                            },
                                            "constraints": {"presence": true},
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        }
                                    },
                                    format: {
                                        output: "array<yesno>"
                                    }
                                },
                                "OtherVariablesAvailability": {
                                    "template": {
                                        "title": "Availability of other variables at individual level"
                                    },
                                    classNames: "fx-boxed",
                                    "selectors": {
                                        "SocioDemographic": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Socio-demographic",
                                                "hideDescription": true,
                                                "footer": "E.g. occupation, status in the household"
                                            },
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        },
                                        "EducationLiteracy": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Education/literacy"
                                            },
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        },
                                        "Ethnicity": {
                                            "cl": YESNO,
                                            "selector": {
                                                "id": "dropdown",
                                                "config": {"maxItems": 1}
                                            },
                                            "template": {
                                                "title": "Ethnicity"
                                            },
                                            "format": {
                                                "output": "codes:extended"
                                            }
                                        }
                                    },
                                    format: {
                                        output: "array<yesno>"
                                    }
                                }
                            }
                        }

                    }

                }
            }
        }

    });

