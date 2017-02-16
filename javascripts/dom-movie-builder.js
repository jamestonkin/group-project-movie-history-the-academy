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
                                            <button type="button" class="add-to-my-watched-movies" value="add-to-my-watched-movies">I seen this movie</button>
                                        </div>
                                    </section>`);
    }
    // $(".add-to-my-watched-movies").click(addToWatched);
    $(".add-to-my-movies").click(db.addToMyMovies);
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
                                                <h6>User Rating: ${userMovies[i].rating}</h6>
                                                <button type="button" value="Delete">Delete</button>
                                            </div>
                                        </section>`);
        }
    }
}

function showMyWatchedMovies(userMovies) {
    $("#my-watched-movies").html("");
    console.log('userMovies = ', userMovies);
    for (var i = 0; i <userMovies.length; i++) {
        if (userMovies[i].rating >= 1) {
            $("#my-watched-movies").append(
                                        `<section id="card-${userMovies[i].id}" class="card-wrapper col-xs-4" >
                                            <div class="innerCard" style="border: 2px solid black">
                                                <h3 class="movie-header">${userMovies[i].title}</h3>
                                                <h4 class="movie-year">${userMovies[i].year}</h4>
                                                <img src="${userMovies[i].posterURL}" height="200" >
                                                <h5>${userMovies[i].actors}</h5>
                                                <h6>User Rating: ${userMovies[i].rating}</h6>
                                                <button type="button" value="Delete">Delete</button>
                                            </div>
                                        </section>`);
        }
    }
}

function showMyFavoriteMovies(userMovies) {
    $("#my-favorite-movies").html("");
    console.log('userMovies = ', userMovies);
    for (var i = 0; i <userMovies.length; i++) {
        $("#my-favorite-movies").append(
                                    `<section id="card-${userMovies[i].id}" class="card-wrapper col-xs-4" >
                                        <div class="innerCard" style="border: 2px solid black">
                                            <h3 class="movie-header">${userMovies[i].title}</h3>
                                            <h4 class="movie-year">${userMovies[i].year}</h4>
                                            <img src="${userMovies[i].posterURL}" height="200" >
                                            <h5>${userMovies[i].actors}</h5>
                                            <h6>User Rating: ${userMovies[i].rating}</h6>
                                            <button type="button" value="Delete">Delete</button>
                                        </div>
                                    </section>`);
    }
}

// Helper functions for forms stuff. Nothing related to Firebase
// Build a movie obj from form data.
// function buildMovieObj() {//this function needs work, but I don't want to mess with it quite yet
//     let movieObj = {
//     title: $("#form--title").val(),
//     artist: $("#form--artist").val(),
//     album: $("#form--album").val(),
//     year: $("#form--year").val()
//   };
//   return movieObj;
// }


// function createHTML(searchResult) {
// 	var movieTemplate = document.getElementById('movie-cards').innerHTML;
// 	var compiledTemplate = Handlebars.compile(movieTemplate);
// 	var newGeneratedHTML = compiledTemplate(searchResult);
// 	console.log("movieTemplate", movieTemplate);

// 	//the next two lines of code put the result of the template into the empty div that the user will see
// 	var movieContainer = document.getElementById('movie-container');
// 	movieContainer.innerHTML = newGeneratedHTML;

// }


//probably need to use the first part of the below link for grabbing the poster from the api
//https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

module.exports = {showSearch, showMyMovies, showMyWatchedMovies, showMyFavoriteMovies};