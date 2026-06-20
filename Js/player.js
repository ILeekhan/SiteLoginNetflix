/* ==========================================
   ARQUIVO: player.js - PÁGINA DE REPRODUÇÃO
   Funções: Carregar vídeo, episódios, histórico, navegação
========================================== */

/* ===================
   VERIFICAÇÃO DE ACESSO E DADOS
=================== */
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "login.html";

const filmeSelecionado = localStorage.getItem("selectedMovie");

// Elementos da página
const movieTitle = document.getElementById("movieTitle");
const movieDescription = document.getElementById("movieDescription");
const movieTrailer = document.getElementById("movieTrailer");
const backBtn = document.getElementById("backBtn");

/* ===================
   CATÁLOGO DE CONTEÚDO (CENTRALIZADO)
=================== */
const catalogo = {
    "Stranger Things": {
        descricao: "Uma cidade pequena enfrenta acontecimentos sobrenaturais e uma dimensão paralela chamada Mundo Invertido.",
        trailer: "https://www.youtube.com/embed/b9EkMc79ZSU",
        episodios: {
            1: {
                titulo: "Episódio 1",
                descricao: "O desaparecimento de Will inicia acontecimentos estranhos na cidade.",
                video: "https://www.youtube.com/embed/b9EkMc79ZSU"
            },
            2: {
                titulo: "Episódio 2",
                descricao: "Eleven demonstra seus poderes enquanto os mistérios aumentam.",
                video: "https://www.youtube.com/embed/R1ZXOOLMJ8s"
            },
            3: {
                titulo: "Episódio 3",
                descricao: "Os amigos iniciam uma perigosa busca por respostas.",
                video: "https://www.youtube.com/embed/mnd7sFt5c3A"
            }
        }
    },

    "The Witcher": {
        descricao: "Geralt de Rívia luta contra monstros e enfrenta conflitos políticos em um mundo medieval fantástico.",
        trailer: "https://www.youtube.com/embed/ndl1W4ltcmg",
        episodios: {
            1: {
                titulo: "Episódio 1",
                descricao: "Geralt enfrenta uma criatura mortal.",
                video: "https://www.youtube.com/embed/ndl1W4ltcmg"
            },
            2: {
                titulo: "Episódio 2",
                descricao: "Conflitos políticos começam a surgir.",
                video: "https://www.youtube.com/embed/WX6e6ZLNmtA"
            },
            3: {
                titulo: "Episódio 3",
                descricao: "Geralt encontra aliados inesperados.",
                video: "https://www.youtube.com/embed/1-l29HlKkXU"
            }
        }
    },

    "Wandinha": {
        descricao: "A filha da Família Addams investiga mistérios sobrenaturais enquanto estuda na Escola Nunca Mais.",
        trailer: "https://www.youtube.com/embed/Di310WS8zLk",
        episodios: {
            1: {
                titulo: "Episódio 1",
                descricao: "Wandinha chega à Escola Nunca Mais.",
                video: "https://www.youtube.com/embed/Di310WS8zLk"
            },
            2: {
                titulo: "Episódio 2",
                descricao: "Mistérios sobrenaturais começam a surgir.",
                video: "https://www.youtube.com/embed/f6wgSkW7giQ"
            },
            3: {
                titulo: "Episódio 3",
                descricao: "Wandinha investiga acontecimentos estranhos.",
                video: "https://www.youtube.com/embed/NakTu_VZxJ0"
            }
        }
    },

    "Dark": {
        descricao: "Uma série alemã sobre viagens no tempo, desaparecimentos e segredos familiares.",
        trailer: "https://www.youtube.com/embed/ESEUoa-mz2c",
        episodios: {
            1: {
                titulo: "Episódio 1",
                descricao: "Uma criança desaparece misteriosamente.",
                video: "https://www.youtube.com/embed/ESEUoa-mz2c"
            },
            2: {
                titulo: "Episódio 2",
                descricao: "Segredos envolvendo o tempo aparecem.",
                video: "https://www.youtube.com/embed/HEx0pNQ1fbM"
            },
            3: {
                titulo: "Episódio 3",
                descricao: "Os laços familiares começam a ser revelados.",
                video: "https://www.youtube.com/embed/Vxduc1dSi8M"
            }
        }
    }
};

/* ===================
   CARREGAR DADOS INICIAIS
=================== */
if (filmeSelecionado && catalogo[filmeSelecionado]) {
    const dados = catalogo[filmeSelecionado];

    // Tela inicial da série/filme
    movieTitle.textContent = filmeSelecionado;
    movieDescription.textContent = dados.descricao;
    movieTrailer.src = dados.trailer;

    // Marca como último assistido
    localStorage.setItem("lastWatched", filmeSelecionado);

    // Adiciona ao histórico (sem duplicar)
    let historico = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    if (!historico.includes(filmeSelecionado)) {
        historico.unshift(filmeSelecionado);
        localStorage.setItem("watchedMovies", JSON.stringify(historico));
    }

} else {
    // Se não tiver filme selecionado, volta para dashboard
    window.location.href = "dashboard.html";
}

/* ===================
   CONTROLE DE EPISÓDIOS
=================== */
const dadosSerie = catalogo[filmeSelecionado]?.episodios;
const botoesEpisodio = document.querySelectorAll(".episode-btn");

if (dadosSerie && botoesEpisodio.length > 0) {

    // Clica no episódio
    botoesEpisodio.forEach(botao => {
        botao.addEventListener("click", function () {
            const numero = this.dataset.episode;

            if (dadosSerie[numero]) {
                const ep = dadosSerie[numero];

                // Atualiza tela
                movieTitle.textContent = `${filmeSelecionado} - ${ep.titulo}`;
                movieDescription.textContent = ep.descricao;
                movieTrailer.src = ep.video;

                // Marca episódio atual
                localStorage.setItem(`${filmeSelecionado}_epAtual`, numero);

                // Estilo ativo
                botoesEpisodio.forEach(btn => btn.classList.remove("episode-active"));
                this.classList.add("episode-active");

                // Salva progresso
                localStorage.setItem("ultimoEpisodio", JSON.stringify({
                    serie: filmeSelecionado,
                    episodio: numero
                }));
            }
        });
    });

    // Carrega último episódio assistido
    const ultimoEpSalvo = localStorage.getItem(`${filmeSelecionado}_epAtual`);
    if (ultimoEpSalvo && dadosSerie[ultimoEpSalvo]) {
        const ep = dadosSerie[ultimoEpSalvo];

        movieTitle.textContent = `${filmeSelecionado} - ${ep.titulo}`;
        movieDescription.textContent = ep.descricao;
        movieTrailer.src = ep.video;

        // Marca botão
        const botaoAtivo = document.querySelector(`[data-episode="${ultimoEpSalvo}"]`);
        if (botaoAtivo) botaoAtivo.classList.add("episode-active");
    }
}

/* ===================
   BOTÃO VOLTAR
=================== */
if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });
}

/* ===================
   EFEITOS E VISUAL
=================== */
// Esconde cabeçalho ao rolar para melhor experiência
const headerPlayer = document.querySelector(".player-header");
window.addEventListener("scroll", () => {
    if (!headerPlayer) return;
    headerPlayer.style.opacity = window.scrollY > 100 ? "0" : "1";
    headerPlayer.style.pointerEvents = window.scrollY > 100 ? "none" : "auto";
});

console.log("✅ Player carregado e funcional!");