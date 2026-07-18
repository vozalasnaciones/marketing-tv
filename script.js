let playlist = [];
let current = 0;
let playlistHash = "";

const img = document.getElementById("imageViewer");
const video = document.getElementById("videoViewer");

// =============================
// CARGAR PLAYLIST
// =============================

async function updatePlaylist() {

    try {

        const response = await fetch("playlist.json?t=" + Date.now(), {
            cache: "no-store"
        });

        const text = await response.text();

        if (text !== playlistHash) {

            console.log("Nueva playlist detectada");

            playlistHash = text;

            playlist = JSON.parse(text);

            if (current >= playlist.length) {
                current = 0;
            }

            console.log(playlist);

        }

    } catch (e) {

        console.error("Error cargando playlist:", e);

    }

}

// Cargar al iniciar
updatePlaylist().then(() => {

    if (playlist.length > 0) {

        playItem();

    }

});

// Revisar cambios cada 5 segundos
setInterval(updatePlaylist, 5000);

// =============================
// REPRODUCIR
// =============================

function playItem() {

    if (playlist.length === 0) return;

    if (current >= playlist.length)
        current = 0;

    const item = playlist[current];

    if (!item) return;

    img.style.display = "none";
    video.style.display = "none";

    img.onload = null;
    img.onerror = null;

    video.oncanplay = null;
    video.onended = null;
    video.onerror = null;

    // =============================
    // IMAGEN
    // =============================

    if (item.type === "image") {

        video.pause();
        video.removeAttribute("src");
        video.load();

        img.src = item.file;

        img.style.display = "block";

        img.onload = () => {

            console.log("Imagen:", item.file);

            setTimeout(next, (item.duration || 10) * 1000);

        };

        img.onerror = () => {

            console.log("Error imagen:", item.file);

            next();

        };

        return;

    }

    // =============================
    // VIDEO
    // =============================

    video.style.display = "block";

    video.src = item.file;

    video.autoplay = true;
    video.controls = true;
    video.loop = false;
    video.playsInline = true;
    video.preload = "auto";

    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;

    video.load();

    video.oncanplay = async () => {

        try {

            await video.play();

            console.log("Video:", item.file);

        } catch (e) {

            console.log("Error play:", e);

            next();

        }

    };

    video.onended = () => {

        console.log("Finalizó:", item.file);

        next();

    };

    video.onerror = () => {

        console.log("Error video:", item.file);

        next();

    };

}

// =============================
// SIGUIENTE
// =============================

function next() {

    current++;

    if (current >= playlist.length) {

        current = 0;

    }

    playItem();

}
