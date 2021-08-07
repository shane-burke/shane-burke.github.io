// (function () {
//   const margin = { top: 20, left: 0, right: 0, bottom: 0 };
//   const height = 400 - margin.top - margin.bottom;
//   const width = 400 - margin.left - margin.right;

//   const svg = d3
//     .select("#chart-6")
//     .append("svg")
//     .attr("height", height + margin.top + margin.bottom)
//     .attr("width", width + margin.left + margin.right)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
//   }
// })();


(function () {
  const margin = { top: 0, left: 0, right: 0, bottom: 0 };
  const height = 400 - margin.top - margin.bottom;
  const width = 780 - margin.left - margin.right;

const svg = d3
  .select('#chart-6')
  .append('svg')
  .style('background-color', 'white')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', `translate(${width/2}, ${height/2})`)

const categories = ['Food', 'Service', 'Atmosphere', 'Price', 'Trendiness']

const radius = 150

const pie = d3.pie().value(1/5);

const radiusScale = d3.scaleLinear().domain([0,5]).range([0,radius])
const angleScale = d3.scalePoint().domain(categories).range([0, ((2 * Math.PI)/5 * 4)]) // use 2pi because it's radians and 2pi is the circ



d3.csv("/data/ratings.csv")
.then(ready)
.catch((err) => console.log("Failed with", err));

function ready(datapoints) {
console.log(datapoints)

// Adding outline to radar 
//(Adding it as another path behind it because the stroke won't connect)
const areaOutline = d3.radialLine()
.radius(d => radiusScale(d.score)+.5) //uses radius and angle rather than x/y luckily
.angle(d => angleScale(d.category))

svg.append('path')
  .datum(datapoints)
  .attr('d', areaOutline)
  .attr('fill', 'black')
  .attr('stroke', 'black')
  .attr('stroke-width', .75)



//Adding radial line
const area = d3.radialLine()
.radius(d => radiusScale(d.score)) //uses radius and angle rather than x/y luckily
.angle(d => angleScale(d.category))

svg.append('path')
  .datum(datapoints)
  .attr('d', area)
  .attr('fill', '#fee')
  .attr('stroke', 'none')

//Adding the five divider lines
const arc = svg.selectAll("arc")
  .data(pie(datapoints))
  .enter()
  
var path = d3.arc()
  .outerRadius(radius)
  .innerRadius(0)

arc.append("path")
  .attr("d", path)
  .attr('fill', 'none')
  .attr('stroke', 'lightgrey')
  .attr('stroke-width', .5)



//Adding bands
const bands = [0.025, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
  svg.selectAll('circle')
  .data(bands)
  .join('circle')
  .attr('r', d => radiusScale(d))
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('stroke', 'lightgrey')
  .attr('stroke-width', .5)
  .attr('fill', 'none')




// Adding in category labels
svg.selectAll('text .labels')
  .data(categories)
  .join('text')
  .text(d => d)
  .attr('x', 0)
  .attr('dx', 0)
  .attr('y', -radius)
  .attr('dy', -10)
  .attr('text-anchor', 'middle')
  .attr('transform', d =>`rotate(${(angleScale(d) * 180) / Math.PI})`)

 }

})();