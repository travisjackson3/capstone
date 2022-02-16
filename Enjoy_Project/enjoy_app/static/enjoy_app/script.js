let x = 0
let y = 0
let isDrawing = false
let colorSelect = "black"


var image = new Image();
const drawPickSel = document.querySelectorAll('.drawPickSel');
let canvas = document.getElementById("colorCanvas");
let ctx = canvas.getContext("2d");

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


sizeWidthDraw.addEventListener("change", function(){

sizeWidthDraw = document.getElementById("sizeRange").value


})








redButton.addEventListener("click", function(e){

colorSelect = "red"

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
// finds correct size of canvas based on window size.
//display size affects accuracy of draw
//returns correct canvas width and height
//
resizeCanvas(canvas)
function resizeCanvas(canvas) {

  let trueWidth = canvas.clientHeight;
  let trueHeight = canvas.clientWidth;

  if (canvas.width !== trueWidth || canvas.height !== trueHeight)


    canvas.width = trueWidth;
    canvas.height = trueHeight

    
console.log(canvas.width)
console.log(canvas.height)

}




//Fills canvas with white background
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height)



//
//checks for window resize
//resizes the canvas size and width
//finds new position of the canvas
//
window.addEventListener("resize",function(e){

resizeCanvas(canvas)


console.log(canvas.width)
console.log(canvas.height)

})




//
//Creates event to display the image on the canvas the user selects
//
drawPickSel.forEach(element => element.addEventListener('click', event => {

  resizeCanvas(canvas)
  
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  //testchange = document.getElementById("testchange")


  let img = document.createElement("img");
  img.src = element.id;

  //testchange.setAttribute("src", element.id)

  img.onload = function () { ctx.drawImage(img, 0, 0, img.width, img.height) }


}));



//
//Click event to draw on canvas
//
//canvas.addEventListener("click", function (e) {

 // resizeCanvas(canvas)
 
 // getMousePosition(e)
  //drawFunction(e)

//})






canvas.addEventListener('mousedown', e => {
  getMousePosition(e)

  isDrawing = true;

});

canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {

    drawLine(ctx, x, y, e.offsetX, e.offsetY);
    getMousePosition(e)

  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(ctx, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});









function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = colorSelect;


  ctx.lineWidth = sizeWidthDraw;
  ctx.lineCap = "round"
  ctx.lineJoin ="round"

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);



  ctx.stroke();
  ctx.closePath();
}





//
//function pencilShape(){


 // pencil = new Path2D()

 // pencil.arc(x, y, 25, 0, 2 * Math.PI)

 // return pencil
//}












//
//test draw square on canvas
//
function drawFunction(e) {

  ctx.beginPath()

  ctx.fillStyle = "black"
  ctx.fillRect(x, y, 10, 10)


}



function getMousePosition(e) {

    x = e.offsetX
    y = e.offsetY

  console.log("Coordinate x: " + x,
    "Coordinate y: " + y,
  )
  return x, y
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