var site = {
    name : "Great Notion Brewing and Barrel House",
    address : "101, 5885, 2204 NE Alberta St, Portland, OR 97211",
    lat : 45.558850,
    lon : -122.642590,
    website : "greatnotionpdx.com",
    summary : "the dankest place for beers",
    genre : "brewery"
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

    var myLatLng = {lat: site.lat, lng: site.lon};

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: site.name
    });
}
