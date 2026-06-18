const user =
    JSON.parse(
        localStorage.getItem("currentUser")
    );

if (!user) {

    window.location.href =
        "login.html";

}

/* ===================
   NOTIFICAÇÕES
=================== */

const notification =
    document.getElementById(
        "notification"
    );

function showNotification(text) {

    if (!notification) return;

    notification.textContent =
        text;

    notification.classList.add(
        "show"
    );

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 2500);

}

/* ===================
   NOME DO USUÁRIO
=================== */

const userName =
    document.getElementById(
        "userName"
    );

const selectedProfile =
    localStorage.getItem(
        "selectedProfile"
    );

if (userName) {

    userName.textContent =
        `Olá, ${selectedProfile || user.name} 👋`;

}

/* ===================
   AVATAR
=================== */

const avatar =
    document.querySelector(
        ".avatar"
    );

const avatarName =
    selectedProfile ||
    user.name;

if (
    avatar &&
    avatarName
) {

    avatar.textContent =
        avatarName
            .charAt(0)
            .toUpperCase();

}

/* ===================
   LOGOUT
=================== */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "currentUser"
            );

            window.location.href =
                "login.html";

        });

}

/* ===================
   BUSCA
=================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        function () {

            const value =
                this.value.toLowerCase();

            const cards =
                document.querySelectorAll(
                    ".movie-card"
                );

            cards.forEach(card => {

                const title =
                    card.dataset.title
                        .toLowerCase();

                if (
                    title.includes(value)
                ) {

                    card.style.display =
                        "block";

                } else {

                    card.style.display =
                        "none";

                }

            });

        });

}

/* ===================
   FAVORITOS
=================== */

const favoriteButtons =
    document.querySelectorAll(
        ".favorite-btn"
    );

let favorites =
    JSON.parse(
        localStorage.getItem(
            "favorites"
        )
    ) || [];

favoriteButtons.forEach(btn => {

    const movie =
        btn.parentElement.dataset.title;

    if (
        favorites.includes(movie)
    ) {

        btn.innerHTML = "❤️";

    }

});

favoriteButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        function (e) {

            e.stopPropagation();

            const movie =
                this.parentElement.dataset.title;

            let favorites =
                JSON.parse(
                    localStorage.getItem(
                        "favorites"
                    )
                ) || [];

            if (
                favorites.includes(movie)
            ) {

                favorites =
                    favorites.filter(
                        item => item !== movie
                    );

                this.innerHTML = "⭐";

                showNotification(
                    "❌ " +
                    movie +
                    " removido dos favoritos"
                );

            } else {

                favorites.push(movie);

                this.innerHTML = "❤️";

                showNotification(
                    "❤️ " +
                    movie +
                    " adicionado aos favoritos"
                );

            }

            localStorage.setItem(
                "favorites",
                JSON.stringify(
                    favorites
                )
            );

            setTimeout(() => {

                location.reload();

            }, 500);

        });

});

/* ==================
   MODAL DOS FILMES
================== */

const movieModal =
    document.getElementById(
        "movieModal"
    );

const movieTitle =
    document.getElementById(
        "movieTitle"
    );

const movieDescription =
    document.getElementById(
        "movieDescription"
    );

const closeMovieModal =
    document.getElementById(
        "closeMovieModal"
    );

const movieCards =
    document.querySelectorAll(
        ".movie-card"
    );

movieCards.forEach(card => {

    card.addEventListener(
        "click",
        function () {

            const title =
                this.dataset.title;

            movieTitle.textContent =
                title;

            const descriptions = {

                "Stranger Things":
                    "Uma cidade pequena enfrenta acontecimentos sobrenaturais e uma dimensão paralela chamada Mundo Invertido.",

                "The Witcher":
                    "Geralt de Rívia luta contra monstros e enfrenta conflitos políticos em um mundo medieval fantástico.",

                "Wandinha":
                    "A filha da Família Addams investiga mistérios sobrenaturais enquanto estuda na Escola Nunca Mais.",

                "Dark":
                    "Uma série alemã sobre viagens no tempo, desaparecimentos e segredos familiares."

            };

            movieDescription.textContent =
                descriptions[title] ||
                "Descrição não disponível.";

            if (movieModal) {

                movieModal.style.display =
                    "flex";

            }

        });

});

if (closeMovieModal) {

    closeMovieModal.addEventListener(
        "click",
        () => {

            movieModal.style.display =
                "none";

        });

}

window.addEventListener(
    "click",
    function (e) {

        if (
            e.target === movieModal
        ) {

            movieModal.style.display =
                "none";

        }

    });

/* ===================
   ASSISTIR
=================== */

const playButtons =
    document.querySelectorAll(
        ".play-btn"
    );

playButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            let movie = "";

            if (
                movieModal &&
                movieModal.style.display === "flex"
            ) {

                movie =
                    movieTitle.textContent;

            } else {

                movie =
                    bannerTitle.textContent;

            }

            if (!movie) return;

            localStorage.setItem(
                "selectedMovie",
                movie
            );

            localStorage.setItem(
                "lastWatched",
                movie
            );

            let watched =
                JSON.parse(
                    localStorage.getItem(
                        "watchedMovies"
                    )
                ) || [];

            if (
                !watched.includes(movie)
            ) {

                watched.push(movie);

                localStorage.setItem(
                    "watchedMovies",
                    JSON.stringify(
                        watched
                    )
                );

            }

            window.location.href =
                "player.html";

        });

});

/* ===================
   MINHA LISTA REAL
=================== */

const favoritesList =
    document.getElementById(
        "favoritesList"
    );

if (favoritesList) {

    const favorites =
        JSON.parse(
            localStorage.getItem(
                "favorites"
            )
        ) || [];

    const images = {

        "Stranger Things":
            "assets/images/StrangerThingsCapa.jpg",

        "The Witcher":
            "assets/images/TheWitcherSerie.jpg",

        "Wandinha":
            "assets/images/WandinhaSerie.jpg",

        "Dark":
            "assets/images/DarkSerie.jpg"

    };

    favoritesList.innerHTML = "";

    favorites.forEach(movie => {

        if (!images[movie]) return;

        favoritesList.innerHTML += `

        <div
        class="movie-card"
        data-title="${movie}"
        >

            <img
            src="${images[movie]}"
            alt="${movie}"
            >

        </div>

        `;

    });

}

/* ===================
   BANNER DINÂMICO
=================== */

const bannerImage =
    document.getElementById(
        "bannerImage"
    );

const bannerTitle =
    document.getElementById(
        "bannerTitle"
    );

const bannerDescription =
    document.getElementById(
        "bannerDescription"
    );

const bannerData = {

    "Stranger Things": {

        image:
            "assets/images/StrangerThingsCapa.jpg",

        description:
            "Uma cidade pequena enfrenta acontecimentos sobrenaturais e uma dimensão paralela chamada Mundo Invertido."

    },

    "The Witcher": {

        image:
            "assets/images/TheWitcherSerie.jpg",

        description:
            "Geralt de Rívia luta contra monstros e enfrenta conflitos políticos em um mundo medieval fantástico."

    },

    "Wandinha": {

        image:
            "assets/images/WandinhaSerie.jpg",

        description:
            "A filha da Família Addams investiga mistérios sobrenaturais enquanto estuda na Escola Nunca Mais."

    },

    "Dark": {

        image:
            "assets/images/DarkSerie.jpg",

        description:
            "Uma série alemã sobre viagens no tempo, desaparecimentos e segredos familiares."

    }

};

movieCards.forEach(card => {

    card.addEventListener(
        "click",
        function () {

            const title =
                this.dataset.title;

            if (
                bannerData[title]
            ) {

                bannerTitle.textContent =
                    title;

                bannerDescription.textContent =
                    bannerData[title]
                        .description;

                bannerImage.src =
                    bannerData[title]
                        .image;

            }

        });

});

/* ===================
   ASSISTIDOS RECENTES
=================== */

const recentMovies =
    document.getElementById(
        "recentMovies"
    );

if (recentMovies) {

    const watched =
        JSON.parse(
            localStorage.getItem(
                "watchedMovies"
            )
        ) || [];

    const images = {

        "Stranger Things":
            "assets/images/StrangerThingsCapa.jpg",

        "The Witcher":
            "assets/images/TheWitcherSerie.jpg",

        "Wandinha":
            "assets/images/WandinhaSerie.jpg",

        "Dark":
            "assets/images/DarkSerie.jpg"

    };

    recentMovies.innerHTML = "";

    watched.forEach(movie => {

        if (!images[movie]) return;

        recentMovies.innerHTML += `

        <div
        class="movie-card"
        data-title="${movie}"
        >

            <img
            src="${images[movie]}"
            alt="${movie}"
            >

        </div>

        `;

    });

}

/* ===================
   CARROSSEL AUTOMÁTICO
=================== */

const moviesBanner = [

    "Stranger Things",
    "The Witcher",
    "Wandinha",
    "Dark"

];

let currentBanner = 0;

function changeBanner() {

    const movie =
        moviesBanner[currentBanner];

    bannerTitle.textContent =
        movie;

    bannerDescription.textContent =
        bannerData[movie]
            .description;

    bannerImage.src =
        bannerData[movie]
            .image;

    currentBanner++;

    if (
        currentBanner >=
        moviesBanner.length
    ) {

        currentBanner = 0;

    }

}

if (
    bannerImage &&
    bannerTitle &&
    bannerDescription
) {

    setInterval(
        changeBanner,
        5000
    );

}