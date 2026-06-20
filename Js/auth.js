// ==========================================
// ARQUIVO: auth.js
// AUTENTICAÇÃO E MODO ESCURO/CLARO
// ==========================================

// Elementos
const loginForm = document.getElementById('loginForm');
const cadastroForm = document.getElementById('cadastroForm');
const recuperarForm = document.getElementById('recuperarForm');
const modalCadastro = document.getElementById('modalCadastro');
const modalRecuperar = document.getElementById('modalRecuperar');
const btnAbrirCadastro = document.getElementById('abrirCadastro');
const btnAbrirRecuperar = document.getElementById('abrirRecuperar');
const btnFechar = document.querySelectorAll('.fechar');
const darkModeToggle = document.getElementById('darkMode');
const btnMostrarSenha = document.querySelector('.btn-mostrar-senha');

// ✅ FUNÇÃO: Aplicar modo escuro/claro
function aplicarModoEscuro(ativar) {
    if (ativar) {
        document.body.classList.add('modo-escuro');
        localStorage.setItem('modoEscuro', 'ativado');
        darkModeToggle.checked = true;
    } else {
        document.body.classList.remove('modo-escuro');
        localStorage.setItem('modoEscuro', 'desativado');
        darkModeToggle.checked = false;
    }
}

// ✅ CARREGAR PREFERÊNCIA SALVA AO ABRIR A PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    const preferencia = localStorage.getItem('modoEscuro');
    if (preferencia === 'ativado') {
        aplicarModoEscuro(true);
    } else {
        aplicarModoEscuro(false);
    }
});

// ✅ ALTERAR QUANDO CLICAR NO BOTÃO
darkModeToggle.addEventListener('change', () => {
    aplicarModoEscuro(darkModeToggle.checked);
});

// Mostrar / Ocultar senha
btnMostrarSenha.addEventListener('click', () => {
    const inputSenha = document.getElementById('loginSenha');
    inputSenha.type = inputSenha.type === 'password' ? 'text' : 'password';
});

// Abrir / Fechar Modais
btnAbrirCadastro.onclick = () => modalCadastro.style.display = 'flex';
btnAbrirRecuperar.onclick = () => modalRecuperar.style.display = 'flex';
btnFechar.forEach(btn => btn.onclick = () => {
    modalCadastro.style.display = 'none';
    modalRecuperar.style.display = 'none';
});

// Fechar ao clicar fora
window.onclick = (e) => {
    if (e.target === modalCadastro) modalCadastro.style.display = 'none';
    if (e.target === modalRecuperar) modalRecuperar.style.display = 'none';
};

// LOGIN
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();
    const erroEl = document.getElementById('loginErro');
    const loadingEl = document.getElementById('loginLoading');

    erroEl.style.display = 'none';
    loadingEl.style.display = 'block';

    const usuarios = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
    const usuarioEncontrado = usuarios.find(u => (u.email === email || u.usuario === email) && u.senha === senha);

    setTimeout(() => {
        loadingEl.style.display = 'none';
        if (usuarioEncontrado) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            window.location.href = 'profiles.html';
        } else {
            erroEl.textContent = 'E-mail/usuário ou senha incorretos.';
            erroEl.style.display = 'block';
        }
    }, 1000);
};

// CADASTRO
cadastroForm.onsubmit = (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeCompleto').value.trim();
    const email = document.getElementById('cadastroEmail').value.trim();
    const usuario = document.getElementById('cadastroUsuario').value.trim();
    const senha = document.getElementById('cadastroSenha').value.trim();
    const confirma = document.getElementById('confirmaSenha').value.trim();
    const erroEl = document.getElementById('cadastroErro');

    erroEl.textContent = '';

    if (senha !== confirma) return erroEl.textContent = 'As senhas não coincidem.';
    if (senha.length < 8) return erroEl.textContent = 'Senha deve ter pelo menos 8 caracteres.';

    const todosUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
    const existe = todosUsuarios.some(u => u.email === email || u.usuario === usuario);
    if (existe) return erroEl.textContent = 'E-mail ou usuário já cadastrado.';

    todosUsuarios.push({ nome, email, usuario, senha });
    localStorage.setItem('usuariosCadastrados', JSON.stringify(todosUsuarios));

    mostrarToast('Conta criada com sucesso!');
    modalCadastro.style.display = 'none';
    cadastroForm.reset();
};

// RECUPERAR SENHA
recuperarForm.onsubmit = (e) => {
    e.preventDefault();
    mostrarToast('Se existir conta, enviaremos instruções.');
    modalRecuperar.style.display = 'none';
    recuperarForm.reset();
};

// TOAST
function mostrarToast(texto) {
    const toast = document.getElementById('toast');
    toast.textContent = texto;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}