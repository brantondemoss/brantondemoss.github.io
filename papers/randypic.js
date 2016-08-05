window.onload = choosePic;
var myPix = new Array("../resources/eli1.png","../resources/eli2.png","../resources/eli3.png","../resources/eli4.png","../resources/eli5.png","../resources/orientedreidmoves.png");

function choosePic() {
    var randomNum = Math.floor(Math.random() * myPix.length);
    document.getElementById("mathpic").src = myPix[randomNum];
}
