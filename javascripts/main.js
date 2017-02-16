"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),

    movieBuilder = require("./dom-movie-builder"),
    user = require("./user"),
    api = require("./api-interaction.js");

user.logOut();


$( document ).ready(function() {
    // Hides buttons and divs until logged in
    $(".select-button").hide();
    $(".hidden-div").hide();
});

// Using the REST API
function loadMoviesToDOM(input) {
    console.log("Where the movies at??", input);
    db.getMovies(input)
    .then((movieData)=>{//movieData comes from the getMovies function, by the resolution of the Promise
        // NEED TO POPULATE DOM HERE
        movieBuilder.showSearch(movieData);
    });
}

// listener that askes the user to log in with google when "Sign in" is clicked
$("#auth-btn").click(function(){
    console.log("clicked auth");
    user.logInGoogle()
    .then(function(results){
        user.setUser(results.user.uid);
        $(".select-button").show();
        $("#current-list-visible").html("My Movies");
        db.getAllMovies()
        .then( function(movies){
            console.log("Your Movies: ", movies);
        });
    });
});

// listener that logs the user out when "logout" is clicked
$("#logout").click(function(){
  console.log("clicked log out");
  user.logOut();
  $(".select-button").hide();
  $(".hidden-div").hide();
  $("#current-list-visible").html("");
  // loadMoviesToDOM();
});

// Listener for the search box
$("#searchbar").keypress(function(e) {
	showSearch(e);
});

// When searching and pressing enter, hides all Divs then shows the My Searched Movie DIV
// and adds which current list you are looking at in h2
function showSearch(e) {
	if (e.keyCode == '13') {
		let input = $("#searchbar").val();

        // Hide or show divs
		$("#searchbar").val("");
		$(".hidden-div").hide();
		$("#search-results").show();
		$("#current-list-visible").html("My Movie Search");
        // Declare variables to receive search results
        var firebaseMovies = [];
        var searchedMovies = [];

        // Look for instances of the searched string in the database
        db.searchFirebase(input)
        .then( function(firebaseResults){
            firebaseMovies = firebaseResults;
        });

        // Search for instances of the string using the API
        api.searchFor(input)
        .then( function(apiResult){
            searchedMovies = apiResult.results;
        })
        // Then find duplicates among the two arrays of movies
        .then( function(){
            console.log("[API] Searched: ", searchedMovies);
            console.log("[FIRE] Found: ", firebaseMovies);
            findDuplicates(searchedMovies, firebaseMovies);
        });
    loadMoviesToDOM(input);
  }
}

// Listeners on buttons to add backgrounds to active button and hides other associated
// Divs while showing DIV associated with that button
$(".select-button").click(function(event) {
	$(".hidden-div").hide();
  if (event.currentTarget.id === "search-results-btn") {
		$("#current-list-visible").html("My Movie Search");
		$("#search-results").show();
  }
  if (event.currentTarget.id === "unwatched-btn"){
		$("#current-list-visible").html("My Unwatched Movies");
		$("#my-movies").show();
  }
  if (event.currentTarget.id === "watched-btn") {
		$("#current-list-visible").html("My Watched Movies");
		$("#my-watched-movies").show();
	}
	if (event.currentTarget.id === "favorites-btn") {
		$("#current-list-visible").html("My Favorites");
		$("#favorites").show();
	}
});



// Finds duplicates among movies searched in (1) The Api and (2) Firebase
function findDuplicates(searchedMovies, firebaseMoviesFound){
    var i, j;


    var combinedMoviesToShow = searchedMovies;


    for(i = 0; i < searchedMovies.length; i++){
        for(j = 0; j < firebaseMoviesFound.length; j++){
            if(searchedMovies[i].id === firebaseMoviesFound[j].id){
                // Id the DB movie(s) are already in the search results:
                console.log("DUPLICATE!!: ", searchedMovies[i].title);
                // Do nothing
            }else{
                // If the DB movies are NOT included in the search results:
                // DO NOTHING
            }
        }
    }
    console.log("MOVIES THAT WILL POPULATE THE DOM (upon hitting enter):\n", combinedMoviesToShow);
}


// Slider 
$(document).on("input", "#slider", function(event){
    var newNum = parseInt(event.target.value);

    db.getAllMovies()
    .then( function(movies){
        console.log("MY MOVIES: ", movies);
        var filteredMovies = [];
        for(var i = 0; i < movies.length; i++){
            if(parseInt(movies[i].rating) >= newNum){
                filteredMovies.push(movies[i]);
            }
        }
        if(filteredMovies.length === 0){
            // Tell user that they have no movies with this rating or greater
        }
        console.log("FILTERED: ", filteredMovies);
        // Populate DOM with filteredMovies here
    });
});




