define(function () {

    'use strict';

    return {

        back: "Back to results",
        search: "Search",

        //Filter
        geographic: "Geographic",
        survey: "Survey",
        population: "Population",
        food: "Food",
        selector_country: "Country",
        selector_time: "Time",
        selector_referenceArea: "Geographical/Administrative coverage",
        selector_coverageSector: "Coverage Sector",
        selector_foodex2_code: "Food Items",
        selector_gender: "Gender",
        selector_special_condition: "Special Condition",
        selector_ageGranularity:"Age Granularity",
        selector_age:"Age",
        selector_special_condition_message: "Please select at least one value.",

        //Catalog
        catalog_error: "Error encountered, please re-try",
        catalog_empty: "No results found matching the search criteria, please re-try",
        catalog_too_many_results: "Too many results found",
        catalog_please_refine_criteria: "Please refine the search criteria.",
        catalog_results: "Results",

        //Statistics
        instruction: "After each selection made, the results section below is refreshed",
        statistics_intro: "Introductory text",
        search_criteria: "Search Criteria",
        click_expand_collapse: "Click to expand or collapse the Search Criteria box",
        fenix_metadata: "FENIX metadata",
        downloadDataModalText1: "The dataset you are going to download is shared through FAO/WHO GIFT by:",
        downloadDataModalText2: "We thank them for their collaboration.",
        downloadDataModalText3: "By downloading this dataset you accept to:",
        downloadDataModalBulletPoint1: "- comply with all applicable laws, including, without limitation, privacy laws, intellectual property laws, anti-spam laws;",
        downloadDataModalBulletPoint2: "- not publicly represent or imply that FAO is participating in, or has sponsored, approved or endorsed the manner or purpose of your use of the database;",
        downloadDataModalBulletPoint3: "- provide the following acknowledgment to the contributor whenever publishing or presenting publicly the data or its derivatives:",
        downloadDataModalText4: "Or shortly",
        downloadDataJustification: "Short description of the intended use of the data",
        downloadDataModalButton: "I understand and wish to proceed",


        //Ready To Use section

        foodConsumption: "Food Consumption",
        foodSafety: "Food Safety",
        nutrition: "Nutrition",
        gramsPerPerson: "Grams per person",
        percentageAsGPer100g: "Percentage as g per 100g",
        caloriesPerPerson: "Calories per person",
        dashboardTitleCredits: "Collected by FAO/WHO GIFT Team, developed by FENIX",

        //Food consumption tab
        indicator: "Indicator:",
        dietaryPattern: "Dietary pattern",
        bubbleBoxTitle: "Daily diet: Average food consumption (in grams per person per day)",
        bubbleBoxDescription: "This indicator shows <b>the average foods and food group consumption expressed in grams per person per day.</b> The calculation takes into account all individuals in the population: consumers and non-consumers. Consumers are those individuals who did consume the food of interest during the survey period, and non-consumers are those who did not.",
        treemapBoxTitle: "Daily diet: Average percentage contribution of different foods to the total consumption",
        treemapBoxDescription: "This indicator shows <b>the average percentage contribution of different foods and food groups to the total consumption in the population.</b> The calculation takes into account all individuals in the population: consumers and non-consumers. Consumers are those individuals who did consume the food of interest during the survey period, and non-consumers are those who did not",
        donutBoxTitle: "Daily diet: Average energy intake from different foods (in kilocalories per person per day)",
        donutBoxDescription: "This indicator shows <b>the average energy intake from different foods and food groups expressed in kilocalories per person per day.</b> The calculation takes into account all individuals in the population: consumers and non-consumers. Consumers are those individuals who did consume the food of interest during the survey period, and non-consumers are those who did not.",
        dailyPortionTitle : "Daily portion size among consumers on days of consumption",
        dailyPortionDescription : "Average intake of the foods of the interest among the consumers only. Consumers are understood as those as those individuals, who have consumed the foods of interest during the recall period.",

        //Food safety
        dailyPortion: "Daily portion",
        foodSafetyTitle: "Acute food consumption: Percentage of consumers and daily portions size among consumers on consumption days (in grams per person per day)",
        foodSafetyDescription: "This indicator shows the percentage of individuals in the population who consumed the food or food group of interest during the survey period (consumers), and the average daily foods and food group consumption expressed in grams per person per day among these individuals calculated based on the consumption days only. Consumption days are those days on which the food of interest was consumed.",

        //Nutrition
        dietaryAdequacy: "Dietary adequacy",
        sourceOfNutrientsInTheDiet: "Sources of nutrients in the diet",
        macronutrients: "Macronutrient contribution to total energy intake",

        dietaryTitle: "Percentage of individuals at risk of nutrient inadequacy)",
        dietaryDescription: "This indicator shows the percentage of individuals in the population who are at risk of having an average dietary intake of different nutrients below their requirements for these nutrients. The indicator shows the estimates of population at risk of Vitamin A inadequacy, and in the future it will include iron, calcium, zinc and possibly folic acid. The nutrient reference values used for vitamin A are taken from the HMD (2016) (see methodology section for references).",
        sourceTitle: "Food sources of micronutrients in the diet (in grams per person per day)",
        sourceDescription: "This indicator shows the contribution of different foods and food groups to the average dietary intake of different micronutrients expressed in grams per person per day.",
        macronutrientsTitle: "Macronutrient contribution to total energy intake",
        macronutrientsDescription: "This indicator shows the average percentage contribution of macronutrients (fat, carbohydrate and protein) to total energy intake. The values are shown with reference to the recommended by WHO proportions of macronutrients in the diet (see methodology section for references).",

        vitaminA: "Vitamin A",
        iron: "Iron",
        calcium: "Calcium",
        zinc: "Zinc",
        fola: "Fola",

        //Charts titles
        bubbleTitle : "Daily diet: grams per person per day",
        bubbleFoodTitle : "Foods",
        bubbleBeveragesTitle : "Beverages",
        columnAverage_title : "Daily portion on days of consumption",
        columnStandard_title : "Daily portion on days of consumption",
        columnStandard_barDescr_firstPart : "of the population consumed",
        columnStandard_barDescr_secondPart : "during the survey days",
        stackedPercentage_title_firstPart : "Percentage of the population at risk of",
        stackedPercentage_title_secondPart : "Inadequacy",
        stackedPercentage_descr_firstPart : "of the population is AT RISK of",
        stackedPercentage_descr_secondPart : "inadequacy",
        macronutrientsPie_title : "Macronutrients contribution to the total energy intake",
        pieThreeLevDrilldown_title_firstPart : "Source of",
        pieThreeLevDrilldown_title_secondPart : "in the diet",
        largeTree_title : "Daily diet: portion of different food groups",
        holeDonut_title : "Daily diet: calories per person per day",

        validationErrors : "Invalid selection",

        downloadPopupAll : "ALL",
        downloadPopupVariableDictionary : "Variable dictionary",
        downloadPopupMetadataPdf : "Meta-data pdf",
        downloadPopupFoodCompositionTable : "Food composition table",
        downloadPopupRecipeFiles : "Recipe files",
        downloadPopupSourceLink : "Source Link"


    }
});