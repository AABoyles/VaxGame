function frontTick() {
  frontNode
    .attr("cx", t => t.x = Math.max(8, Math.min(width - 50, t.x)))
    .attr("cy", t => t.y = Math.max(8, Math.min(450, t.y)));
  frontLink
    .attr("x1", t => t.source.x)
    .attr("y1", t => t.source.y)
    .attr("x2", t => t.target.x)
    .attr("y2", t => t.target.y);
}

function generateFrontGraph() {
  var t = -3e4;
  frontGraph = {},
  frontNodes = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3}
  ];
  frontLinks = [{
    source: frontNodes[0],
    target: frontNodes[1]
  }, {
    source: frontNodes[1],
    target: frontNodes[2]
  }, {
    source: frontNodes[2],
    target: frontNodes[0]
  }, {
    source: frontNodes[1],
    target: frontNodes[3]
  }];
  frontGraph.nodes = frontNodes;
  frontGraph.links = frontLinks;
  
  frontForce = d3.layout.force()
    .nodes(frontGraph.nodes)
    .links(frontGraph.links)
    .size([width, height])
    .charge(t)
    .friction(.8)
    .on("tick", frontTick).start();
  
  frontLink = homeSVG.selectAll(".link")
    .data(frontGraph.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .style("fill", "#707070")
    .style("stroke-width", "10px")
    .style("stroke", "#d5d5d5");

  frontNode = homeSVG.selectAll(".node")
    .data(frontGraph.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 50)
    .style("stroke", "#b7b7b7")
    .style("stroke-width", "10px")
    .attr("fill", t => ((3 == t.id) ? "#f1d2d2" : "#d5d5d5"))
    .call(frontForce.drag)
}
var rewire = .1,
  meanDegree = 3,
  diseaseIsSpreading = !1,
  transmissionRate = .35,
  recoveryRate = 0,
  maxRecoveryTime = 1e6,
  numberVaccinated = 0,
  timeToStop = !0,
  guideRailsPosition = 0,
  postInitialOutbreak = !1,
  finalStop = !1,
  endGame = !1,
  intervention = !1,
  tutorial = !1,
  charge = -400,
  newInfections = [],
  xyCoords = [],
  vax = 1,
  currentFlash = 0,
  keepFlashing = !0,
  xFlashCounter = 0,
  numberQuarantined = 0,
  vaccineSupply = 0,
  vaccinateMode = !1,
  quarantineMode = !1,
  twine = [],
  twineIndex = 0,
  numberOfCommunities = null,
  largestCommunity = null,
  communities = [],
  groupCounter = 1,
  bcScores = [],
  timestep = 0,
  indexCase = null,
  opacityIndex = 0,
  lessonText, start = !1,
  nextX = 800,
  nextY = 140,
  guideXCoord = 400,
  guideYCoord = 70,
  guide2YCoordChange = 35,
  width = 950,
  height = 673,
  svg, guideTextSVG, force, link, node, friction = .9,
  backX = 115,
  numberSaved = 0,
  infectedBar, uninfectedBar, exposureEdges = [],
  simulation = !0,
  vaccineResearched = !1,
  pleaseWait = !1,
  game = !1,
  startButton,
  homeSVG = d3.select("body").append("svg").attr("class", "homeSVG").attr({
    width: "100%",
    height: "87.5%"
  }).attr("viewBox", "0 0 " + width + " " + height).attr("pointer-events", "all").style("position", "absolute");

generateFrontGraph();

d3.select(".homeSVG")
  .append("text")
  .attr("class", "homeTitle")
  .attr("x", 390)
  .attr("y", 265)
  .attr("fill", "#707070")
  .text("VAX!");

d3.select(".homeSVG")
  .append("text")
  .attr("class", "homeText")
  .attr("x", 275)
  .attr("y", 315)
  .attr("fill", "#707070")
  .text("A game about epidemic prevention.");
  
d3.select(".homeSVG")
  .append("text")
  .attr("class", "homeTutorial")
  .attr("x", 802).attr("y", 525)
  .attr("fill", "#707070")
  .on("mouseover", function() {
    d3.select(this).style("fill", "#2692F2")
  }).on("mouseout", function() {
    d3.select(this).style("fill", "#707070")
  }).text("Tour >").on("click", function() {
    window.location.href = "/tour"
  })
  
d3.select(".homeSVG")
  .append("text")
  .attr("class", "homeGame")
  .attr("x", 744)
  .attr("y", 558)
  .attr("fill", "#707070")
  .text("Full Game >")
  .on("mouseover", function() {
    d3.select(this).style("fill", "#2692F2")
  }).on("mouseout", function() {
    d3.select(this).style("fill", "#707070")
  }).on("click", function() {
    window.location.href = "/game"
  });
  
d3.select(".homeSVG")
  .append("text")
  .attr("class", "homeHI")
  .attr("x", 692)
  .attr("y", 590)
  .attr("fill", "#707070")
  .attr("font-size", "23px")
  .style("font-family", "Nunito")
  .style("cursor", "pointer")
  .text("Herd Immunity >")
  .on("mouseover", function() {
    d3.select(this).style("fill", "#2692F2")
  }).on("mouseout", function() {
    d3.select(this).style("fill", "#707070")
  }).on("click", function() {
    window.location.href = "/herd-immunity"
  });

d3.select(".homeSVG")
  .append("text")
  .attr("x", 718)
  .attr("y", 612)
  .style("cursor", "pointer")
  .attr("fill", "#707070")
  .on("mouseover", function() {
    d3.select(this).style("fill", "#2692F2")
  }).on("mouseout", function() {
    d3.select(this).style("fill", "#707070")
  }).on("click", function() {
    window.location.href = "http://salathegroup.com"
  }).text("Salathé Group | 2014");
