class Comments {
  constructor(movieId) {
    this.request = {};
    this.movieId = movieId;
  }
  setRequest() {
    this.request.url = `https://api.douban.com/v2/movie/subject/${this.movieId}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=&udid=`;
    this.request.dataType = 'jsonp';
    this.request.success = this.callback.bind(this);
  }
  callback(data) {
    this.comments = JSON.parse(JSON.stringify(data.comments));
    this.subject = JSON.parse(JSON.stringify(data.subject));
    setTitle(this.subject);
    setCover(this.subject);
    setDetailLink(this.subject.directors, 'directors');
    setDetailLink(this.subject.casts, 'casts');
    setDetail(this.subject.genres, 'genres');
    setDetail(this.subject.pubdates, 'pubdates');
    setDetail(this.subject.durations, 'durations');
    setRating(this.subject.rating.average);
    for (let i = 0; i < 5; i++) {
      createOneComment(this.comments[i]);
    }
  }
  getComments() {
    $.ajax(this.request);
  }
}

function createOneComment(comment) {
  let commentator = comment.author.name;
  let rating = comment.rating.value;
  let time = comment.created_at;
  let content = comment.content;
  let html = `<div class="comment_item">
          <div class="avatar">
            <a href="${comment.author.alt}">
              <img src="${comment.author.avatar}"/>
            </a>
          </div>
          <div class="comment_main">
            <div class="comment_head">
              ${comment.author.name}
              <span class="comment_rating">
                评分：${comment.rating.value}
              </span>
              <span class="comment_time">
                ${comment.created_at}
              </span>
            </div>
            <div class="comment_text">
              ${comment.content}
            </div>
          </div>
        </div>`;
  let comments = document.getElementById('comments');
  comments.innerHTML += html;
}