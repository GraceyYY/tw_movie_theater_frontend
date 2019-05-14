const DATABASE = new Database();
let classification = document.getElementById('classification');
let movieList;
init();
classification.addEventListener('click', event => {
  if (event.target.nodeName === 'SPAN') {
    resetPage();
    switchGenre(event.target);
    movieList.movies = DATABASE.getMoviesByGenres(event.target.innerText).responseJSON;
    movieList.showMovie(20);
  }
});

function init() {
  let list = document.getElementsByClassName('movie_list')[0];
  let errorMessege = document.getElementById('error_messege');
  let loadMore = document.getElementById('load_more');
  movieList = new MovieList(list, loadMore, errorMessege);
  let keyword = localStorage.getItem('search');
  if (keyword) {
    search(keyword);
    localStorage.removeItem('search');
    document.getElementById('search').value = keyword;
  }else{
    movieList.movies = DATABASE.getAllMovies().responseJSON;
  }
  movieList.showMovie(20);
}

function resetPage() {
  movieList.reset();
  clearChosenSubject();
}

function searchMovie() {
  search(document.getElementById('search').value);
  movieList.showMovie(20);
}

function search(value) {
  resetPage();
  let genres = DATABASE.getMoviesByGenres(value).responseJSON;
  let keywords = DATABASE.getMoviesByKeyword(value).responseJSON;
  movieList.movies = (keywords.length == 0 ? genres : keywords);
}

function loadMore() {
  movieList.showMovie(20);
}