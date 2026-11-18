
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

const catalogo = document.getElementById("catalogo");
const selecao = document.getElementById("selecao");
const areaVideo = document.getElementById("area-video");
const mensagemFinal = document.getElementById("mensagem-final");

const videoPlayer = document.getElementById("video-player");
const erroVideo = document.getElementById("erro-video");

// Criar catálogo
missionarios.forEach((missionario) => {

    const card = document.createElement("div");
    card.className = "video-card";

    const miniatura = document.createElement("div");
    miniatura.className = "miniatura";

    const play = document.createElement("span");
    play.textContent = "▶";

    miniatura.appendChild(play);

    const titulo = document.createElement("h3");
    titulo.textContent = missionario.nome;

    card.appendChild(miniatura);
    card.appendChild(titulo);

    card.addEventListener("click", () => {
        abrirVideo(missionario);
    });

    catalogo.appendChild(card);

});

// Abrir vídeo escolhido
function abrirVideo(missionario) {

    selecao.classList.add("oculto");
    mensagemFinal.classList.add("oculto");

    erroVideo.classList.add("oculto");
    areaVideo.classList.remove("oculto");

    videoPlayer.pause();

    videoPlayer.src = missionario.video;
    videoPlayer.load();

    videoPlayer.play().catch(() => {
        // Se o navegador bloquear o início automático,
        // a pessoa poderá clicar no botão de reprodução.
    });

}

// Identificar quando o vídeo terminar
videoPlayer.addEventListener("ended", () => {

    areaVideo.classList.add("oculto");

    mensagemFinal.classList.remove("oculto");

    document.getElementById("nome-final").textContent =
        "Agora ore por " + nomeMissionarioAtual + ".";

});

// Guardar o nome do missionário selecionado
let nomeMissionarioAtual = "";

const abrirVideoOriginal = abrirVideo;

