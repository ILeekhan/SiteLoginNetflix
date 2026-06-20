/* ==========================================
   ARQUIVO: dashboard.js - VERSÃO FINAL
========================================== */

/* ===================
   VERIFICAÇÃO DE ACESSO
=================== */
const user = JSON.parse(localStorage.getItem("currentUser"));
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
    setTimeout(() => notification.classList.remove("show"), 2500);
}

/* ===================
   EXIBIR NOME DO USUÁRIO
=================== */
const userName = document.getElementById("userName");
const selectedProfile = localStorage.getItem("selectedProfile");
if (userName) {
    const nomeExibido = selectedProfile || user.name;
    userName.textContent = `Olá, ${nomeExibido} 🔥`;
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
   DADOS GERAIS
=================== */
const catalogo = {
    "Stranger Things": {
        imagem: "assets/images/Revisão Código Portfolio (3).png",
        descricao: "Uma cidade pequena enfrenta acontecimentos sobrenaturais e uma dimensão paralela chamada Mundo Invertido.",
        videoId: "bEkYtH8tG7s"
    },
    "The Witcher": {
        imagem: "assets/images/Revisão Código Portfolio (2).png",
        descricao: "Geralt de Rívia luta contra monstros e enfrenta conflitos políticos em um mundo medieval fantástico.",
        videoId: "c0i8j3yV8d0"
    },
    "Wandinha": {
        imagem: "assets/images/Revisão Código Portfolio (1).png",
        descricao: "A filha da Família Addams investiga mistérios sobrenaturais enquanto estuda na Escola Nunca Mais.",
        videoId: "O2R5j3dX7a8"
    },
    "Dark": {
        imagem: "assets/images/Revisão Código Portfolio.png",
        descricao: "Uma série alemã sobre viagens no tempo, desaparecimentos e segredos familiares.",
        videoId: "q1L9s5wE4r0"
    }
};

/* ===================
   GERENCIAR FAVORITOS
=================== */
const favoriteButtons = document.querySelectorAll(".favorite-btn");
let favoritos = JSON.parse(localStorage.getItem("favorites")) || [];
const favoritosListaEl = document.getElementById("favoritesList");
const favoritosContadorEl = document.getElementById("favoritesCount");

favoriteButtons.forEach(btn => {
    const titulo = btn.parentElement.dataset.title;
    btn.textContent = favoritos.includes(titulo) ? "❤️" : "⭐";
});

favoriteButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const titulo = this.parentElement.dataset.title;
        if (favoritos.includes(titulo)) {
            favoritos = favoritos.filter(item => item !== titulo);
            this.textContent = "⭐";
            showNotification(`❌ ${titulo} removido da Minha Lista`);
        } else {
            favoritos.push(titulo);
            this.textContent = "❤️";
            showNotification(`❤️ ${titulo} adicionado à Minha Lista`);
        }
        localStorage.setItem("favorites", JSON.stringify(favoritos));
        atualizarListaFavoritos();
    });
});

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
atualizarListaFavoritos();

/* ===================
   MODAL DE DETALHES
=================== */
const modal = document.getElementById('movieModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close-btn');
const modalPlayBtn = document.getElementById('modalPlayBtn');
let tituloAtualModal = "";

const movieCards = document.querySelectorAll('.movie-card');
movieCards.forEach(card => {
    card.addEventListener('click', function () {
        tituloAtualModal = this.dataset.title;
        const descricao = this.dataset.description;
        modalTitle.textContent = tituloAtualModal;
        modalDescription.textContent = descricao;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

modalPlayBtn.addEventListener('click', () => {
    irParaPlayer(tituloAtualModal);
    modal.style.display = 'none';
});

/* ===================
   BANNER TROCANDO AUTOMATICAMENTE
=================== */
const bannerImg = document.getElementById("bannerImage");
const bannerTitulo = document.getElementById("bannerTitle");
const bannerDesc = document.getElementById("bannerDescription");

const listaBanner = Object.keys(catalogo);
let indiceBanner = 0;

function trocarBanner() {
    const atual = listaBanner[indiceBanner];
    if (catalogo[atual]) {
        bannerImg.style.opacity = 0;
        setTimeout(() => {
            bannerTitulo.textContent = atual;
            bannerDesc.textContent = catalogo[atual].descricao;
            bannerImg.src = catalogo[atual].imagem;
            bannerImg.style.opacity = 1;
        }, 400);
    }
    indiceBanner = (indiceBanner + 1) % listaBanner.length;
}
setInterval(trocarBanner, 5000);

/* ===================
   IR PARA PÁGINA DE VÍDEOS
=================== */
function irParaPlayer(titulo) {
    localStorage.setItem("filmeSelecionado", titulo);
    window.location.href = "player.html";
}

/* ===================
   HISTÓRICO DE ASSISTIDOS
=================== */
const historicoEl = document.getElementById("recentMovies");
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
atualizarHistorico();

/* ===================
   EFEITO NO CABEÇALHO
=================== */
const headerDashboard = document.querySelector(".dashboard-header");
window.addEventListener("scroll", () => {
    if (!headerDashboard) return;
    headerDashboard.classList.toggle("scrolled", window.scrollY > 50);
});