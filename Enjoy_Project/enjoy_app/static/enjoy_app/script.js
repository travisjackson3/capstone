


var image = new Image();

const testClick = document.querySelectorAll('.testclick');
let canvas = document.getElementById("colorCanvas");
let ctx = canvas.getContext("2d");
let testchange = document.getElementById("testchange")


console.log(canvas.width)
console.log(canvas.height)


let rect = canvas.getBoundingClientRect();

window.addEventListener("resize",function(e){


  rect = canvas.getBoundingClientRect();



})






ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height)









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


testClick.forEach(element => element.addEventListener('click', event => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  //testchange = document.getElementById("testchange")




  let img = document.createElement("img");
  img.src = element.id;

  //testchange.setAttribute("src", element.id)

  img.onload = function () { ctx.drawImage(img, 0, 0, img.width, img.height) }


}));

let x = 0
let y = 0

canvas.addEventListener("click", function(e) {

  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  //  getMousePosition(canvas, e)



    ctx.beginPath()
  
    ctx.fillStyle = "black"
    ctx.fillRect(x, y, 10, 10)
    console.log("Coordinate x: " + x,
    "Coordinate y: " + y,
    "page x: " + e.clientX,
    "page y: " + e.clientY,
    "rect left: " + rect.left,
    "rect top: " + rect.top,
  )
   
  



})

function drawFunction(e) {
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  //  getMousePosition(canvas, e)



    ctx.beginPath()
  
    ctx.fillStyle = "black"
    ctx.fillRect(x, y, 10, 10)
    console.log("Coordinate x: " + x,
    "Coordinate y: " + y,
    "page x: " + e.clientX,
    "page y: " + e.clientY,
    "rect left: " + rect.left,
    "rect top: " + rect.top,
  )
   
  

}

function getMousePosition(canvas, e) {
  let rect = canvas.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  console.log("Coordinate x: " + x,
    "Coordinate y: " + y,
    "page x: " + e.clientX,
    "page y: " + e.clientY);

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
