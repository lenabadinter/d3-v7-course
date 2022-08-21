/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.7 - Loading external data
*    Updated by Lena
*/

// returns promise
// d3.csv("/data/ages.csv").then ....
d3.csv("data/ages.csv").then(data => {
	console.log(data);
	// (5) [{…}, {…}, {…}, {…}, {…}, columns: Array(2)]
	// 0: {name: 'Tony', age: '10'}
	// 1: {name: 'Jessica', age: '12'}
	// 2: {name: 'Andrew', age: '9'}
	// 3: {name: 'Emily', age: '10'}
	// 4: {name: 'Richard', age: '11'}
	// columns: (2) ['name', 'age']
	// length: 5
	// [[Prototype]]: Array(0)
});

d3.json("data/ages.json").then(data => {
	data.forEach(d => {
		d.age = Number(d.age)
	})
	
	const svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400)

	const circles = svg.selectAll("circle")
		.data(data)

	circles.enter().append("circle")
		.attr("cx", (d, i) => (i * 50) + 50)
		.attr("cy", 250)
		.attr("r", (d) => 2 * d.age)
		.attr("fill", d => {
			if (d.name === "Tony") {
				return "blue"
			}
			else {
				return "red"
			}
		})
}).catch(error => {
	console.log(error)
})
