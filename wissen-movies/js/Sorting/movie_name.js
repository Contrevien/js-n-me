const name_sort = () => {
    movies.sort((a, b) => {
        if(sortNameAsc && a["movie_title"] > b["movie_title"]) return 1;
        if(!sortNameAsc && a["movie_title"] > b["movie_title"]) return -1;
        if(sortNameAsc && a["movie_title"] < b["movie_title"]) return -1;
        if(!sortNameAsc && a["movie_title"] < b["movie_title"]) return 1;
        return 0;
    })
    sortNameAsc = !sortNameAsc;
    displayMovies(movies, page);
}