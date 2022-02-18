let x = 0
let y = 0
let isDrawing = false
let colorSelect = "black"
let brushSize = 5
var image = new Image();
let eraseOn = false

let imageSaveRedo = new Image
let imageRedo = new Image
let imageSave = new Image

let allowRedo = false

//let imageSaveRedo = document.createElement("img")


const drawPickSel = document.querySelectorAll('.drawPickSel');

//background layer. bottom layer
const canvasBack = document.getElementById("canvasLayerBack");
const ctxBack = canvasBack.getContext("2d");

//draw on layer middle layer
let canvasDraw = document.getElementById("canvasLayerDraw");
let ctxDraw = canvasDraw.getContext("2d");

//cursor layer top layer
//this layer must transfer drawing onto draw layer
const canvasCursor = document.getElementById("canvasLayerCursor");
const ctxCursor = canvasCursor.getContext("2d");


//save data to download or save to user database
let saveStateCanvas = document.createElement("canvas")
let ctxSaveState = saveStateCanvas.getContext("2d")


//erase
let eraseSelect = document.getElementById("eraseSelect")

//undo
let undoSelect = document.getElementById("undoButton")

//redo
let redoSelect = document.getElementById("redoButton")

//download
let downloadSelect = document.getElementById("downloadButton")



//color buttons. automate later if time
let redButton = document.getElementById("redSelect")
let blackButton = document.getElementById("blackSelect")
let blueButton = document.getElementById("blueSelect")
let yellowButton = document.getElementById("yellowSelect")
let greenButton = document.getElementById("greenSelect")
let pinkButton = document.getElementById("pinkSelect")
let whiteButton = document.getElementById("whiteSelect")
let greyButton = document.getElementById("greySelect")
let orangeButton = document.getElementById("orangeSelect")



let sizeWidthDraw = document.getElementById("sizeRange")



//
// finds correct size of canvasBack based on window size.
//display size affects accuracy of draw
//returns correct canvasBack width and height
//
resizeCanvas(canvasBack)
function resizeCanvas(canvasBack) {

  let trueWidth = canvasBack.clientHeight;
  let trueHeight = canvasBack.clientWidth;


  if (canvasBack.width !== trueWidth || canvasBack.height !== trueHeight)


    canvasBack.width = trueWidth;
    canvasBack.height = trueHeight
    canvasDraw.width = trueWidth
    canvasDraw.height = trueHeight
    canvasCursor.width = trueWidth;
    canvasCursor.height = trueHeight

    saveStateCanvas.width = trueWidth
   saveStateCanvas.height = trueHeight




}

//
//checks for window resize
//resizes the canvasBack size and width
//finds new position of the canvasBack
//
window.addEventListener("resize",function(e){

  resizeCanvas(canvasBack)
  
 
  
  })




//Fills canvasBack with white background
ctxBack.fillStyle = "white";
ctxBack.fillRect(0, 0, canvasBack.width, canvasBack.height)




//
//Creates event to display the image on the canvasBack the user selects
//
drawPickSel.forEach(element => element.addEventListener('click', event => {

  resizeCanvas(canvasBack)
  data = element.dataset;

  let ctxBack = canvasBack.getContext("2d");
  ctxBack.clearRect(0, 0, canvasBack.width, canvasBack.height);

  ctxBack.fillStyle = "white";
  ctxBack.fillRect(0, 0, canvasBack.width, canvasBack.height)
  //testchange = document.getElementById("testchange")

  
  let img = document.createElement("img");
  img.src = data.fileloc

  //testchange.setAttribute("src", element.id)

  img.onload = function () { ctxBack.drawImage(img, 0, 0, img.width, img.height) }


}));



//
//checks for change of the brush size html range input
//
sizeWidthDraw.addEventListener("change", function(){

brushSize  = document.getElementById("sizeRange").value

})




//
//Draw event listeners
//
canvasCursor.addEventListener('mousedown', e => {
  getMousePosition(e)

  isDrawing = true;

  
  let test = canvasDraw.toDataURL("image/png")
  imageSaveRedo.src = test

  undoSelect.disabled = false
  redoSelect.disabled = true



});

canvasCursor.addEventListener('mousemove', e => {
  
  if (isDrawing === true) {
    
    if (eraseOn === false){

      drawLine(ctxDraw, x, y, e.offsetX, e.offsetY);
      getMousePosition(e)
    }
    else if(eraseOn === true){
      ctxDraw.globalCompositeOperation="destination-out"
      startErase(ctxDraw, x, y, e.offsetX, e.offsetY)
      getMousePosition(e)
      
    ctxCursor.clearRect(0, 0, canvasCursor.width, canvasCursor.height)
    }
  }

  
  
  //Adds a cursor outline, size and color indication  
  else if (isDrawing === false) {
  
    ctxCursor.clearRect(0, 0, canvasCursor.width, canvasCursor.height)
    brushOutline(ctxCursor, e.offsetX, e.offsetY)

  }  
});






window.addEventListener('mouseup', e => {

  if (isDrawing === true) {

    if (eraseOn === false){
       drawLine(ctxDraw, x, y, e.offsetX, e.offsetY);

    }

    else if (eraseOn === true){
      
      //ctxDraw.globalCompositeOperation="source-over"

      startErase(ctxDraw, x, y, e.offsetX, e.offsetY)
      ctxDraw.globalCompositeOperation="source-over"

    }
  }

  x = 0;
  y = 0;

  isDrawing = false;

});



//
//saves Draw canvas onto save state canvas
//
//canvasCursor.addEventListener("mouseup", function(){

  //saveDrawCtx(ctxDraw)


 // imageSaveRedo.width = canvasDraw.width
 // imageSaveRedo.height = canvasDraw.height
 // console.log(imageSaveRedo)
 // imageSaveRedo = ctxSaveState.drawImage(canvasDraw, 0, 0)

  //console.log(imageSaveRedo)
  //ctxSaveState.drawImage(canvasDraw, 0, 0)
  //imageSaveRedo =  ctxSaveState.drawImage(canvasDraw, 0, 0)
 



  // let test = canvasDraw.toDataURL("image/png")

 //   imageSaveRedo.src = test



//})


undoSelect.addEventListener("click", function(){

 console.log("undo")


 
// undo(ctxSaveState)


 // ctxDraw = saveStateCanvass.getContext("2d")
 //imageSaveRedo = ctxSaveState.drawImage(canvasDraw, 0, 0)
 //ctxSaveState.drawImage(canvasDraw, 0, 0)
 
  //test = canvasDraw.toDataURL("image/png")

  //let test = canvasDraw.toDataURL("image/png")


  let redoSave = canvasDraw.toDataURL("image/png")
  imageRedo.src = redoSave

//    imageSaveRedo.src = test
  //document.getElementById()
  //imgtest = test.url

  //console.log(imgtest)

  ctxDraw.clearRect(0, 0, canvasDraw.width, canvasDraw.height)

  ctxDraw.drawImage(imageSaveRedo, 0, 0)

  //let redoSave = canvasDraw.toDataURL("image/png")
 // imageRedo.src = redoSave



 //allow redo

  

  undoSelect.disabled = true
  redoSelect.disabled = false



  //let imgtest2 = new Image()
  //imgtest2.src = canvasDraw.toDataURL()


})

redoSelect.addEventListener("click", function(){


  //allow after undo has been clicked

  console.log("redo")
 

//  if (allowRedo === true){ 
    
  ctxDraw.clearRect(0, 0, canvasDraw.width, canvasDraw.height)
 
  ctxDraw.drawImage(imageRedo, 0, 0)

  undoSelect.disabled = false
  redoSelect.disabled = true
//  }

  


  //unallow redo click
  //allowRedo = false
 
 })


eraseSelect.addEventListener("click", function(){
  
  if (eraseOn === true){

    eraseOn = false
    console.log(eraseOn)
  }
  else if(eraseOn === false){
    eraseOn = true

    console.log(eraseOn)
  }

  //let test = canvasDraw.toDataURL("image/png")
  //imageSaveRedo.src = test

})


//
//removes the cursor outline when mouse leaves canvas area
//
canvasCursor.addEventListener("mouseleave", function(){

  ctxCursor.clearRect(0, 0, canvasCursor.width, canvasCursor.height)  
  
  })




///
///Main drawing function
function drawLine(ctxDraw, x1, y1, x2, y2) {

  ctxDraw.beginPath();

  //functionality to allow erase
  ctxDraw.globalCompositeOperation="source-over"

  ctxDraw.strokeStyle = colorSelect;

  ctxDraw.lineWidth = brushSize;
  ctxDraw.lineCap = "round"
  ctxDraw.lineJoin ="round"

  ctxDraw.moveTo(x1, y1);
  ctxDraw.lineTo(x2, y2);



  ctxDraw.stroke();
  ctxDraw.closePath();
}


function startErase(ctxDraw, x1, y1, x2, y2){

  
  ctxDraw.beginPath();
  //ctxDraw.globalCompositeOperation="destination-out"
  //ctxDraw.strokeStyle = "green";

  ctxDraw.lineWidth = brushSize;
  ctxDraw.lineCap = "round"
  ctxDraw.lineJoin ="round"

  ctxDraw.moveTo(x1, y1);
  ctxDraw.lineTo(x2, y2);



  ctxDraw.stroke();
  ctxDraw.closePath();


}


//
//makes an outline of brush size and color
//
function brushOutline(ctxCursor, x, y){

  
  let outlineSize = brushSize
  
  //color of brush
  //lighten. lower alpha to 0.6 "alpha" hsla(hue, saturation, lightness, alpha)
 // colorSelect = "hsla(316, 96%, 63%, 1.0)"

 let currentColorSelect = colorSelect 
 let testnew = currentColorSelect.slice(0, 20)
 testfinal = testnew.concat("0.6)")


  ctxCursor.beginPath();

  ctxCursor.strokeStyle = colorSelect
  ctxCursor.lineWidth = 2;

  ctxCursor.arc(x, y, (outlineSize/2), 0, 2 * Math.PI);

  ctxCursor.stroke();
  ctxCursor.closePath();
}


//
//gets mouse postion on canvas
//
function getMousePosition(e) {

  x = e.offsetX
  y = e.offsetY

return x, y
}


downloadSelect.addEventListener("click", function(e){
 // console.log("save")
 // ctxSaveState.drawImage(canvasBack, 0, 0)
 // ctxSaveState.drawImage(canvasDraw, 0, 0)

//let save = saveStateCanvas.toDataURL("img/png")
 // imageSave.href = save

 //downloadSelect.href = save 

 saveDrawing(e)

})




function saveDrawing(e){
   


  console.log("save")
  ctxSaveState.drawImage(canvasBack, 0, 0)
  ctxSaveState.drawImage(canvasDraw, 0, 0)

 let save = saveStateCanvas.toDataURL("img/png")
 
  
 let a = document.createElement("a")
  a.href = save

  console.log(save)

  a.download ="your image"
  document.body.appendChild(a)
  a.click()
  
  document.body.removeChild(a)
  window.open(save)

//window.open(save.href)



 // ctxSaveState.drawImage(ctxDraw.canvasDraw, 0, 0)





 //  saves data as url that can be accessed by visiting the URL
 // let imageURI = canvasDraw.toDataURL()



}







redButton.addEventListener("click", function(e){

colorSelect = "hsla(316, 96%, 63%, 1.0)"
eraseOn = false

})

blackButton.addEventListener("click", function(e){

  colorSelect = "black"
  eraseOn = false
  
  })

blueButton.addEventListener("click", function(e){

colorSelect = "blue"
eraseOn = false

})

yellowButton.addEventListener("click", function(e){

colorSelect = "yellow"
eraseOn = false

})

greenButton.addEventListener("click", function(e){

colorSelect = "green"
eraseOn = false

})

pinkButton.addEventListener("click", function(e){

colorSelect = "pink"
eraseOn = false

})

whiteButton.addEventListener("click", function(e){

colorSelect = "white"
eraseOn = false

})

greyButton.addEventListener("click", function(e){

colorSelect = "grey"
eraseOn = false

})

orangeButton.addEventListener("click", function(e){

  colorSelect = "orange"
  eraseOn = false
  
  })
           









//
//function pencilShape(){


 // pencil = new Path2D()

 // pencil.arc(x, y, 25, 0, 2 * Math.PI)

 // return pencil
//}




//image.src = 'media/mandala_2_thumb.jpg';




// testclick.click = function () {
//     console.log("test click")
 //    document.getElementById('testclick').setAttribute('src', this.src);
// };
// image.src = 'http://127.0.0.1:8000/media/mandala_2_thumb.jpg';






/* document.getElementById('foo').addEventListener('click', function (e) {
    var img = document.createElement('img');
    img.setAttribute('src', 'http://blog.stackoverflow.com/wp-content/uploads/stackoverflow-logo-300.png');
    e.target.appendChild(img);
  });
 */







  
/* let testclick = document.getElementsByClassName("#testclick")
 
 
testclick.addEventListener("click", function(){
  let testchange = document.querySelector("#testchange")
    console.log("testclick")
    //testclick.setAttribute("src", this.name)
    console.log(this.name)
    
    for (var i=0; i < testclick.length; i++) {
 
        testclick[i].setAttribute("src", this.name)
 
    }
 
 
}) */



//let testchange = document.getElementById("#test")




//
//Click event to draw on canvasBack
//
//canvasBack.addEventListener("click", function (e) {

 // resizeCanvas(canvasBack)
 
 // getMousePosition(e)
  //drawFunction(e)

//})
