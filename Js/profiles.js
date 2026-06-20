/* ==========================================
   ARQUIVO: profiles.js - SELEÇÃO DE PERFIL
   Funções: Escolher perfil do usuário, controle de acesso
========================================== */

/* ===================
   VERIFICAÇÃO DE ACESSO
=================== */
// Se não estiver logado, volta para a página de login
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    window.location.href = "login.html";
}

/* ===================
   SELEÇÃO DE PERFIL
=================== */
const perfis = document.querySelectorAll(".profile-card");

perfis.forEach(perfil => {
    perfil.addEventListener("click", function () {
        // Pega o nome do perfil clicado
        const nomePerfil = this.dataset.profile;

        // Salva qual perfil foi escolhido para usar no Dashboard
        localStorage.setItem("selectedProfile", nomePerfil);

        // Feedback visual (igual ao efeito da Netflix)
        this.style.opacity = "0.7";
        this.style.transform = "scale(0.98)";

        // Redireciona após pequena animação
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 150);
    });
});

/* ===================
   BOTÃO GERENCIAR PERFIS
=================== */
const btnGerenciar = document.querySelector(".manage-profiles-btn");

if (btnGerenciar) {
    btnGerenciar.addEventListener("click", () => {
        // Simulação da funcionalidade (em projeto real abriria um modal)
        alert("⚙️ Gerenciar Perfis\n\nAqui você poderia adicionar, editar ou remover perfis.\n\n*Funcionalidade de demonstração para portfólio.");
    });
}

console.log("✅ Página de perfis carregada com sucesso.");