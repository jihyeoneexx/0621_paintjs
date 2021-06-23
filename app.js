const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
// html <canvas> element has context, so we can access the pixel inside of element(canvas)
// 내부의 픽셀을 컨트롤 (요소는 다양하지만 오늘은 2d)
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const modeBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const DEFAULT_COLOR = "black";
const CANVAS_SIZE = "700";

// canvas.Width = canvas.offsetWidth;  -> offsetWidth 700으로 잡히는데 canvas 는 계속 300*150으로 잡히는 이유는???
// canvas.Height = canvas.offsetHeight; 
//canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
//canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight; <- 얘네도 같은 이유로 안 되는데 왜일까요????

canvas.width = CANVAS_SIZE; 
canvas.height= CANVAS_SIZE; // pixel modifier size 
// canvas의 크기는 css상 부여한 크기이므로 DOM 자체만으로는 접근할 수 없음
// 캔버스 자체의 사이즈를 지정해야 내부 픽셀(context) 조정 가능

//defalt brush style set 
ctx.fillstyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = DEFAULT_COLOR; // context 안의 모든 line이 갖는 기본 속성 
ctx.lineWidth = 2.5;
ctx.fillstyle = DEFAULT_COLOR; // fill style 초기화

let painting = false; //click시에만 true로 변화
let fillingMode = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX; // canvas 내에서의 마우스 좌표값
    const y = event.offsetY;
    if(!painting){ // 클릭하지 않았으므로 painting = false -> !painting = true 
        ctx.beginPath(); // 클릭하지 않았을 때, path 시작 
        ctx.moveTo(x,y); // 투명한 path를 만들며 좌표에 따라 지속적으로 이동, path 시작점
    } else{ // 클릭했으므로 painting = true -> !painting = false
        ctx.stroke(); // 선 그리기 
        ctx.lineTo(x,y); // path의 전 위치(시작점)에서 지금 위치까지 선 좌표 형성 
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
//'event' only comes when we use a function from 'addEventListener'

function handleModeClick(){
    if(fillingMode === true){ //
        fillingMode = false;
        modeBtn.innerText = "Fill"
    }else { // basic mode: paint(false) -> click -> change fill(true)
        fillingMode = true;
        modeBtn.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(fillingMode === true){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    } // filling 모드의 조건을 지정하지 않으면 한 캔버스 안에서 stroke와 filling을 한번에 사용할 수 없음
      // filling mode가 true 일 때만 채우기 (기본값은 false이므로 stroke)
}

function handleCM(event){
    event.preventDefault(); // 우클릭 메뉴 팝업 차단
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    // pixel 정보 담은 image를 url로 제공(기본 포멧 png -> 지정 가능)
    const link = document.createElement("a");
    link.href = image; // URL 형태
    link.download = "image.jpeg"; // name 
    // a: download attribute -> not navigating link, instructs download a url 
    // a의 해당 url을 download로 지정한 이름 형태로 저장
    link.click(); // fake click
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // mousemove = 해당 영역 위에서 마우스 move시 이벤트 발생
    canvas.addEventListener("mousedown", startPainting); // mousedown = click시 이벤트 발생
    canvas.addEventListener("mouseup", stopPainting); // mouseup = 클릭 해제
    canvas.addEventListener("mouseleave", stopPainting); // mouseleave = 마우스가 해당 영역을 벗어남
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
} 

colors.forEach(target => target.addEventListener("click", handleColorClick));

if(range){
range.addEventListener("input", handleRangeChange);
// rainge -> input에 반응함 (유저가 입력한 ramge)
}

if(modeBtn){
    modeBtn.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}