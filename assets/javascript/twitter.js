var twitterLink = "https://twitter.com/";
var brewHandle;

function setTweets(brewery){
    $("#twitterHolder").empty();
    var newTimeline = $("<a>");
    var brewQuery = twitterLink + brewery;
    newTimeline.addClass("twitter-timeline");
    newTimeline.attr("href", brewQuery);
    newTimeline.attr("data-width","300");
    newTimeline.attr("data-height","300");
    $(".twitter-timeline").text("Tweets by @"+brewery);
    $("#twitterHolder").html(newTimeline);
    twttr.widgets.load()
}
