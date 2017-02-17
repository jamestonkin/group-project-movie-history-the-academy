"use strict";

//this file will build the movie cards and push them to the dom

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
let user = require("./user.js");
let db = require("./db-interaction.js");

// function that adds cards for the movies that match the search term
function showSearch(movieData) {
    $("#search-results").html("");
    console.log('showSearch initiated');
    // console.log('movieData.length = ', movieData.results.length);
    var moviesArray = movieData.results;
    for (var i = 0; i < moviesArray.length; i++) {
        // console.log('moviesArray[i] = ', moviesArray[i]);
        $("#search-results").append(
                                    `<section id="card-${moviesArray[i].id}" class="card-wrapper col-xs-4" >
                                        <div class="innerCard" style="border: 2px solid black">
                                            <h3 class="movie-header">${moviesArray[i].title}</h3>
                                            <h4 class="movie-year">${moviesArray[i].release_date.slice(0, 4)}</h4>
                                            <img src="https://image.tmdb.org/t/p/w500${moviesArray[i].poster_path}" height="200" >
                                            <h5>No actors listed</h5>
                                            <button type="button" class="add-to-my-movies" value="${moviesArray[i].title}">I want to see this movie</button>
                                            <div class="stars">
                                              <form action="">
                                                <h6>Rate to add to watched movie list:</h6>
                                                <input class="star star-1 radio_item" value="1" id="star-1" type="radio" name="star"/>
                                                <label class="star star-1 label_item" title="1 Star" for="star-1">1★</label>
                                                <input class="star star-2 radio_item" value="2" id="star-2" type="radio" name="star"/>
                                                <label class="star star-2 label_item" title="2 Stars" for="star-2">2★</label>
                                                <input class="star star-3 radio_item" value="3" id="star-3" type="radio" name="star"/>
                                                <label class="star star-3 label_item" title="3 Stars" for="star-3">3★</label>
                                                <input class="star star-4 radio_item" value="4" id="star-4" type="radio" name="star"/>
                                                <label class="star star-4 label_item" title="4 Stars" for="star-4">4★</label>
                                                <input class="star star-5 radio_item" value="5" id="star-5" type="radio" name="star"/>
                                                <label class="star star-5 label_item" title="5 Stars" for="star-5">5★</label>
                                                <input class="star star-6 radio_item" value="6" id="star-6" type="radio" name="star"/>
                                                <label class="star star-6 label_item" title="6 Stars" for="star-6">6★</label>
                                                <input class="star star-7 radio_item" value="7" id="star-7" type="radio" name="star"/>
                                                <label class="star star-7 label_item" title="7 Stars" for="star-7">7★</label>
                                                <input class="star star-8 radio_item" value="8" id="star-8" type="radio" name="star"/>
                                                <label class="star star-8 label_item" title="8 Stars" for="star-8">8★</label>
                                                <input class="star star-9 radio_item" value="9" id="star-9" type="radio" name="star"/>
                                                <label class="star star-9 label_item" title="9 Stars" for="star-9">9★</label>
                                                <input class="star star-10 radio_item" value="10" id="star-10" type="radio" name="star"/>
                                                <label class="star star-10 label_item" title="10 Stars" for="star-10">10★</label>
                                              </form>
                                            </div>
                                        </div>
                                    </section>`);
    }
    // $(".add-to-my-watched-movies").click(addToWatched);
    $(".add-to-my-movies").click(function() {
        db.addToMyMovies();
        $("#current-list-visible").html("My Unwatched Movies");
        $("#search-results").hide();
        $("#my-movies").show();
        db.getAllMovies()
        .then(function(movies) {
            console.log('movies = ', movies);
            showMyMovies(movies);
        });
    });
}

function showMyMovies(userMovies) {
    $("#my-movies").html("");
    console.log('userMovies = ', userMovies);
    for (var i = 0; i <userMovies.length; i++) {
        if (userMovies[i].rating < 1) {
            $("#my-movies").append(
                                        `<section id="card-${userMovies[i].id}" class="card-wrapper col-xs-4" >
                                            <div class="innerCard" style="border: 2px solid black">
                                                <h3 class="movie-header">${userMovies[i].title}</h3>
                                                <h4 class="movie-year">${userMovies[i].year}</h4>
                                                <img src="${userMovies[i].posterURL}" height="200" >
                                                <h5>${userMovies[i].actors}</h5>
                                                <div class="stars">
                                              <form action="">
                                                <input class="star star-1 radio_item" value="1" id="star-1" type="radio" name="star"/>
                                                <label class="star star-1 label_item" title="1 Star" for="star-1">1★</label>
                                                <input class="star star-2 radio_item" value="2" id="star-2" type="radio" name="star"/>
                                                <label class="star star-2 label_item" title="2 Stars" for="star-2">2★</label>
                                                <input class="star star-3 radio_item" value="3" id="star-3" type="radio" name="star"/>
                                                <label class="star star-3 label_item" title="3 Stars" for="star-3">3★</label>
                                                <input class="star star-4 radio_item" value="4" id="star-4" type="radio" name="star"/>
                                                <label class="star star-4 label_item" title="4 Stars" for="star-4">4★</label>
                                                <input class="star star-5 radio_item" value="5" id="star-5" type="radio" name="star"/>
                                                <label class="star star-5 label_item" title="5 Stars" for="star-5">5★</label>
                                                <input class="star star-6 radio_item" value="6" id="star-6" type="radio" name="star"/>
                                                <label class="star star-6 label_item" title="6 Stars" for="star-6">6★</label>
                                                <input class="star star-7 radio_item" value="7" id="star-7" type="radio" name="star"/>
                                                <label class="star star-7 label_item" title="7 Stars" for="star-7">7★</label>
                                                <input class="star star-8 radio_item" value="8" id="star-8" type="radio" name="star"/>
                                                <label class="star star-8 label_item" title="8 Stars" for="star-8">8★</label>
                                                <input class="star star-9 radio_item" value="9" id="star-9" type="radio" name="star"/>
                                                <label class="star star-9 label_item" title="9 Stars" for="star-9">9★</label>
                                                <input class="star star-10 radio_item" value="10" id="star-10" type="radio" name="star"/>
                                                <label class="star star-10 label_item" title="10 Stars" for="star-10">10★</label>
                                              </form>
                                            </div>
                                                <button type="button" class="delete-button" value="Delete">Delete</button>
                                            </div>
                                        </section>`);
        }
    }
    $(".delete-button").click();
}

function showMyWatchedMovies(userMovies) {
    $("#my-watched-movies").html("");
    var myStars = "";
    console.log('userMovies = ', userMovies);
    for (var i = 0; i <userMovies.length; i++) {
        if (userMovies[i].rating >= 1) {
            var myRating = userMovies[i].rating;
            for (var j = 0; j < myRating; j++) {
                myStars += "★ ";
            }
            $("#my-watched-movies").append(
                                        `<section id="card-${userMovies[i].id}" class="card-wrapper col-xs-4" >
                                            <div class="innerCard" style="border: 2px solid black">
                                                <h3 class="movie-header">${userMovies[i].title}</h3>
                                                <h4 class="movie-year">${userMovies[i].year}</h4>
                                                <img src="${userMovies[i].posterURL}" height="200" >
                                                <h5>${userMovies[i].actors}</h5>
                                                <h6>My Rating: ${myStars}</h6>
                                                <button type="button" value="Delete">Delete</button>
                                            </div>
                                        </section>`);
        }
        myStars = "";
    }
}

function showMyFavoriteMovies(userMovies) {
    var myStars = "";
    $("#my-favorite-movies").html("");
    console.log('userMovies = ', userMovies);
    for (var i = 0; i <userMovies.length; i++) {
        var myRating = userMovies[i].rating;
        for (var j = 0; j < myRating; j++) {
            myStars += "★ ";
        }
        $("#my-favorite-movies").append(
                                    `<section id="card-${userMovies[i].id}" class="card-wrapper col-xs-4" >
                                        <div class="innerCard" style="border: 2px solid black">
                                            <h3 class="movie-header">${userMovies[i].title}</h3>
                                            <h4 class="movie-year">${userMovies[i].year}</h4>
                                            <img src="${userMovies[i].posterURL}" height="200" >
                                            <h5>${userMovies[i].actors}</h5>
                                            <h6>User Rating: ${myStars}</h6>
                                            <button type="button" value="Delete">Delete</button>
                                        </div>
                                    </section>`);
    myStars = "";
    }
}

module.exports = {showSearch, showMyMovies, showMyWatchedMovies, showMyFavoriteMovies};

