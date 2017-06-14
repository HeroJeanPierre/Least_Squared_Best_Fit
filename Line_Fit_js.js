var pointList = []
var click = new buzz.sound('click.wav')
var order = 1
var button
var xBord = 50
var yBord = 500
var A, y
var cParam = [0, 0]

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	// frameRate(30)
	createButtons()

	// console.log(mouseX,, mouseY)
	background(0)
	drawCartesian()
	drawPoints()
	graph(true)
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

function mousePressed(){
	if(mouseX - 50 >= 0 && yt(mouseY) - 50 >= 0 && mouseY > 0){		
		pointList.push([mouseX, mouseY])
		// console.log('Added: ' + mouseX + ' : ', mouseY)
		click.play()
		// console.log('A:', A)
	}

	background(0)
	drawCartesian()
	drawPoints()
	graph(true)
}
function decreaseOrder(){
	if(order > 1){
		order--
	}
}

function drawPoints(){
	noStroke()
	fill(255, 0, 0)
	for(var i = 0; i < pointList.length; i++){
		ellipse(pointList[i][0], pointList[i][1], 5, 5)
	}
}

function drawCartesian() {
	// Create the Border
	stroke(255)
	line(0, yt(50), width, yt(50))
	line(50, yt(0), 50, yt(height))
	
	// Create Grid
	stroke(190,190,190,100)
	textAlign(RIGHT)

	// Horiz
	for(var i = 50; i < (height - 50); i+=50){
		line(gc(0), yt(gc(i)), gc((width - 50)), yt(gc(i))) //  Horiz
	
		// Create Numbers
		fill(0,190, 0)
 		text(i, gc(-5), yt(gc(i))) // Horiz
		console.log(i)
	}

	// Vert
	for(var i = 50; i < (width - 50); i+=50){
		line(gc(i), yt(gc(0)), gc(i), yt(gc(height - 50))) // Vert
	
		// Create Numbers
		fill(0,190, 0)
		text(i, gc(i), yt(gc(0 - 15))) // Vert
	}


	
	fill(255,0,0)
	text('Order: ' + order.toString() ,width - 10, yt(10))
}

function graph(g){

	// Set up variables
	A = []
	yy = []

	try{
		//Create A and y
		for(var i = 0; i < pointList.length; i++){
			yy.push([((width - 50) - pointList[i][1]) + 50])

			var temp = []
			for(var ord = 0; ord <= order; ord++){
				temp.push((pointList[i][0] - 50)**ord)
			}	
			A.push(temp)

		}
		
		// (A^T)(A)c = A^T
		if(A.length > 0 && pointList.length > 0){
			left = numeric.dot(numeric.transpose(A), A)
			right = numeric.dot(numeric.transpose(A), yy)
			//console.log(left, '  :  ', right)
			cParam = numeric.dot(numeric.inv(left), right)
		}

		if(g){
			for(var x = 0; x < (width - 50); x++){
				fill(0,0,255)

				
				y = cParam[0][0]
				yNext = cParam[0][0]

				for(var ord = 1; ord <= order; ord++){
					y     += cParam[ord][0]*(x**ord)
					yNext += cParam[ord][0]*((x+1)**ord)
				}
					
				// Draw the graphed line
				if(true){
					fill(0,0,255)
					ellipse(gc(x), (height - 50) - y + 50 + (width - height), 2,2)
					console.log(x, y)
					stroke(0,0,255)
					line(x + 50 , (height - 50) - y + 50+ (width - height), x + 50 + 1, (height - 50) - yNext + 50+ (width - height))
				}
			}
		}
	}catch(err){
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