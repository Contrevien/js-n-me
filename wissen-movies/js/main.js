let movies = [];
let page = 1;
let sortNameAsc = true;
let sortDirAsc = true;
let sortActAsc = true;
let sortGenAsc = true;
let sortLanAsc = true;
let sortCouAsc = true;
let sortBudAsc = true;
let sortYearAsc = true;

fetchMovies();

document.getElementsByTagName("th")[0].addEventListener("click", name_sort);
document.getElementsByTagName("th")[1].addEventListener("click", dir_sort);
document.getElementsByTagName("th")[2].addEventListener("click", act_sort);
document.getElementsByTagName("th")[3].addEventListener("click", gen_sort);
document.getElementsByTagName("th")[4].addEventListener("click", lan_sort);
document.getElementsByTagName("th")[5].addEventListener("click", cou_sort);
document.getElementsByTagName("th")[6].addEventListener("click", bud_sort);
document.getElementsByTagName("th")[7].addEventListener("click", year_sort);
