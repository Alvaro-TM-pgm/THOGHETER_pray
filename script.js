
const grid = document.getElementById("videoGrid");
const counter = document.getElementById("counter");
const setupNote = document.getElementById("setupNote");

const modal = document.getElementById("playerModal");
const video = document.getElementById("missionaryVideo");
const title = document.getElementById("playerTitle");

const thankYou = document.getElementById("thankYou");
const watchHint = document.querySelector(".watch-hint");

const missionaries = Array.from({ length: 10 }, (_, i) => ({
    name: `Missionário ${String(i + 1).padStart(2, "0")}`,
    file: null,
    url: null
}));

function render() {
    grid.innerHTML = "";

    missionaries.forEach((person, index) => {
        const card = document.createElement("article");
        card.className = "video-card";

        const number = document.createElement("div");
        number.className = "video-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const info = document.createElement("div");
        info.className = "card-info";

        const name = document.createElement("strong");
        name.textContent = person.name;

        const status = document.createElement("small");
        status.textContent = person.file
            ? person.file.name
            : "Nenhum vídeo selecionado";

        info.append(name, status);

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const choose = document.createElement("button");
        choose.className = "edit-button";
        choose.textContent = person.file
            ? "Trocar vídeo"
            : "Adicionar vídeo";

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "video/*";
        input.className = "file-input";

        choose.addEventListener("click", () => input.click());

        input.addEventListener("change", () => {
            const file = input.files[0];

            if (!file) return;

            if (person.url) {
                URL.revokeObjectURL(person.url);
            }

            person.file = file;
            person.url = URL.createObjectURL(file);

            render();
        });

        const play = document.createElement("button");
        play.className = "card-button";
        play.textContent = "▶ Assistir";
        play.disabled = !person.file;

        play.addEventListener("click", () => {
            openPlayer(index);
        });

        actions.append(choose, play, input);
        card.append(number, info, actions);

        grid.append(card);
    });

    const count = missionaries.filter(m => m.file).length;

    counter.textContent = `${count}/10 vídeos adicionados`;

    setupNote.style.display = count === 10 ? "none" : "flex";
}

function openPlayer(index) {
    const person = missionaries[index];

    title.textContent = person.name;

    thankYou.hidden = true;
    watchHint.hidden = false;
    video.style.display = "block";

    video.pause();
    video.src = person.url;
    video.load();

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    const attempt = video.play();

    if (attempt) {
        attempt.catch(() => {
            // O visitante poderá iniciar pelo botão de reprodução.
        });
    }
}

function closePlayer() {
    video.pause();
    video.removeAttribute("src");
    video.load();

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

video.addEventListener("ended", () => {
    watchHint.hidden = true;
    thankYou.hidden = false;
});

document.getElementById("closePlayer")
    .addEventListener("click", closePlayer);

document.getElementById("backToList")
    .addEventListener("click", closePlayer);

modal.addEventListener("click", event => {
    if (event.target.dataset.close) {
        closePlayer();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
        closePlayer();
    }
});

render();
