define(function(){

    'use strict';

    return {

        defaultSelectors: ['freeText', 'resourceType', 'contextSystem'],
        hideCloseButton: true,
        pluginRegistry: {
            contextSystem: {
                selector: {
                    id: "dropdown",
                    source: [
                        {value: "gift", label: "GIFT"}
                    ],
                    default: ["gift"],
                    hideSummary: true,
                    config: {
                        plugins: ['remove_button'],
                        mode: 'multi'
                    }
                },

                template: {
                    hideRemoveButton: false
                },

                format: {
                    output: "enumeration",
                    metadataAttribute: "dsd.contextSystem"
                }
            }
        }

    }
});