// ==========================================
// ARQUIVO: landing.js
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

// FAQ
document.querySelectorAll('.faq-pergunta').forEach(btn => {
    btn.onclick = () => {
        btn.parentElement.classList.toggle('active');
    };
});