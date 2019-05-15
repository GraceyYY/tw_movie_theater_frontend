class Database {
    constructor(url){
        this.url = url
    }

    getAllMovies(){
        return $.ajax({
            url: `${this.url}/movies`,
            method: "GET",
            async: false,
            data: {
                "title": "",
                "genres": ""
            },
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
            url: `${this.url}/movies`,
            method: 'GET',
            data: {
                "title": "",
                "genres": genres
            },
            async: false,
            success: (result)=>result
        })
    }

    getMoviesByKeyword(keyword){
        return $.ajax({
            url: `${this.url}/movies`,
            method: 'GET',
            data: {
                "title": keyword,
                "genres": keyword
            },
            async: false,
            success: (result)=>result
        })
    }

    getGenres(){
        return $.ajax({
            url: `${this.url}/movies/genres`,
            method: 'GET',
            async: false,
            success: (result)=>result
        })
    }
}