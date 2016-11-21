define({

    codelistStyles: {
    	//MAP CODES with Boostrap themes
        'F': { className:"success", order: 1, visible: true },  // green
        'P': { className:"warning", order: 3, visible: true },  // orange        
        'D': { className:"danger",  order: 2, visible: true },  // red
        'A': { className:"primary", order: 4, visible: true },  // blue
        'N': { className:"default", order: 5, visible: true },  // gray
        'Z': { className:"",        order: 6, visible: false}
/*
Green: Data available for analysis in FAO/WHO GIFT
Orange: Data soon to be inserted in FAO/WHO GIFT
Red: Existing data potentially suitable for FAO/WHO GIFT
Grey: Planned food consumption survey
*/
    },

    mapOpts: {
        baselayers: {
            "Cartodb": {
                url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                title_en: "CartoDB light",
                subdomains: 'abcd',
                maxZoom: 19
            }
        },
        boundaries: true,
        plugins: {
            geosearch: true,
            scalecontrol: false,
            disclaimerfao: false,
            legendcontrol: false,
            mouseposition: false,
            controlloading : true,
            zoomcontrol: 'topright'
        },
        guiController: {
            overlay: false,
            baselayer: false,
            wmsLoader: false
        }
    },
    
    mapOptsLeaflet: {
        scrollWheelZoom: false,
        zoom: 2,
        minZoom: 2,
        maxZoom: 5,
        maxBounds: [[84.67351256610522, -174.0234375], [-58.995311187950925, 223.2421875]]
    }
})