let playlist = [];
let current = 0;
let lastPlaylist = "";

const img = document.getElementById("imageViewer");
const video = document.getElementById("videoViewer");

loadPlaylist(true);
setInterval(checkPlaylist, 15000);

async function loadPlaylist(first = false) {
    try {
        const res = await fetch("playlist.json?t=" + Date.now());

        if (!res.ok) throw new Error("No se pudo cargar playlist");

        const text = await res.text();

        if (text === lastPlaylist && !first) return;

        lastPlaylist = text;
        playlist = JSON.parse(text);

        console.log("Playlist:", playlist);

        if (first) {
            current = 0;
            playItem();
        }

    } catch (e) {
        console.error(e);
    }
}

async function checkPlaylist() {
    try {

        const res = await fetch("playlist.json?t=" + Date.now());
        const text = await res.text();

        if (text !== lastPlaylist) {
            lastPlaylist = text;
            playlist = JSON.parse(text);
            console.log("Playlist actualizada");
        }

    } catch(e){
        console.error(e);
    }
}

function playItem(){

    if(playlist.length===0) return;

    if(current>=playlist.length)
        current=0;

    const item=playlist[current];

    let file=item.file;

    if(!file.startsWith("media/"))
        file="media/"+file;

    console.log("Reproduciendo:",file);

    img.style.display="none";
    video.style.display="none";

    img.onload=null;
    img.onerror=null;

    video.onended=null;
    video.onerror=null;

    // IMAGEN

    if(item.type==="image"){

        img.src=file;
        img.style.display="block";

        img.onload=()=>{

            setTimeout(next,(item.duration||10)*1000);

        };

        img.onerror=()=>{

            console.log("Error imagen");

            next();

        };

        return;
    }

    // VIDEO

    video.style.display="block";

    video.src=file;

    video.currentTime=0;

    video.play().then(()=>{

        console.log("Video iniciado");

    }).catch(err=>{

        console.error(err);

    });

    video.onended=()=>{

        console.log("Terminó video");

        next();

    };

    video.onerror=()=>{

        console.log("Error video");

        next();

    };

}

function next(){

    current++;

    if(current>=playlist.length)
        current=0;

    playItem();

}
