


var image = new Image();

const testClick = document.querySelectorAll('.testclick');
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let testchange = document.getElementById("testchange")

ctx.fillStyle ="white";
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

ctx.fillStyle ="white";
ctx.fillRect(0, 0, canvas.width, canvas.height)
//testchange = document.getElementById("testchange")


let img =document.createElement("img");
 img.src = element.id;

 //testchange.setAttribute("src", element.id)
 
    img.onload = function(){ctx.drawImage(img ,0, 0, img.width, img.height )}

 

}));




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
