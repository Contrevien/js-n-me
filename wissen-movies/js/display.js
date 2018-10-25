const displayMovies = (movies, page) => {
    let tbody = document.getElementsByTagName("tbody")[0];
    if (tbody.children.length !== 0){
        while(tbody.firstChild)
            tbody.removeChild(tbody.firstChild);
            
    }

    let current = movies.slice(page*10-10,page*10);
    for(let movie in current){
        let row = document.createElement("tr");

        //column1
        let movie_name = document.createElement("td");
        movie_name.setAttribute("class", "column1");
        movie_name.innerText = current[movie]["movie_title"];
        row.appendChild(movie_name);

        //column2
        let director = document.createElement("td");
        director.setAttribute("class", "column2");
        director.innerText = current[movie]["director_name"];
        row.appendChild(director);

        //column3
        let actors = document.createElement("td");
        actors.setAttribute("class", "column3");
        actors.innerText = current[movie]["actor_1_name"] + ((current[movie]["actor_2_name"] !== "") ? ", " + current[movie]["actor_2_name"]: "");
        row.appendChild(actors);

        //column4
        let genres = document.createElement("td");
        genres.setAttribute("class", "column4");
        genres.innerText = current[movie]["genres"].split("|").join(", ");
        row.appendChild(genres);

        //column5
        let language = document.createElement("td");
        language.setAttribute("class", "column5");
        language.innerText = current[movie]["language"]===""?"NA":current[movie]["language"];
        row.appendChild(language);

        //column6
        let country = document.createElement("td");
        country.setAttribute("class", "column6");
        country.innerText = current[movie]["country"]===""?"NA":current[movie]["country"];
        row.appendChild(country);

        //column7
        let budget = document.createElement("td");
        budget.setAttribute("class", "column7");
        budget.innerText = current[movie]["budget"]===""?"NA":current[movie]["budget"];
        row.appendChild(budget);

        //column8
        let year = document.createElement("td");
        year.setAttribute("class", "column8");
        year.innerText = current[movie]["title_year"]===""?"NA":current[movie]["title_year"];
        row.appendChild(year);

        //column9
        let more = document.createElement("td");
        more.setAttribute("class", "column9");
        let link = document.createElement("a");
        link.setAttribute("href", current[movie]["movie_imdb_link"]);
        link.setAttribute("target", "_blank");
        link.innerText = "More";
        more.appendChild(link);
        row.appendChild(more);
        tbody.appendChild(row);
    }
}