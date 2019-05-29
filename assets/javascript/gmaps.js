var brewery = {
    id : "1",
    class : "pin",
    name : "Great Notion Brewing and Barrel House",
    address : "101, 5885, 2204 NE Alberta St, Portland, OR 97211",
    lat : 45.558850,
    lon : -122.642590,
    website : "https://www.greatnotionpdx.com",
    summary : "the dankest place for beers"
}



//CODE FOR GOOGLE MAPS AND MAP STYLING

// create map query constants

const apiKey = "AIzaSyDCbd6kaJ6PfibF3ul_mvkL5tPTkYyeV50";
const lattitude = 45.522927;
const longitude = -122.661278;
const initZoom = 11;

// create function to call map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lattitude, lng: longitude},
        zoom: initZoom,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: false,
            
// custom styling of google map
        styles:[
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#808080"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "landscape",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#d5d5d5"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#c0c0c0"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#979797"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#9fb0b5"
                }]
            }
        ]
    });

    var myLatLng = {lat: brewery.lat, lng: brewery.lon};

    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h5 id="firstHeading" class="firstHeading">'+brewery.name+'</h5>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p><a href='+brewery.website+'>'+
        'Brewery Link</a> '+
        '</p>'+
        '</div>'+
        '</div>';
  
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
  
    var marker = new google.maps.Marker({
    //   position: uluru,
    //   map: map,
    //   title: 'Uluru (Ayers Rock)'
      position: myLatLng,
      map: map,
      title: brewery.name
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    // var marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: map,
    //   title: brewery.name
    // });
};


// function addMarker(location, map) {
//     // Add the marker at the clicked location, and add the next-available label
//     // from the array of alphabetical characters.
//     var marker = new google.maps.Marker({
//       position: location,
//       label: labels[labelIndex++ % labels.length],
//       map: map
//     });
// };
    
// map.addMarker({
//     lat: brewery.lat,
//     lng: brewery.lon,
//     infoWindow: {
//         content: brewery.name + brewery.summary
//     },
//     mouseover: function() {
//         this.infoWindow.open(this.map, this);
//     },
//     mouseout: function() {
//         this.infoWindow.close();
//     }
// });


  
  