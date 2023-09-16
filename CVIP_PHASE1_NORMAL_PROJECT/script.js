//CONST
const apikey="114d07c1bdff5be53e2291c40700b654";
const apiEndpoint="https://api.themoviedb.org/3";
const imgPath="https://image.tmdb.org/t/p/original";
const apiPaths={
    fetchAllCategories:`${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMovieList:(id)=>`${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${apiEndpoint}/movie/popular?api_key=${apikey}`
}

// BOOTS UP THE APP 
function init(){
    fetchAndbuildMovieSection(apiPaths.fetchTrending,"TRENDING NOW");
    fetchAndBuildAllSections();
}

// function fetchTrendingMovies(){
//     .then(list=>{
//         buildBannerSection(list[0]);
//     }).catch(err=>{
//         console.error(err);
//     })
// }
// function buildBannerSection(movie)
// {
//     const bannerCont=document.getElementById("banner_section");
//     bannerCont.style.backgroundImage=`url(${imgPath}${movie.backdrop_path})`;


//     const div=document.createElement("div");
//     div.innerHTML=
//     `
//     <h2 class="banner_title">${movie.title}</h2>
//     <p class="banner_info">TRENDING NOW</p>
//     <p class="banner_overview">${movie.overview}</p>
//     <div class="action_buttons_cont">
//         <button class="action_button">
//             <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ltr-0 e1mhci4z1" data-name="Play" aria-hidden="true"><path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path></svg>&nbsp;&nbsp;</span>PLAY
//         </button>
//         <button class="action_button">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ltr-0 e1mhci4z1" data-name="CircleI" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>&nbsp;&nbsp;MORE INFO
//         </button>
//     </div>
//     `
//     className="banner_content container";
//     bannerCont.append(div);
// }

function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res=>res.json())
    .then(res=>{
        const categories=res.genres;
        if(Array.isArray(categories)&&categories.length){
            categories.forEach(category=>{
                    fetchAndbuildMovieSection(
                        apiPaths.fetchMovieList(category.id),
                        category.name
                        );
            });
        }
        // console.table(categories);
    })
    .catch(err=>console.error(err));
}
function fetchAndbuildMovieSection(fetchUrl,categoryName){
    console.log(fetchUrl,categoryName);
    return fetch(fetchUrl)
    .then(res=>res.json())
    .then(res=>{
        // console.table(res.results)
        const movies=res.results;
        if(Array.isArray(movies)&&movies.length){
            buildMoviesSection(movies,categoryName);
        }
        return movies;
    })
    .catch(err=>console.error(err));
}
function buildMoviesSection(list,categoryName){
    console.log(list,categoryName);
    const moviesCont =document.getElementById("movies_cont");
    const moviesListHTML=list.map(item=>{
        return`
            <img class="movies_item" src=${imgPath}${item.backdrop_path}>
        `;
    });
    const moviesSectionHTML=`
    <div class="movies_section">
    <h2 class="movies_section_heading">
                ${categoryName} <span class="explore_nudge">EXPLORE ALL</span>
    </h2>
    <div class="movies_row">
        ${moviesListHTML}
    </div>
    </div>
    `
    console.log(moviesSectionHTML);
    const div =document.createElement("div");
    div.className="movies_section"
    div.innerHTML=moviesSectionHTML;

//append html into container
moviesCont.append(div);
}
window.addEventListener("load",function(){
    init();
    window.addEventListener("scroll",function(){
        const header=document.getElementById("header");
        if(this.window.scrollY>5) header.classList.add("black_bg")
        else header.classList.remove("black_bg");
    })
})