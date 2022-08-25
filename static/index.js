

// called by player dropdown
function playerSelected() {
  let dropdownMenu = d3.select("#selectPlayer");
  let player = dropdownMenu.property("value");
  console.log("crypto ticker selected value is " + player)
  // d3.json("/tickers/name/" + tickerName).then(function (response) {
  //   console.log("playerSelected response below");
  //   console.log(response);
  // })
  addSelectedPlayer(player)
}

function addSelectedPlayer(player) {
  // console.log("addTickerSelected being executed on " + ticker)
  d3.select("#userRoster")
    .append("button")
    .html(player)
    .attr("class", "player")
    .on("click", function (d) {
      // console.log(d);
      // console.log(i);
      // let testval = d3.event.target.childNodes[0].data
      console.log(d.target.childNodes[0].data);
    })

}


init();

function init() {
  // selectPlayerCard
  // populating the stocks dropdown with unique names from stocks.sqlite
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
    console.log("/players/all");
    console.log(response);
    // response = response.sort()

    for (var i = 0; i < response.length; i++) {
      var obj = response[i]
      d3.select('#selectPlayerCard')
          .append('option')
          .text(obj.avg) 
    }
  })

}//end init

//utility
function resetLines() {
  // console.log("resetlines executing")
  d3.select('#selectPlayer').selectAll("*").remove()
  tickerData = []
}


// scratch
// Append an option in the dropdown
      // response.forEach(function (player) {
      //   d3.select('#selectPlayer')
      //     .append('option')
      //     .text(player)
      // });

    // let dropdownMenu = d3.select("#selStock");
    // dropdownMenu.property("value") = "Netflix"