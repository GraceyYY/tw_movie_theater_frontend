class MovieList {
  constructor(list, loadMore, errorMessege) {
    this.movies = [];
    this.list = list;
    this.loadMore = loadMore;
    this.errorMessege = errorMessege;
    this.count = 0;
  }
  reset() {
    this.count = 0;
    this.movies = [];
    this.list.innerHTML = '';
    this.clearErrorMessage();
  }
  generateMovieList(movie) {
    let movieHtml = `
    <div class="movie">
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
                  <span class="title">分类：</span>
                  <span class="small_font">${movie.genres}</span>
                </div>
                <div class="cast">
                  <span class="title">主演：</span>
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
            <span class="title">导演：</span>
            <span class="directors small_font">${movie.directors}</span>
          </div>
        </div>
    `;
    this.list.innerHTML += movieHtml;
  }
  showMovie(num) {
    if (this.movies.length > 0) {
      if (this.count < this.movies.length - num) {
        for (let i = this.count; i < this.count + num; i++) {
          this.generateMovieList(this.movies[i]);
        }
        this.count += num;
      } else if (this.count < this.movies.length) {
        for (let i = this.count; i < this.movies.length; i++) {
          this.generateMovieList(this.movies[i]);
        }
        this.count = this.movies.length;
      }
      this.loadMoreMovies();
    } else {
      this.showErrorMessage();
    }
  }
  loadMoreMovies() {
    this.loadMore.innerHTML = (this.count === this.movies.length) ? '已显示全部电影' : '加载更多电影';
  }
  showErrorMessage() {
    this.errorMessege.classList.add('show_error');
  }
  clearErrorMessage() {
    this.errorMessege.classList.remove('show_error');
  }
}