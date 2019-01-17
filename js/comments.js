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

