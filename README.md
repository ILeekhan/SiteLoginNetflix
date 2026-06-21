# 🎬 Netflix Clone - Projeto de Estudo Front-end

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=flat-square)](https://ileekhan.github.io/SiteLoginNetflix/dashboard.html)
[![Status](https://img.shields.io/badge/Status-Concluído%20%7C%20Em%20Melhorias-brightgreen?style=flat-square)]()

> Projeto desenvolvido com o objetivo de praticar e demonstrar habilidades em **Desenvolvimento Web Front-end**, simulando a interface, navegação e funcionalidades principais da plataforma Netflix.  
> Criado por **Hian Leekhan** — Estudante de Desenvolvimento, em busca de oportunidades de **Estágio** ou vaga de **Desenvolvedor Júnior**.

---

## 📌 Visão Geral
Este projeto é uma réplica funcional da página inicial da Netflix, construída do zero utilizando apenas **HTML, CSS e JavaScript puro**, sem frameworks ou bibliotecas externas. O foco principal foi aplicar boas práticas de organização de código, semântica, responsividade e lógica de programação, resolvendo problemas reais de interface e usabilidade.

### ✨ Funcionalidades Implementadas
- ✅ Sistema completo de **Cadastro e Login** com armazenamento local (`localStorage`)
- ✅ Seleção de Perfis de Usuário
- ✅ Banner rotativo automático (troca a cada 6s) com imagens otimizadas e sem distorção
- ✅ Catálogo dinâmico com seções: *Em Alta, Continuar Assistindo, Minha Lista, Assistidos Recentemente*
- ✅ Barra de busca em tempo real
- ✅ Modal com detalhes do conteúdo
- ✅ Página de reprodução de vídeo
- ✅ Alternância entre **Modo Escuro e Modo Claro**
- ✅ Layout 100% Responsivo (adaptado para celular, tablet e desktop)
- ✅ Navegação funcional e menu de perfil com botão "Sair" 100% operacional

---

## 🛠️ Tecnologias e Conceitos Aplicados
| Tecnologia | Uso no Projeto |
|---|---|
| **HTML5** | Estruturação semântica das páginas, acessibilidade e organização do conteúdo |
| **CSS3** | Estilização avançada, Flexbox, Grid, animações, transições, `background-size`, `object-fit` e responsividade |
| **JavaScript (ES6)** | Manipulação do DOM, eventos, arrays, funções, lógica de negócio e armazenamento de dados |
| **LocalStorage** | Persistência de dados de usuário, preferências e estado da aplicação |
| **Git / GitHub** | Controle de versão e publicação do projeto via GitHub Pages |

> 📚 **Conceitos demonstrados:** Separação de responsabilidades (Estrutura / Estilo / Comportamento), modularização de arquivos, tratamento de erros, otimização de imagens e experiência do usuário.

---

## 📂 Estrutura Completa de Arquivos
*Organização feita por tipo de arquivo e responsabilidade, facilitando manutenção e escalabilidade — ponto muito valorizado por equipes de desenvolvimento.*


📦 SiteLoginNetflix
┣ 📂 assets/ # Recursos estáticos do sistema
┃ ┣ 📂 avatars/ # Imagens de perfil dos usuários
┃ ┃ ┗ 📄 [imagens de perfil]
┃ ┣ 📂 images/ # Capas, banners e ilustrações do catálogo
┃ ┃ ┣ 📄 Dark.png
┃ ┃ ┣ 📄 StrangerThings.png
┃ ┃ ┣ 📄 TheWitcher.png
┃ ┃ ┗ 📄 Wandinha.png
┃ ┗ 📂 videos/ # Diretório reservado para arquivos de vídeo (estrutura preparada)
┣ 📂 CSS/ # Estilização - separada por página/funcionalidade
┃ ┣ 📄 style.css # 🔹 Arquivo global: reset, variáveis de cores, fontes e estilos compartilhados
┃ ┣ 📄 login.css # Estilos exclusivos da tela de autenticação
┃ ┣ 📄 landing.css # Estilos da página de apresentação inicial
┃ ┣ 📄 profiles.css # Estilos da tela de seleção de perfis
┃ ┣ 📄 dashboard.css # 🔹 Principal: layout da página inicial, banners, cards, navegação e responsividade
┃ ┗ 📄 player.css # Estilos da página de reprodução de vídeo
┣ 📂 Js/ # Lógica e interações - modularizada por função
┃ ┣ 📄 auth.js # 🔐 Autenticação: cadastro, validação, login, sessão e segurança
┃ ┣ 📄 landing.js # Animações e interações da página de entrada
┃ ┣ 📄 profiles.js # Gerenciamento de perfis: criação, seleção e salvamento
┃ ┣ 📄 dashboard.js # 🚀 Núcleo do projeto: banner rotativo, carregamento de catálogo, busca, eventos e correções de layout
┃ ┗ 📄 player.js # Controle da página de vídeo: carregamento de conteúdo e integração com mídia
┣ 📄 index.html # Página inicial / Entrada
┣ 📄 login.html # Tela de login de conta
┣ 📄 profiles.html # Seleção de perfil do usuário
┣ 📄 dashboard.html # 📺 Página principal: catálogo, navegação e conteúdo
┣ 📄 player.html # Página de reprodução de vídeo
┗ 📄 README.md # Este arquivo - documentação técnica e descritiva

---

## 📝 Detalhamento de Cada Arquivo

### 📁 `assets/`
Pasta centralizada para todos os recursos visuais e de mídia. Organizada para evitar caminhos quebrados e facilitar substituição/adição de conteúdo.

- **`avatars/`**  
  Armazena ícones de perfil. Usados na tela de seleção e no menu superior. Demonstra uso de imagens dinâmicas e elementos de interface.

- **`images/`**  
  Contém capas e banners otimizados. Todos ajustados para manter proporção e resolução, sem distorção, ocupando 100% da largura da tela.

- **`videos/`**  
  Estrutura preparada para futura implementação de arquivos de vídeo próprios.

---

### 📁 `CSS/`
Separação de estilos por página, evitando conflitos e mantendo o código limpo.

- **`style.css`**  
  Arquivo base. Define cores padrão (`#E50914`, `#141414`), fontes, reset de margens e elementos que se repetem em todas as páginas. *Boas prática: reutilização de código.*

- **`login.css`**  
  Foca na usabilidade do formulário: campos bem espaçados, feedback visual, alinhamento centralizado e responsividade.

- **`dashboard.css`**  
  O arquivo mais completo. Contém:
  - Regras para o banner principal (`background-size: 100% auto` → imagem estendida, proporcional e nítida)
  - Estilo dos carrosséis e cards (efeito de escala ao passar o mouse)
  - Comportamento da barra de navegação (muda de cor ao rolar a página)
  - Suporte completo ao modo escuro/claro
  - Ajustes finos para não quebrar em telas pequenas

- **`player.css` / `profiles.css` / `landing.css`**  
  Estilos específicos, focados na experiência única de cada tela.

---

### 📁 `Js/`
Lógica totalmente separada da estrutura, seguindo o princípio de responsabilidade única.

- **`auth.js`**  
  Controla todo o fluxo de acesso:
  - Valida se os campos estão preenchidos corretamente
  - Salva usuário no `localStorage`
  - Verifica se já está logado para redirecionar automaticamente
  - Função de sair (corrigida para ser 100% clicável)

- **`dashboard.js`**  
  O coração do projeto. Aqui está:
  - **`trocarBanner()`**: Função que troca a imagem automaticamente, com pré-carregamento para não travar
  - Renderização dinâmica dos cards a partir de um array de objetos
  - Sistema de busca: filtra títulos em tempo real conforme digita
  - Correções aplicadas: resolução de erro 404 nas imagens, ajuste de caminhos e z-index para menus
  - Controle de exibição de seções

- **`profiles.js` / `player.js` / `landing.js`**  
  Códigos enxutos, cuidando apenas da função daquela página específica.

---

### 📄 Arquivos HTML
Cada arquivo representa uma visualização única. Utilizo tags semânticas (`<header>`, `<section>`, `<nav>`, `<footer>`) para melhorar acessibilidade e organização. Todos ligados corretamente aos arquivos de estilo e script.

---

## ✅ O Que Este Projeto Demonstra Para Um Recrutador
1. **Organização:** Estrutura de pastas lógica e documentada — mostra que penso na equipe e na manutenção do código.
2. **Resolução de Problemas:** Capacidade de identificar erros (ex: imagens não carregando, botão não clicável) e corrigi-los com soluções técnicas adequadas.
3. **Atenção ao Detalhe:** Preocupação com resolução de imagem, proporção, alinhamento e experiência visual.
4. **Conhecimento Técnico:** Domínio dos três pilares da web: estrutura, estilo e lógica.
5. **Proatividade:** Implementação de funcionalidades extras como modo escuro, busca e responsividade.

---

## 🚀 Como Executar o Projeto
1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` no navegador
3. Faça um cadastro rápido para acessar
4. Ou acesse diretamente a versão publicada:  
   🔗 **https://ileekhan.github.io/SiteLoginNetflix/dashboard.html**

---

## 📈 Melhorias Futuras Planejadas
- [ ] Implementação de sistema de favoritos persistente
- [ ] Categorias dinâmicas (Ação, Comédia, Terror, etc.)
- [ ] Paginação e carregamento infinito
- [ ] Integração com API real de filmes
- [ ] Animações mais elaboradas na entrada do conteúdo

---

> *Projeto desenvolvido para fins educacionais e de portfólio. Todos os direitos de marca e imagem são reservados à Netflix.*

---

## 🧠 Guia de Comandos Git Utilizados
> Para versionar, atualizar e publicar este projeto, foram utilizados os comandos abaixo. Essa é a sequência padrão de trabalho para manter o código sempre salvo e atualizado no repositório.

### 🔹 Verificar o que foi alterado
Mostra quais arquivos foram modificados, adicionados ou excluídos.
```bash

✅ Agora é só atualizar:

```bash

git add README.md
git commit -m "Adiciona seção de comandos Git e finaliza documentação profissional"
git push origin main