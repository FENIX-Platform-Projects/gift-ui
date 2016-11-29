define({

    codelistStyles: {
    	//MAP CODES with Boostrap themes
        'F': { className:"success", order: 1, visible: true },
        'A': { className:"primary", order: 2, visible: true },
        'N': { className:"warning", order: 3, visible: true },
        
        'D': { className:"danger",  order: 4, visible: true },
        'P': { className:"default", order: 5, visible: true },
        'Z': { className:"gray",    order: 10,visible: false},
      'All': { className:"info",    order: 20,visible: true }
/*
Green: Data available for analysis in FAO/WHO GIFT
Orange: Data soon to be inserted in FAO/WHO GIFT
Red: Existing data potentially suitable for FAO/WHO GIFT
Grey: Planned food consumption survey
*/
    },

    countryHiddensStyle: {
        stroke: true,
        weight: 1,
        color:'#000',
        fillColor:'#ccc',
        fillOpacity: 0.9
    },

    mapOpts: {
        baselayers: {
            "osm": {
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                maxZoom: 19,
                opacity: 0.6,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">osm.org</a>'
            },
            /*"osm_gray": {
                url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">osm.org</a>'
            }*/
            /*"Cartodb": {
                url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                title_en: "CartoDB light",
                subdomains: 'abcd',
                maxZoom: 19
            }*/
        },
        boundaries: true,
        plugins: {
            geosearch: true,
            scalecontrol: false,
            disclaimerfao: true,
            legendcontrol: false,
            mouseposition: false,
            controlloading : false,
            zoomcontrol: 'topright'
        },
        guiController: {
            overlay: false,
            baselayer: false,
            wmsLoader: false
        }
    },
    
    mapOptsLeaflet: {
        attributionControl: true,
        scrollWheelZoom: false,
        zoom: 2,
        minZoom: 2,
        maxZoom: 5,
        maxBounds: [[84.67351256610522, -174.0234375], [-58.995311187950925, 223.2421875]]
    }
})