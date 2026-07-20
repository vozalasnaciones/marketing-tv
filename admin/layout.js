/* ===========================
   Marketing TV CMS - Layout
=========================== */

function renderLayout(files) {

    document.getElementById("app").innerHTML = `
        <div class="layout">

            <aside id="sidebar"></aside>

            <main>

                <header id="header"></header>

                <section id="content"></section>

            </main>

        </div>
    `;

    renderSidebar();
    renderHeader();
    renderLibrary(files);

}

/* ===========================
   Sidebar
=========================== */

function renderSidebar() {

    document.getElementById("sidebar").innerHTML = `

        <div class="logo">

            <i class="bi bi-display-fill"></i>

            <div>
                <h3>Marketing TV</h3>
                <small style="color:#6b7280;">CMS v2</small>
            </div>

        </div>

        <nav class="menu">

            <a href="#" class="active">
                <i class="bi bi-house-door"></i>
                <span>Dashboard</span>
            </a>

            <a href="#">
                <i class="bi bi-collection-play"></i>
                <span>Biblioteca</span>
            </a>

            <a href="#">
                <i class="bi bi-calendar3"></i>
                <span>Programación</span>
            </a>

            <a href="#">
                <i class="bi bi-tv"></i>
                <span>Pantallas</span>
            </a>

            <a href="#">
                <i class="bi bi-graph-up"></i>
                <span>Estadísticas</span>
            </a>

            <a href="#">
                <i class="bi bi-gear"></i>
                <span>Configuración</span>
            </a>

        </nav>

        <div class="version">

            Marketing TV CMS<br>
            versión 2.0

        </div>

    `;

}

/* ===========================
   Header
=========================== */

function renderHeader() {

    document.getElementById("header").innerHTML = `

        <div class="header-left">

            <h2>Biblioteca</h2>

        </div>

        <div class="header-right">

            <input
                class="search"
                type="text"
                placeholder="Buscar archivos..."
            >

            <button class="btn-primary-custom">

                <i class="bi bi-plus-lg"></i>

                Nuevo

            </button>

            <div class="avatar">

                A

            </div>

        </div>

    `;

}
function renderLibrary(files){

    const content = document.getElementById("content");

    if(files.length===0){

        content.innerHTML=`

            <div class="text-center p-5">

                <h3>No hay archivos</h3>

            </div>

        `;

        return;

    }

    content.innerHTML=`

        <div class="cards">

            ${files.map(createCard).join("")}

        </div>

    `;

}

function createCard(file){

    const type = getFileType(file);

    let preview="";

    if(type==="image"){

        preview=`

            <img src="${file.download}" loading="lazy">

        `;

    }

    else if(type==="video"){

        preview=`

            <video
                src="${file.download}"
                muted
                preload="metadata">
            </video>

        `;

    }

    else{

        preview=`

            <i class="bi bi-file-earmark"></i>

        `;

    }

    return `

        <div class="media-card">

            <div class="preview">

                ${preview}

            </div>

            <div class="card-info">

                <div class="card-title">

                    ${file.name}

                </div>

                <div class="card-meta">

                    ${type.toUpperCase()}
                    ·
                    ${formatSize(file.size)}

                </div>

                <div class="card-actions">

                    <div class="action">

                        <i class="bi bi-eye"></i>

                    </div>

                    <div class="action">

                        <i class="bi bi-pencil"></i>

                    </div>

                    <div class="action">

                        <i class="bi bi-trash"></i>

                    </div>

                </div>

            </div>

        </div>

    `;

}
