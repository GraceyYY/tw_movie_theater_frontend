class Database {
    constructor(){
        this.url = "http://localhost:8080"
    }

    getAllMovies(){
        return $.ajax({
            url: `${this.url}/movies`,
            method: "GET",
            success: (result)=>result
            })
        }


    getMovieById(id){
        return $.ajax({
            url: `${this.url}/movies/${id}`,
            method: "GET",
            success: (result)=>result
        })
    }

    getMoviesByGenres(genres){
        return $.ajax({
            url: `${this.url}/movies/genres`,
            method: 'GET',
            data: {"genres": genres},
            success: (result)=>result
        })
    }

    getMoviesByKeyword(keyword){
        return $.ajax({
            url: `${this.url}/movies/search`,
            method: 'GET',
            data: {"key": keyword},
            success: (result)=>result
        })
    }

    getGenres(){
        return $.ajax({
            url: `${this.url}/genres`,
            method: 'GET',
            success: (result)=>result
        })
    }


}