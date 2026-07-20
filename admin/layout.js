function renderLayout(){

    document.getElementById("app").innerHTML=`

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

    renderLibrary();

}
