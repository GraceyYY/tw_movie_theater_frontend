Papa.parse("../data/movies.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function(results) {
    results.data.pop();
    let movieData = JSON.stringify(results.data);
    localStorage.setItem('movie', movieData);
  }
});
const classification = document.getElementById('classification');
const data = new MovieData(JSON.parse(localStorage.getItem('movie')));
let movieList;
init();
classification.addEventListener('click', event => {
  if (event.target.nodeName === 'SPAN') {
    resetPage();
    switchGenre(event.target);
    movieList.movies = data.searchByGenre([event.target.innerText]);
    movieList.showMovie(20);
  }
});

function init() {
  const list = document.getElementsByClassName('movie_list')[0];
  let errorMessege = document.getElementById('error_messege');
  let loadMore = document.getElementById('load_more');
  movieList = new MovieList(list, loadMore, errorMessege);
  if (localStorage.getItem('search')) {
    search(localStorage.getItem('search'));
    localStorage.removeItem('search');
  } else {
    movieList.movies = data.searchByGenre(['剧情']);
    movieList.showMovie(20);
  }
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
  if (data.genresToId[value]) {
    movieList.movies = data.searchByGenre([value]);
  } else {
    let names = data.nameToId.keys();
    for (let name of names) {
      if (name.includes(value.toLowerCase())) {
        movieList.movies.push(data.searchByName(name));
      }
    }
  }
}

function loadMore() {
  movieList.showMovie(20);
}