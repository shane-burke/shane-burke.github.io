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
  .select('#chart-7')
  .append('svg')
  .style('background-color', 'white')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', `translate(${width/2}, ${height/2})`)

const categories = ['Midnight', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

const times = ['00:00',
'00:15',
'00:30',
'00:45',
'01:00',
'01:15',
'01:30',
'01:45',
'02:00',
'02:15',
'02:30',
'02:45',
'03:00',
'03:15',
'03:30',
'03:45',
'04:00',
'04:15',
'04:30',
'04:45',
'05:00',
'05:15',
'05:30',
'05:45',
'06:00',
'06:15',
'06:30',
'06:45',
'07:00',
'07:15',
'07:30',
'07:45',
'08:00',
'08:15',
'08:30',
'08:45',
'09:00',
'09:15',
'09:30',
'09:45',
'10:00',
'10:15',
'10:30',
'10:45',
'11:00',
'11:15',
'11:30',
'11:45',
'12:00',
'12:15',
'12:30',
'12:45',
'13:00',
'13:15',
'13:30',
'13:45',
'14:00',
'14:15',
'14:30',
'14:45',
'15:00',
'15:15',
'15:30',
'15:45',
'16:00',
'16:15',
'16:30',
'16:45',
'17:00',
'17:15',
'17:30',
'17:45',
'18:00',
'18:15',
'18:30',
'18:45',
'19:00',
'19:15',
'19:30',
'19:45',
'20:00',
'20:15',
'20:30',
'20:45',
'21:00',
'21:15',
'21:30',
'21:45',
'22:00',
'22:15',
'22:30',
'22:45',
'23:00',
'23:15',
'23:30',
'23:45']

const radius = 180
const radius2 = 50

const pie = d3.pie().value(1/25);

const radiusScale = d3.scaleLinear().domain([0,80000]).range([0,radius])
//const radiusScaleInner = d3.scaleLinear().domain([0,41175.44792]).range([0,50])


const angleScale = d3.scalePoint().domain(times).range([0, ((2 * Math.PI)/96 * 95)]) // use 2pi because it's radians and 2pi is the circ
const angleScale2 = d3.scalePoint().domain(categories).range([0, ((2 * Math.PI)/24 * 23)]) // use 2pi because it's radians and 2pi is the circ



const colorScale = d3.scaleLinear()
.domain([20000, 80000])
.range(["#b7c9ff", "#e4acff"])

//--//--////--//--////--//--////--//--////--//--////--//--////--//--////--//--////--//--////--//--////--//--//



d3.csv("/data/time-binned.csv")
.then(ready)
.catch((err) => console.log("Failed with", err));

function ready(datapoints) {
console.log(datapoints)

svg.append("radialGradient")				
        .attr("id", "area-gradient")			
        .attr("gradientUnits", "userSpaceOnUse")	
        .attr("cx", 0)
        .attr("cy", 0)
    .selectAll("stop")						
        .data([								
            {offset: "0%", color: "darkblue"},		
            {offset: "16%", color: "aqua"},	
            {offset: "16%", color: "orange"},		
            {offset: "30%", color: "red"},		
            {offset: "50%", color: "darkred"},	
            {offset: "80%", color: "orange"}	
        ])						
    .enter().append("stop")			
        .attr("offset", function(d) { return d.offset; })	
        .attr("stop-color", function(d) { return d.color; });

//Adding radial line
const area = d3.radialLine()
.radius(d => radiusScale(d.total)) 
.angle(d => angleScale(d.time))

svg.append('path')
  .attr('class', 'area')
  .datum(datapoints)
  .attr('d', area)
  .attr('fill', 'url(#area-gradient')	


const area2 = d3.radialLine()
  .radius(radiusScale(41175.44792)) 
  .angle(d => angleScale(d.time))
  
  svg.append('path')
  .attr('class', 'area')
  .datum(datapoints)
  .attr('d', area2)
  .attr('fill', 'white')	

const area3 = d3.radialLine()
  .radius(d => radiusScale(d.total)) 
  .angle(d => angleScale(d.time))
  
  svg.append('path')
    .attr('class', 'area')
    .datum(datapoints)
    .attr('d',area3)
    .attr('fill', 'url(#area-gradient')	
  

// const area3 = d3.radialLine()
//   .radius(d => radiusScaleInner(d.total)) 
//   .angle(d => angleScale(d.time))
  
//  svg.append('path')
//   .attr('class', 'area')
//    .datum(datapoints)
//    .attr('d', area3)
//   .attr('fill', 'url(#area-gradient')	


//Adding bands
const bands = ['10000', '30000', '50000']
  svg.selectAll('circle')
  .data(bands)
  .join('circle')
  .attr('r', d => radiusScale(d))
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('stroke', 'lightgrey')
  .attr('stroke-width', .5)
  .attr('fill', 'none')


  svg.selectAll('circle')
  .join('circle')
  .attr('r', radius)
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
  .attr('dy', 15)
  .attr('text-anchor', 'middle')
  .attr('transform', d =>`rotate(${(angleScale2(d) * 180) / Math.PI})`)
  .style('font-size', 10)
  .style('fill', 'grey')

svg.selectAll('text .labels2')
  .data(categories)
  .join('text')
  .text('●')
  .attr('x', 0)
  .attr('dx', 0)
  .attr('y', -radius)
  .attr('dy', 2.5)
  .attr('text-anchor', 'middle')
  .attr('transform', d =>`rotate(${(angleScale2(d) * 180) / Math.PI})`)
  .style('font-size', 8)
  .style('fill', 'grey')
  .style('stroke', 'white')
  .style('stroke-width', 2)



svg.selectAll('text .title')
  .data(" ")
   .join('text')
  .text('EVERYONE!')
  .attr('x', 0)
  .attr('y', 0)
  .style('font-size', '16px')
  .style('font-weight', '700')
  .attr('fill', 'black')
  .attr('text-anchor','middle')
  .attr('alignment-baseline', 'middle')


svg.selectAll('text .title')
  .data(" ")
   .join('text')
  .text('is born at 8 am')
  .attr('x', 0)
  .attr('y', 0)
  .attr('dy', 15)
  .style('font-size', '10px')
  .style('font-weight', '700')
  .attr('fill', 'black')
  .attr('text-anchor','middle')
  .attr('alignment-baseline', 'middle')

svg.selectAll('text .title')
  .data(" ")
   .join('text')
  .text('(read Macbeth for details)')
  .attr('x', 0)
  .attr('y', 0)
  .attr('dy', 30)
  .style('font-size', '7px')
  .style('font-weight', '300')
  .attr('fill', 'black')
  .attr('text-anchor','middle')
  .attr('alignment-baseline', 'middle')

 }

})();