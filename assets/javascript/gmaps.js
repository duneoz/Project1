//test site
var site = {
    name : "Great Notion Brewing and Barrel House",
    address : "2204 NE Alberta St, Portland, OR 97211",
    lat : 45.558850,
    lon : -122.642590,
    website : "https://www.greatnotionpdx.com",
    summary : "the dankest place for beers",
    handle : "GreatNotionPDX"
}
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDovaxYLNRk4oqfkO5IDOVqtz-xrJqWZmM",
    authDomain: "poppingportland.firebaseapp.com",
    databaseURL: "https://poppingportland.firebaseio.com",
    projectId: "poppingportland",
    storageBucket: "poppingportland.appspot.com",
    messagingSenderId: "802124358547",
    appId: "1:802124358547:web:c0f30cfe7b30eecc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.database();

  var name, address, website, genre, description, handle, lat, lon;

  $('#submit-button').on("click", function(event) {
    event.preventDefault();

    name = $('#site-name').val();
    address = $('#address').val();
    website = $('#website').val();
    genre = $('#genre').val();
    description = $('#description').val();
    handle = $('#handle').val();

    var gmapsAddress = address.split(' ').join('+');
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="
    + gmapsAddress +"&key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        //console.log(response);
        lat = response.results[0].geometry.location.lat;
        lon = response.results[0].geometry.location.lng;

        var newSite = {
            name,
            address,
            website,
            genre,
            description,
            handle,
            lat,
            lon
        }
    
        db.ref().push(newSite);
        
    });

    $('#handle').val("");
    $('#site-name').val("");
    $('#address').val("");
    $('#website').val("");
    $('#genre').val("");
    $('handle').val("");
    $('#description').val("");
    $('#genre').prop("", 0); //Sets the first option as selected
    $('#genre').material_select();        //Update material select
});

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

    //for creating new pins on map based on database
    db.ref().on("child_added", function(snapshot) {
        var newSite = snapshot.val();

        var myLatLng = {lat: newSite.lat, lng: newSite.lon};
        
        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h5 id="firstHeading" class="firstHeading">'+newSite.name+'</h5>'+
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
        '<p><a href='+newSite.website+'>'+
        'click to visit website</a> '+
        '</p>'+
        '</div>'+
        '</div>';

        var infowindow = new google.maps.InfoWindow({
        content: contentString
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: newSite.name
            });
            marker.addListener('click', function() {
            infowindow.open(map, marker);
            setTweets(newSite.handle);
            });

    });
};


$(document).ready(function(){
    $('.sidenav').sidenav();
  });

$(document).ready(function(){
    $('select').formSelect();
});

  
  