// ==========================================
// ARQUIVO: dashboard.js
// ==========================================

// ✅ CARREGAR MODO ESCURO/CLARO
window.addEventListener('DOMContentLoaded', () => {
    const modo = localStorage.getItem('modoEscuro');
    if (modo === 'ativado') {
        document.body.classList.add('modo-escuro');
    } else {
        document.body.classList.remove('modo-escuro');
    }
});

// Verificar login
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if(!usuarioLogado) window.location.href = 'login.html';

// Avatar inicial
document.getElementById('avatarUsuario').textContent = usuarioLogado.nome.charAt(0).toUpperCase();

// ✅ BOTÃO SAIR FUNCIONANDO
document.getElementById('btnSair').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('perfilAtivo');
    window.location.href = 'login.html';
});

// Navbar scroll
window.onscroll = () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
};

// ✅ CATÁLOGO COMPLETO COM IMAGENS CORRETAS
const catalogo = [
    { 
        id: 1, 
        titulo: "Stranger Things", 
        descricao: "Uma cidade pequena enfrenta acontecimentos sobrenaturais e uma dimensão paralela chamada Mundo Invertido.", 
        imagem: "assets/images/StrangerThings.png", 
        banner: "assets/images/banner-StrangerThings.png" 
    },
    { 
        id: 2, 
        titulo: "The Witcher", 
        descricao: "Geralt de Rívia, um caçador de monstros, luta para encontrar seu lugar em um mundo onde humanos são piores que feras.", 
        imagem: "assets/images/TheWitcher.png", 
        banner: "assets/images/banner-TheWitcher.png" 
    },
    { 
        id: 3, 
        titulo: "Wandinha", 
        descricao: "Wandinha Addams estuda na Academia Nunca Mais e investiga mistérios familiares.", 
        imagem: "assets/images/Wandinha.png", 
        banner: "assets/images/banner-Wandinha.png" 
    },
    { 
        id: 4, 
        titulo: "Dark", 
        descricao: "Quatro famílias descobrem segredos sobre viagem no tempo em uma cidade pequena.", 
        imagem: "assets/images/Dark.png", 
        banner: "assets/images/banner-Dark.png" 
    }
];

// ✅ BANNER DINÂMICO FUNCIONANDO
let indiceBanner = 0;
function trocarBanner() {
    const item = catalogo[indiceBanner];
    document.querySelector('.banner').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('${item.banner}')`;
    document.getElementById('tituloBanner').textContent = item.titulo;
    document.getElementById('descricaoBanner').textContent = item.descricao;
    indiceBanner = (indiceBanner + 1) % catalogo.length;
}
setInterval(trocarBanner, 6000);
trocarBanner();

// ✅ RENDERIZAR CARDS COM IMAGENS E ROLAGEM
function renderizarCards(lista, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if(lista.length === 0) {
        container.innerHTML = '<p class="vazio-lista">Nenhum título encontrado.</p>';
        return;
    }

    lista.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = item.id;
        card.innerHTML = `
            <img src="${item.imagem}" alt="${item.titulo}">
            <div class="favorito-icone">⭐</div>
        `;
        card.onclick = () => abrirModal(item);
        container.appendChild(card);
    });
}

// Modal Detalhes
const modal = document.getElementById('modalDetalhes');
function abrirModal(item) {
    document.getElementById('modalTitulo').textContent = item.titulo;
    document.getElementById('modalDescricao').textContent = item.descricao;
    modal.style.display = 'flex';
}
document.querySelector('.fechar').onclick = () => modal.style.display = 'none';

// ✅ BUSCA FUNCIONANDO
document.getElementById('campoBusca').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase().trim();
    if(!termo) {
        renderizarCards(catalogo, 'emAlta');
        return;
    }
    const filtrados = catalogo.filter(item => 
        item.titulo.toLowerCase().includes(termo)
    );
    renderizarCards(filtrados, 'emAlta');
});

// ✅ INICIALIZAR TUDO
renderizarCards(catalogo, 'continuarAssistindo');
renderizarCards(catalogo, 'emAlta');
renderizarCards([], 'minhaLista');
renderizarCards(catalogo.slice(0,2), 'assistidosRecentes');