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
let trueWidth = 0
let trueHeight = 0
let imgOriginal = document.createElement("img")


//elements
const drawPickSel = document.querySelectorAll('.drawPickSel');
let sizeWidthDraw = document.getElementById("sizeRange")

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


//image choice section
let imageChoiceSection = document.getElementById("imageChoice")
//user section
let userSection = document.getElementById("userDiv")

//draw section
let mainBodyElm = document.getElementById("mainBody")
let canvasLayers = document.getElementById("canvasLayers")
let canvDiv = canvasLayers.getBoundingClientRect()

//gallery section
let gallerySection = document.getElementById("user-image-gallery")


let manBodyDiv = mainBodyElm.getBoundingClientRect()

//erase
let eraseSelect = document.getElementById("eraseSelect")
//undo
let undoSelect = document.getElementById("undoButton")
//redo
let redoSelect = document.getElementById("redoButton")
//download
let downloadSelect = document.getElementById("downloadButton")
//user save image
let userSaveSelect = document.getElementById("user-save")


let saveForm = document.getElementById("saveForm")


//Resize canvas
let resizeCanvasElement = document.createElement("canvas")
let ctxRezise = resizeCanvasElement.getContext("2d")

//Resize back image canvas
let resizeBackCanvas = document.createElement("canvas")
let ctxResizeBack = resizeBackCanvas.getContext("2d")
  
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



//
//window load tasks. hide sections, sets up canvases
//
window.onload = function() {

  resizeCanvas()

    //hides sections.  // default is image choice section
    imageChoiceSection.style.display = "flex";
    userSection.style.display = "none";
    mainBodyElm.style.display = "none";
    gallerySection.style.display ="none";

    //allows displays of user alert messages
    if(document.getElementById("message")){

      document.getElementById("message").style.display ="inline";
      }

    document.getElementById("draw-section-btn").style.display="none"
      
    //Fills canvasBack with white background
    ctxBack.fillStyle = "white";
    ctxBack.fillRect(0, 0, canvasBack.width, canvasBack.height)
  };    


//
// finds correct size of canvasBack based on window size.
//display size affects accuracy of draw
//returns correct canvasBack width and height
//
function resizeCanvas() {

    //sets and resizes canvases to the width of the canvas div // -2 accounts for border
    canvasBack.width = canvDiv.width -2
    canvasBack.height = canvDiv.height -2
    canvasDraw.width = canvDiv.width -2
    canvasDraw.height = canvDiv.height -2
    canvasCursor.width = canvDiv.width -2
    canvasCursor.height = canvDiv.height -2

    saveStateCanvas.width = canvDiv.width -2
    saveStateCanvas.height = canvDiv.height -2
}




//
//checks for window resize
//resizes the canvasBack size and width
//finds new position of the canvasBack
//
window.addEventListener("resize", windowSizeChange)
window.addEventListener("orientationchange", windowSizeChange)

function windowSizeChange(){

  let canvDiv = canvasLayers.getBoundingClientRect()
  let resizeCanvasElement = document.createElement("canvas")
  
    resizeCanvasElement.width = 700
    resizeCanvasElement.height = 700
   
  let ctxRezise = resizeCanvasElement.getContext("2d")
  

  if (canvasDraw.width !== (canvDiv.width -2) || canvasDraw.height !== (canvDiv.height -2)){


    ratioWidth = canvDiv.width / (canvasDraw.width - 2) 
    ratioHeight = canvDiv.height / (canvasDraw.height -2)  

    ctxRezise.scale(ratioWidth, ratioHeight)

    ctxRezise.drawImage(canvasDraw, 0, 0)  

    canvasDraw.width = canvDiv.width -2
    canvasDraw.height = canvDiv.height -2
    canvasCursor.width = canvDiv.width -2
    canvasCursor.height = canvDiv.height -2


    ctxDraw.drawImage(resizeCanvasElement, 0, 0)

  ratioHeight = 0
  ratioWidth = 0


 ctxBack.drawImage(imgOriginal, 0, 0, canvasBack.width, canvasBack.height) 

  }
}



//
// display the image on the canvasBack that the user selects
//
drawPickSel.forEach(element => element.addEventListener('click', event => {

  resizeCanvas()
  data = element.dataset;

  let ctxBack = canvasBack.getContext("2d");
  ctxBack.clearRect(0, 0, canvasBack.width, canvasBack.height);

  ctxBack.fillStyle = "white";
  ctxBack.fillRect(0, 0, canvasBack.width, canvasBack.height)

  
  let img = document.createElement("img");
  img.src = data.fileloc
  imgOriginal.src = data.fileloc

  img.onload = function () {      
  
    ctxBack.drawImage(img, 0, 0, canvasBack.width, canvasBack.height)

    drawOpen() 
  }
  

}));



//
//Draw event listeners
//
canvasCursor.addEventListener('mousedown', e => {
  getMousePosition(e)

  isDrawing = true;


  //saves image for redo function
  let drawData = canvasDraw.toDataURL("image/png")
  imageSaveRedo.src = drawData

  undoSelect.disabled = false
  redoSelect.disabled = true

});

//
//Draws on canvas if mouse has clicked on canvas
//
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


//
//mouse is nolonger clicked stops the drawing
//
window.addEventListener('mouseup', e => {

  if (isDrawing === true) {

    if (eraseOn === false){
       drawLine(ctxDraw, x, y, e.offsetX, e.offsetY);

    }

    else if (eraseOn === true){

      startErase(ctxDraw, x, y, e.offsetX, e.offsetY)
      ctxDraw.globalCompositeOperation="source-over"

    }
  }

  x = 0;
  y = 0;

  isDrawing = false;

});


//
//Undo event. takes the last saved copy of the draw layer and draws it back on
//
undoSelect.addEventListener("click", function(){

 
  let redoSave = canvasDraw.toDataURL("image/png")
  imageRedo.src = redoSave


  ctxDraw.clearRect(0, 0, canvasDraw.width, canvasDraw.height)

  ctxDraw.drawImage(imageSaveRedo, 0, 0)

  
  undoSelect.disabled = true
  redoSelect.disabled = false

})

//
//redo event. draws the draw canvas copy back to drawimage layer
//
redoSelect.addEventListener("click", function(){


  ctxDraw.clearRect(0, 0, canvasDraw.width, canvasDraw.height)
 
  ctxDraw.drawImage(imageRedo, 0, 0)

  undoSelect.disabled = false
  redoSelect.disabled = true
 
 })


 //
 //Enables erase
 //
eraseSelect.addEventListener("click", function(){
  
  if (eraseOn === true){

    eraseOn = false

  }

  else if(eraseOn === false){
    eraseOn = true

  }

})


//
//Brush Size: checks for change of the brush size html range input
//
sizeWidthDraw.addEventListener("change", function(){

  brushSize  = document.getElementById("sizeRange").value
  
  })


//
//removes the cursor outline when mouse leaves canvas area
//
canvasCursor.addEventListener("mouseleave", function(){

  ctxCursor.clearRect(0, 0, canvasCursor.width, canvasCursor.height)  
  
  })



///
///
///Main drawing function
///
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
 // let currentColorSelect = colorSelect

 let currentColorSelect = "black"
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


//
//Download button
//
downloadSelect.addEventListener("click", function(e){

 saveDrawing(e)

})


//
//saves the image to computer
//
function saveDrawing(){   
  
  ctxSaveState.drawImage(canvasBack, 0, 0)
  ctxSaveState.drawImage(canvasDraw, 0, 0)

 let save = saveStateCanvas.toDataURL("img/png") 
  
 let a = document.createElement("a")
  a.href = save

  a.download ="your image"
  document.body.appendChild(a)
  a.click()
  
  document.body.removeChild(a)

}


//
//Saves the users drawing to server
//
function saveUserDrawing(){


  ctxSaveState.drawImage(canvasBack, 0, 0)
  ctxSaveState.drawImage(canvasDraw, 0, 0)

  let userSave = saveStateCanvas.toDataURL("image/png")

 //adds data to the user save form
  document.getElementById('user_image_location').value = userSave
  document.getElementById('user_image_height').value = saveStateCanvas.height
  document.getElementById('user_image_width').value = saveStateCanvas.width
}


//
//Color selected
//
redButton.addEventListener("click", function(e){

colorSelect = "red"
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
//Changing of current section
//


  //
  function drawOpen() {
    
    imageChoiceSection.style.display = "none";
    userSection.style.display = "none";
    mainBodyElm.style.display = "flex"
  
    document.getElementById("draw-section-btn").style.display = "inline"

  }


  //The main user section is opened. Nav user button disappears
  function userOpen() {

    imageChoiceSection.style.display = "none";
    userSection.style.display = "flex";
    mainBodyElm.style.display = "none";
    gallerySection.style.display ="none"
    document.getElementById("user-section-btn").style.display = "none"
    document.getElementById("draw-section-btn").style.display = "inline"
    document.getElementById("gallery-section-btn").style.display = "inline"

  }


  //the main drawing selection is openend
  function pickOpen() {

    imageChoiceSection.style.display = "flex";
    userSection.style.display = "none";
    mainBodyElm.style.display = "none"
    gallerySection.style.display ="none"
    document.getElementById("draw-section-btn").style.display = "none"
    document.getElementById("user-section-btn").style.display = "inline"
    document.getElementById("gallery-section-btn").style.display = "inline"
  }

//gallery section is opened from nav button
  function galleryOpen(){

    imageChoiceSection.style.display = "none";
    userSection.style.display = "none";
    mainBodyElm.style.display = "none"
    gallerySection.style.display ="flex"
    document.getElementById("draw-section-btn").style.display = "inline"
    document.getElementById("user-section-btn").style.display = "inline"
    document.getElementById("gallery-section-btn").style.display = "none"
    
  }



  //switches user login form to create user form
  function openCreateDiv(){

    document.getElementById("user-login").style.display = "none";
    document.getElementById("create-user").style.display ="block";
  }


//switches create user form to user login form
  function openLoginDiv(){
    document.getElementById("user-login").style.display = "block";
    document.getElementById("create-user").style.display ="none";

  }


  //removes nav alert messages on click anywhere on window
  window.addEventListener("click", function(){
    if(document.getElementById("message")){
    document.getElementById("message").style.display ="none";
    }

  })


