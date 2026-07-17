let playlist = [];
let current = 0;

const img = document.getElementById("imageViewer");
const video = document.getElementById("videoViewer");

fetch("playlist.json")
    .then(response => response.json())
    .then(data => {
        playlist = data;

        if (playlist.length > 0) {
            playItem();
        }
    })
    .catch(error => {
        console.error("Error cargando playlist:", error);
    });

function playItem() {

    const item = playlist[current];

    if (!item) return;

    // Ocultar ambos
    img.style.display = "none";
    video.style.display = "none";

    // ---------- IMAGEN ----------
    if (item.type === "image") {

        video.pause();
        video.removeAttribute("src");
        video.load();

        img.src = item.file;
        img.style.display = "block";

        img.onload = () => {
            setTimeout(next, (item.duration || 10) * 1000);
        };

        img.onerror = () => {
            console.log("No se pudo cargar:", item.file);
            next();
        };
    }

    // ---------- VIDEO ----------
    else if (item.type === "video") {

        img.style.display = "none";

        video.style.display = "block";
        video.src = item.file;

        video.autoplay = true;
        video.controls = true;
        video.loop = false;
        video.playsInline = true;
        video.muted = false;
        video.defaultMuted = false;
        video.volume = 1.0;

        video.load();

        video.oncanplay = () => {
            video.play()
                .then(() => {
                    console.log("Video reproduciéndose");
                })
                .catch(err => {
                    console.log("Error:", err);
                });
        };

        video.onended = () => {
            next();
        };

        video.onerror = () => {
            console.log("Error al reproducir video");
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
