
// ======================================
// MISSIONÁRIOS E ARQUIVOS MP4
// ======================================

const missionarios = [
    {
        nome: "Ellen Gregorio",
        video: "ellen_gregorio_honduras.mp4"
    },
    {
        nome: "Missionário 02",
        video: "missionario02.mp4"
    },
    {
        nome: "Missionário 03",
        video: "missionario03.mp4"
    },
    {
        nome: "Missionário 04",
        video: "missionario04.mp4"
    },
    {
        nome: "Missionário 05",
        video: "missionario05.mp4"
    },
    {
        nome: "Missionário 06",
        video: "missionario06.mp4"
    },
    {
        nome: "Missionário 07",
        video: "missionario07.mp4"
    },
    {
        nome: "Missionário 08",
        video: "missionario08.mp4"
    },
    {
        nome: "Missionário 09",
        video: "missionario09.mp4"
    },
    {
        nome: "Missionário 10",
        video: "missionario10.mp4"
    }
];

// ======================================
// ELEMENTOS DO HTML
// ======================================

const catalogo = document.getElementById("catalogo");
const selecao = document.getElementById("selecao");
const areaVideo = document.getElementById("area-video");
const mensagemFinal = document.getElementById("mensagem-final");

const videoPlayer = document.getElementById("video-player");
const tituloVideo = document.getElementById("titulo-video");
const nomeFinal = document.getElementById("nome-final");
const erroVideo = document.getElementById("erro-video");

const botaoVoltar = document.getElementById("voltar");
const botaoVoltarFinal = document.getElementById("voltar-final");

let missionarioAtual = null;

// ======================================
// CRIAR OS 10 CARTÕES
// ======================================

function criarCatalogo() {

    catalogo.innerHTML = "";

    missionarios.forEach((missionario) => {

        const card = document.createElement("article");
        card.className = "video-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        const miniatura = document.createElement("div");
        miniatura.className = "miniatura";

        const play = document.createElement("span");
        play.className = "botao-play";
        play.textContent = "▶";

        miniatura.appendChild(play);

        const titulo = document.createElement("h3");
        titulo.textContent = missionario.nome;

        card.appendChild(miniatura);
        card.appendChild(titulo);

        card.addEventListener("click", () => {
            abrirVideo(missionario);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                abrirVideo(missionario);
            }
        });

        catalogo.appendChild(card);

    });

}

// ======================================
// ABRIR VÍDEO SELECIONADO
// ======================================

function abrirVideo(missionario) {

    missionarioAtual = missionario;

    // Esconder outras telas
    selecao.classList.add("oculto");
    mensagemFinal.classList.add("oculto");

    // Mostrar player
    areaVideo.classList.remove("oculto");

    tituloVideo.textContent = missionario.nome;

    erroVideo.classList.add("oculto");

    // Limpar vídeo anterior
    videoPlayer.pause();
    videoPlayer.removeAttribute("src");

    // Caminho do MP4 na raiz do repositório
    videoPlayer.src = missionario.video;

    videoPlayer.load();

    // Tentar iniciar automaticamente
    videoPlayer.play().catch(() => {
        // Se o navegador bloquear o autoplay,
        // o usuário poderá clicar no botão Play.
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ======================================
// VOLTAR AO CATÁLOGO
// ======================================

function voltarAoCatalogo() {

    videoPlayer.pause();

    videoPlayer.removeAttribute("src");
    videoPlayer.load();

    missionarioAtual = null;

    areaVideo.classList.add("oculto");
    mensagemFinal.classList.add("oculto");

    selecao.classList.remove("oculto");

    erroVideo.classList.add("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

botaoVoltar.addEventListener("click", voltarAoCatalogo);

botaoVoltarFinal.addEventListener("click", voltarAoCatalogo);

// ======================================
// QUANDO O VÍDEO TERMINAR
// ======================================

videoPlayer.addEventListener("ended", () => {

    if (!missionarioAtual) return;

    areaVideo.classList.add("oculto");

    mensagemFinal.classList.remove("oculto");

    nomeFinal.textContent =
        "Agora ore por " + missionarioAtual.nome + ".";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ======================================
// IDENTIFICAR ERRO NO VÍDEO
// ======================================

videoPlayer.addEventListener("error", () => {

    erroVideo.classList.remove("oculto");

    console.error(
        "Erro ao carregar o vídeo:",
        missionarioAtual?.video,
        videoPlayer.error
    );

});

// Esconder aviso quando o vídeo estiver pronto
videoPlayer.addEventListener("canplay", () => {

    erroVideo.classList.add("oculto");

});

// ======================================
// INICIAR SITE
// ======================================

criarCatalogo();
