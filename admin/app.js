async function init(){

    const files = await getFiles();

    renderLayout(files);

}

init();
