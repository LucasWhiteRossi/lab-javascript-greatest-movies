const { monitorEventLoopDelay } = require('perf_hooks')
const movies = require('./data.js')

// The `movies` array from the file `src/data.js`.
// console.log('movies: ', movies);


// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  const director = movies.map((movie)=>movie.director)
  let unique_directors = []
    director.forEach(function(director){
      if (!unique_directors.includes(director)){
        unique_directors.push(director)
      }
    })
  return unique_directors
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  return movies.filter((movie) => {
    const drama = movie["genre"].map((a)=>a.toUpperCase()).includes("DRAMA")
    const spielberg = movie["director"].toUpperCase().includes("STEVEN SPIELBERG")
    return drama && spielberg
  }
).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  const len = movies.length
  if (!(len>0)){
    return 0
  }
  const scores = movies.filter((movie)=>movie.score).map((movie)=>movie.score)
  const sum = scores.reduce((a,b)=>a+b)
  return parseFloat((sum/len).toFixed(2))
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  const len = movies.filter((movie)=>movie.genre.includes("Drama")).length;
  if (!(len>0)){
    return 0
  }
  const scores = movies.filter((movie)=>movie.genre.includes("Drama")).filter((movie)=>movie.score).map((movie)=>movie.score)
  const sum = (len==1)?scores[0]:scores.reduce((a,b)=>a+b)
  return parseFloat((sum/len).toFixed(2))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  
  const orderedMovies = [...movies]

  orderedMovies.sort((a,b)=>{
    if(a.year===b.year){
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    }
    return a.year - b.year
  })

  return orderedMovies
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  return movies.filter((movie)=>movie.title).map((movie)=>movie.title).sort().slice(0,20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  let filtered = movies.filter((movie)=>movie.duration);
  transformed = []
  for(i=0; i<filtered.length; i++){
    let newMovie = filtered[i]
    reHour = /([0-9]{1,2})h/;
    reMin = /([0-9]{1,2})min/;
    if (typeof filtered[i].duration === "string"){
      const hours = filtered[i].duration.includes("h")?filtered[i].duration.match(reHour)[1]:0
      const minutes = filtered[i].duration.includes("min")?filtered[i].duration.match(reMin)[1]:0
      if (hours){
        newMovie.duration = 60*parseInt(hours)
      }
      if (minutes){
        newMovie.duration += parseInt(minutes)
      }
      if (typeof newMovie.duration === "number"){
        transformed.push(newMovie)
      } //else {
        //console.log(newMovie)
      //}
    }
  }
  //console.log(typeof transformed[0].duration, transformed[0].duration)
  return transformed
}

const result = turnHoursToMinutes(movies)[0]
console.log(result.duration, typeof result.duration)

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  
  if (movies.length===0 || typeof movies !== "object"){
    return null
  }
  let years = movies.filter((movie)=>movie.year).map((movie)=>movie.year)

  //turning year unique:
  years = years.filter((v, i, a) => a.indexOf(v) === i)
  years = years.sort((a,b)=>(a-b))
  yearScores = []
  years.forEach(year=>{
    const yearMovies = movies.filter((movie)=>movie.year===year)
    const score = scoresAverage(yearMovies)
    yearScores.push({
      year:year,
      score:score
    })
  })
  const bestScore = yearScores.filter((a)=>a.score).map(a=>a.score).sort((a,b)=>b-a)[0];
  const bestYear = yearScores.filter((a)=>a.score===bestScore).sort((a,b)=>a.score-b.score)[0];
  return `The best year was ${bestYear.year} with an average score of ${bestYear.score}`
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
