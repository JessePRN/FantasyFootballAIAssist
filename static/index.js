playerList = []

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
    // buildList(response)
    playerList = response
    for (var i = 0; i < response.length; i++) {
      var obj = response[i]
      d3.select('#playerList')
          .append('li')
          .attr('class', 'list-group-item')
          .text(obj.player + ", Points: " + obj.points2021 + ", POS:" + obj.pos) 
    }
  })

}//end init

//utility
function resetLines() {
  // console.log("resetlines executing")
  d3.select('#selectPlayer').selectAll("*").remove()
  tickerData = []
}

function filterBuildTable(pos){
  d3.select('#playerList').selectAll("*").remove()

  for (var i = 0; i < playerList.length; i++) {
    var obj = playerList[i]
    if(playerList[i].pos === pos){
    d3.select('#playerList')
        .append('li')
        .attr('class', 'list-group-item')
        .text(obj.player + ", Points: " + obj.points2021 + ", POS:" + obj.pos) 
      }
  }
}

// scratch
// Append an option in the dropdown
      // response.forEach(function (player) {
      //   d3.select('#selectPlayer')
      //     .append('option')
      //     .text(player)
      // });

  