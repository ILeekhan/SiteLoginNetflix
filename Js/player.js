// ✅ CARREGAR MODO ESCURO
window.addEventListener('DOMContentLoaded', () => {
    const modo = localStorage.getItem('modoEscuro');
    if (modo === 'ativado') document.body.classList.add('modo-escuro');
});

// Verificar login
if (!localStorage.getItem('usuarioLogado')) window.location.href = 'login.html';

// Pegar dados do filme selecionado
const filme = JSON.parse(localStorage.getItem('filmeSelecionado'));
if (!filme) window.location.href = 'dashboard.html';

// Preencher dados
document.getElementById('tituloVideo').textContent = filme.titulo;
document.getElementById('descricaoVideo').textContent = filme.descricao;

// ✅ CORRIGIDO: URL compatível sem erro 153
document.getElementById('iframeVideo').src = filme.videoUrl + "&autoplay=1&modestbranding=1&showinfo=0";