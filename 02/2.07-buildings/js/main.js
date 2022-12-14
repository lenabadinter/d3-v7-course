/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.7 - Loading external data
*    Updated by Lena
*/

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 800)
  .attr("height", 800);

d3.json("data/buildings.json").then(data => {
  data.forEach(d => {
    d.height = Number(d.height)
  })

  const rects = svg.selectAll("rect")
    .data(data)
  
  rects.enter().append("rect")
    .attr("y", 0)
    .attr("x", (d, i) => (i * 60))
    .attr("width", 40)
    .attr("height", d => d.height)
    .attr("fill", "grey")
}).catch(error => {
	console.log(error);
});
	