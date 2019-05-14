const DATABASE = new Database();
let movie = DATABASE.getMovieById(id[0]).responseJSON;
let genres = movie[0].genres.split(",")[0];
let recommendedMovies = DATABASE.getMoviesByGenres(genres).responseJSON;

showMovies(10, recommendedMovies);
function showMovies(num, movies) {
  const list = document.getElementsByClassName('movie_list')[0];
  if (movies.length < num) {
    movies.forEach(movie => {
      generateMovieList(list, movie);
    });
  } else {
    for (let i = 0; i < num; i++) {
      generateMovieList(list, movies[i]);
    }
  }
}

function generateMovieList(dom, movie) {
  dom.innerHTML += generateMovieIntro(movie);
}

function generateMovieIntro(movie) {
  return `
    <div class="movie_recommend">
          <div class="brief">
            <img src=${movie.image} onerror="this.src='../images/default.png'"></img>
            <div class="detail">
              <img src=${movie.image} onerror="this.src='../images/default.png'"></img>
              <div class="detail_card">
                <div class="row">
                  <a class="name" href="./detail.html?id=${movie.id}" target="_blank">${movie.title}</a>
                  <span class="year small_font">${movie.year}</span>
                </div>
                <div class="subjects">
                  <span class="title_recommend">分类：</span>
                  <span class="small_font">${movie.genres}</span>
                </div>
                <div class="cast">
                  <span class="title_recommend">主演：</span>
                  <span class="small_font">${movie.casts}</span>
                </div>
                <div class="icons">
                  <i class="far fa-heart"></i>
                  <i class="far fa-play-circle"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="brief_introduction">
            <div class="row wide_width">
              <a class="name" href="./detail.html?id=${movie.id}" target="_blank">${movie.title}</a>
              <span class="score">${movie.rating}</span>
            </div>
            <span class="title_recommend">导演：</span>
            <span class="directors small_font">${movie.directors}</span>
          </div>
        </div>
    `;
}

function search() {
  const value = document.getElementById('search').value;
  localStorage.setItem('search', value);
  window.open('homepage.html#classification');
  document.getElementById('search').value = '';
}