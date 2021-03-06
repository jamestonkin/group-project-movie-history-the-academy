'use strict';


let $ = require('jquery'); // Might not be necesary
var firebase = require("./firebaseConfig");
var user = require("./user.js");

// Gets all movies with specified UID
// function getMovies(user){
//  return new Promise(function(resolve, reject){
//    $.ajax({
//      url: `https://movie-history-6e707.firebaseio.com?orderBy="uid"&equalTo="${user}"`,
//      type: "GET"
//    }).done(function(movieData){
//      console.log("GETMOVIES(): ", movieData);
//      resolve(movieData);
//    }).fail( function(error){
//      console.log("ERROR");
//      reject(error);
//    });
//  });
// }

function getMovies(searchResult){
  console.log('searchResult = ', searchResult);
  return new Promise(function(resolve, reject){
    $.ajax({
      // url: `https://movie-history-6e707.firebaseio.com?orderBy="uid"&equalTo="${user}"`
      url: `https://api.themoviedb.org/3/search/movie?api_key=XXXXXXXXXXXXXXXXXXXXXXXXX&query=${searchResult}`,
      type: "GET"
    }).done( function(movieData){
      // var movies = Object.values("movieData");
      resolve(movieData);
    }).fail( function(error){
      console.log("ERROR");
      reject(error);
    });
  });
}


// function that adds movie to the database
function addToMyMovies() {
    console.log('you clicked I want to see this movie');
    var currentCard = $(event.currentTarget);
    // console.log('url:', currentCard.siblings("img").attr("src"));
    var currentUser = user.getUser();
    var myMovie = {
        "title": currentCard.siblings("h3").html(),
        "year": currentCard.siblings("h4").html(),
        "actors": currentCard.siblings("h5").html(),
        "userID": currentUser,
        "rating": 0,
        "posterURL": currentCard.siblings("img").attr("src")
    };
    return new Promise (function(resolve, reject) {
        $.ajax({
            url: "https://movie-history-6e707.firebaseio.com/movies.json",
            type: "POST",
            data: JSON.stringify(myMovie),
            dataType: "json"
        }).done(function(movie) {
            resolve(movie);
        });
    });
}

// Deletes a movie using the movie's UID
function deleteMovie(movieTitle){
    // console.log('movieTitle = ', movieTitle);
    var currentUser = user.getUser();
    $.ajax({
        url: `https://movie-history-6e707.firebaseio.com/movies.json`,
        type: "GET"
    }).done(function(movieData){
        // console.log('movieData = ', movieData);
        var moviesKeys = Object.keys(movieData);
        var moviesObjects = Object.values(movieData);
        // console.log('movies in deleteMovie = ', movies);
        for (var i = 0; i < moviesObjects.length; i++) {
            if (currentUser === moviesObjects[i].userID && movieTitle === moviesObjects[i].title) {
                console.log('movie that matches userID and title of delete button = ', moviesKeys[i]);
                $.ajax({
                    url: `https://movie-history-6e707.firebaseio.com/movies/${moviesKeys[i]}.json`,
                    method: "DELETE"
                });
            }
        }

    });
}

function searchFirebase(searchString){
    return new Promise(function(resolve, reject){
        var foundMovies = [];
        var tempMovie;
        $.ajax({
            // url: `https://movie-history-6e707.firebaseio.com?orderBy="uid"&equalTo="${user}"`
            url: `https://movie-history-6e707.firebaseio.com/movies.json`,
            type: "GET"
        }).done( function(movieData){
            var movies = Object.values(movieData);
            var myMovies = filterUser(movies);

            for(var i = 0; i < myMovies.length; i++){
              tempMovie = myMovies[i].title.toLowerCase();
                if(tempMovie.includes(searchString)){
                    foundMovies.push(myMovies[i]);
                }
            }
            resolve(foundMovies);
        }).fail( function(error){
            console.log("ERROR");
            reject(error);
        });
    });
}

function getAllMovies(){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: `https://movie-history-6e707.firebaseio.com/movies.json`,
            type: "GET"
        }).done( function(movieData){
            var movies = Object.values(movieData);
            var myMovies = filterUser(movies);
            resolve(myMovies);
        }).fail( function(error){
            console.log("ERROR");
            reject(error);
        });
    });
}



module.exports = {getMovies, addToMyMovies, deleteMovie, searchFirebase, getAllMovies};



// NOT SUPPOSED TO BE EXPORTED
// This function is just used within the prior functions for more clarity/modularization
function filterUser(movies){
    var filteredMovies = [];
    for(var i = 0; i < movies.length; i++){
        if(movies[i].userID === user.getUser()){
            filteredMovies.push(movies[i]);
        }
    }
    return filteredMovies;
}
