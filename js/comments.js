class Comments {
  constructor(movieId) {
    this.request = {};
    this.movieId = movieId;
  }
  setRequest() {
    this.request.url = `https://api.douban.com/v2/movie/subject/${this.movieId}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=20&count=20&client=&udid=`;
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
          <div class="comment_head">
            ${commentator}
            <span class="comment_rating">
              评分${rating}
            </span>
            <span class="comment_time">
              ${time}
            </span>
          </div>
          <div class="comment_text">
            ${content}
          </div>
        </div>`;
  let comments = document.getElementById('comments');
  comments.innerHTML += html;
}