let pagination = document.getElementById("pagination");

let span = document.createElement("span");
span.setAttribute("class", "toggler");
span.innerText = "Change Theme";
pagination.appendChild(span);
span.addEventListener("click", () => {
    document.getElementsByTagName("body")[0].classList.toggle("dark");
})


let prev = document.createElement("button");
prev.setAttribute("class", "buttons");
prev.innerText = "Back";
pagination.appendChild(prev);
prev.style.background = "var(--bg-color)";
prev.disabled = true;
prev.addEventListener("click", () => {
    window.scrollTo(0,0);
    page -= 1;
    displayMovies(movies, page);
    if (page > 1)
        prev.disabled = false;
    else
        prev.disabled = true;
})


let next = document.createElement("button");
next.setAttribute("class", "buttons");
next.innerText = "Next";
pagination.appendChild(next);
next.addEventListener("click", () => {
    window.scrollTo(0,0);
    page += 1;
    displayMovies(movies, page);
    if (page > 1)
        prev.disabled = false;
    else
        prev.disabled = true;
})

