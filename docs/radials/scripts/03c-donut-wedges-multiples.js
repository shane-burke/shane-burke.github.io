(function () {
  const margin = { top: 30, left: 30, right: 30, bottom: 30 };

  const height = 400 - margin.top - margin.bottom;

  const width = 780 - margin.left - margin.right;

  const svg = d3
    .select("#chart-3c")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
    "Blah",
  ];

  d3.csv("/data/all-temps.csv")
    .then(ready)
    .catch((err) => console.log("Failed on", err));

  function ready(datapoints) {
    



    
  }
})();
