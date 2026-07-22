const state = {
    files: [],
    filteredFiles: []
};

async function init() {

    state.files = await getFiles();
    state.filteredFiles = [...state.files];

    renderLayout();

}

init();
