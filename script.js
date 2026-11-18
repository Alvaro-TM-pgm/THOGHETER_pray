
const missionarios = [
    {
        nome: "Ellen Gregorio",
        video: "ellen_gregorio_honduras.mp4"
    }
];

// ELEMENTOS
const catalogo = document.getElementById("catalogo");
const selecao = document.getElementById("selecao");
const areaVideo = document.getElementById("area-video");
const mensagemFinal = document.getElementById("mensagem-final");

const videoPlayer = document.getElementById("video-player");
const erroVideo = document.getElementById("erro-video");

// CRIAR CATÁLOGO
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

// ABRIR VÍDEO
function abrirVideo(missionario) {

    selecao.classList.add("oculto");
    mensagemFinal.classList.add("oculto");

    areaVideo.classList.remove("oculto");
    erroVideo.classList.add("oculto");

    document.getElementById("titulo-video").textContent =
        missionario.nome;

    videoPlayer.pause();

    videoPlayer.src = missionario.video;
    videoPlayer.load();

    videoPlayer.play().catch(() => {
        // A pessoa poderá apertar PLAY manualmente.
    });

}

// VOLTAR AO CATÁLOGO
document.getElementById("voltar").addEventListener("click", () => {

    videoPlayer.pause();
    videoPlayer.removeAttribute("src");
    videoPlayer.load();

    areaVideo.classList.add("oculto");
    mensagemFinal.classList.add("oculto");
    selecao.classList.remove("oculto");

});

// VÍDEO FINALIZADO
videoPlayer.addEventListener("ended", () => {

    areaVideo.classList.add("oculto");
    mensagemFinal.classList.remove("oculto");

    document.getElementById("nome-final").textContent =
        "Agora ore por " + missionarioAtual.nome + ".";

});

// ERRO DE CARREGAMENTO
videoPlayer.addEventListener("error", () => {

    erroVideo.classList.remove("oculto");

});

// GUARDAR MISSIONÁRIO ATUAL
let missionarioAtual = null;

const abrirVideoOriginal = abrirVideo;

// Atualizar a seleção antes de iniciar o vídeo
function selecionarMissionario(missionario) {
    missionarioAtual = missionario;
    abrirVideo(missionario);
}

// Associar os cartões à função correta
catalogo.innerHTML = "";

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
        selecionarMissionario(missionario);
    });

    catalogo.appendChild(card);

});
