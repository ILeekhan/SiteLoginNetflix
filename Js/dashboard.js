/* ==========================================
   ARQUIVO: dashboard.js - ÁREA PRINCIPAL
   Funções: Usuário, Favoritos, Busca, Banner, Modal, Histórico
========================================== */

/* ===================
   VERIFICAÇÃO DE ACESSO
=================== */
const user = JSON.parse(localStorage.getItem("currentUser"));

// Se não estiver logado, volta para login
if (!user) {
    window.location.href = "login.html";
}

/* ===================
   SISTEMA DE NOTIFICAÇÕES
=================== */
const notification = document.getElementById("notification");

function showNotification(text) {
    if (!notification) return;

    notification.textContent = text;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}

/* ===================
   EXIBIR NOME DO USUÁRIO
=================== */
const userName = document.getElementById("userName");
const selectedProfile = localStorage.getItem("selectedProfile");

if (userName) {
    const nomeExibido = selectedProfile || user.name;
    userName.textContent = `Olá, ${nomeExibido} 👋`;
}

/* ===================
   AVATAR DO USUÁRIO
=================== */
const avatar = document.querySelector(".avatar");

if (avatar) {
    const nomeAvatar = selectedProfile || user.name;
    avatar.textContent = nomeAvatar.charAt(0).toUpperCase();
}

/* ===================
   LOGOUT
=================== */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("selectedProfile");
        window.location.href = "login.html";
    });
}

/* ===================
   BUSCA DE FILMES
=================== */
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const termo = this.value.trim().toLowerCase();
        const todosCards = document.querySelectorAll(".movie-card");

        todosCards.forEach(card => {
            const titulo = card.dataset.title.toLowerCase();
            card.style.display = titulo.includes(termo) ? "block" : "none";
        });
    });
}

/* ===================
   DADOS GERAIS (CENTRALIZADO)
=================== */
const catalogo = {
    "Stranger Things": {
        imagem: "assets/images/StrangerThingsCapa.jpg",
        descricao: "Uma cidade pequena enfrenta acontecimentos sobrenaturais e uma dimensão paralela chamada Mundo Invertido."
    },
    "The Witcher": {
        imagem: "assets/images/TheWitcherSerie.jpg",
        descricao: "Geralt de Rívia luta contra monstros e enfrenta conflitos políticos em um mundo medieval fantástico."
    },
    "Wandinha": {
        imagem: "assets/images/WandinhaSerie.jpg",
        descricao: "A filha da Família Addams investiga mistérios sobrenaturais enquanto estuda na Escola Nunca Mais."
    },
    "Dark": {
        imagem: "assets/images/DarkSerie.jpg",
        descricao: "Uma série alemã sobre viagens no tempo, desaparecimentos e segredos familiares."
    }
};

/* ===================
   GERENCIAR FAVORITOS
=================== */
const favoriteButtons = document.querySelectorAll(".favorite-btn");
let favoritos = JSON.parse(localStorage.getItem("favorites")) || [];
const favoritosListaEl = document.getElementById("favoritesList");
const favoritosContadorEl = document.getElementById("favoritesCount");

// Atualiza ícones dos botões conforme salvos
favoriteButtons.forEach(btn => {
    const titulo = btn.parentElement.dataset.title;
    btn.textContent = favoritos.includes(titulo) ? "❤️" : "⭐";
});

// Ação de adicionar/remover
favoriteButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation(); // Evita abrir modal ao clicar na estrela
        const titulo = this.parentElement.dataset.title;

        if (favoritos.includes(titulo)) {
            // REMOVER
            favoritos = favoritos.filter(item => item !== titulo);
            this.textContent = "⭐";
            showNotification(`❌ ${titulo} removido da Minha Lista`);
        } else {
            // ADICIONAR
            favoritos.push(titulo);
            this.textContent = "❤️";
            showNotification(`❤️ ${titulo} adicionado à Minha Lista`);
        }

        // Salva e atualiza interface
        localStorage.setItem("favorites", JSON.stringify(favoritos));
        atualizarListaFavoritos();
    });
});

// Renderiza lista de favoritos na seção
function atualizarListaFavoritos() {
    if (!favoritosListaEl || !favoritosContadorEl) return;

    favoritosContadorEl.textContent = favoritos.length;
    favoritosListaEl.innerHTML = "";

    if (favoritos.length === 0) {
        favoritosListaEl.innerHTML = "<p style='color:#aaa; padding:10px;'>Sua lista está vazia.</p>";
        return;
    }

    favoritos.forEach(titulo => {
        if (!catalogo[titulo]) return;

        const cardEl = document.createElement("div");
        cardEl.className = "movie-card";
        cardEl.dataset.title = titulo;
        cardEl.innerHTML = `<img src="${catalogo[titulo].imagem}" alt="${titulo}" loading="lazy">`;
        favoritosListaEl.appendChild(cardEl);
    });
}

// Inicializa a lista ao carregar página
atualizarListaFavoritos();

/* ===================
   MODAL DE DETALHES
=================== */
const movieModal = document.getElementById("movieModal");
const modalTitulo = document.getElementById("movieTitle");
const modalDescricao = document.getElementById("movieDescription");
const modalFechar = document.getElementById("closeMovieModal");
const todosCards = document.querySelectorAll(".movie-card");

// Abrir modal ao clicar no card
todosCards.forEach(card => {
    card.addEventListener("click", function () {
        const titulo = this.dataset.title;
        const dados = catalogo[titulo];

        if (dados) {
            modalTitulo.textContent = titulo;
            modalDescricao.textContent = dados.descricao;
            movieModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    });
});

// Fechar modal
if (modalFechar) {
    modalFechar.addEventListener("click", fecharModal);
}
window.addEventListener("click", (e) => {
    if (e.target === movieModal) fecharModal();
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharModal();
});

function fecharModal() {
    movieModal.style.display = "none";
    document.body.style.overflow = "auto";
}

/* ===================
   BANNER DESTAQUE DINÂMICO
=================== */
const bannerImg = document.getElementById("bannerImage");
const bannerTitulo = document.getElementById("bannerTitle");
const bannerDesc = document.getElementById("bannerDescription");

const listaBanner = Object.keys(catalogo);
let indiceBanner = 0;

function trocarBanner() {
    const atual = listaBanner[indiceBanner];
    if (catalogo[atual] && bannerImg && bannerTitulo && bannerDesc) {
        bannerTitulo.textContent = atual;
        bannerDesc.textContent = catalogo[atual].descricao;
        bannerImg.src = catalogo[atual].imagem;
        bannerImg.alt = `Destaque: ${atual}`;
    }
    indiceBanner = (indiceBanner + 1) % listaBanner.length;
}

// Troca a cada 5 segundos
if (bannerImg) setInterval(trocarBanner, 5000);

/* ===================
   BOTÕES DE ASSISTIR
=================== */
const botoesAssistir = document.querySelectorAll(".play-btn");
const historicoEl = document.getElementById("recentMovies");

botoesAssistir.forEach(btn => {
    btn.addEventListener("click", () => {
        let tituloFilme = "";

        // Pega do modal ou do banner
        if (movieModal.style.display === "flex") {
            tituloFilme = modalTitulo.textContent;
            fecharModal();
        } else {
            tituloFilme = bannerTitulo.textContent;
        }

        if (!tituloFilme || !catalogo[tituloFilme]) return;

        // Salva para o player
        localStorage.setItem("selectedMovie", tituloFilme);

        // Salva no histórico de assistidos
        let historico = JSON.parse(localStorage.getItem("watchedMovies")) || [];
        if (!historico.includes(tituloFilme)) {
            historico.unshift(tituloFilme); // Adiciona no início
            localStorage.setItem("watchedMovies", JSON.stringify(historico));
            atualizarHistorico();
        }

        // Vai para página de reprodução
        window.location.href = "player.html";
    });
});

/* ===================
   HISTÓRICO - ASSISTIDOS RECENTEMENTE
=================== */
function atualizarHistorico() {
    if (!historicoEl) return;
    const historico = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    historicoEl.innerHTML = "";

    if (historico.length === 0) {
        historicoEl.innerHTML = "<p style='color:#aaa; padding:10px;'>Nenhum título assistido ainda.</p>";
        return;
    }

    historico.forEach(titulo => {
        if (!catalogo[titulo]) return;
        const cardEl = document.createElement("div");
        cardEl.className = "movie-card";
        cardEl.dataset.title = titulo;
        cardEl.innerHTML = `<img src="${catalogo[titulo].imagem}" alt="${titulo}" loading="lazy">`;
        historicoEl.appendChild(cardEl);
    });
}

// Inicializa histórico
atualizarHistorico();

/* ===================
   EFEITOS VISUAIS NO CABEÇALHO
=================== */
const headerDashboard = document.querySelector(".dashboard-header");

window.addEventListener("scroll", () => {
    if (!headerDashboard) return;
    if (window.scrollY > 50) {
        headerDashboard.classList.add("scrolled");
    } else {
        headerDashboard.classList.remove("scrolled");
    }
});