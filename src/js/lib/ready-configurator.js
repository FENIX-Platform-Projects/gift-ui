define([], function(){

    return {

        nutrition   : {
            model   : {
                "elements":[
                    {
                        "title": "Share of Energy",
                        "indicators": [
                            {
                                "indicator": "Macronutrient share of usual energy intakes",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Philippines HarvestPlus, 2008",
                                "images": [
                                    {"src": "src/images/home_pictures/2.jpg"}
                                ]
                            }
                        ],
                        "comments": "The macronutrients share of usual energy intakes is in line with the WHO population goals with a rather low content of fat in the diet, and a very high contribution of carbohydrates."
                    }
                ]
            },
            template: "text!templates/ready/nutrition.hbs",
            onEnter : function()  {
                alert('nutri')
            }
        },

        safety      : {
            model   :{
                "elements":[
                    {
                        "title": "Groundnuts consumption",
                        "indicators": [
                            {
                                "indicator": "Consumption of groundnuts in g/kg body weight/day over 2 days in consumers only",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            },
                            {
                                "indicator": "Consumption of groundnuts in g/kg body weight/day over 2 days in consumers only",
                                "Gender": "Male and Female",
                                "Age_range": "24-59 months",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            },
                            {
                                "indicator": "Consumption of groundnuts in g/day over 2 days in consumers only",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            },
                            {
                                "indicator": "Consumption of groundnuts in g/day over 2 days in consumers only",
                                "Gender": "Male and Female",
                                "Age_range": "24-59 months",
                                "Survey": "Burkina Faso HarvestPlus/IRD, 2010",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            }
                        ],
                        "comments": "Groundnuts are a known potential source of aflatoxins. The estimated level of consumption usually considered for African countries is 5.1 g/day, based on GEMS regional diets which are derived from national availability (Food Balance Sheets). The observed level of consumption from the Harvest plus surveys suggests a significantly higher level of consumption (up to 107 and 142 g/day at the 95th percentile of consumers only in children and women respectively). Potential high dietary exposure to aflatoxins through groundnuts can be calculated based on the observed high level of consumption per kg body weight; it reaches 7.7 g/kg bw/day and 3.0 g/kg bw/day in children and women respectively at the 95th percentile in consumers only."
                    }]
            },
            template:"text!templates/ready/safety.hbs",
            onEnter : function () {}
        },

        environment :{},

        consumption : {
            model   : {
                "elements":[
                    {
                        "title": "Minimum Dietary Diversity-Women (MDD-W)",
                        "indicators": [
                            {
                                "indicator": "Minimum Dietary Diversity-Women (MDD-W): Summary statistics",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Bangladesh HarvestPlus, 2008",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            },
                            {
                                "indicator": "Minimum Dietary Diversity-Women (MDD-W): Percentage of the population achieving the MDD-W",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Bangladesh HarvestPlus, 2008",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            },
                            {
                                "indicator": "Minimum Dietary Diversity-Women (MDD-W): Number of food groups consumed over 1 day",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Bangladesh HarvestPlus, 2008",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            },
                            {
                                "indicator": "Minimum Dietary Diversity-Women (MDD-W): Frequency of consumption of each food group over 1 day",
                                "Gender": "Female",
                                "Age_range": "19-50 years",
                                "Survey": "Bangladesh HarvestPlus, 2008",
                                "images": [
                                    {"src": "src/images/home_pictures/1.jpg"}
                                ]
                            }
                        ],
                        "comments": "Less than one woman out of four reaches the Minimum Dietary Diversity-Women cut-off of 5 out of ten food groups consumed in one day. Three quarter of the women have a diversity score between 3 and 4 and none consumes more than 7 food groups over a day. This suggests a fairly low diversity of the diet. The five most frequently consumed food groups were, in order, 'all starchy staples', 'other vegetables', 'dark green leafy vegetables', 'flesh foods' and 'beans and peas'. The frequency of consumption of 'Nuts and seeds', 'eggs' and 'all dairy', three key sources of protein, was particularly low."
                    }]
            },
            template: "templates/ready/consumption.hbs",
            onEnter : function () {}
        }

    }
})