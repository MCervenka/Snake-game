var movementUp = randomPosition();
var movementLeft = randomPosition();
var timingDue = 500;
var masterTimeOut = window.setInterval(movementSnake, timingDue);
var whichDirection;
var yummy = [];
var countingY = 0;
yummy[0] = document.querySelector(".yummy");
yummy[0].style.backgroundColor = randomColor();
var movement = document.getElementById("snake");
var easyBtn = document.getElementById("easyBtn");

var hardBtn = document.getElementById("hardBtn");
var youLose = document.getElementById("youLose");
var reset = document.querySelector("#reset");
var spans = document.querySelectorAll("span");
var score = spans[0];
var result = spans[1];
var yummyUp = [];
var yummyLeft = [];
var eaten = false;
var pastDirection;

movement.style.top = movementUp + "px";
movement.style.left = movementLeft + "px";
yummy[0].style.top = randomPosition() + "px";
yummy[0].style.left = randomPosition() + "px";

reset.addEventListener("click", function(){
	whichDirection = 4;
	window.clearTimeout(masterTimeOut);
	youLose.style.display = "none";
	movementUp = randomPosition();
	movementLeft = randomPosition();
	movement.style.top = movementUp + "px";
	movement.style.left = movementLeft + "px";
	removeChilds()
	countingY = 0;
	eaten = false;
	yummy[0].style.top = randomPosition() + "px";
	yummy[0].style.left = randomPosition() + "px";
	youLose.style.display = "none";
	masterTimeOut = window.setInterval(movementSnake, timingDue);
	score.textContent = countingY * 100;

});
easyBtn.addEventListener("click", function(){
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	timingDue = timingDue + 50;
	window.clearTimeout(masterTimeOut);
	masterTimeOut = window.setInterval(movementSnake, timingDue);
	result.textContent = timingDue + " ms";
});	
hardBtn.addEventListener("click", function(){
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	timingDue = timingDue - 50;
	window.clearTimeout(masterTimeOut);
	masterTimeOut = window.setInterval(movementSnake, timingDue);
	result.textContent = timingDue + " ms";
});	

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if(keyName === "ArrowUp"){
		if(pastDirection !== 1){
		whichDirection = 0;}
	}
  else if(keyName === "ArrowDown"){
		if(pastDirection !== 0){
		whichDirection = 1;}		
	}
	else if(keyName === "ArrowRight"){
		if(pastDirection !== 3){
		whichDirection = 2;}		
	}
	else if(keyName === "ArrowLeft"){
		if(pastDirection !== 2){
			whichDirection = 3;	}	
	}
})

function randomPosition(){
	var x = Math.floor(Math.random() * 13)*40;
	return x
	
}

function movementSnake() {
		if(countingY>0){
			yummyLeft[0] = movementLeft;
			yummyUp[0] = movementUp;
		}
		if(whichDirection === 0){
			movementUp -= 40;
			pastDirection = 0;
		}
		else if(whichDirection === 1){
			movementUp += 40;
			pastDirection = 1;
		}
		else if(whichDirection === 2){
			movementLeft += 40;
			pastDirection = 2;
		}
		else if(whichDirection === 3){
			movementLeft -= 40;
			pastDirection = 3;
		}
		
		if (movementUp < 0 || movementUp > 480 || movementLeft > 480 || movementLeft < 0 || !selfHit()){
			youLose.style.display = "block";
			whichDirection = 4;
			window.clearTimeout(masterTimeOut);
		}
		else{

			movement.style.top = movementUp + "px";
			movement.style.left = movementLeft + "px";
			for(var i = countingY - 1; i >= 0; i--){
					yummy[i].style.top = yummyUp[i] + "px";
					yummy[i].style.left = yummyLeft[i] + "px";
					if(i>0){
						yummyUp[i] = yummyUp[i-1];
						yummyLeft[i] = yummyLeft[i-1];
				}
			}
			if(movement.style.top === yummy[countingY].style.top && movement.style.left === yummy[countingY].style.left){
				countingY += 1;
				addElement();
				score.textContent = countingY * 100;
				eaten = true;

			}
		}
}
function addElement() { 
  // create a new div element 
  yummy.push(document.createElement("div")); 
  // and give it some content 


  // add the newly created element and its content into the DOM 
  yummy[0].before(yummy[countingY]);
  yummy[countingY].classList.add("yummy");
  yummyUp[countingY] = randomPosition();
  yummyLeft[countingY] = randomPosition();
  yummy[countingY].style.top = yummyUp[countingY] + "px";
  yummy[countingY].style.left = yummyLeft[countingY] + "px";
  yummy[countingY].style.backgroundColor = randomColor();
}

function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"
	
}

function selfHit(){
	var result = true;
	for(var i = 2; i < countingY; i++){
		if(movement.style.top === yummy[i].style.top && movement.style.left === yummy[i].style.left){
			if(i = countingY){
				if(eaten){
					eaten = false;
				}
				else{
					result = false;
				}
			}
			else{
				result = false;
			}
		}
	}
	return result
}

function removeChilds(){
	for(var i = 1; i <= countingY; i++){
		yummy[i].parentNode.removeChild(yummy[i])
	}
	yummy.splice(1, yummy.length - 2);
}