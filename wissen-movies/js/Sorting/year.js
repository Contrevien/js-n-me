const year_sort = () => {
    movies.sort((a, b) => {
        if(sortYearAsc && a["title_year"] > b["title_year"]) return 1;
        if(!sortYearAsc && a["title_year"] > b["title_year"]) return -1;
        if(sortYearAsc && a["title_year"] < b["title_year"]) return -1;
        if(!sortYearAsc && a["title_year"] < b["title_year"]) return 1;
        return 0;
    })
    sortYearAsc = !sortYearAsc;
    displayMovies(movies, page);
}