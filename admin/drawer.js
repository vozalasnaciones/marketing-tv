let selectedFile = null;

function openDrawer(file){

    selectedFile = file;

    const drawer = document.getElementById("drawer");

    drawer.classList.add("open");

    renderDrawer();

}

function closeDrawer(){

    document.getElementById("drawer").classList.remove("open");

}

function renderDrawer(){

    const file = selectedFile;

    if(!file) return;

    const type = getFileType(file);

    let preview = "";

    if(type==="image"){

        preview = `<img src="${file.download}" class="drawer-preview">`;

    }else{

        preview = `
            <video
                src="${file.download}"
                controls
                class="drawer-preview">
            </video>
        `;

    }

    document.getElementById("drawer").innerHTML = `

        <div class="drawer-header">

            <h3>Detalles</h3>

            <button onclick="closeDrawer()">✕</button>

        </div>

        ${preview}

        <div class="drawer-info">

            <b>Nombre</b>

            <p>${file.name}</p>

            <b>Tipo</b>

            <p>${type}</p>

            <b>Tamaño</b>

            <p>${formatSize(file.size)}</p>

        </div>

    `;

}
