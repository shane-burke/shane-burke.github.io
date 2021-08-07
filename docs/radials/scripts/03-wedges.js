(function () {
  const margin = { top: 0, left: 0, right: 0, bottom: 0 };
  const height = 400 - margin.top - margin.bottom;
  const width = 780 - margin.left - margin.right;

const svg = d3
  .select('#chart-3')
  .append('svg')
  .style('background-color', 'white')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', `translate(${width/2}, ${height/2})`)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

const radius = 150

const radiusScale = d3.scaleLinear().domain([0,80]).range([0,radius])

const colorScale = d3.scaleLinear()
.domain([32, 80])
.range(["#b7c9ff", "#e4acff"])

const pie = d3.pie().value(1/12);



d3.csv('data/ny-temps.csv')
  .then(ready)
  .catch(err => console.log('Failed with', err))

function ready(datapoints) {

console.log(datapoints)

const arc = svg.selectAll("arc")
  .data(pie(datapoints))
  .enter()
  
var path = d3.arc()
  .outerRadius(d => radiusScale(d.data.high_temp))
  .innerRadius(0)

arc.append("path")
  .attr("d", path)
  .attr('fill', d => colorScale(d.data.high_temp))
  .attr('stroke', 'none')

var path2 = d3.arc()
  .outerRadius(d => radiusScale(d.data.low_temp))
  .innerRadius(0)

arc.append("path")
  .attr("d", path2)
  .attr('fill', 'white')
  .attr('stroke', 'white')

svg.selectAll('text .title')
  .data(" ")
  .join('text')
  .text('NYC high temperatures by month')
  .attr('x', 0)
  .attr('y', -125)
  .style('font-size', '18px')
  .style('font-weight', '700')
  .attr('fill', 'black')
  .attr('text-anchor','middle')
  
const dot = [1]
  svg.selectAll('circle')
  .data(dot)
  .join('circle')
  .attr('r', d => radiusScale(d))
  .attr('x', 0)
  .attr('y', 0)
  .attr('cx', 0)

 }

})();