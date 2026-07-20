const API = "https://marketingapi.adodiaz51.workers.dev/files";

console.log("🚀 app.js cargó");

async function load() {

    try {

        console.log("Consultando API...");

        const response = await fetch(API);

        console.log("Status:", response.status);

        const files = await response.json();

        console.log(files);

        const list = document.getElementById("fileList");

        list.innerHTML = "";

        let videos = 0;
        let images = 0;
        let total = 0;

        for (const file of files) {

            console.log(file);

            total += Number(file.size);

            if (file.type === "video")
                videos++;
            else
                images++;

            const div = document.createElement("div");
            div.className = "file";

            div.innerHTML = `
                <div class="left">
                    <i class="bi ${file.type === "video"
                        ? "bi-camera-reels-fill text-primary"
                        : "bi-image-fill text-success"}"></i>

                    <div class="info">
                        <h5>${file.name}</h5>
                        <small>${(Number(file.size) / 1024 / 1024).toFixed(2)} MB</small>
                    </div>
                </div>

                <div class="menu">
                    <i class="bi bi-three-dots-vertical"></i>
                </div>
            `;

            list.appendChild(div);

        }

        document.getElementById("videos").textContent = videos;
        document.getElementById("images").textContent = images;
        document.getElementById("space").textContent =
            (total / 1024 / 1024).toFixed(1) + " MB";

    } catch (e) {

        console.error(e);

        alert(e.message);

    }

}

load();
