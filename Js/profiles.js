/* ==========================================
   ARQUIVO: profiles.js - SELEÇÃO DE PERFIL
========================================== */

// Verifica se está logado
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "login.html";

// Seleção de perfil
const perfis = document.querySelectorAll(".profile-card");

perfis.forEach(perfil => {
    perfil.addEventListener("click", function () {
        const nomePerfil = this.dataset.profile;

        // Salva perfil escolhido
        localStorage.setItem("selectedProfile", nomePerfil);

        // Animação e redirecionamento
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 200);
    });
});

// Botão gerenciar
const btnGerenciar = document.querySelector(".manage-profiles-btn");
if (btnGerenciar) {
    btnGerenciar.addEventListener("click", () => {
        alert("Aqui você poderia editar, adicionar ou remover perfis.\nFuncionalidade de demonstração!");
    });
}

console.log("✅ Perfis carregados.");