var twitterLink = "https://twitter.com/";

function setTweets(brewery){
    $("#twitterHolder").empty();
    var newTimeline = $("<a>");
    var brewQuery = twitterLink + brewery;
    newTimeline.addClass("twitter-timeline");
    newTimeline.attr("href", brewQuery);
    newTimeline.attr("data-width","100%");
    newTimeline.attr("data-height","440px");
    newTimeline.attr("data-chrome","noheader nofooter");
    $(".twitter-timeline").text("Tweets by @"+brewery);
    $("#twitterHolder").html(newTimeline);
    twttr.widgets.load()
}
