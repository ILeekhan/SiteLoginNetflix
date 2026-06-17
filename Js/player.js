const movie =
localStorage.getItem(
"selectedMovie"
);

const movieTitle =
document.getElementById(
"movieTitle"
);

const movieDescription =
document.getElementById(
"movieDescription"
);

const movieTrailer =
document.getElementById(
"movieTrailer"
);

const backBtn =
document.getElementById(
"backBtn"
);

/* ===================
   SÉRIES
=================== */

const movies = {

    "Stranger Things": {

        description:
        "Uma cidade pequena enfrenta acontecimentos sobrenaturais e uma dimensão paralela chamada Mundo Invertido.",

        trailer:
        "https://www.youtube.com/embed/b9EkMc79ZSU"

    },

    "The Witcher": {

        description:
        "Geralt de Rívia luta contra monstros e enfrenta conflitos políticos em um mundo medieval fantástico.",

        trailer:
        "https://www.youtube.com/embed/ndl1W4ltcmg"

    },

    "Wandinha": {

        description:
        "A filha da Família Addams investiga mistérios sobrenaturais enquanto estuda na Escola Nunca Mais.",

        trailer:
        "https://www.youtube.com/embed/Di310WS8zLk"

    },

    "Dark": {

        description:
        "Uma série alemã sobre viagens no tempo, desaparecimentos e segredos familiares.",

        trailer:
        "https://www.youtube.com/embed/ESEUoa-mz2c"

    }

};

/* ===================
   CARREGAR FILME
=================== */

if(
    movie &&
    movies[movie]
){

    movieTitle.textContent =
    movie;

    movieDescription.textContent =
    movies[movie]
    .description;

    movieTrailer.src =
    movies[movie]
    .trailer;

}

/* ===================
   BOTÃO VOLTAR
=================== */

if(backBtn){

    backBtn.addEventListener(
    "click",
    () => {

        window.location.href =
        "dashboard.html";

    });

}

/* ===================
   CONTINUAR ASSISTINDO
=================== */

if(movie){

    localStorage.setItem(
    "lastWatched",
    movie
    );

}

/* ===================
   HISTÓRICO
=================== */

let watched =

JSON.parse(
localStorage.getItem(
"watchedMovies"
)
) || [];

if(
    movie &&
    !watched.includes(movie)
){

    watched.push(movie);

    localStorage.setItem(
    "watchedMovies",
    JSON.stringify(
    watched
    )
    );

}

/* ===================
   EPISÓDIOS
=================== */

const episodesBySeries = {

    "Stranger Things": {

        1: {

            title: "Episódio 1",

            description:
            "O desaparecimento de Will inicia acontecimentos estranhos na cidade.",

            trailer:
            "https://www.youtube.com/embed/b9EkMc79ZSU"

        },

2: {

    title: "Episódio 2",

    description:
    "Eleven demonstra seus poderes enquanto os mistérios aumentam.",

    trailer:
    "https://www.youtube.com/embed/R1ZXOOLMJ8s"

},

3: {

    title: "Episódio 3",

    description:
    "Os amigos iniciam uma perigosa busca por respostas.",

    trailer:
    "https://www.youtube.com/embed/mnd7sFt5c3A"

}

    },

    "The Witcher": {

        1: {

            title: "Episódio 1",

            description:
            "Geralt enfrenta uma criatura mortal.",

            trailer:
            "https://www.youtube.com/embed/ndl1W4ltcmg"

        },

        2: {

    title: "Episódio 2",

    description:
    "Conflitos políticos começam a surgir.",

    trailer:
    "https://www.youtube.com/embed/WX6e6ZLNmtA"

},

3: {

    title: "Episódio 3",

    description:
    "Geralt encontra aliados inesperados.",

    trailer:
    "https://www.youtube.com/embed/1-l29HlKkXU"

}

    },

    "Wandinha": {

 1: {

            title: "Episódio 1",

            description:
            "Wandinha chega à Escola Nunca Mais.",

            trailer:
            "https://www.youtube.com/embed/Di310WS8zLk"

        },

2: {

    title: "Episódio 2",

    description:
    "Mistérios sobrenaturais começam a surgir.",

    trailer:
    "https://www.youtube.com/embed/f6wgSkW7giQ"

},

3: {

    title: "Episódio 3",

    description:
    "Wandinha investiga acontecimentos estranhos.",

    trailer:
    "https://www.youtube.com/embed/NakTu_VZxJ0"

}

    },

    "Dark": {

 1: {

            title: "Episódio 1",

            description:
            "Uma criança desaparece misteriosamente.",

            trailer:
            "https://www.youtube.com/embed/ESEUoa-mz2c"

        },

2: {

    title: "Episódio 2",

    description:
    "Segredos envolvendo o tempo aparecem.",

    trailer:
    "https://www.youtube.com/embed/HEx0pNQ1fbM"

},

3: {

    title: "Episódio 3",

    description:
    "Os laços familiares começam a ser revelados.",

    trailer:
    "https://www.youtube.com/embed/Vxduc1dSi8M"

}

    }

};

const episodes =
episodesBySeries[movie];

const episodeButtons =
document.querySelectorAll(
".episode-btn"
);

if(episodes){

    episodeButtons.forEach(btn => {

        btn.addEventListener(
        "click",
        function(){

            const episode =
            this.dataset.episode;

            movieTitle.textContent =
            movie +
            " - " +
            episodes[episode].title;

            movieDescription.textContent =
            episodes[episode]
            .description;

            movieTrailer.src =
            episodes[episode]
            .trailer;

            localStorage.setItem(

                movie +
                "_episode",

                episode

            );

            episodeButtons.forEach(
            item => {

                item.classList.remove(
                "episode-active"
                );

            });

            this.classList.add(
            "episode-active"
            );

        });

    });

}

/* ===================
   ÚLTIMO EPISÓDIO
=================== */

const savedEpisode =

localStorage.getItem(
movie + "_episode"
);

if(
    episodes &&
    savedEpisode &&
    episodes[savedEpisode]
){

    movieTitle.textContent =
    movie +
    " - " +
    episodes[savedEpisode]
    .title;

    movieDescription.textContent =
    episodes[savedEpisode]
    .description;

    movieTrailer.src =
    episodes[savedEpisode]
    .trailer;

    document
    .querySelector(
    `[data-episode="${savedEpisode}"]`
    )
    ?.classList.add(
    "episode-active"
    );

}

console.log(
"Player carregado com sucesso!"
);