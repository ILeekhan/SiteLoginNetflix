// ✅ CARREGAR MODO ESCURO/CLARO
window.addEventListener('DOMContentLoaded', () => {
    const modo = localStorage.getItem('modoEscuro');
    if (modo === 'ativado') {
        document.body.classList.add('modo-escuro');
    } else {
        document.body.classList.remove('modo-escuro');
    }
    configurarBotaoSair();
});

// Verificar login
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if(!usuarioLogado) window.location.href = 'login.html';

// Avatar inicial
document.getElementById('avatarUsuario').textContent = usuarioLogado.nome.charAt(0).toUpperCase();

// ✅ BOTÃO SAIR 100% FUNCIONAL
function configurarBotaoSair() {
    const avatarMenu = document.getElementById('avatarMenu');
    const btnSair = document.getElementById('btnSair');
    const menuSair = document.getElementById('menuSair');

    avatarMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        menuSair.style.display = menuSair.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', () => menuSair.style.display = 'none');

    btnSair.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('perfilAtivo');
        window.location.href = 'login.html';
    });
}

// Navbar scroll
window.onscroll = () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
};

// ✅ CATÁLOGO COMPLETO E CORRETO
const catalogo = [
    { 
        id: 1, 
        titulo: "Stranger Things", 
        descricao: "Uma cidade pequena enfrenta acontecimentos sobrenaturais e uma dimensão paralela chamada Mundo Invertido.", 
        imagem: "assets/images/StrangerThings.png", 
        banner: "assets/images/StrangerThings.png", // antes era banner-StrangerThings.png
        videoUrl: "https://www.youtube.com/embed/6pTqSq03H7s?rel=0",
        videoId: "6pTqSq03H7s"
    },
    { 
        id: 2, 
        titulo: "The Witcher", 
        descricao: "Geralt de Rívia, um caçador de monstros, luta para encontrar seu lugar em um mundo onde humanos são piores que feras.", 
        imagem: "assets/images/TheWitcher.png", 
        banner: "assets/images/TheWitcher.png", // antes era banner-TheWitcher.png
        videoUrl: "https://www.youtube.com/embed/ndl1W4ltcmg?rel=0",
        videoId: "ndl1W4ltcmg"
    },
    { 
        id: 3, 
        titulo: "Wandinha", 
        descricao: "Wandinha Addams estuda na Academia Nunca Mais e investiga mistérios familiares.", 
        imagem: "assets/images/Wandinha.png", 
        banner: "assets/images/Wandinha.png", // antes era banner-Wandinha.png
        videoUrl: "https://www.youtube.com/embed/Di3l9_8eL70?rel=0",
        videoId: "Di3l9_8eL70"
    },
    { 
        id: 4, 
        titulo: "Dark", 
        descricao: "Quatro famílias descobrem segredos sobre viagem no tempo em uma cidade pequena.", 
        imagem: "assets/images/Dark.png", 
        banner: "assets/images/Dark.png", // antes era banner-Dark.png
        videoUrl: "https://www.youtube.com/embed/ESEUoa-mz2c?rel=0",
        videoId: "ESEUoa-mz2c"
    }
];

// ✅ BANNER ROLANDO COM IMAGENS APARECENDO
let indiceBanner = 0;
function trocarBanner() {
    const item = catalogo[indiceBanner];
    const bannerEl = document.querySelector('.banner');

    // ✅ TODOS aparecem com imagem estendida bonita
    bannerEl.style.background = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${item.banner}') center / cover no-repeat`;
    bannerEl.style.backgroundSize = "100% 100%"; // estica largura toda, mantém proporção

    document.getElementById('tituloBanner').textContent = item.titulo;
    document.getElementById('descricaoBanner').textContent = item.descricao;
    indiceBanner = (indiceBanner + 1) % catalogo.length;
}

setInterval(trocarBanner, 6000);
trocarBanner();

// ✅ CARDS COM IMAGENS
function renderizarCards(lista, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    if(lista.length === 0) {
        container.innerHTML = '<p class="vazio-lista">Sua lista está vazia.</p>';
        return;
    }
    lista.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.imagem}" alt="${item.titulo}" loading="lazy">
            <div class="favorito-icone">⭐</div>
        `;
        card.onclick = () => {
            localStorage.setItem('filmeSelecionado', JSON.stringify(item));
            window.location.href = 'player.html';
        };
        container.appendChild(card);
    });
}

// ✅ BOTÕES DO BANNER
document.getElementById('btnBannerAssistir').onclick = () => {
    const itemAtual = catalogo[indiceBanner === 0 ? catalogo.length -1 : indiceBanner -1];
    localStorage.setItem('filmeSelecionado', JSON.stringify(itemAtual));
    window.location.href = 'player.html';
};

// MODAL
const modal = document.getElementById('modalDetalhes');
let itemAtualModal;
function abrirModal(item) {
    itemAtualModal = item;
    document.getElementById('modalTitulo').textContent = item.titulo;
    document.getElementById('modalDescricao').textContent = item.descricao;
    modal.style.display = 'flex';
}
document.querySelector('.fechar').onclick = () => modal.style.display = 'none';
document.getElementById('btnModalAssistir').onclick = () => {
    localStorage.setItem('filmeSelecionado', JSON.stringify(itemAtualModal));
    window.location.href = 'player.html';
};

// BUSCA
document.getElementById('campoBusca').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase().trim();
    if(!termo) return renderizarCards(catalogo, 'emAlta');
    const filtrados = catalogo.filter(i => i.titulo.toLowerCase().includes(termo));
    renderizarCards(filtrados, 'emAlta');
});

// INICIALIZAR
renderizarCards(catalogo, 'continuarAssistindo');
renderizarCards(catalogo, 'emAlta');
renderizarCards([], 'minhaLista');
renderizarCards(catalogo.slice(0,2), 'assistidosRecentes');