define(["jquery", "underscore"],function ($, _) {

    "use strict";

    return {
        download: {
            serviceProvider: "http://fenixrepo.fao.org/data/gift/survey/GIFT_Survey_"
        },
        catalog : {
            defaultSelectors: ['country', 'time', 'referenceArea', 'coverageSector', 'foodex2_code', 'gender',
                'special_condition', 'ageGranularity', 'age'
            ],

            prepareQuery : function(metavalues, fenixvalues, values){
                var exclusions = ['country', 'time', 'referenceArea', 'coverageSector', 'ageGranularity', 'age'];
                var granularity = values.values['ageGranularity'][0];

                fenixvalues['age_'+granularity] = fenixvalues['age'];

                for(var idx in exclusions){
                    var remove = exclusions[idx];
                    if(fenixvalues[remove]){
                        delete fenixvalues[remove];
                    }
                }

                var final = $.extend(true, {}, metavalues, fenixvalues);

                // remove 'none' codes
                _.each(final, function(item, key) {
                  if(item.codes){
                      var codes = item.codes[0].codes;

                      if( $.inArray('none', codes) == 0)
                        codes.splice( $.inArray('none', codes), 1 );

                      if(codes.length == 0)
                          delete final[key];

                  }
                });

                return final;

            },
            columns : {
                title: {
                    path : "title",
                    type: "i18n",
                    title : "Title",
                    width: "50%"
                },
                sampleSize : {
                    path : "sampleSize",
                    title : "Sample Size",
                    width: "20%"
                }
            },

            searchService : {
                serviceProvider:'//fenixservices.fao.org/gift/statistics/',
                findService: 'filter'
            },

            actions: ["download", 'metadata'],
            pluginRegistry: {}
        }
    }
});