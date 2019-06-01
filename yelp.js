// Make AJAX Request
console.log("page-loaded")
$("#button").on("click",function(){
    console.log("HELP ME")
    var apiKey="RPLyzGnxET--j7v02K1jmzxHWmNJs0podt9GY2VOk5K7EB-AoJkgIyg1ZMhwL46mLClRQdN4x4YFJDowsnTkb-MAqAw9uigWnzVvXOPRUonrx4h4KYFpXVGf6czkXHYx";
    $.ajax({
        type: "GET",
        crossDomain:true,
        dataType:"json",

        // beforeSend: function (request) {
        //     request.setRequestHeader("Authorization", 'Bearer ');
        //   },
        // url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Portland&categories=breweries,wineries&sort_by=rating&limit=50",
        // +------------Searches Portland businesses based off categories*
        // url:"https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/oW6yrwsv2h_lD96LxNaaNw",
        url:"https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=1966 NW Pettygrove St, Portland, OR 97209",
        // ----list of businesses based on parameters----
        // {latitude: 45.3145484924316, longitude: -122.910339355469
        // "32230 NE Old Parrett Mtn Rd"
        // url:"https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/matches?name=JORY",
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin":"*",
            "Authorization": `Bearer ${apiKey}`
         }
    }).then(function(response){
           console.log(response);
           console.log(response.businesses[0].rating)
           console.log(response.businesses)
           


        //   $("div").append("<p></p>");


      });
  });