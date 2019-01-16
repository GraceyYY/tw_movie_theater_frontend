class MovieData {
  constructor(movies) {
    this.nameToId = new Map();
    this.genresToId = {};
    this.idToDetail = new Map();
    movies.forEach(movie => {
      this.nameToId.set(movie.title, movie.id);
      this.idToDetail.set(movie.id, movie);
      let genres = movie.genres.split(',');
      genres.forEach(genre => {
        if (this.genresToId[genre]) {
          this.genresToId[genre].push(movie.id);
        } else {
          this.genresToId[genre] = [movie.id];
        }
      })
    })
  }
}
