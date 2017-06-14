var pointList = []
var click = new buzz.sound('click.wav')
var order = 1
var button
var xBord = 50
var yBord = 500
var A, y
var cParam = [0, 0]
function setup() {
	createCanvas(550, 550)
	frameRate(30)
	createButtons()

}

function createButtons(){
	space = 90
	// Clear button
	button1 = createButton('Clear')
	button1.position(55, yt(25))
	button1.mousePressed(clearPoints)

	//Increase Order
	button2 = createButton('+ Order')
	button2.position(111, yt(25))
	button2.mousePressed(increaseOrder)

	//Decrease Order
	button2 = createButton('- Order')
	button2.position(185, yt(25))
	button2.mousePressed(decreaseOrder)
}
function clearPoints(){
	pointList = []
	for(var i = 0; i <= order; i++){
		cParam[0][0] = 0
		cParam[1][0] = 0
	}
}
function increaseOrder(){
	order++
}
function decreaseOrder(){
	if(order > 1){
		order--
	}
}

function draw() {
	// console.log(mouseX, mouseY)
	background(0)
	drawCartesian()
	drawPoints()
	graph(true)
}

function drawCartesian() {
	// Create the Border
	stroke(255)
	line(0, yt(50), 550, yt(50))
	line(50, yt(0), 50, yt(550))
	
	// Create Grid
	stroke(190,190,190,100)
	textAlign(RIGHT)
	for(var i = 50; i < 500; i+=50){
		line(gc(i), yt(gc(0)), gc(i), yt(gc(500)))
		line(gc(0), yt(gc(i)), gc(500), yt(gc(i)))
	
		// Create Numbers
		fill(0,190, 0)
		text(i, gc(i), yt(gc(0 - 15))) // Horiz
 		text(i, gc(-5), yt(gc(i))) // Vert

	}

	
	fill(255,0,0)
	text('Order: ' + order.toString() ,width - 10, yt(10))
}

function drawPoints(){
	noStroke()
	fill(255, 0, 0)
	for(var i = 0; i < pointList.length; i++){
		ellipse(pointList[i][0], pointList[i][1], 5, 5)
	}
}

function mousePressed(){
	if(mouseX - 50 >= 0 && yt(mouseY) - 50 >= 0 && mouseX < width && mouseY > 0){		
		pointList.push([mouseX, mouseY])
		console.log('Added: ' + mouseX + ' : ', mouseY)
		click.play()
		console.log('A:', A)
	}
}

function graph(g){

	// Set up variables
	A = []
	yy = []

	for(var i = 0; i < pointList.length; i++){
		yy.push([(500 - pointList[i][1]) + 50])
		A.push([1, (pointList[i][0]) - 50])
	}

	// (A^T)(A)c = A^T
	if(A.length > 0){
		left = numeric.dot(numeric.transpose(A), A)
		right = numeric.dot(numeric.transpose(A), yy)
		//console.log(left, '  :  ', right)
		cParam = numeric.dot(numeric.inv(left), right)

	}




	if(g){
		for(var x = 0; x < 500; x++){
			fill(0,0,255)
			y = cParam[0][0] +  cParam[1][0]*x
			// console.log('C0: ', cParam[0], ' C1: ', cParam[1])
			//y = 2*x

			if(y > 0){
				ellipse(gc(x), 500 - y + 50, 2,2)
			}
		}
	}
}

// Set lower right to y = 0
function yt(y){
	return height - y
}

// Push coord so they fit in only the graph 500x500
function gc(n){
	return n + 50
}

