let x = 0
let y = 0
let isDrawing = false
let colorSelect = "black"
let brushSize = 5
var image = new Image();


const drawPickSel = document.querySelectorAll('.drawPickSel');

//background layer. bottom layer
const canvasBack = document.getElementById("canvasLayerBack");
const ctxBack = canvasBack.getContext("2d");

//draw on layer middle layer
const canvasDraw = document.getElementById("canvasLayerDraw");
const ctxDraw = canvasDraw.getContext("2d");

//cursor layer top layer
//this layer must transfer drawing onto draw layer
const canvasCursor = document.getElementById("canvasLayerCursor");
const ctxCursor = canvasCursor.getContext("2d");






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





console.log(canvasBack.width)
console.log(canvasBack.height)
console.log(canvasDraw.width)
console.log(canvasDraw.height)







sizeWidthDraw.addEventListener("change", function(){


  brushSize  = document.getElementById("sizeRange").value


})








redButton.addEventListener("click", function(e){

colorSelect = "hsla(316, 96%, 63%, 1.0)"

})

blackButton.addEventListener("click", function(e){

  colorSelect = "black"
  
  })

blueButton.addEventListener("click", function(e){

colorSelect = "blue"

})

yellowButton.addEventListener("click", function(e){

colorSelect = "yellow"

})

greenButton.addEventListener("click", function(e){

colorSelect = "green"

})

pinkButton.addEventListener("click", function(e){

colorSelect = "pink"

})

whiteButton.addEventListener("click", function(e){

colorSelect = "white"

})

greyButton.addEventListener("click", function(e){

colorSelect = "grey"

})

orangeButton.addEventListener("click", function(e){

  colorSelect = "orange"
  
  })
           
            


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




}

//
//checks for window resize
//resizes the canvasBack size and width
//finds new position of the canvasBack
//
window.addEventListener("resize",function(e){

  resizeCanvas(canvasBack)
  
  
  console.log(canvasBack.width)
  console.log(canvasBack.height)
  
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







canvasCursor.addEventListener('mousedown', e => {
  getMousePosition(e)

  isDrawing = true;

});

canvasCursor.addEventListener('mousemove', e => {

  
  if (isDrawing === true) {

    drawLine(ctxDraw, x, y, e.offsetX, e.offsetY);


    getMousePosition(e)

  }

  //Adds a cursor outline, size and color indication
  else if (isDrawing === false) {

    ctxCursor.clearRect(0, 0, canvasCursor.width, canvasCursor.height)
    brushOutline(ctxCursor, e.offsetX, e.offsetY)

  }
  
});

//removes the cursor outline when mouse leaves canvas area
canvasCursor.addEventListener("mouseleave", function(){
ctxCursor.clearRect(0, 0, canvasCursor.width, canvasCursor.height)


})


window.addEventListener('mouseup', e => {

  if (isDrawing === true) {
    drawLine(ctxCursor, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});





function drawLine(ctxDraw, x1, y1, x2, y2) {
  ctxDraw.beginPath();
  ctxDraw.strokeStyle = colorSelect;

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













//
//function pencilShape(){


 // pencil = new Path2D()

 // pencil.arc(x, y, 25, 0, 2 * Math.PI)

 // return pencil
//}


//
//test draw square on canvasBack
//
function drawFunction(e) {

  ctxBack.beginPath()

  ctxBack.fillStyle = "black"
  ctxBack.fillRect(x, y, 10, 10)


}





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
