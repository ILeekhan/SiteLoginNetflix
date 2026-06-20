/* ==========================================
   ARQUIVO: dashboard.js - VERSÃO CORRIGIDA
   ✅ Banner automático funcionando
   ✅ Clique nas séries abre opção de assistir
========================================== */

/* ===================
   VERIFICAÇÃO DE ACESSO
=================== */
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "login.html";

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
        document.querySelectorAll(".movie-card").forEach(card => {
            card.style.display = card.dataset.title.toLowerCase().includes(termo) ? "block" : "none";
        });
    });
}

/* ===================
   DADOS DO CATÁLOGO (MESMO EM TODAS AS PÁGINAS)
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

// Ícones corretos
favoriteButtons.forEach(btn => {
    btn.textContent = favoritos.includes(btn.parentElement.dataset.title) ? "❤️" : "⭐";
});

// Clique para adicionar/remover
favoriteButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const titulo = this.parentElement.dataset.title;
        if (favoritos.includes(titulo)) {
            favoritos = favoritos.filter(item => item !== titulo);
            this.textContent = "⭐";
            showNotification(`❌ ${titulo} removido`);
        } else {
            favoritos.push(titulo);
            this.textContent = "❤️";
            showNotification(`❤️ ${titulo} adicionado`);
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
        const card = document.createElement("div");
        card.className = "movie-card";
        card.dataset.title = titulo;
        card.dataset.description = catalogo[titulo].descricao;
        card.innerHTML = `<img src="${catalogo[titulo].imagem}" alt="${titulo}">`;
        favoritosListaEl.appendChild(card);
    });
    // ✅ Reaplica evento de clique nos cards novos
    ativarCliqueCards();
}
atualizarListaFavoritos();

/* ===================
   ✅ BANNER TROCANDO AUTOMATICAMENTE (CORRIGIDO)
=================== */
const bannerImg = document.getElementById("bannerImage");
const bannerTitulo = document.getElementById("bannerTitle");
const bannerDesc = document.getElementById("bannerDescription");
const bannerPlayBtn = document.getElementById("bannerPlayBtn");

const listaBanner = Object.keys(catalogo);
let indiceBanner = 0;

function trocarBanner() {
    const atual = listaBanner[indiceBanner];
    if (catalogo[atual] && bannerImg && bannerTitulo && bannerDesc) {
        bannerImg.style.opacity = "0";
        setTimeout(() => {
            bannerTitulo.textContent = atual;
            bannerDesc.textContent = catalogo[atual].descricao;
            bannerImg.src = catalogo[atual].imagem;
            bannerImg.style.opacity = "1";
        }, 400);
    }
    indiceBanner = (indiceBanner + 1) % listaBanner.length;
}
// Inicia a troca automaticamente a cada 5 segundos
setInterval(trocarBanner, 5000);

// Botão Assistir do banner
bannerPlayBtn?.addEventListener("click", () => {
    irParaPlayer(bannerTitulo.textContent);
});

/* ===================
   ✅ MODAL + CLIQUE NOS CARDS (CORRIGIDO)
=================== */
const modal = document.getElementById('movieModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close-btn');
const modalPlayBtn = document.getElementById('modalPlayBtn');
let tituloAtualModal = "";

// Função que ativa o clique em TODOS os cards (novos e antigos)
function ativarCliqueCards() {
    document.querySelectorAll('.movie-card').forEach(card => {
        // Remove evento antigo para não duplicar
        card.removeEventListener('click', abrirModal);
        // Adiciona evento novo
        card.addEventListener('click', abrirModal);
    });
}

// Função para abrir o modal
function abrirModal() {
    tituloAtualModal = this.dataset.title;
    modalTitle.textContent = tituloAtualModal;
    modalDescription.textContent = this.dataset.description || catalogo[tituloAtualModal].descricao;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Fechar modal
closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});
window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Botão Assistir do modal
modalPlayBtn?.addEventListener("click", () => {
    irParaPlayer(tituloAtualModal);
    modal.style.display = "none";
});

// ✅ Ativa clique nos cards logo no início
ativarCliqueCards();

/* ===================
   IR PARA PÁGINA DE VÍDEOS
=================== */
function irParaPlayer(titulo) {
    localStorage.setItem("filmeSelecionado", titulo);
    // Salva no histórico
    let historico = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    if (!historico.includes(titulo)) {
        historico.unshift(titulo);
        if (historico.length > 10) historico.pop();
        localStorage.setItem("watchedMovies", JSON.stringify(historico));
        atualizarHistorico();
    }
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
        const card = document.createElement("div");
        card.className = "movie-card";
        card.dataset.title = titulo;
        card.dataset.description = catalogo[titulo].descricao;
        card.innerHTML = `<img src="${catalogo[titulo].imagem}" alt="${titulo}">`;
        historicoEl.appendChild(card);
    });
    // ✅ Reaplica clique nos cards do histórico
    ativarCliqueCards();
}
atualizarHistorico();

/* ===================
   EFEITO NO CABEÇALHO
=================== */
const headerDashboard = document.querySelector(".dashboard-header");
window.addEventListener("scroll", () => {
    headerDashboard?.classList.toggle("scrolled", window.scrollY > 50);
});