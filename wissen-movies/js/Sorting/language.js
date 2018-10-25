const lan_sort = () => {
    movies.sort((a, b) => {
        if(sortLanAsc && a["language"] > b["language"]) return 1;
        if(!sortLanAsc && a["language"] > b["language"]) return -1;
        if(sortLanAsc && a["language"] < b["language"]) return -1;
        if(!sortLanAsc && a["language"] < b["language"]) return 1;
        return 0;
    })

    sortLanAsc = !sortLanAsc;
    displayMovies(movies, page);
}