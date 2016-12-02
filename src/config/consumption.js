define({

    codelistStyles: {

//className: is Boostrap themes
//visible: visibility in map legend        
        develop: {
            Off: 'Z',            
            All: { className:"info",    order:0,  visible: true },
            'F': { className:"success", order: 1, visible: true },
            'A': { className:"primary", order: 2, visible: true },
            'N': { className:"warning", order: 3, visible: true },
            'D': { className:"danger",  order: 4, visible: true },
            'P': { className:"default", order: 5, visible: true },
            'Z': { className:"gray",    order: 10,visible: false}
        },
        production: {
            Off: '1',
            All: { className:"info",    order:0, visible:true },
            '5': { className:"success", order:1, visible:true },
            '4': { className:"warning", order:2, visible:true },
            '3': { className:"danger",  order:3, visible:true },
            '2': { className:"default", order:4, visible:true },
            '1': { className:"gray",    order:5, visible:false },
        }
/*
CODES
@1@Off
@2@Planned food consumption surveys
@3@Existing data potentially suitable to be inserted in FAO/WHO GIFT
@4@Data soon to be inserted in FAO/WHO GIFT
@5@Data available in FAO/WHO GIFT
LEGEND order:
Green(5): Data available for analysis in FAO/WHO GIFT
Orange(4): Data soon to be inserted in FAO/WHO GIFT
Red(3): Existing data potentially suitable for FAO/WHO GIFT
Grey(2): Planned food consumption survey
*/
    },

    countryHiddensStyle: {
        stroke: true,
        weight: 1,
        opacity:1,
        color:'#888',
        fillColor:'#ccc',
        fillOpacity: 0.6
    },
    
    mapOptsLeaflet: {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        zoom: 2,
        minZoom: 2,
        maxZoom: 4
    },

    mapOpts: {
        baselayers: {
            "carto": {
                url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                subdomains: 'abcd',
                maxZoom: 19
            }
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
    }
})