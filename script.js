const APIKEY = '7d37187ed2f415898d56c8f1ebaaba4f';
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7d37187ed2f415898d56c8f1ebaaba4f&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w500/"
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=7d37187ed2f415898d56c8f1ebaaba4f&query=";

const main = document.querySelector('main');
const moviesContainer = document.querySelector('.movies');
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    showMovies(data.results);
}

//reduce seria util para filtrar aquellos items sin imagenes
function showMovies(movies) {

    moviesContainer.innerHTML = "";

    movies.map((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        if(poster_path) {
             const movieEl = document.createElement("div");
            movieEl.classList.add('movie');

            movieEl.innerHTML = `
                <img src=${IMGPATH + poster_path} alt=${title} />
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="rating ${getClassByRate(vote_average)}">${vote_average}</span>
                </div>

                <div class="overview">
                    <h3>Overview:</h3>
                    ${overview}
                </div>
            `

            moviesContainer.appendChild(movieEl);
        }
       
    })    
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});