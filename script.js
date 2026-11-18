
const missionarios = [
    { nome: "Missionário 01", id: "ID_DO_VIDEO_1" },
    { nome: "Missionário 02", id: "ID_DO_VIDEO_2" },
    { nome: "Missionário 03", id: "ID_DO_VIDEO_3" },
    { nome: "Missionário 04", id: "ID_DO_VIDEO_4" },
    { nome: "Missionário 05", id: "ID_DO_VIDEO_5" },
    { nome: "Missionário 06", id: "ID_DO_VIDEO_6" },
    { nome: "Missionário 07", id: "ID_DO_VIDEO_7" },
    { nome: "Missionário 08", id: "ID_DO_VIDEO_8" },
    { nome: "Missionário 09", id: "ID_DO_VIDEO_9" },
    { nome: "Missionário 10", id: "ID_DO_VIDEO_10" }
];

const catalogo = document.getElementById("catalogo");
const selecao = document.getElementById("selecao");
const areaVideo = document.getElementById("area-video");
const mensagemFinal = document.getElementById("mensagem-final");

let missionarioAtual = null;
let player = null;

// Cria os dez cartões automaticamente
missionarios.forEach((missionario) => {

    const card = document.createElement("div");
    card.className = "video-card";

    const imagem = document.createElement("img");
    imagem.src = `https://img.youtube.com/vi/${missionario.id}/hqdefault.jpg`;
    imagem.alt = missionario.nome;
    imagem.loading = "lazy";

    const titulo = document.createElement("h3");
    titulo.textContent = missionario.nome;

    card.appendChild(imagem);
    card.appendChild(titulo);

    card.addEventListener("click", () => {
        abrirVideo(missionario);
    });

    catalogo.appendChild(card);
});

// Abre o vídeo selecionado
function abrirVideo(missionario) {

    missionarioAtual = missionario;

    selecao.classList.add("oculto");
    mensagemFinal.classList.add("oculto");
    areaVideo.classList.remove("oculto");

    if (player && typeof player.destroy === "function") {
        player.destroy();
    }

    document.getElementById("player").innerHTML =
        '<div id="youtube-player"></div>';

    if (window.YT && window.YT.Player) {
        criarPlayer();
    } else {
        carregarYouTube();
    }

}

// Carrega a API oficial do YouTube
function carregarYouTube() {

    if (window.YT && window.YT.Player) {
        criarPlayer();
        return;
    }

    if (document.getElementById("youtube-api")) return;

    const tag = document.createElement("script");
    tag.id = "youtube-api";
    tag.src = "https://www.youtube.com/iframe_api";

    document.body.appendChild(tag);
}

// Cria o player e detecta o fim do vídeo
function criarPlayer() {

    if (!missionarioAtual) return;

    player = new YT.Player("youtube-player", {
        width: "100%",
        height: "100%",
        videoId: missionarioAtual.id,

        playerVars: {
            autoplay: 1,
            rel: 0,
            playsinline: 1
        },

        events: {
            onStateChange: mudarEstadoVideo
        }
    });

}

// Chamado automaticamente pela API do YouTube
window.onYouTubeIframeAPIReady = function() {
    if (missionarioAtual) {
        criarPlayer();
    }
};

// Identifica quando o vídeo termina
function mudarEstadoVideo(event) {

    if (event.data === YT.PlayerState.ENDED) {

        areaVideo.classList.add("oculto");
        mensagemFinal.classList.remove("oculto");

        document.getElementById("nome-final").textContent =
            "Agora ore por " + missionarioAtual.nome + ".";

    }

}
