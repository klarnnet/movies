const API_KEY = "0147380b-96ea-429c-9ff5-a9181d6938d5";
const APIUrlPop = 
"https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=";

const API_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(APIUrlPop);



async function getMovies(url) {
    const resp = await fetch(url,{
        headers:{
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,

         },
  });
  const respData = await resp.json();
  console.log(respData)
   showmovies(respData);
}

function getClassByRate(vote) {
    if(vote >= 7){
        return "green";
    }
    else if(vote > 5){
        return "orange";
    }
    else {
        return "red";
    }
}

 function showmovies(data){
     const moviesEl = document.querySelector(".movies");

//clean movies
     document.querySelector(".movies").innerHTML ="";

     data.films.forEach((movie) => {
         const movieEl = document.createElement("div")
         movieEl.classList.add("movie");
         movieEl.innerHTML =   `  
           
         <div class="movie-cover-inner">
            <img src="${movie.posterUrlPreview}"
             class = "movie-cover"
             alt = "${movie.nameRu}"/>
         <div class="movi-cover-dark"></div>
         </div>
         <div class="movi-info">
             <div class="movi-title">${movie.nameRu}</div>
 
             </div>
             
             ${movie.rating && (`

             <div class="movi-average movie-average-${getClassByRate(movie.rating)}">
                 ${movie.rating}</div>
             `)
             }
         </div>
         <div class="modal">Обзор <br><br> ${movie.genres.map((genre) =>
            `${genre.genre}`)}</div>  `
         ;

         moviesEl.appendChild(movieEl);

     });
 }


 const form = document.querySelector("form");
 const search = document.querySelector(".header-search");

 form.addEventListener("submit" , (e) =>{
    e.preventDefault();

    const apiSearchurl = `${API_SEARCH}${search.value}`

    if(search.value){
        getMovies(apiSearchurl)

        search.vlaue("")
    }

 })
