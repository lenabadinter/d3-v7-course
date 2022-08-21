/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.6 - Selections and data joins
*    Updated by Lena
*/

const data = [25, 20, 10, 12, 15]

const svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400)

	// select all circles on the  screen, next, we associate this selection with an array of data using this data method.
	.data(data)
	// now we have 5 circles in circles
	

circles.enter().append("circle")
	// d - item in array
	// i - index in array
	// function runs on every value in array
	.attr("cx", (d, i) => {
		console.log('d = ' + d + ' index = ' + i);

		// d = 25 index = 0
		// main.js:21 d = 20 index = 1
		// main.js:21 d = 10 index = 2
		// main.js:21 d = 12 index = 3
		// main.js:21 d = 15 index = 4

		return (i * 50) + 50
	})
	.attr("cy", 250)
	.attr("r", (d) => d)
	.attr("fill", "red")