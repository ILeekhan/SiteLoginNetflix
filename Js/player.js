/* ==========================================
   ARQUIVO: player.js
   FUNCIONALIDADES DO PLAYER DE VÍDEO
========================================== */

// Verificar se está logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado) {
    window.location.href = 'login.html';
}

// Elementos da página
const videoPlayer = document.getElementById('videoPlayer');
const tituloVideo = document.getElementById('tituloVideo');
const descricaoVideo = document.getElementById('descricaoVideo');
const listaVideosEl = document.getElementById('listaVideos');

// Recuperar série selecionada do localStorage
const serieSelecionada = localStorage.getItem('filmeSelecionado') || "Stranger Things";

// Catálogo completo (igual ao dashboard)
const catalogo = {
    "Stranger Things": {
        descricao: "Uma cidade pequena enfrenta acontecimentos sobrenaturais e uma dimensão paralela chamada Mundo Invertido. Um grupo de amigos embarca em uma aventura incrível para encontrar um amigo desaparecido.",
        videos: [
            { titulo: "Episódio 1: O Desaparecimento", id: "bEkYtH8tG7s", duracao: "50min" },
            { titulo: "Episódio 2: A Estranha", id: "c0i8j3yV8d0", duracao: "52min" },
            { titulo: "Episódio 3: Capítulo Um: A Menina Desaparecida", id: "dQw4w9WgXcQ", duracao: "48min" },
            { titulo: "Trailer Oficial", id: "O2R5j3dX7a8", duracao: "2min 30s" }
        ]
    },
    "The Witcher": {
        descricao: "Geralt de Rívia, um caçador de monstros, luta para encontrar seu lugar em um mundo onde pessoas são muitas vezes mais perigosas que as feras.",
        videos: [
            { titulo: "Episódio 1: O Começo do Fim", id: "q1L9s5wE4r0", duracao: "55min" },
            { titulo: "Episódio 2: Maravilhas e Monstros", id: "xZ7kL2mP9aQ", duracao: "53min" },
            { titulo: "Trailer Oficial", id: "yW3eR9tU7iO", duracao: "2min 15s" }
        ]
    },
    "Wandinha": {
        descricao: "Wandinha Addams estuda na Academia Nunca Mais, onde tenta dominar sua habilidade psíquica, investiga uma onda de assassinatos e desvenda um mistério que envolveu seus pais no passado.",
        videos: [
            { titulo: "Episódio 1: Esperança", id: "pP5uY8iO3bV", duracao: "49min" },
            { titulo: "Episódio 2: Luto", id: "nM9bV4xZ6cD", duracao: "51min" },
            { titulo: "Trailer Oficial", id: "bN2vC8mK5jH", duracao: "1min 50s" }
        ]
    },
    "Dark": {
        descricao: "Quatro famílias de uma cidade pequena vivem um mistério envolvendo o desaparecimento de crianças, viagens no tempo e segredos que atravessam gerações.",
        videos: [
            { titulo: "Episódio 1: Segredos", id: "kL8jH4dF9sA", duracao: "52min" },
            { titulo: "Episódio 2: Mentiras", id: "dF3gH7jK5lZ", duracao: "50min" },
            { titulo: "Trailer Oficial", id: "sA9dF2gH6jK", duracao: "2min 10s" }
        ]
    }
};

// Carregar dados da série
const dadosSerie = catalogo[serieSelecionada];

// Atualizar informações na tela
tituloVideo.textContent = serieSelecionada;
descricaoVideo.textContent = dadosSerie.descricao;

// Carregar lista de vídeos
function carregarListaVideos() {
    listaVideosEl.innerHTML = "";

    dadosSerie.videos.forEach((video, index) => {
        const item = document.createElement("div");
        item.className = `video-item ${index === 0 ? "ativo" : ""}`;
        item.dataset.videoId = video.id;

        item.innerHTML = `
            <div>
                <div class="video-titulo">${video.titulo}</div>
            </div>
            <div class="video-duracao">${video.duracao}</div>
        `;

        // Ao clicar no item
        item.onclick = () => {
            // Remover ativo de todos
            document.querySelectorAll(".video-item").forEach(el => el.classList.remove("ativo"));
            // Adicionar ativo no clicado
            item.classList.add("ativo");
            // Trocar vídeo
            trocarVideo(video.id);
            // Salvar último episódio assistido
            salvarUltimoEpisodio(serieSelecionada, video);
        };

        listaVideosEl.appendChild(item);
    });
}

// Trocar vídeo no iframe
function trocarVideo(videoId) {
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

// Salvar último episódio assistido (para Continuar Assistindo)
function salvarUltimoEpisodio(nomeSerie, video) {
    let historico = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    
    // Remover se já existir
    historico = historico.filter(item => item.serie !== nomeSerie);
    
    // Adicionar no início
    historico.unshift({
        serie: nomeSerie,
        ultimoVideo: video,
        data: new Date().toISOString()
    });

    // Manter apenas os últimos 10
    if (historico.length > 10) historico.pop();

    localStorage.setItem("watchedMovies", JSON.stringify(historico));
}

// Inicializar com o primeiro vídeo
if (dadosSerie.videos.length > 0) {
    trocarVideo(dadosSerie.videos[0].id);
}

// Executar carregamento
carregarListaVideos();