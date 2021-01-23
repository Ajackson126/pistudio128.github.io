// Create the base map
var baseMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add tile layer for the background of map
var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(baseMap);

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(baseURL, function(response) {
    // Create a new marker cluster group
    console.log(response);
     // Loop through data
     function getColors(d) {
        if (d < 1){
            return "#800026"
        }
        else if (d < 2) {
            return "#BD0026"
        }
        else if (d < 3) {
            return "#E31A1C"
        }
        else if (d <4){
            return "#FC4E2A"
        }
        else if (d<5){
            return "#FD8D3C"
        }
        else {
            return "#FEB24C"
        }
    }
        // Loop through data
        function getRadius(d) {
             if (d < 1){
                return "#B7DF5F"
            }
            else if (e < 2) {
                return "#DCED11"
            }
            else if (e < 3) {
                return "#EDD911"
            }
            else if (e <4){
                return "#EDB411"
            }
            else if (e<5){
                return "ED7211"
            }
            else {
                return "ED4311"
            }
        }

    L.geoJSON(response, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "Magnitude : " 
                + feature.properties.mag
                +"<br>"
                + feature.properties.place
                +"<br>"
                + feature.geometry.coordinates[2]
            )
        },
        style: function(feature){
            return{
                "color":  "white",
                "weight" : .2,
                "opacity":  1,
                //"dashArray" : '3',
                "fillColor" : getColors(feature.geometry.coordinates[2]),
               // "radius": getRadius(feature.properties.mag[0])
        }
        }
    }).addTo(baseMap);

})

    // L.geoJSON(response, {
    //     pointToLayer: function (feature, latlng) {
    //         return L.circleMarker(latlng);
    //     }
    // }).addTo(baseMap);
// want size, depth and location
// mag, 


// // // Create a legend to display information about our map
// var info = L.control({
//    position: "bottomright" 
// });



// // Create a function that creates markers
// function createCircleMarker(feature, latlng){

// // Change the symbol criteria
//     var markerOptions = {
//         radius: markerSize(feature.properties.mag),
//         fillColor: getColors(feature.properties.mag),
//         color: "black",
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8
//     }

//     return L.circleMarker (latlng, markerOptions);
// };

// // Use d3 to get data from URL
// d3.json(queryUrl, function(data) {
//     console.log(data)

//     var earthquakes = data.features
  
//     console.log(earthquakes)
    
//     // loop through the data to create markers and popup
//     earthquakes.forEach(function(result){

//       //console.log(result.properties)
//       L.geoJSON(result,{
//         pointToLayer: createCircleMarker

//         // add popups to the circle markers to display data
//       }).bindPopup("Date: " + new Date(result.properties.time) + "<br>Place: " + result.properties.place + "<br>Magnitude: " + result.properties.mag).addTo(myMap)
//     });
  
//     //create legennds and add to the map
//     var legend = L.control({position: "bottomright" });
//     legend.onAdd = function(){
//       // create div for the legend
//       var div = L.DomUtil.create('div', 'info legend'),
//           grades = [0, 1, 2, 3, 4, 5]
//           labels = [];
  
//       // loop through our density intervals and generate a label with a colored square for each interval
//       for (var i = 0; i < grades.length; i++) {
//           div.innerHTML +=
//               '<i style="background:' + getColors(grades[i]) + '"></i> ' +
//               grades[i] + (grades[i +1 ] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//       }
//       return div;
//     };
//     legend.addTo(baseMap);
//   });
// })

// // Initialize all of the LayerGroups we'll be using
// var layers = {
//   COMING_SOON: new L.LayerGroup(),
//   EMPTY: new L.LayerGroup(),
//   LOW: new L.LayerGroup(),
//   NORMAL: new L.LayerGroup(),
//   OUT_OF_ORDER: new L.LayerGroup()
// };

// // // Create the map with our layers
// // var map = L.map("map-id", {
// //   center: [40.73, -74.0059],
// //   zoom: 12,
// //   layers: [
// //     layers.COMING_SOON,
// //     layers.EMPTY,
// //     layers.LOW,
// //     layers.NORMAL,
// //     layers.OUT_OF_ORDER
// //   ]
// // });

// // Add our 'lightmap' tile layer to the map
// lightmap.addTo(map);

// // Create an overlays object to add to the layer control
// var overlays = {
//   "Coming Soon": layers.COMING_SOON,
//   "Empty Stations": layers.EMPTY,
//   "Low Stations": layers.LOW,
//   "Healthy Stations": layers.NORMAL,
//   "Out of Order": layers.OUT_OF_ORDER
// };

// // Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(map);

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);

// // Initialize an object containing icons for each layer group
// var icons = {
//   COMING_SOON: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   }),
//   EMPTY: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "red",
//     shape: "circle"
//   }),
//   OUT_OF_ORDER: L.ExtraMarkers.icon({
//     icon: "ion-minus-circled",
//     iconColor: "white",
//     markerColor: "blue-dark",
//     shape: "penta"
//   }),
//   LOW: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "orange",
//     shape: "circle"
//   }),
//   NORMAL: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   })
// };
