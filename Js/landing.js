/* ==========================================
   ARQUIVO: landing.js - PÁGINA INICIAL
   Funções: Efeitos visuais, animações e interações
========================================== */

console.log("✅ Netflix Landing carregada com sucesso.");

/* ===================
   EFEITOS DE ROLAGEM
=================== */
// Altera estilo do cabeçalho ao rolar a página
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 80) {
        header.style.background = "rgba(0, 0, 0, 0.95)";
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    } else {
        header.style.background = "transparent";
        header.style.boxShadow = "none";
    }
});

/* ===================
   ANIMAÇÃO DE ENTRADA
=================== */
// Anima os cards de filmes aparecendo ao carregar
document.addEventListener("DOMContentLoaded", () => {
    const movieCards = document.querySelectorAll(".movie-card");

    movieCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.4s ease";

        // Atraso escalonado para cada card
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 100 * (index + 1));
    });
});