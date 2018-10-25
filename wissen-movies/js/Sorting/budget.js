const bud_sort = () => {
    movies.sort((a, b) => {
        if(sortBudAsc && a["budget"] > b["budget"]) return 1;
        if(!sortBudAsc && a["budget"] > b["budget"]) return -1;
        if(sortBudAsc && a["budget"] < b["budget"]) return -1;
        if(!sortBudAsc && a["budget"] < b["budget"]) return 1;
        return 0;
    })
    sortBudAsc = !sortBudAsc;
    displayMovies(movies, page);
}