const API = "https://marketingapi.adodiaz51.workers.dev";

async function getFiles() {

    const response = await fetch(API + "/files");

    return await response.json();

}
