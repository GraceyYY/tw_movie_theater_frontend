class Database {
    constructor(){
        this.url = "http://localhost:8080"
    }

    getAllMovies(){
        return $.ajax({
            url: `${this.url}/movies`,
            method: "GET",
            async: false,
            success: (result)=>result
            })
        }


    getMovieById(id){
        return $.ajax({
            url: `${this.url}/movies/${id}`,
            method: "GET",
            async: false,
            success: (result)=>result
        })
    }

    getMoviesByGenres(genres){
        return $.ajax({
            url: `${this.url}/movies/genres`,
            method: 'GET',
            data: {"genres": genres},
            async: false,
            success: (result)=>result
        })
    }

    getMoviesByKeyword(keyword){
        return $.ajax({
            url: `${this.url}/movies/keyword`,
            method: 'GET',
            data: {"key": keyword},
            async: false,
            success: (result)=>result
        })
    }

    getGenres(){
        return $.ajax({
            url: `${this.url}/genres`,
            method: 'GET',
            async: false,
            success: (result)=>result
        })
    }
}