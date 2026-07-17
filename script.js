let playlist = [];
let current = 0;

const viewer = document.getElementById("viewer");

fetch("playlist.json")
.then(res=>res.json())
.then(data=>{
    playlist = data;
    playItem();
});

function playItem(){

    viewer.innerHTML="";

    const item = playlist[current];

    if(item.type==="image"){

        const img=document.createElement("img");
        img.src=item.file;

        viewer.appendChild(img);

        setTimeout(next,item.duration*1000);

    }else{

        const video=document.createElement("video");

        video.src=item.file;
        video.autoplay=true;
        video.muted=true;
        video.playsInline=true;

        video.onended=next;

        viewer.appendChild(video);

    }

}

function next(){

    current++;

    if(current>=playlist.length)
        current=0;

    playItem();

}
