var topics = ["The Office", "Living Single", "The Simpsons", "RuPaul's Drag Race", "Rick and Morty", "South Park", "Martin"];

// function for displaying show data
function renderButtons() {
    $("#buttons-view").empty();
    //looping through array of shows
    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass("show-btn");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#buttons-view").append(btn);
    }
};

//function to display gifs
function displayGiphy() {
    $("#giphy-view").empty();
    var show = $(this).attr("data-name");
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" +
      show + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&rating=g&rating=pg";

    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then(function(response) {
        console.log(giphyURL);
        console.log(response.data)
        //storing an arary of results in varialbe
        var results = response.data;
        //looping over every results item
        for (var a = 0; a < results.length; a++) {
            var gifDiv = $("<div>");
            var gifRating = results[a].rating;
            var ratingP = $("<p>").text("Rating: " + gifRating);
            ratingP.addClass("float-left")
            var showImage = $("<img>");
            showImage.addClass("float-left")
            showImage.attr("src", results[a].images.fixed_height.url);
            gifDiv.append(ratingP);

            gifDiv.append(showImage);

            showImage.addClass("widImg")
            gifDiv.addClass("col-md-4 divSpace")


            $("#giphy-view").prepend(gifDiv);
            
        }
    });

};

// re-renders HTML to display appropriate show content
function displayShowInfo() {
    $("#show-view").empty();
    var show = $(this).attr("data-name");
    var showURL = "https://www.omdbapi.com/?t=" + show + "&apikey=trilogy";
    // ajax call for a specific show button being clicked
    $.ajax({
        url: showURL,
        method: "GET"
    }).then(function(res) {
        console.log(res);
        //holds the show
        var showDiv = $("<div>");
        var name = res.Title;
        console.log(name);
        var viewName = $("<h3>").text(name);
        showDiv.append(viewName);
        // Storing rating data
        var showRating = res.Rated;
        console.log(showRating);
        // creating p tag to house rating
        var viewRating = $("<p>").text("Rating: " + showRating);
        // display rating
        showDiv.append(viewRating);
        // store release year
        var released = res.Released;
        console.log(released);
        var viewReleased = $("<p>").text("Released: " + released);
        showDiv.append(viewReleased);
        var plot = res.Plot;
        console.log(plot);
        var viewPlot = $("<p>").text("Plot: " + plot);
        showDiv.append(viewPlot);
        var imgURL = res.Poster;
        console.log(imgURL);
        var viewIMG = $("<img>").attr("src", imgURL);
        showDiv.append(viewIMG);
        $("#show-view").append(showDiv);
    });
};

function submitForm () {
    frm.submit(); // Submit
    $('form :input').attr('value', '');
}

//on click even to add buttons
$("#add-show").on("click", function(event) {
    event.preventDefault();
    //grabs input from textbox
    var showInput = $("#show-input").val().trim();
    //adding show from textbox to array
    topics.push(showInput);
    console.log(topics);
    //calling function that handles processing of array
    renderButtons();
    submitForm();
});
// //adding click event to all elements with class of show-btn

$(document).on("click", ".show-btn", displayShowInfo);

$(document).on("click", ".show-btn", displayGiphy);

//display initial buttons
renderButtons();
console.log(topics);




