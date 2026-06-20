// Elementos
const modalCadastro = document.getElementById('modalCadastro');
const modalRecuperar = document.getElementById('modalRecuperar');
const btnAbrirCadastro = document.getElementById('abrirCadastro');
const btnAbrirRecuperar = document.getElementById('abrirRecuperar');
const btnFechar = document.querySelectorAll('.fechar');
const toast = document.getElementById('toast');

// Abrir Modais
btnAbrirCadastro.onclick = () => modalCadastro.style.display = 'flex';
btnAbrirRecuperar.onclick = () => modalRecuperar.style.display = 'flex';

// Fechar Modais
btnFechar.forEach(btn => {
    btn.onclick = () => {
        modalCadastro.style.display = 'none';
        modalRecuperar.style.display = 'none';
    };
});

// Mostrar/Ocultar Senha
document.querySelectorAll('.btn-mostrar-senha').forEach(btn => {
    btn.onclick = function() {
        const input = this.parentElement.querySelector('input');
        input.type = input.type === 'password' ? 'text' : 'password';
    };
});

// Dark Mode
const darkModeToggle = document.getElementById('darkMode');
if(localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}
darkModeToggle.onchange = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkModeToggle.checked);
};

// TOAST NOTIFICATION
function mostrarToast(mensagem) {
    toast.textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ------------------- CADASTRO -------------------
document.getElementById('cadastroForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeCompleto').value.trim();
    const email = document.getElementById('cadastroEmail').value.trim();
    const usuario = document.getElementById('cadastroUsuario').value.trim();
    const senha = document.getElementById('cadastroSenha').value;
    const confirma = document.getElementById('confirmaSenha').value;
    const erro = document.getElementById('cadastroErro');

    erro.textContent = '';

    // Validações
    if(senha.length < 8) return erro.textContent = 'Senha deve ter pelo menos 8 caracteres';
    if(senha !== confirma) return erro.textContent = 'Senhas não coincidem';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return erro.textContent = 'E-mail inválido';

    // Salvar no LocalStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if(usuarios.some(u => u.email === email || u.usuario === usuario)) {
        return erro.textContent = 'Usuário ou e-mail já cadastrado';
    }

    usuarios.push({ nome, email, usuario, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarToast('Conta criada com sucesso!');
    modalCadastro.style.display = 'none';
    e.target.reset();
});

// ------------------- LOGIN -------------------
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;
    const lembrar = document.getElementById('lembrarUsuario').checked;
    const erro = document.getElementById('loginErro');
    const loading = document.getElementById('loginLoading');

    erro.style.display = 'none';
    loading.style.display = 'block';

    setTimeout(() => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioEncontrado = usuarios.find(u => 
            u.email === login || u.usuario === login
        );

        if(!usuarioEncontrado || usuarioEncontrado.senha !== senha) {
            loading.style.display = 'none';
            erro.textContent = 'E-mail/usuário ou senha incorretos';
            erro.style.display = 'block';
            return;
        }

        // Salvar sessão
        const usuarioLogado = { nome: usuarioEncontrado.nome, email: usuarioEncontrado.email, usuario: usuarioEncontrado.usuario };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        if(lembrar) localStorage.setItem('lembrarLogin', login);
        else localStorage.removeItem('lembrarLogin');

        window.location.href = 'profiles.html';
    }, 1200);
});

// ------------------- RECUPERAR SENHA -------------------
document.getElementById('recuperarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('recuperarEmail').value;
    mostrarToast('Um link de recuperação foi enviado para seu e-mail.');
    modalRecuperar.style.display = 'none';
    e.target.reset();
});

// Lembrar usuário
if(localStorage.getItem('lembrarLogin')) {
    document.getElementById('loginEmail').value = localStorage.getItem('lembrarLogin');
}

// Verificar se já está logado
if(localStorage.getItem('usuarioLogado')) {
    window.location.href = 'profiles.html';
}