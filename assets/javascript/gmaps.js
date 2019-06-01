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

/* ---- INIT FIREBASE ---- */
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


/* ---- GOOGLE MAPS & STYLING ---- */

// array of brew and wine markers
var breweries=[];
var brewOn=true;
var wineries=[];
var wineOn=true;
var allInfos=[];

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


    /* --- CREATE PINS --- */
    db.ref().on("child_added", function(snapshot) {
        var newSite = snapshot.val();

        var myLatLng = {lat: newSite.lat, lng: newSite.lon};
        
        var contentString = '<div id="content">'+

        '<div id="siteNotice">'+
        '</div>'+
        '<h5 id="firstHeading" class="firstHeading">'+newSite.name+'</h5>'+
        '<div id="bodyContent">'+
        '<p>'+newSite.description+'</p>'+
        '<p><a href='+newSite.website+'>'+
        'click to visit website</a> '+
        '</p>'+
        '</div>'+
        '</div>';
  
        // create info window for pin
        var infowindow = new google.maps.InfoWindow({
        content: contentString
        });

        allInfos.push(infowindow);
    
        // create a beerIcon object, set it to a beer glass icon
        var beerIcon = {
            url: 'https://cdn2.iconfinder.com/data/icons/fatcow/32x32/beer.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };

        // create a wineIcon object, set it to a wine glass icon
        var wineIcon = {
            url: 'assets/images/wine.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };

        // if brewery...
        if(newSite.genre == "Brewery"){
          // Create new marker from DB
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: newSite.name,
                //set the icon to a beer glass icon
                icon: beerIcon
            });
            breweries.push(marker); 
            marker.addListener('click', function() {
                infowindow.open(map, marker);
                setTweets(newSite.handle);
            }); 
        } else {
            // Create new marker from DB
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: newSite.name,
                //set the icon to a beer glass icon
                icon: wineIcon
            });
            wineries.push(marker);
            marker.addListener('click', function() {
                for (i=0;i<allInfos.length;i++){
                    allInfos[i].close();
                }
                infowindow.open(map, marker);
                setTweets(newSite.handle);
            });             
        }       
    });

    // set brewery button to toggle
    $("#breweryBtn").click(function(){
        if(brewOn){
            for(i=0;i<breweries.length;i++){
                breweries[i].setMap(null);
            }
        } else {
            for(i=0;i<breweries.length;i++){
                breweries[i].setMap(map);
            }
        }

        brewOn = !brewOn;
    }) 

    // set winery button to toggle
    $("#wineryBtn").click(function(){
        if(wineOn){
            for(i=0;i<wineries.length;i++){
                wineries[i].setMap(null);
            }
        } else {
            for(i=0;i<wineries.length;i++){
                wineries[i].setMap(map);
            }
        }

        wineOn = !wineOn;
    }) 
}

/* --- HTML FUNCTIONALITY --- */

$(document).ready(function(){
    $('.sidenav').sidenav();
  });

$(document).ready(function(){
    $('select').formSelect();

});


/* ---- ADD LOCATION TO FIREBASE FROM FORM ---- */
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