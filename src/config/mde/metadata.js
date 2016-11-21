define(
    function () {

        var IANA = {uid: 'IANAcharacterSet'},
            GAUL = {uid: 'GAUL0', version: "2014"},
            Languages = {uid: 'ISO639-2', version: "1998"},
            TypeOfCollection = {uid: 'GIFT_TypeOfCollection' },
            StatusConfidenciality = {uid: 'GIFT_ConfidentialityStatus' },
            AreaOfReference = {uid: 'GIFT_ReferenceArea' },
            GIFT_StatisticalPopulation = {uid: 'GIFT_StatisticalPopulation'},
            CoverageSector = {uid: 'GIFT_CoverageSector'};


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
                                type: "text"
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
                            }

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
                                    }
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
                                    }
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
                                    }
                                },
                                "coverageTime": {
                                    "selector": {
                                        "id": "range",
                                        "format": "DD/MM/YYYY",
                                        "config": {
                                            type: "double"
                                        }
                                    },
                                    "template": {
                                        "title": "Data collection period",
                                        "description": " Select the date on which data collection started and ended for this survey",

                                    },
                                    "format": {
                                        "output": "period"
                                    }
                                }
                            },
                            "validator": {
                                "valCoverage": true
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
                                "type": "text",
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
                                "type": "text",
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
                                            }
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
                                            "selector": {
                                                "id": "input",
                                                "type": "text",
                                                "source": [
                                                    {
                                                        "value": "dataCollection",
                                                        "label": "Survey administration method"
                                                    }
                                                ]
                                            },
                                            "template": {
                                                "title": "Survey administration method",
                                                "description": "Name the method used to gather data from the respondents during the interview (e.g. paper questionnaire, electronic questionnaire)",

                                            },
                                            "format": {
                                                "output": "label"
                                            }
                                        },
                                        "organization": {
                                            "selector": {
                                                "id": "input",
                                                "type": "text",
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
                                                "output": "string"
                                            }
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
                                        "type": "text",
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
                                        "type": "text",
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
                    "title": "Accessibility",
                    "sections": {
                        "seConfidentiality": {
                            "title": "Confidentiality",
                            "description": "This section information on the level of confidentiality and the applied policy for releasing the resource. This metadata sub-entity concerns legislation (or any other formal provision) related to statistical confidentiality applied to the resource as well as the actual confidentiality data treatment applied (also with regard to the aggregated data disseminated).",
                            "selectors": {
                                "confidentialityStatus": {
                                    "cl": StatusConfidenciality,
                                    "selector": {
                                        "id": "dropdown"
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
                }
            }
        }

    });
