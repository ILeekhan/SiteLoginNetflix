/* ==========================================
   ARQUIVO: auth.js - SISTEMA DE AUTENTICAÇÃO
   Funções: Login, Cadastro, Recuperação, Modais
========================================== */

const message = document.getElementById("message");

/* =====================
   ELEMENTOS DOS MODAIS
===================== */
const registerModal = document.getElementById("registerModal");
const recoveryModal = document.getElementById("recoveryModal");
const openRegister = document.getElementById("openRegister");
const closeRegister = document.getElementById("closeRegister");
const openRecovery = document.getElementById("openRecovery");
const closeRecovery = document.getElementById("closeRecovery");

/* =====================
   ABRIR / FECHAR MODAIS
===================== */
openRegister.addEventListener("click", () => {
    registerModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Trava rolagem quando modal abre
});

closeRegister.addEventListener("click", () => {
    registerModal.style.display = "none";
    document.body.style.overflow = "auto"; // Libera rolagem
    resetRegisterForm(); // Limpa campos ao fechar
});

openRecovery.addEventListener("click", () => {
    recoveryModal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

closeRecovery.addEventListener("click", () => {
    recoveryModal.style.display = "none";
    document.body.style.overflow = "auto";
    resetRecoveryForm();
});

// Clica fora do modal para fechar
window.addEventListener("click", (e) => {
    if (e.target === registerModal) {
        registerModal.style.display = "none";
        document.body.style.overflow = "auto";
        resetRegisterForm();
    }
    if (e.target === recoveryModal) {
        recoveryModal.style.display = "none";
        document.body.style.overflow = "auto";
        resetRecoveryForm();
    }
});

// Fecha com tecla ESC
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        registerModal.style.display = "none";
        recoveryModal.style.display = "none";
        document.body.style.overflow = "auto";
        resetRegisterForm();
        resetRecoveryForm();
    }
});

/* =====================
   MOSTRAR / ESCONDER SENHA
===================== */
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    // Troca ícone para melhor feedback
    togglePassword.textContent = isPassword ? "🙈" : "👁";
    togglePassword.setAttribute("aria-label",
        isPassword ? "Ocultar senha" : "Mostrar senha"
    );
});

// Mostrar/ocultar também nos campos de senha do cadastro
const registerPassword = document.getElementById("registerPassword");
const registerConfirm = document.getElementById("registerConfirmPassword");

// Se quiser, pode adicionar botão de olho também no cadastro — já deixei preparado no HTML

/* =====================
   FUNÇÕES AUXILIARES
===================== */
function showMessage(text, type = "error") {
    message.textContent = text;
    message.className = `message-box ${type}`;
    // Limpa mensagem após 4s
    setTimeout(() => {
        message.textContent = "";
        message.className = "message-box";
    }, 4000);
}

function resetRegisterForm() {
    document.getElementById("registerForm").reset();
}

function resetRecoveryForm() {
    document.getElementById("recoveryForm").reset();
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* =====================
   LOGIN DO USUÁRIO
===================== */
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validação básica
    if (!email || !password) {
        showMessage("Preencha todos os campos.");
        return;
    }

    if (!validarEmail(email)) {
        showMessage("Digite um e-mail válido.");
        return;
    }

    // Pega usuários salvos
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Salva usuário logado
        localStorage.setItem("currentUser", JSON.stringify({
            id: user.email,
            name: user.name,
            email: user.email
        }));

        // Feedback e redirecionamento
        showMessage(`Bem-vindo(a), ${user.name}!`, "success");

        setTimeout(() => {
            window.location.href = "profiles.html";
        }, 800);

    } else {
        showMessage("E-mail ou senha inválidos. Verifique seus dados.");
        passwordInput.value = ""; // Limpa senha errada
    }
});

/* =====================
   CADASTRO DE NOVO USUÁRIO
===================== */
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("registerConfirmPassword").value;

    // Validações
    if (!name || !email || !password || !confirm) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    if (name.length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres.");
        return;
    }

    if (!validarEmail(email)) {
        alert("Digite um endereço de e-mail válido.");
        return;
    }

    if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (password !== confirm) {
        alert("As senhas não coincidem. Digite novamente.");
        return;
    }

    // Verifica se já existe
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(u => u.email === email);

    if (exists) {
        alert("Este e-mail já está cadastrado. Tente fazer login.");
        return;
    }

    // Salva novo usuário
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Conta criada com sucesso! Agora você pode entrar.");

    // Fecha modal e limpa formulário
    registerModal.style.display = "none";
    document.body.style.overflow = "auto";
    resetRegisterForm();
});

/* =====================
   RECUPERAÇÃO DE SENHA
===================== */
document.getElementById("recoveryForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector("input[type='email']").value.trim();

    if (!validarEmail(email)) {
        alert("Digite um e-mail válido para continuar.");
        return;
    }

    // Simulação (em projeto real enviaria e-mail)
    alert(`📧 Enviamos as instruções de recuperação para ${email}.\n\n*Funcionalidade de demonstração para portfólio.`);

    recoveryModal.style.display = "none";
    document.body.style.overflow = "auto";
    resetRecoveryForm();
});