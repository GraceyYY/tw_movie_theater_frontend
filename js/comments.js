class Comments {
  constructor(movieId, commentPage, fn) {
    this.request = {};
    this.movieId = movieId;
    this.commentPage = commentPage;
    this.fn = fn;
  }
  setRequest() {
    this.request.url = `https://api.douban.com/v2/movie/subject/${this.movieId}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${this.commentPage}&count=5&client=&udid=`;
    this.request.dataType = 'jsonp';
    this.request.success = this.callback.bind(this);
  }
  callback(data) {
    this.comments = JSON.parse(JSON.stringify(data.comments));
    this.subject = JSON.parse(JSON.stringify(data.subject));
    this.fn(this);
    // for (let i = 0; i < 5; i++) {
    //   createOneComment(this.comments[i]);
    // }
  }
  getComments() {
    $.ajax(this.request);
  }
}
class Reviews {
  constructor(movieId, reviewStart, fn) {
    this.request = {};
    this.movieId = movieId;
    this.reviewStart = reviewStart;
    this.fn = fn;
  }
  setRequest() {
    this.request.url = `https://api.douban.com/v2/movie/subject/${this.movieId}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${this.reviewStart}&count=3&client=&udid=`;
    this.request.dataType = 'jsonp';
    this.request.success = this.callback.bind(this);
  }
  callback(data) {
    this.reviews = JSON.parse(JSON.stringify(data.reviews));
    this.fn(this.reviews);
  }
  getComments() {
    $.ajax(this.request);
  }
}