const dir_sort = () => {
    movies.sort((a, b) => {
        if(sortDirAsc && a["director_name"] > b["director_name"]) return 1;
        if(!sortDirAsc && a["director_name"] > b["director_name"]) return -1;
        if(sortDirAsc && a["director_name"] < b["director_name"]) return -1;
        if(!sortDirAsc && a["director_name"] < b["director_name"]) return 1;
        return 0;
    })
    sortDirAsc = !sortDirAsc;
    displayMovies(movies, page);
}