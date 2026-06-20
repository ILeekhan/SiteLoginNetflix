// Verificar se está logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado) window.location.href = 'login.html';

// Mostrar inicial do nome
document.getElementById('inicialUsuario').textContent = usuarioLogado.nome.charAt(0).toUpperCase();

// Selecionar perfil
document.querySelectorAll('.card-perfil').forEach(card => {
    card.onclick = () => {
        localStorage.setItem('perfilAtivo', card.dataset.perfil);
        window.location.href = 'dashboard.html';
    };
});

// ✅ Botão SAIR DA CONTA funcional
document.getElementById('btnSairConta').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('perfilAtivo');
    window.location.href = 'login.html';
});

// ✅ Botão GERENCIAR PERFIS corrigido
document.getElementById('btnGerenciar').addEventListener('click', () => {
    alert("Função: Gerenciar perfis - em desenvolvimento!");
    // Se quiser voltar para login: window.location.href = 'login.html';
});