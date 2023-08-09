let jq = $.noConflict();

jq(document).ready(function(){

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmU1MzhiZWNhZmM0MTcwNmYxYTRmNTZjNWY4NzYxMCIsInN1YiI6IjY0ZDMxZGY3OTQ2MzE4MDQzMDM1NThkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OWHR3Jyj02HhR2fb7k8Op_QtYy1ZudSUPanUc61m--I'
        }
    };

    const APIURI = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'

    const IMGPATH = "https://image.tmdb.org/t/p/w500/"

    const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=';

    const getMovies = async (api,options) => {
        try {
            const response =  await fetch(api,options);
            const data = await response.json();
            if(jq("#search").val() == ""){
                showMovies(data.results);
            }else if(jq("#search").val() != ""){
                showSearchMovies(data.results);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const showMovies = (data)=>{
        jq('#movie-box').html(" ");

        data.forEach((items) => {
            jq('#movie-box').append(`
            <div class="">
                <div class="card" style="width: 18rem;">
                    <img src=${IMGPATH + items.poster_path} class="card-img-top" alt="Movie-poster">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <h5 class="card-title">${items.original_name}</h5>
                            </div>
                            <div class="col-6 d-flex justify-content-end">
                                <h5>${items.vote_average}</h5>
                            </div>
                        </div>
                        <p class="card-text">${items.overview}</p>
                    </div>
                </div>
            </div>
            `);
        });
    }

    // after search
    const showSearchMovies = (data)=>{
        jq('#movie-box').html(" ");

        data.forEach((items) => {
            jq('#movie-box').append(`
            <div class="">
                <div class="card" style="width: 18rem;">
                    <img src=${IMGPATH + items.poster_path} class="card-img-top" alt="Movie-poster">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <h5 class="card-title">${items.title}</h5>
                            </div>
                            <div class="col-6 d-flex justify-content-end">
                                <h5>${items.vote_average}</h5>
                            </div>
                        </div>
                        <p class="card-text">${items.overview}</p>
                    </div>
                </div>
            </div>
            `);
        });
    }



    jq('#search').keypress((event)=>{
        if(event.target.value != "" && event.originalEvent.key == 'Enter'){
            getMovies(SEARCHAPI + event.target.value,options);
            jq('#reset-btn').css('display','block');
        }else{
            getMovies(APIURI,options);
        }

        if(event.target.value != ""){
            jq('#reset-btn').css('display','block');
        }
    });

    jq('#reset-btn').click(function(){
        jq('#search').val("");
        getMovies(APIURI,options);
        jq('#reset-btn').css('display','none');
    });

    

    getMovies(APIURI,options);

});
