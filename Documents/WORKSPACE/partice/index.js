var c = document.getElementById("canvas");
var canvasContext = c.getContext("2d");
var img = new Image()
img.onload = () => canvasContext.drawImage(img,10,10)
img.src = './assets/m.svg'

