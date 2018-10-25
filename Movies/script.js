// Fetching the content onload
let movies = [];
let autocompleteList = [];
let sortBy = 0;
let countries = [];

window.onload = () => {
    //show loader
    let loader = document.getElementById("loader-container");
    loader.style.display = "flex";

    //load content
    let xhr = new XMLHttpRequest();
    xhr.open('GET','http://starlord.hackerearth.com/movieslisting', true);
    xhr.onload = function(){
        loader.style.display = "none"; 
        if (this.status === 200 || this.readyState === 4) {
            movies = JSON.parse(this.responseText);
            for (let movie in movies){
                movies[movie]["popularity"] = parseInt(movie)+1;
                autocompleteList.push(movies[movie]["movie_title"]);
                if (movies[movie]["country"] === "" && countries.indexOf("Others") === -1)
                    countries.push("Others");
                else if (countries.indexOf(movies[movie]["country"]) === -1 && movies[movie]["country"] !== "")
                    countries.push(movies[movie]["country"]);
            }
            loadFilters();
            displayMovies(movies);
        }
        else {
            alert("Something Went Wrong, please reload!");
        }
    }
    xhr.send();
}



// utility function to show movies
displayMovies = (movies) => {
    for (let movie in movies) {
        //console.log(movie);
        
        /*create movie-card*/
        let movieCard = document.createElement("div");
        movieCard.setAttribute("class", "movie-card");

        let serial = document.createElement("div");
        serial.setAttribute("class", "serial");
        serial.innerHTML = (parseInt(movie)+1).toString();
        movieCard.appendChild(serial);

        let movieName = document.createElement("div");
        movieName.setAttribute("class", "name");
        if (movies[movie]["title_year"] === "")
            movies[movie]["title_year"] = "NA"; 
        movieName.innerHTML ="<a href='" + movies[movie]["movie_imdb_link"] + "' target='_blank'>" + movies[movie]["movie_title"] + "(" + movies[movie]["title_year"] + ")</a>";
        movieCard.appendChild(movieName);

        let genre = document.createElement("div");
        genre.setAttribute("class", "genre");
        genre.innerHTML = movies[movie]["genres"].split("|").join(", ");
        movieCard.appendChild(genre);

        let actors = document.createElement("div");
        actors.setAttribute("class", "actors");
        actors.innerHTML = movies[movie]["actor_1_name"] + ", " + movies[movie]["actor_2_name"];
        movieCard.appendChild(actors);

        let lang = document.createElement("div");
        lang.setAttribute("class", "lang");
        if (movies[movie]["language"] === "")
            movies[movie]["language"] = "NA"; 
        lang.innerHTML = movies[movie]["language"];
        movieCard.appendChild(lang);

        let country = document.createElement("div");
        country.setAttribute("class", "country");
        if (movies[movie]["country"] === "")
            movies[movie]["country"] = "NA"; 
        country.innerHTML = movies[movie]["country"];
        movieCard.appendChild(country);

        let director = document.createElement("div");
        director.setAttribute("class", "director");
        director.innerHTML = "<b>Director: </b>" + movies[movie]["director_name"];
        movieCard.appendChild(director);

        let budget = document.createElement("div");
        budget.setAttribute("class", "budget");
        if (movies[movie]["budget"] === "")
            movies[movie]["budget"] = "<b>Budget: </b>" + "NA"; 
        budget.innerHTML = "<b>Budget: </b>" + movies[movie]["budget"];
        movieCard.appendChild(budget);

        let link = document.createElement("div");
        link.setAttribute("class", "link");
        link.innerHTML = "Click on the name to view more";
        movieCard.appendChild(link);

        /*append the card to DOM*/
        document.getElementsByTagName("section")[0].appendChild(movieCard);

        /* Adding event Listener for expand property */
        movieCard.addEventListener("click", expand);
    }
}


/* Function to expand or contract height of movie tiles */
expand = (e) => {
    let target = e.target.parentNode;
    if (target.style.maxHeight == "90px")
        target.style.maxHeight = "270px";
    else
        target.style.maxHeight = "90px";
}


/* Sort Functions */
let popularBut = document.getElementById("popular");
let latestBut = document.getElementById("latest");

sort = (e) => {
    let section = document.getElementsByTagName("section")[0];
    if(section.querySelector("goBack") != null){
        section.removeChild(document.getElementById("goBack"));
    }
    while(section.firstChild)
            section.removeChild(section.firstChild);
    if (e.srcElement.id === "popular" && !e.srcElement.classList.contains("active")){
        popularBut.classList.add("active");
        latestBut.classList.remove("active");
        movies.sort((a, b) => {
            if(a["popularity"] > b["popularity"]) return 1;
            if(a["popularity"] < b["popularity"]) return -1;
            return 0;
        })
    }
    else if (e.srcElement.id === "latest" && !e.srcElement.classList.contains("active")){
        latestBut.classList.add("active");
        popularBut.classList.remove("active");
        movies.sort((a, b) => {
            if (b["title_year"] === "NA") return -1;
            if (a["title_year"] === "NA") return 1; 
            if(a["title_year"] < b["title_year"]) return 1;
            if(a["title_year"] > b["title_year"]) return -1;
            return 0;
        })
    }
    displayMovies(movies);
}

popularBut.addEventListener("click", sort);
latestBut.addEventListener("click", sort);


/* search implementation */
// let searchBar = document.getElementById("search");
// searchBar.oninput = () => {
//     let section = document.getElementsByTagName("section")[0];
//     while(section.firstChild)
//             section.removeChild(section.firstChild);
//     let searchedMovies = [];
//     let temp = searchBar.value.toLowerCase();
//     let searchValue = temp.charAt(0).toUpperCase() + temp.slice(1);
//     for (let movie in movies){
//         if (movies[movie]["movie_title"].includes(searchValue)){
//             searchedMovies.push(movies[movie]);
//         }
//     }
//     displayMovies(searchedMovies);
// }


/* Scroll Back to Top */
let section = document.getElementsByTagName("section")[0];
document.getElementById("backToTop").onclick = () => {
    section.scrollTop = 0;
}


/* AutoComplete Functionality */

function searchAndDisplay(str) {
    str = str.replace(/\s+/g,'');
    for (let movie in movies) {
        if (movies[movie]["movie_title"].replace(/\s+/g,'') === str){
            let section = document.getElementsByTagName("section")[0];
            while(section.firstChild)
                    section.removeChild(section.firstChild);
            displayMovies([movies[movie]]);
            let goBack = document.createElement("button");
            goBack.setAttribute("class", "sort");
            goBack.setAttribute("id", "goBack");
            goBack.innerHTML = "Back";
            goBack.addEventListener("click", () => {
                document.getElementById("search").value = "";
                document.getElementById("popular").click();
                document.getElementById("search").focus();
            })
            section.appendChild(goBack);
            break;
        }
    }
}

function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                searchAndDisplay(inp.value);
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { //up
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  autocomplete(document.getElementById("search"), autocompleteList);


/* Utility to handle the upper-container */

let s = document.getElementById("opener");
let header = document.getElementById("upper-container");
let arrow = document.getElementById("open");

slide = () => {
    let offset = window.innerWidth > 1290 ? 75 : (window.innerWidth > 865 ? 144 : 215.5 );
    if(header.style.top === "") {
        header.style.top = "-" + offset + "px";
        s.style.marginTop = "-" + (offset+30) + "px";
        arrow.style.transform = "rotate(0deg)";
    }
    else {
        header.style.top = "";
        s.style.marginTop = "-30px";
        arrow.style.transform = "rotate(180deg)";
    }
}
s.addEventListener("click", slide);


/* Styling Backdrop & Modal */
let footer = document.getElementsByTagName("footer")[0];
let backdrop = document.getElementsByClassName("backdrop")[0];
let me = document.getElementById("me");

me.addEventListener("click", () => {
    footer.style.display = "block";
    backdrop.style.display = "flex";
})


backdrop.addEventListener("click", () => {
    backdrop.style.display = "none";
    footer.style.display = "none";
})



/* Filter Manipulation */

let cou = document.getElementById("country");
cou.addEventListener("click", () => {
    if (document.getElementsByClassName("filter-items")[1].style.display === "none") {
        s.removeEventListener("click",slide);
        document.getElementsByClassName("filter-items")[1].style.display = "block";
    }
    else {
        document.getElementsByClassName("filter-items")[1].style.display = "none";
        s.addEventListener("click", slide);
        cou.style.backgroundColor = "white";
    }
})


function loadFilters() {
    let saved = null;
    let div = document.createElement("div");
    div.innerHTML = "None";
    div.addEventListener("click", byCountry);
    document.getElementsByClassName("filter-items")[1].appendChild(div);
    for (let country in countries) {
        let div = document.createElement("div");
        div.innerHTML = countries[country];
        if(countries[country] !== "Others")
            document.getElementsByClassName("filter-items")[1].appendChild(div);
        else
            saved = div;
        div.addEventListener("click", byCountry);
    }
    document.getElementsByClassName("filter-items")[1].appendChild(saved);
}

function byCountry(e) {
    let key = e.srcElement.innerHTML;
    e.srcElement.parentNode.style.display = "none"; 
    let section = document.getElementsByTagName("section")[0];
    while(section.firstChild)
            section.removeChild(section.firstChild);
    if (key==="None"){
        displayMovies(movies);
        cou.style.backgroundColor = "white";
        s.addEventListener("click", slide);
        return;
    }
    if (key === "Others"){
        key = "NA";
    }
    let newMovies = [];
    
    
    for (let movie in movies) {
        if(movies[movie]["country"] === key){
            newMovies.push(movies[movie]);
        }
    }
    cou.style.backgroundColor = "#67e2ef";
    s.addEventListener("click", slide);
    displayMovies(newMovies);
    cou.innerHTML = key;

}