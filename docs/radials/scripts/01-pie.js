(function () {
  const margin = { top: 0, left: 0, right: 0, bottom: 0 };
  const height = 400 - margin.top - margin.bottom;
  const width = 780 - margin.left - margin.right;

const svg = d3
  .select('#chart-1')
  .append('svg')
  .style('background-color', 'white')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', `translate(${width/2}, ${height/2})`)

const labels = ['Typing Code', 'Rewriting Code', 'Reading StackOverflow']

const radius = 150

const colorScale = d3.scaleOrdinal().domain(labels).range(['#fac086', '#beaed4', '#7fc880'])

const pie = d3.pie().value(function(d) { 
  return d.minutes;
});

d3.csv('data/time-breakdown.csv')
  .then(ready)
  .catch(err => console.log('Failed with', err))

function ready(datapoints) {

console.log(datapoints)

const arc = svg.selectAll("arc")
  .data(pie(datapoints))
  .enter()
  
var path = d3.arc()
  .outerRadius(radius)
  .innerRadius(0)

arc.append("path")
  .attr("d", path)
  .attr("fill", d => colorScale(d.data.task))

var labelArc = d3.arc()
  .outerRadius(radius+20)
  .innerRadius(radius)


arc.append("text")
  .attr("transform", function(d) { 
           return "translate(" + labelArc.centroid(d) + ")"; 
   })
  .text(function(d) { return d.data.task; })
  .attr("text-anchor", function(d) {
    if(d.startAngle > Math.PI) {
      return "end"
    } else {
      return "start"
    }
  })



 }

})();