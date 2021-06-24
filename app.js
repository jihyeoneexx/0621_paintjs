const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const modeBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const DEFAULT_COLOR = "black";
const CANVAS_SIZE = "700";

canvas.width = CANVAS_SIZE; 
canvas.height= CANVAS_SIZE; // pixel modifier size 

//defalt brush style set 
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = DEFAULT_COLOR; 
ctx.lineWidth = 2.5;
ctx.fillStyle = DEFAULT_COLOR; // fill style reset

let painting = false; //click to true
let fillingMode = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX; 
    const y = event.offsetY;
    if(!painting){ 
        ctx.beginPath(); 
        ctx.moveTo(x,y);
    } else{ 
        ctx.stroke();
        ctx.lineTo(x,y); 
    }
}


function handleColorClick(event){
    const clickedColor = event.target.style.backgroundColor;
    ctx.strokeStyle = clickedColor;
    ctx.fillStyle = clickedColor; // fill color
}

function handleRangeChange(event){
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

function handleModeClick(){
    if(fillingMode === true){ //
        fillingMode = false;
        modeBtn.innerText = "Fill"
    }else { 
        fillingMode = true;
        modeBtn.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(fillingMode === true){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    } 
}

function handleCM(event){
    event.preventDefault(); 
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image; // URL 형태
    link.download = "image.jpeg"; // name 
    link.click(); // fake click
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting); 
    canvas.addEventListener("mouseleave", stopPainting); 
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
} 

colors.forEach(target => target.addEventListener("click", handleColorClick));

if(range){
range.addEventListener("input", handleRangeChange);
}

if(modeBtn){
    modeBtn.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}