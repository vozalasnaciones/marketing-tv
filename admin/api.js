/* ===========================
   Marketing TV CMS API
=========================== */

const API_URL = "https://marketingapi.adodiaz51.workers.dev";

/* ===========================
   Obtener archivos
=========================== */

async function getFiles() {

    try {

        const response = await fetch(`${API_URL}/files`);

        if (!response.ok) {
            throw new Error("No se pudo obtener la biblioteca.");
        }

        const files = await response.json();

        return files;

    } catch (error) {

        console.error(error);

        return [];

    }

}

/* ===========================
   Formatear tamaño
=========================== */

function formatSize(bytes) {

    if (bytes < 1024)
        return bytes + " B";

    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + " KB";

    if (bytes < 1024 * 1024 * 1024)
        return (bytes / 1024 / 1024).toFixed(1) + " MB";

    return (bytes / 1024 / 1024 / 1024).toFixed(1) + " GB";

}

/* ===========================
   Tipo de archivo
=========================== */

function getFileType(file){

    if(file.type)
        return file.type;

    const ext = file.name.split(".").pop().toLowerCase();

    if(["jpg","jpeg","png","gif","webp"].includes(ext))
        return "image";

    if(["mp4","mov","webm","avi","mkv"].includes(ext))
        return "video";

    return "file";

}
