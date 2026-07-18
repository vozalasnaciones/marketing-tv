let playlist = [];
let current = 0;
let lastPlaylist = "";

const img = document.getElementById("imageViewer");
const video = document.getElementById("videoViewer");

// Cargar playlist inicial
loadPlaylist(true);

// Revisar cambios cada 15 segundos
setInterval(checkPlaylist, 15000);

async function loadPlaylist(firstLoad = false) {

    try {

        const response = await fetch("playlist.json?t=" + Date.now());

        if (!response.ok) {
            throw new Error("No se pudo cargar playlist.json");
        }

        const text = await response.text();

        if (text === lastPlaylist && !firstLoad) return;

        lastPlaylist = text;

        playlist = JSON.parse(text);

        console.log("Playlist cargada:", playlist);

        if (firstLoad) {
            current = 0;
            playItem();
        }

    } catch (err) {

        console.error(err);

    }

}

async function checkPlaylist() {

    try {

        const response = await fetch("playlist.json?t=" + Date.now());

        const text = await response.text();

        if (text !== lastPlaylist) {

            console.log("Nueva playlist detectada");

            lastPlaylist = text;

            playlist = JSON.parse(text);

        }

    } catch (err) {

        console.error(err);

    }

}

function playItem() {

    if (playlist.length === 0) return;

    if (current >= playlist.length) {
        current = 0;
    }

    const item = playlist[current];

    // Ocultar todo
    img.style.display = "none";
    video.style.display = "none";

    // Limpiar video
    video.pause();
    video.removeAttribute("src");
    video.load();

    let file = item.file;

    // Si el workflow olvidó agregar "media/", lo agregamos
    if (!file.startsWith("media/")) {
        file = "media/" + file;
    }

    console.log("Reproduciendo:", file);

    // ---------------- IMAGEN ----------------

    if (item.type === "image") {

        img.onload = null;
        img.onerror = null;

        img.src = file;
        img.style.display = "block";

        img.onload = () => {

            console.log("Imagen cargada");

            setTimeout(next, (item.duration || 10) * 1000);

        };

        img.onerror = () => {

            console.error("No se pudo cargar imagen:", file);

            next();

        };

    }

    // ---------------- VIDEO ----------------

    else if (item.type === "video") {

        video.onloadeddata = null;
        video.onended = null;
        video.onerror = null;

        video.src = file;

        video.style.display = "block";

        video.autoplay = true;
        video.controls = false;
        video.loop = false;
        video.playsInline = true;
        video.preload = "auto";
        video.muted = false;
        video.defaultMuted = false;
        video.volume = 1;

        video.load();

        video.onloadeddata = () => {

            console.log("Video cargado:", file);

            video.play()
                .then(() => {

                    console.log("Video reproduciéndose");

                })
                .catch(err => {

                    console.error("Error al reproducir:", err);

                    next();

                });

        };

        video.onended = () => {

            console.log("Video finalizado");

            next();

        };

        video.onerror = (e) => {

            console.error("Error cargando video:", file, e);

            next();

        };

    }

}

function next() {

    current++;

    if (current >= playlist.length) {
        current = 0;
    }

    playItem();

}
