const classification = document.getElementById('classification');
const data = new MovieData(movie);
const list = document.getElementsByClassName('movie_list')[0];
let count = 0;

classification.addEventListener('click', event => {
    count = 0;
    clearMovieList();
    switchGenre(event.target);
    movies = data.searchByGenre([event.target.innerText]);
    showMovies(20, movies,list);
});

function showMovies(num, movies, dom) {
  if (count < movies.length - num) {
    for (let i = count; i < count + num; i++) {
      generateMovieList(list, movies[i].id);
    }
    count += num;
  } else if (count < movies.length) {
    for (let i = count; i < movies.length; i++) {
      generateMovieList(list, movies[i].id);
    }
    count = movies.length;
  }
  toggleLoadMore();
}

function isAllMoviesDisplayed() {
  return count === movies.length;
}

function loadMore() {
  showMovies(20, movies, list);
}