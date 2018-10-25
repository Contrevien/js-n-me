const cou_sort = () => {
    movies.sort((a, b) => {
        if(sortCouAsc && a["country"] > b["country"]) return 1;
        if(!sortCouAsc && a["country"] > b["country"]) return -1;
        if(sortCouAsc && a["country"] < b["country"]) return -1;
        if(!sortCouAsc && a["country"] < b["country"]) return 1;
        return 0;
    })
    sortCouAsc = !sortCouAsc;
    displayMovies(movies, page);
}