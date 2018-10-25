const gen_sort = () => {
    movies.sort((a, b) => {
        if(sortGenAsc && a["genres"] > b["genres"]) return 1;
        if(!sortGenAsc && a["genres"] > b["genres"]) return -1;
        if(sortGenAsc && a["genres"] < b["genres"]) return -1;
        if(!sortGenAsc && a["genres"] < b["genres"]) return 1;
        return 0;
    })
    sortGenAsc = !sortGenAsc;
    displayMovies(movies, page);
}