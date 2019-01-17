function toggleLoadMore(){
    const loadMore = document.getElementById('load_more');
    if(isAllMoviesDisplayed()){
        loadMore.innerText = '已显示全部电影';
    }else{
        loadMore.innerText = '加载更多电影';
    }
}

function generateMovieList(dom, id) {
  dom.innerHTML += generateMovieIntro(id);
}

function generateMovieIntro(id) {
  let movie = data.searchById(id);
  return `
    <div class="movie">
          <div class="brief">
            <img src=${movie.image} onerror="this.src='../ly_images/default.png'"></img>
            <div class="detail">
              <img src=${movie.image} onerror="this.src='../ly_images/default.png'"></img>
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
              <span class="score">8.7</span>
            </div>
            <span class="title">导演：</span>
            <span class="directors small_font">${movie.directors}</span>
          </div>
        </div>
    `;
}

function clearMovieList(){
    list.innerHTML = '';
    let subjects = document.getElementsByClassName('subject');
    for(let subject of subjects) {
        subject.classList.remove('chosen');
    }
}

function switchGenre(genre){
    genre.classList.add('chosen');
}