// Verificar sessão
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if(!usuarioLogado) window.location.href = 'login.html';

// Dados das Séries
const catalogo = [
    { id: 1, titulo: "Stranger Things", descricao: "Um grupo de amigos investiga o desaparecimento de um colega e descobre um mundo paralelo.", imagem: "assets/images/strangerthings.jpg", banner: "assets/images/banner-stranger.jpg" },
    { id: 2, titulo: "The Witcher", descricao: "Geralt de Rívia, um caçador de monstros, luta para encontrar seu lugar em um mundo onde humanos são piores que feras.", imagem: "assets/images/thewitcher.jpg", banner: "assets/images/banner-witcher.jpg" },
    { id: 3, titulo: "Wandinha", descricao: "Wandinha Addams estuda na Academia Nunca Mais e investiga mistérios familiares.", imagem: "assets/images/wandinha.jpg", banner: "assets/images/banner-wandinha.jpg" },
    { id: 4, titulo: "Dark", descricao: "Quatro famílias de uma cidade pequena descobrem segredos sobre viagem no tempo.", imagem: "assets/images/dark.jpg", banner: "assets/images/banner-dark.jpg" }
];

// Avatar inicial
document.getElementById('avatarUsuario').textContent = usuarioLogado.nome.charAt(0).toUpperCase();

// Logout
document.getElementById('btnSair').onclick = () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
};

// Navbar scroll
window.onscroll = () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
};

// Banner Dinâmico
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

// Renderizar Cards
function renderizarCards(lista, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
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

// Busca
document.getElementById('campoBusca').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = catalogo.filter(item => 
        item.titulo.toLowerCase().includes(termo)
    );
    renderizarCards(filtrados, 'populares');
});

// Inicializar
renderizarCards(catalogo, 'continuarAssistindo');
renderizarCards(catalogo, 'minhaLista');
renderizarCards(catalogo, 'populares');