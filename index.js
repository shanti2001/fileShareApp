const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector(".browseBtn");

const progressContainer = document.querySelector(".progress-container");
const bgProgress = document.querySelector(".bg-progress");
const percentDiv = document.querySelector("#percent");
const progressBar = document.querySelector(".progress-bar");

const sharingContainer = document.querySelector(".sharing-container");
const fileURLInput = document.querySelector("#fileURL");
const copyBtn = document.querySelector("#copyBtn");

const host = "https://innshare.herokuapp.com";
const uploadURL = `${host}/api/files`;
//const uploadURL = `${host}api/files`;


dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    //console.log("skmcks");
    if(!dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged");
    }
    
});
dropZone.addEventListener("dragleave",()=>{
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.log(files);
    if(files.length){
        fileInput.files = files;
        uploadFile();
    }
});

fileInput.addEventListener("change",()=>{
    uploadFile();
});

browseBtn.addEventListener("click",()=>{
    fileInput.click();
});

copyBtn.addEventListener("click",()=>{
    fileURLInput.select();
    document.execCommand("copy");
});

const uploadFile = ()=>{
    progressContainer.style.display = "block";
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile",file);

    const http = new XMLHttpRequest();

    http.onreadystatechange = ()=>{
        //console.log(http.readyState);
        if(http.readyState === XMLHttpRequest.DONE){
            console.log(http.response);
            showLink(JSON.parse(http.response));
        }
    };
    http.upload.onprogress = updateProgress;
    http.open("POST",uploadURL);
    http.send(formData);
};
const updateProgress =(e)=>{
     const percent = Math.round((e.loaded /e.total)*100);
     bgProgress.style.width = `${percent}%`;
     percentDiv.innerText = percent;
     progressBar.style.transform = `scaleX(${percent/100})`;
}

const showLink = ({file:url})=>{
    console.log(url);
    progressContainer.style.display = "none";
    sharingContainer.style.display = "block";
    fileURLInput.value = url;
}


