Papa.parse("../data/movies.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function(results) {
    results.data.pop();
    let movieData = JSON.stringify(results.data);
    localStorage.setItem('movie',movieData);
  }
});
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
  searchById(id) {
    //param: shoud be Number not String
    return this.idToDetail.get(id);
  }
  searchByName(name) {
    return this.idToDetail.get(this.nameToId.get(name));
  }
  searchByGenre([...genres]) {
    let movies = [];
    genres.forEach(genre => {
      this.genresToId[genre].forEach(id => {
        let movie = this.idToDetail.get(id);
        if (!movies.includes(movie)) {
          movies.push(movie);
        }
      })
    })
    return movies;
  }
}