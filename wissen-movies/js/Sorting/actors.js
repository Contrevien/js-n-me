const act_sort = () => {
    movies.sort((a, b) => {
        if(sortActAsc && a["actor_1_name"] > b["actor_1_name"]) return 1;
        if(!sortActAsc && a["actor_1_name"] > b["actor_1_name"]) return -1;
        if(sortActAsc && a["actor_1_name"] < b["actor_1_name"]) return -1;
        if(!sortActAsc && a["actor_1_name"] < b["actor_1_name"]) return 1;
        return 0;
    })
    sortActAsc = !sortActAsc;
    displayMovies(movies, page);
}