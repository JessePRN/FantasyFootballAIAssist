playerList = []
playerListDisplay = []
userRoster = []

// called by player dropdown
function playerSelected() {
  let dropdownMenu = d3.select("#selectPlayer");
  let player = dropdownMenu.property("value");
  console.log("selected player is " + player)
}

function addSelectedPlayer(player) {
  // console.log("addTickerSelected being executed on " + ticker)
  d3.select("#userRoster")
    .append("button")
    .html(player)
    .attr("class", "player")
    .on("click", function (d) {
      console.log(d.target.childNodes[0].data);
      console.log(searchPlayerList((d.target.childNodes[0].data).split(",")[0]))
    })
}

init();

function init() {

  // selectPlayerCard
  d3.json("/players/names").then(function (response) {
    console.log("/players/names");
    console.log(response);
    // response = response.sort()

    for (var i = 0; i < response.length; i++) {
      var obj = response[i]
      d3.select('#selectPlayer')
        .append('option')
        .text(obj.player)
    }
  })

  d3.json("/players/all").then(function (response) {
    // console.log("/players/all");
    // console.log(response);
    playerList = response
    filterBuildTableClean("All")
  })

  // displaying radius chart
  drawRadialChart('All')
  console.log("display radial chart")


}//end init

//utility
function resetLines() {
  // console.log("resetlines executing")
  d3.select('#userRoster').selectAll("*").remove()
  tickerData = []
}

//takes a player name and searches list of players for player data
function searchPlayerList(player) {
  for (var i = 0; i < playerList.length; i++) {
    var obj = playerList[i]
    if (player === obj.player) {
      return obj
    }
  }
}

function filterBuildTableClean(pos) {


  d3.select('#playerTable').selectAll("*").remove()
  playerListDisplay = []

  for (var i = 0; i < playerList.length; i++) {
        var obj = playerList[i]
    if (pos === "All") {
      playerListDisplay.push(obj)
    }else if(obj.pos === pos){
      playerListDisplay.push(obj)
    }

  }

  var tr = d3.select('#playerTable')
    .selectAll("tr")
    .data(playerListDisplay)
    .enter().append("tr")
  // console.log(tr)  

  var td = tr.selectAll("td")
    .data(function (d, i) { return Object.values(d); })
    .enter().append("td")
    .text(function (d) { return d; })
}

//populates player list based on position filter
// function filterBuildTable(pos) {
//   d3.select('#playerList').selectAll("*").remove()
//   for (var i = 0; i < playerList.length; i++) {
//     var obj = playerList[i]
//     if (pos === "All") {
//       d3.select('#playerList')
//         .append('li')
//         .attr('class', 'list-group-item')

//         // .text(obj.player + ", Points: " + obj.points2021 + ", POS:" + obj.pos)
//         .text(obj.player + ", Points: " + obj.points2021 + ", POS:" + obj.pos
//           + ", Production:" + obj.production.toFixed(3) + ", ATP:" + obj.atp.toFixed(3) + ", Team:" + obj.team
//           + ", AVG:" + obj.avg + ", Prediction:" + obj.pred.toFixed(3))
//         .on("click", function (d) {
//           // console.log(d);
//           // console.log(i);
//           // let testval = d3.event.target.childNodes[0].data
//           addSelectedPlayer(d.target.childNodes[0].data)
//           console.log(d.target.childNodes[0].data);
//           // console.log()
//         })
//     }
//     else if (playerList[i].pos === pos) {
//       d3.select('#playerList')
//         .append('li')
//         .attr('class', 'list-group-item')
//         // .text(obj.player + ", Points: " + obj.points2021 + ", POS:" + obj.pos)
//         .text(obj.player + ", Points: " + obj.points2021 + ", POS:" + obj.pos
//           + ", Production:" + obj.production.toFixed(3) + ", ATP:" + obj.atp.toFixed(3) + ", Team:" + obj.team
//           + ", AVG:" + obj.avg + ", Prediction:" + obj.pred.toFixed(3))
//         .on("click", function (d) {
//           // console.log(d);
//           // console.log(i);
//           // let testval = d3.event.target.childNodes[0].data
//           addSelectedPlayer(d.target.childNodes[0].data)
//           console.log(d.target.childNodes[0].data);
//           // console.log()
//         })
//     }
//   }
// }

// drawing the radial chart

function drawRadialChart(pos) {
  console.log('draw radial chart is working?')
  // set the dimensions and margins of the graph
  const margin = { top: 0, right: 0, bottom: 0, left: -250 },
    width = 1500 - margin.left - margin.right,
    height = 1500 - margin.top - margin.bottom,
    innerRadius = 350,
    outerRadius = Math.min(width, height) / 2.5;   // the outerRadius goes from the middle of the SVG area to the border

  // append the svg object
  const svg = d3.select("#radialChart")
    .html("")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

  // accessing player data
  d3.json('/draft').then(function (data) {
    if (pos != 'All') {
      data = data.filter(d => { return d.Pos == pos })
    }

    // Scales
    const x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(data.map(d => d.Player)); // The domain of the X axis is the list of states.
    const y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 14000]); // Domain of Y is from 0 to the max seen in the data

    // Add the bars
    svg.append("g")
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius(innerRadius)
        .outerRadius(d => y(15 * d['Prediction']))
        .startAngle(d => x(d.Player))
        .endAngle(d => x(d.Player) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius))

    // Add the labels
    svg.append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("text-anchor", function (d) { return (x(d.Player) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
      .attr("transform", function (d) { return "rotate(" + ((x(d.Player) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d['Prediction']) + 90) + ",0)"; })
      .append("text")
      .text(function (d) { return (d.Player) })
      .attr("transform", function (d) { return (x(d.Player) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
      .style("font-size", "11px")
      .attr("alignment-baseline", "middle")

    console.log("confirm chart is graphed")
  })
};

// function to update all the charts 
function updateAllCharts(pos) {
  filterBuildTableClean(pos)
  drawRadialChart(pos)

  console.log("confirm updating all charts")
}