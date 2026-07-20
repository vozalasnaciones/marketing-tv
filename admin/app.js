const API="https://marketingapi.adodiaz51.workers.dev/files";

async function load(){

const response=await fetch(API);

const files=await response.json();

let videos=0;
let images=0;
let total=0;

const list=document.getElementById("fileList");

list.innerHTML="";

files.forEach(file=>{

total+=file.size;

if(file.type==="video")videos++;
else images++;

list.innerHTML+=`

<div class="file">

<div class="left">

<i class="bi ${file.type==="video"?"bi-camera-reels-fill text-primary":"bi-image-fill text-success"}"></i>

<div class="info">

<h5>${file.name}</h5>

<small>${(file.size/1024/1024).toFixed(2)} MB</small>

</div>

</div>

<div class="menu">

<i class="bi bi-three-dots-vertical"></i>

</div>

</div>

`;

});

document.getElementById("videos").innerHTML=videos;

document.getElementById("images").innerHTML=images;

document.getElementById("space").innerHTML=(total/1024/1024).toFixed(1)+" MB";

}

load();
