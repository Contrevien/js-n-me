/* File to fetch the list of movies */

const fetchMovies = () => {
    fetch("http://starlord.hackerearth.com/movieslisting")
        .then(respone => respone.json())
        .then(json => {
            movies = json.slice(0);
            displayMovies(movies, page);
        })
        .catch(err => {
            alert("Something Wrong happened!")
        });
}
