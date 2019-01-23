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
const list = document.getElementsByClassName('movie_list')[0];
let count = 0;
let movies = [];
init();
classification.addEventListener('click', event => {
  if (event.target.nodeName === 'SPAN') {
    resetPage();
    switchGenre(event.target);
    movies = data.searchByGenre([event.target.innerText]);
    showMovies(20, movies, list);
  }
});

function init() {
  if (localStorage.getItem('search')) {
    search(localStorage.getItem('search'));
    localStorage.removeItem('search');
  } else {
    movies = data.searchByGenre(['剧情']);
    showMovies(20, movies, list);
  }
}

function resetPage() {
  count = 0;
  movies = [];
  clearMovieList();
  clearChosenSubject();
  showErrorMessege(false);
}

function searchMovie() {
  search(document.getElementById('search').value);
  showMovies(20, movies, list);
}

function search(value) {
  resetPage();
  if (data.genresToId[value]) {
    movies = data.searchByGenre([value]);
  } else {
    let names = data.nameToId.keys();
    for (let name of names) {
      if (name.includes(value.toLowerCase())) {
        movies.push(data.searchByName(name));
      }
    }
  }
}

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
  needLoadMore(!(count === movies.length));
}

function loadMore() {
  showMovies(20, movies, list);
}
const imgUrls = ['http://puui.qpic.cn/media_img/0/vnewpictag_4_81_1546932831904820_14323_1680_580/0', 'http://puui.qpic.cn/media_img/0/vnewpictag_6_353_1547193470360262_32385_1680_580/0', 'http://puui.qpic.cn/media_img/0/vnewpictag_8_1292_1547193478591265_30717_1680_580/0'];

function showPosters() {
  const poster = document.getElementById('big_poster');
  for (let i = 0; i < imgUrls.length; i++) {
    setTimeout(() => {
      poster.setAttribute('src', imgUrls[i]);
    }, 5000 * i);
  }
}
setInterval('showPosters()', 15000);