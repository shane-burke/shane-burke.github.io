(function () {

  const margin = { top: 40, right: 30, bottom: 20, left: 40 }

  const width = 400 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

  // You'll probably need to edit this one
  const svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // i'll give you between 0-50k
  // you give back between 0-width (left hand side
  // to the right hand side)
  const xPositionScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width])

  const yPositionScale = d3.scaleLinear()
    .domain([0, 1250])
    .range([height, 0])

  const colorScale = d3.scaleOrdinal()
    .range(['#b3e2cd','#fdcdac','#cbd5e8','#f4cae4','#e6f5c9','#fff2ae','#f1e2cc','#cccccc'])



  const countryLabel = svg.append("text")
    .attr("x", xPositionScale(76))
    .attr('text-anchor', 'end')
    .attr("y", yPositionScale(1100)) 
    .text("")
    .attr('font-size', '12')
    .attr('font-family', 'Helvetica')

  const countryLabel2 = svg.append("text")
    .attr("x", xPositionScale(0))
    .attr('text-anchor', 'end')
    .attr("y", yPositionScale(0))
    .text("")
    .attr('font-size', '12')
    .attr('font-family', 'Helvetica')

  d3.csv("vaccines_cases.csv")
    .then(ready)

  function ready (datapoints) {
    // add one circle to the 
    // svg for each datapoint

    // grab all circles inside of the svg
    // attach the datapoints to the circles
    // make sure we have the right num of circles
    svg.selectAll('circle')
      .data(datapoints, d => d.location)
      .join('circle')
      .attr('r', 5)
      .attr('cx', d => xPositionScale(d.one_dose))
      .attr('cy', d => yPositionScale(d.daily_cases))
      .attr('fill', d => colorScale(d.continent))

    const legend = svg.append('g')
      .attr("transform", "translate(10,10)")

    const continents = colorScale.domain()


    legend.selectAll('rect')
        .data(continents)
        .join('rect')
        .attr('width', 5)
        .attr('height', 5)
        .attr('x', '65%')
        .attr('y', (d, i) => i * 20 + 200)
        .attr('fill', d=> colorScale(d))
        .attr('stroke', 'lightgrey')
        .attr('stroke-width', .1)
      
    legend.selectAll('text')
        .data(continents)
        .join('text')
        .attr('x', '67.5%')
        .attr('y', (d, i) => i * 20 + 200)
        .text(d => d)
        .attr('dy', 6) //y offset
        .attr('font-size', 10)

  
    d3.select("#step-1").on('stepin', function() {
      countryLabel.text('Seychelles').attr("x", xPositionScale(76)).attr("y", yPositionScale(1100))
      countryLabel2.text('')
      
      
      d3.selectAll('circle')
        .filter(d => d.location !== 'Seychelles')
        .transition()
        .attr('fill', 'lightgrey')

      d3.selectAll('circle')
        .filter(d => d.location == 'Seychelles')
        .transition()
        .attr('stroke', 'darkgrey')
        .raise()
      

    })

    d3.select("#step-1").on('stepout', function() {
      // Reset fill and stroke when scrolling back to top
      countryLabel.text('')
      countryLabel2.text('')
      
      
      d3.selectAll('circle')
        .transition()
        .attr('fill', d => colorScale(d.continent))
        .attr('stroke', 'none')

      
    })

    d3.select("#step-2").on('stepin', function() {
      // Reset fill and stroke when scrolling to step 2
      countryLabel.text('United Kingdom').attr("x", xPositionScale(70)).attr("y", yPositionScale(430))
      countryLabel2.text('Cyprus').attr("x", xPositionScale(56)).attr("y", yPositionScale(780))
      
      d3.selectAll('circle')
        .filter(d => (d.location !== 'United Kingdom') || (d.location !== 'Cyprus'))
        .transition()
        .attr('fill', 'lightgrey')
        .attr('stroke', 'none')

      d3.selectAll('circle')
        .filter(d => (d.location == 'United Kingdom') || (d.location == 'Cyprus'))
        .transition()
        .attr('fill', d => colorScale(d.continent))
        .attr('stroke', 'darkgrey')
        .raise()

    })

    d3.select("#step-3").on('stepin', function() {
      // Reset fill and stroke when scrolling to step 2
      countryLabel.text('Mongolia').attr("x", xPositionScale(70)).attr("y", yPositionScale(638))
      countryLabel2.text('')
      
      
      d3.selectAll('circle')
        .filter(d => (d.location !== 'Mongolia'))
        .transition()
        .attr('fill', 'lightgrey')
        .attr('stroke', 'none')

      d3.selectAll('circle')
        .filter(d => (d.location == 'Mongolia'))
        .transition()
        .attr('fill', d => colorScale(d.continent))
        .attr('stroke', 'darkgrey')
        .raise()

    })

    var yAxis = d3.axisLeft(yPositionScale);
    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis)

    var xAxis = d3.axisBottom(xPositionScale)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    }

})();