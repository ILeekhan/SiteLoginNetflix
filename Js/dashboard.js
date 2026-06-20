// ==========================================
// ARQUIVO: dashboard.js
// ==========================================

// ✅ CARREGAR MODO SALVO
window.addEventListener('DOMContentLoaded', () => {
    const modo = localStorage.getItem('modoEscuro');
    if (modo === 'ativado') {
        document.body.classList.add('modo-escuro');
    } else {
        document.body.classList.remove('modo-escuro');
    }
});

// Verificar login e perfil
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const perfilAtivo = localStorage.getItem('perfilAtivo');
if (!usuarioLogado || !perfilAtivo) window.location.href = 'login.html';

// Saudação
document.getElementById('saudacaoUsuario').textContent = `Olá, ${usuarioLogado.nome}!`;
document.getElementById('nomePerfilAtivo').textContent = `Perfil: ${perfilAtivo}`;

// Botão Sair
document.getElementById('btnSair').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('perfilAtivo');
    window.location.href = 'login.html';
});

// Catálogo
const catalogo = [
    { titulo: "Stranger Things", imagem: "assets/images/StrangerThings.png", descricao: "Mistério e sobrenatural." },
    { titulo: "The Witcher", imagem: "assets/images/TheWitcher.png", descricao: "Caçador de monstros." },
    { titulo: "Wandinha", imagem: "assets/images/Wandinha.png", descricao: "Jovem com poderes." },
    { titulo: "Dark", imagem: "assets/images/Dark.png", descricao: "Viagem no tempo." }
];

// Carregar filmes
const listaEl = document.getElementById('listaFilmes');
catalogo.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'card-filme';
    card.innerHTML = `
        <img src="${filme.imagem}" alt="${filme.titulo}">
        <div class="info-card">
            <h4>${filme.titulo}</h4>
            <p>${filme.descricao}</p>
            <button class="btn btn-card">Assistir</button>
        </div>
    `;
    card.onclick = () => {
        localStorage.setItem('filmeSelecionado', filme.titulo);
        window.location.href = 'player.html';
    };
    listaEl.appendChild(card);
});