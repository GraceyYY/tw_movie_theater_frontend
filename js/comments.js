class Request {
  constructor(movieId, fn, type) {
    this.movieId = movieId;
    this.request = {};
    this.request.dataType = 'jsonp';
    this.fn = fn;
    this.type = type;
  }
  getData(start) {
    switch(this.type) {
      case('subject'):
        this.request.url = `https://api.douban.com/v2/movie/subject/${this.movieId}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=5&client=&udid=`;
        break;
      case('comments'):
        this.request.url = `https://api.douban.com/v2/movie/subject/${this.movieId}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=5&client=&udid=`;
        break;
      case('reviews'):
        this.request.url = `https://api.douban.com/v2/movie/subject/${this.movieId}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=3&client=&udid=`;
        break;
      default:
        break;
    }
    this.request.success = this.callback.bind(this);
    $.ajax(this.request);
  }
  callback(data) {
    this[this.type] = JSON.parse(JSON.stringify(data[this.type]));
    this.fn(this[this.type]);
  }
}