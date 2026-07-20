let mediaFiles = [];
async function init() {

    mediaFiles = await getFiles();

    renderLayout(mediaFiles);

}
