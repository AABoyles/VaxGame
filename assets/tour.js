var diseaseIsSpreading = false,
    transmissionRate = .35,
    maxRecoveryTime = 1e6,
    numberVaccinated = 0,
    timeToStop = true,
    guideRailsPosition = 0,
    postInitialOutbreak = false,
    finalStop = false,
    endGame = false,
    intervention = false,
    tutorial = false,
    charge = -400,
    newInfections = [],
    xyCoords = [],
    vax = 1,
    currentFlash = 0,
    keepFlashing = true,
    xFlashCounter = 0,
    numberQuarantined = 0,
    vaccineSupply = 0,
    vaccinateMode = false,
    quarantineMode = false,
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
    lessonText, start = false,
    nextX = 750,
    nextY = 140,
    guideXCoord = 400,
    guideYCoord = 70,
    guide2YCoordChange = 35,
    width = window.innerWidth,
    height = window.innerheight,
    diseaseIsSpreading = false,
    transmissionRate = .35,
    maxRecoveryTime = 1e6,
    numberVaccinated = 0,
    timeToStop = true,
    guideRailsPosition = 0,
    postInitialOutbreak = false,
    finalStop = false,
    endGame = false,
    intervention = false,
    tutorial = false,
    charge = -400,
    newInfections = [],
    xyCoords = [],
    vax = 1,
    currentFlash = 0,
    keepFlashing = true,
    xFlashCounter = 0,
    numberQuarantined = 0,
    vaccineSupply = 0,
    vaccinateMode = false,
    quarantineMode = false,
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
    lessonText, start = false,
    nextX = 750,
    nextY = 140,
    guideXCoord = 400,
    guideYCoord = 70,
    guide2YCoordChange = 35,
    width = window.innerWidth,
    height = window.innerHeight,
    svg = d3.select('body').append('svg'),
    guideTextSVG,
    force,
    link,
    node,
    friction = .9,
    backX = 115,
    numberSaved = 0,
    infectedBar,
    uninfectedBar,
    exposureEdges = [],
    vaccineResearched = false,
    pleaseWait = false,
    game = false,
    startButton,
    backEnable = true,
    nextEnable = true,
    pop,
    trivialGraph = {
      nodes: [],
      links: []
    };

tailoredNodes = [];
for (e = 0; e < 13; e++) {
  tailoredNodes.push({
    id: e + 13,
    status: "S",
    group: null,
    edges: [],
    marked: false,
    degree: null,
    bcScore: null,
    exposureTimestep: null,
    infectedBy: null
  });
}

var tailoredLinks = [{
    source: tailoredNodes[0],
    target: tailoredNodes[1],
    remove: false
  }, {
    source: tailoredNodes[0],
    target: tailoredNodes[4],
    remove: false
  }, {
    source: tailoredNodes[0],
    target: tailoredNodes[5],
    remove: false
  }, {
    source: tailoredNodes[0],
    target: tailoredNodes[12],
    remove: false
  }, {
    source: tailoredNodes[1],
    target: tailoredNodes[0],
    remove: false
  }, {
    source: tailoredNodes[1],
    target: tailoredNodes[12],
    remove: false
  }, {
    source: tailoredNodes[1],
    target: tailoredNodes[2],
    remove: false
  }, {
    source: tailoredNodes[1],
    target: tailoredNodes[7],
    remove: false
  }, {
    source: tailoredNodes[1],
    target: tailoredNodes[10],
    remove: false
  }, {
    source: tailoredNodes[4],
    target: tailoredNodes[0],
    remove: false
  }, {
    source: tailoredNodes[4],
    target: tailoredNodes[5],
    remove: false
  }, {
    source: tailoredNodes[4],
    target: tailoredNodes[6],
    remove: false
  }, {
    source: tailoredNodes[5],
    target: tailoredNodes[0],
    remove: false
  }, {
    source: tailoredNodes[5],
    target: tailoredNodes[4],
    remove: false
  }, {
    source: tailoredNodes[5],
    target: tailoredNodes[6],
    remove: false
  }, {
    source: tailoredNodes[12],
    target: tailoredNodes[0],
    remove: false
  }, {
    source: tailoredNodes[12],
    target: tailoredNodes[1],
    remove: false
  }, {
    source: tailoredNodes[12],
    target: tailoredNodes[2],
    remove: false
  }, {
    source: tailoredNodes[12],
    target: tailoredNodes[3],
    remove: false
  }, {
    source: tailoredNodes[2],
    target: tailoredNodes[1],
    remove: false
  }, {
    source: tailoredNodes[2],
    target: tailoredNodes[12],
    remove: false
  }, {
    source: tailoredNodes[2],
    target: tailoredNodes[10],
    remove: false
  }, {
    source: tailoredNodes[2],
    target: tailoredNodes[3],
    remove: false
  }, {
    source: tailoredNodes[2],
    target: tailoredNodes[8],
    remove: false
  }, {
    source: tailoredNodes[2],
    target: tailoredNodes[9],
    remove: false
  }, {
    source: tailoredNodes[2],
    target: tailoredNodes[11],
    remove: false
  }, {
    source: tailoredNodes[7],
    target: tailoredNodes[1],
    remove: false
  }, {
    source: tailoredNodes[10],
    target: tailoredNodes[1],
    remove: false
  }, {
    source: tailoredNodes[10],
    target: tailoredNodes[2],
    remove: false
  }, {
    source: tailoredNodes[10],
    target: tailoredNodes[8],
    remove: false
  }, {
    source: tailoredNodes[3],
    target: tailoredNodes[12],
    remove: false
  }, {
    source: tailoredNodes[3],
    target: tailoredNodes[2],
    remove: false
  }, {
    source: tailoredNodes[3],
    target: tailoredNodes[8],
    remove: false
  }, {
    source: tailoredNodes[3],
    target: tailoredNodes[6],
    remove: false
  }, {
    source: tailoredNodes[8],
    target: tailoredNodes[2],
    remove: false
  }, {
    source: tailoredNodes[8],
    target: tailoredNodes[10],
    remove: false
  }, {
    source: tailoredNodes[8],
    target: tailoredNodes[3],
    remove: false
  }, {
    source: tailoredNodes[8],
    target: tailoredNodes[9],
    remove: false
  }, {
    source: tailoredNodes[9],
    target: tailoredNodes[2],
    remove: false
  }, {
    source: tailoredNodes[9],
    target: tailoredNodes[8],
    remove: false
  }, {
    source: tailoredNodes[11],
    target: tailoredNodes[2],
    remove: false
  }, {
    source: tailoredNodes[6],
    target: tailoredNodes[4],
    remove: false
  }, {
    source: tailoredNodes[6],
    target: tailoredNodes[5],
    remove: false
  }, {
    source: tailoredNodes[6],
    target: tailoredNodes[3],
    remove: false
  }
];

var graph = {
  nodes: tailoredNodes,
  links: tailoredLinks
};
    
function getWeakTieNodes() {
  var t = [];
  for (e = 0; 30 > e; e++) {
    t.push({
      id: e,
      status: "S",
      group: null,
      edges: [],
      marked: false,
      degree: null,
      bcScore: null,
      exposureTimestep: null,
      infectedBy: null
    });
  }
  return t;
}

function getWeakTieLinks() {
  return [{
    source: weakTieNodes[1],
    target: weakTieNodes[3],
    remove: false
  }, {
    source: weakTieNodes[3],
    target: weakTieNodes[6],
    remove: false
  }, {
    source: weakTieNodes[4],
    target: weakTieNodes[1],
    remove: false
  }, {
    source: weakTieNodes[4],
    target: weakTieNodes[2],
    remove: false
  }, {
    source: weakTieNodes[4],
    target: weakTieNodes[3],
    remove: false
  }, {
    source: weakTieNodes[4],
    target: weakTieNodes[8],
    remove: false
  }, {
    source: weakTieNodes[4],
    target: weakTieNodes[9],
    remove: false
  }, {
    source: weakTieNodes[5],
    target: weakTieNodes[16],
    remove: false
  }, {
    source: weakTieNodes[6],
    target: weakTieNodes[1],
    remove: false
  }, {
    source: weakTieNodes[8],
    target: weakTieNodes[12],
    remove: false
  }, {
    source: weakTieNodes[8],
    target: weakTieNodes[13],
    remove: false
  }, {
    source: weakTieNodes[9],
    target: weakTieNodes[15],
    remove: false
  }, {
    source: weakTieNodes[10],
    target: weakTieNodes[6],
    remove: false
  }, {
    source: weakTieNodes[10],
    target: weakTieNodes[18],
    remove: false
  }, {
    source: weakTieNodes[12],
    target: weakTieNodes[2],
    remove: false
  }, {
    source: weakTieNodes[12],
    target: weakTieNodes[9],
    remove: false
  }, {
    source: weakTieNodes[13],
    target: weakTieNodes[2],
    remove: false
  }, {
    source: weakTieNodes[13],
    target: weakTieNodes[17],
    remove: false
  }, {
    source: weakTieNodes[14],
    target: weakTieNodes[13],
    remove: false
  }, {
    source: weakTieNodes[14],
    target: weakTieNodes[15],
    remove: false
  }, {
    source: weakTieNodes[15],
    target: weakTieNodes[2],
    remove: false
  }, {
    source: weakTieNodes[15],
    target: weakTieNodes[5],
    remove: false
  }, {
    source: weakTieNodes[16],
    target: weakTieNodes[14],
    remove: false
  }, {
    source: weakTieNodes[16],
    target: weakTieNodes[17],
    remove: false
  }, {
    source: weakTieNodes[18],
    target: weakTieNodes[19],
    remove: false
  }, {
    source: weakTieNodes[19],
    target: weakTieNodes[10],
    remove: false
  }, {
    source: weakTieNodes[19],
    target: weakTieNodes[24],
    remove: false
  }, {
    source: weakTieNodes[19],
    target: weakTieNodes[28],
    remove: false
  }, {
    source: weakTieNodes[21],
    target: weakTieNodes[23],
    remove: false
  }, {
    source: weakTieNodes[21],
    target: weakTieNodes[28],
    remove: false
  }, {
    source: weakTieNodes[22],
    target: weakTieNodes[18],
    remove: false
  }, {
    source: weakTieNodes[23],
    target: weakTieNodes[19],
    remove: false
  }, {
    source: weakTieNodes[23],
    target: weakTieNodes[22],
    remove: false
  }, {
    source: weakTieNodes[24],
    target: weakTieNodes[26],
    remove: false
  }, {
    source: weakTieNodes[28],
    target: weakTieNodes[24],
    remove: false
  }, {
    source: weakTieNodes[29],
    target: weakTieNodes[26],
    remove: false
  }];
}

var player = graph.nodes[0];

function detectEndGame() {
  updateCommunities();
  for (var t = 0, e = 1; numberOfCommunities + 1 > e; e++) {
    for (var n = 0, r = 0, i = 0; i < graph.nodes.length; i++) {
      var o = graph.nodes[i];
      parseFloat(o.group) != e || ("S" == o.status && n++,
        "I" == o.status && r++,
        "E" == o.status && r++)
    }
    r > 0 && n > 0 && t++
  }
  0 == t && diseaseIsSpreading && (endGame = true,
    diseaseIsSpreading = false,
    timeToStop = true,
    !vaccinateMode || quarantineMode || game || (animatePathogens_thenUpdate(),
      tutorialUpdate()))
}

function edgeExists(t, e, n) {
  for (var r = false, i = 0; i < n.links.length; i++) {
    var o = n.links[i];
    o.source.id == t.id ? o.target.id == e.id && (r = true) : o.target.id == t.id && o.source.id == e.id && (r = true)
  }
  return r
}

function tick() {
  node
    .attr("cx", t => t.x)
    .attr("cy", t => t.y);
  link
    .attr("x1", t => t.source.x)
    .attr("y1", t => t.source.y)
    .attr("x2", t => t.target.x)
    .attr("y2", t => t.target.y)
}

let drag = d3.drag()
  .on("start", event => {
    if (!event.active) force.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  })
  .on("drag", event => {
    event.subject.fx = event.x;
    event.subject.fy = event.y;    
  })
  .on("end", event => {
    if (!event.active) force.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  });

function tutorialUpdate() {
  3 == guideRailsPosition && d3.selectAll(".node").transition().duration(300)
    .attr("r", 8);
  var t = removeVaccinatedNodes(graph);
      e = removeOldLinks(graph);
  graph.links = e;
  updateCommunities();
  force.nodes(t).charge(charge).friction(.75).links(e).start();
  link = svg.selectAll("line.link").data(e, t => t.source.id + "-" + t.target.id);
  link.enter().insert("svg:line", ".node")
    .attr("class", "link")
    .attr("x1", t => t.source.x)
    .attr("y1", t => t.source.y)
    .attr("x2", t => t.target.x)
    .attr("y2", t => t.target.y);
  link.exit().remove()
  node = svg.selectAll("circle.node").data(t, t => t.id)
    .attr("r", 8)
    .style("fill", function(t) {
      var e = null;
      return
        "S" == t.status && (e = "#b7b7b7"),
        "E" == t.status && (e = "#ef5555"),
        "I" == t.status && (e = "#ef5555"),
        "R" == t.status && (e = "#9400D3"),
        "V" == t.status && (e = "#d9d678"),
        t.id == player.id && "I" != t.status && 6 > guideRailsPosition && (e = "#2fa0ef"),
        e
    });
  node.enter().append("svg:circle")
    .attr("class", "node")
    .attr("cx", t => t.x)
    .attr("cy", t => t.y)
    .attr("r", 8)
    .style("fill", function(t) {
      var e = null;
      return
        "S" == t.status && (e = "#b7b7b7"),
        "E" == t.status && (e = "#ef5555"),
        "I" == t.status && (e = "#ef5555"),
        "R" == t.status && (e = "#9400D3"),
        "V" == t.status && (e = "#d9d678"),
        t.id == player.id && "I" != t.status && 6 > guideRailsPosition && (e = "#2fa0ef"),
        e
    }).on("click", function(t) {
      if (quarantineMode) {
        try {
          pop.play()
        } catch (e) {}
        vaccinateMode = false;
        d3.status = "Q";
      }
      if (vaccinateMode) {
        if (quarantineMode = false, 0 >= vaccineSupply) return window.alert("Out of Vaccines!"),
        void 0;
        t.status = "V";
        try {
          pop.play();
        } catch (e) {}
        vaccineSupply--;
        numberVaccinated++;
        tutorialUpdate();
      }
    })
    .call(drag);
  node.exit().remove();
  d3.select(".vaccineCounterText").text(vaccineSupply + " / " + vax);
}

function addOneFriend() {
  trivialGraph.nodes.push(graph.nodes[1]);
  trivialGraph.links.push({
    source: trivialGraph.nodes[0],
    target: trivialGraph.nodes[1],
    remove: false
  });
  stepWiseUpdate();
}

function centerElement(t, e) {
  var n = t.node().getBBox().x;
    a = t.node().getBBox().width;
    i = n + a;
    r = n - 0;
    s = 960 - i;
    o = r - s;
  if (o > 0) {
    var l = Math.round(.5 * o);
      c = n - l;
      d = "." + e;
    d3.select(d).attr("x", c);
  }
  if (0 > o) {
    var l = Math.round(.5 * o);
    var c = n + l;
    var d = "." + e;
    d3.select(d).attr("x", c);
  }
}

function buildGraph() {
  trivialGraph.nodes.splice(1, 1);
  trivialGraph.links = [];
  tutorial = true;
  for (var t = 0; t < graph.nodes.length; t++){
    edgeExists(graph.nodes[t], trivialGraph.nodes[0], graph) && trivialGraph.nodes.push(graph.nodes[t]);
  }
  for (var e = 0; e < trivialGraph.nodes.length; e++){
    for (var n = 0; n < trivialGraph.nodes.length; n++){
      if (edgeExists(trivialGraph.nodes[e], trivialGraph.nodes[n], graph)){
        var a = {
          source: trivialGraph.nodes[e],
          target: trivialGraph.nodes[n],
          remove: false
        };
        if (testDuplicate(trivialGraph.links, a)) continue;
        trivialGraph.links.push(a);
      }
      stepWiseUpdate();
    }
  }
}

function stepWiseUpdate() {
  var t = trivialGraph.links,
      e = trivialGraph.nodes;
  updateCommunities();
  link = svg.selectAll("line.link").data(t, t => t.source.id + "-" + t.target.id);
  link.enter().insert("svg:line", ".node")
    .attr("class", "link")
    .attr("x1", t => t.source.x)
    .attr("y1", t => t.source.y)
    .attr("x2", t => t.target.x)
    .attr("y2", t => t.target.y);
  link.exit().remove();
  node = svg.selectAll("circle.node").data(e, t => t.id)
    .style("fill", function(t) {
      var e = null;
      return
        "S" == t.status && (e = "#b7b7b7"),
        "E" == t.status && (e = "#ef5555"),
        "I" == t.status && (e = "#ef5555"),
        "R" == t.status && (e = "#9400D3"),
        "V" == t.status && (e = "#d9d678"),
        t.id == player.id && "I" != t.status && (e = "#2fa0ef"),
        e
      }).on("click", function(t) {
        if (vaccinateMode) {
          if (0 >= vaccineSupply) return window.alert("Out of Vaccines!");
          void 0;
          t.status = "V";
          try {
            pop.play()
          } catch (e) {}
          d3.select(this).style("fill", "#d9d678");
          vaccineSupply--;
          numberVaccinated++;
          tutorialUpdate();
        }
      });
  node.enter().append("svg:circle")
    .attr("class", "node")
    .attr("cx", t => t.x)
    .attr("cy", t => t.y)
    .attr("r", 8)
    .style("fill", function(t) {
      var e = null;
      return 
        "S" == t.status && (e = "#b7b7b7"),
        "E" == t.status && (e = "#ef5555"),
        "I" == t.status && (e = "#ef5555"),
        "R" == t.status && (e = "#9400D3"),
        "V" == t.status && (e = "#d9d678"),
        t.id == player.id && "I" != t.status && (e = "#2fa0ef"),
        e
    })
    .call(drag).on("click", function(t) {
      if (vaccinateMode) {
        if (0 >= vaccineSupply) return window.alert("Out of Vaccines!"),
        void 0;
        t.status = "V";
        try {
          pop.play()
        } catch (e) {}
        vaccineSupply--;
        numberVaccinated++;
        tutorialUpdate();
      }
    });
  node.exit().remove();
  force.nodes(e)
    .force("charge",d3.forceManyBody().strength(charge))
    .velocityDecay(friction)
    .force("links", d3.forceLink(t));
}

function getPathogen_xyCoords(t) {
  for (var e = [], n = [], a = 0; a < t.length; a++) {
    n.push(t[a].infectedBy);
    var i = {
      id: a,
      receiverX: t[a].x,
      receiverY: t[a].y,
      transmitterX: t[a].infectedBy.x,
      transmitterY: t[a].infectedBy.y
    };
    e.push(i);
  }
  return e;
}

function movePathogens() {
  xyCoords = getPathogen_xyCoords(newInfections),
  d3.selectAll(".pathogen").sort().transition().duration(400)
    .attr("cx", t => t.receiverX)
    .attr("cy", t => t.receiverY)
}

function createPathogens() {
  xyCoords = getPathogen_xyCoords(newInfections),
  svg.selectAll(".pathogen").data(xyCoords).enter().append("circle")
    .attr("class", "pathogen")
    .attr("cx", t => t.transmitterX)
    .attr("cy", t => t.transmitterY)
    .attr("r", 4)
    .style("fill", "black")
}

function removePathogens() {
  d3.selectAll(".pathogen").transition().duration(200)
    .style("opacity", 0),
  d3.selectAll(".node").transition().duration(200)
    .attr("r", 8),
  d3.selectAll(".pathogen").remove()
}

function tutorialTimesteps() {
  infection();
  stateChanges();
  newInfections = [];
  newInfections = updateExposures();
  detectCompletion();
  this.timestep++;
  timeToStop ? (
    animatePathogens_thenUpdate(), nextEnable = true, resetBack(), resetNext(), resetMenu()) : (
    animatePathogens_thenUpdate(), window.setTimeout(tutorialTimesteps, 1e3)
  )
}

function animatePathogens_thenUpdate() {
  window.setTimeout(createPathogens, 150);
  window.setTimeout(movePathogens, 200);
  window.setTimeout(popNewInfection, 450);
  window.setTimeout(tutorialUpdate, 550);
  window.setTimeout(removePathogens, 600);
}

function animateQuarantinePathogens_thenUpdate() {
  window.setTimeout(createPathogens, 700);
  window.setTimeout(movePathogens, 900);
  window.setTimeout(popNewInfection, 1300);
  window.setTimeout(tutorialUpdate, 1400);
  window.setTimeout(removePathogens, 1500);
}

function popNewInfection() {
  d3.selectAll(".node").transition().duration(100)
    .attr("r", function(t) {
      var e = 8;
      return "I" == t.status && 1 == timestep - t.exposureTimestep && (e = 12), e
    });
}

function detectCompletion() {
  for (var t = 0, e = 0; e < graph.nodes.length; e++) {
    var n = graph.nodes[e];
    "I" == n.status && t++
  }
  t == numberOfIndividuals ? (
    timeToStop = true,
    diseaseIsSpreading = false
  ) : detectEndGame();
  finalStop && (detectEndGame(), endGame && (timeToStop = true));
}

function timedRemoval(t) {
  d3.select(t).remove()
}

function slideOutStepwiseNav(t) {
  d3.select(".stepwiseNavBar")
    .style("right", "-1000px");
  window.setTimeout(clearStepwiseNavBar, 500);
  window.setTimeout(initMenuBox, 500);
  t || (startButton = d3.select(".guideTextSVG").append("text")
    .attr("class", "startButton")
    .attr("font-size", "18px")
    .attr("opacity", 1)
    .attr("x", width/2)
    .attr("y", window.innerHeight - 200)
    .style("cursor", "pointer")
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 470)
    .text("Start >")
    .on("click", function() {
      if (
        3 == guideRailsPosition && (tutorialTimesteps()),
        4 == guideRailsPosition
      ) {
        var t = Math.floor(Math.random() * numberOfIndividuals);
        graph.nodes[t].status = "I";
        removeDuplicateEdges(graph);
        diseaseIsSpreading = true;
        tutorialUpdate();
        tutorialTimesteps();
      }
      8 == guideRailsPosition && (guideRailsPosition++, guideRails());
      9 == guideRailsPosition && (loadSyringe(), flashNode());
      18 == guideRailsPosition && (guideRailsPosition++, guideRails());
      d3.select(this).attr("opacity", "0");
    })
  );
}

function slideOutMenuBox() {
  d3.select(".startButton").remove();
}

function createMenuBox(t) {
  window.setTimeout(initMenuBox, t)
}

function createStepwiseNavBar() {
  d3.select("body").append("div")
    .attr("class", "stepwiseNavBar")
    .style("right", "-1000px");
  d3.select(".stepwiseNavBar").append("svg")
    .attr("class", "stepwiseNavSVG")
    .attr("width", 500)
    .attr("height", 45)
    .style("background", "#85bc99");
}

function clearStepwiseNavBar() {
  d3.select(".stepwiseNavBar").remove()
}

function clearMenuBox() {
  d3.select(".lesson-box").remove()
}

function initMenuBox() {
  d3.select("#networkSxn")
    .on("click", restoreNetworkLesson);
  d3.select("#epidemicSxn").on("click", restoreEpidemicLesson);
  d3.select("#vaccinateSxn").on("click", restoreVaccineLesson);
  d3.select("#quarantineSxn").on("click", restoreQuarantineLesson);
  0 == guideRailsPosition && (
    d3.select("#networkSxn")
      .attr("class", "menuItemBold"),
    d3.select("#epidemicSxn")
      .attr("class", "menuItemNormal"),
    d3.select("#vaccinateSxn")
      .attr("class", "menuItemNormal"),
    d3.select("#quarantineSxn")
      .attr("class", "menuItemNormal")
  );
  4 == guideRailsPosition && (
    d3.select("#networkSxn")
      .attr("class", "menuItemNormal"),
    d3.select("#epidemicSxn")
      .attr("class", "menuItemBold"),
    d3.select("#vaccinateSxn")
      .attr("class", "menuItemNormal"),
    d3.select("#quarantineSxn")
      .attr("class", "menuItemNormal")
  );
  8 == guideRailsPosition && (
    d3.select("#networkSxn")
      .attr("class", "menuItemNormal"),
    d3.select("#epidemicSxn")
      .attr("class", "menuItemNormal"),
    d3.select("#vaccinateSxn")
      .attr("class", "menuItemBold"),
    d3.select("#quarantineSxn")
      .attr("class", "menuItemNormal")
  );
  (18 == guideRailsPosition || 19 == guideRailsPosition) && (
    d3.select("#networkSxn")
      .attr("class", "menuItemNormal"),
    d3.select("#epidemicSxn")
      .attr("class", "menuItemNormal"),
    d3.select("#vaccinateSxn")
      .attr("class", "menuItemNormal"),
    d3.select("#quarantineSxn")
      .attr("class", "menuItemBold")
  )
}

function initNavBar() {
  d3.select(".stepwiseNavBar")
    .style("right", "-5px");
  backArrow = d3.select(".stepwiseNavSVG").append("text")
    .attr("class", "backArrow")
    .attr("x", 25)
    .attr("y", 20)
    .attr("fill", () => backEnable ? "white" : "#838383")
    .style("font-family", "Nunito")
    .attr("opacity", 1)
    .style("font-weight", 500)
    .attr("font-size", "18px")
    .text("< Back")
    .on("click", function() {
      backEnable && (diseaseIsSpreading || (
        guideRailsPosition--,
        guideRailsReverse(),
        9 == guideRailsPosition && (loadSyringe(),
        backEnable = false, resetBack()))
      )
    });
  nextArrow = d3.select(".stepwiseNavSVG").append("text")
    .attr("class", "nextArrow")
    .attr("x", 400)
    .attr("y", 20)
    .attr("fill", () => nextEnable ? "white" : "#838383")
    .style("font-family", "Nunito")
    .attr("opacity", 1)
    .style("font-weight", 500)
    .attr("font-size", "18px")
    .text("Next >")
    .on("click", function() {
      nextEnable && (diseaseIsSpreading || (guideRailsPosition++, guideRails()))
    });
  d3.select(".stepwiseNavSVG").append("text")
    .attr("class", "menuNav")
    .attr("x", 215)
    .attr("y", 20)
    .style("font-family", "Nunito")
    .attr("fill", () => diseaseIsSpreading ? "#838383" : "white")
    .attr("opacity", 0)
    .style("font-weight", 500)
    .attr("font-size", "18px")
    .text("Menu")
    .style("cursor", "pointer")
    .on("click", () => diseaseIsSpreading || menuConfirm());
  d3.select(".menuNav").transition().duration(500)
    .attr("opacity", 1)
}

function menuConfirm() {
  svg.append("rect")
    .attr("class", "confirmShadow")
    .attr("x", window.innerWidth / 4 + 62 + 5)
    .attr("y", -200)
    .attr("width", 300)
    .attr("height", 125)
    .attr("fill", "#838383"),
  svg.append("rect")
    .attr("class", "confirmBOX")
    .attr("x", window.innerWidth / 4 + 62)
    .attr("y", -200)
    .attr("width", 300)
    .attr("height", 125)
    .attr("fill", "#85bc99"),
  svg.append("text")
    .attr("class", "confirmHEAD")
    .attr("x", window.innerWidth / 4 + 110)
    .attr("y", -200)
    .style("font-family", "Nunito")
    .style("fill", "white")
    .style("font-weight", 500)
    .style("font-size", "35px").text("Skip Lesson?"),
  svg.append("text")
    .attr("class", "confirmYES")
    .attr("x", window.innerWidth / 4 + 140)
    .attr("y", -200)
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 500)
    .style("font-size", "28px")
    .style("cursor", "pointer")
    .text("Yes")
    .on("mouseover", function() {
      d3.select(this)
        .style("fill", "#2692F2")
    })
    .on("mouseout", function() {
      d3.select(this)
        .style("fill", "#707070")
    })
    .on("click", function() {
      d3.select(".confirmShadow").transition().duration(500)
        .attr("y", -200)
      d3.select(".confirmBOX").transition().duration(500)
        .attr("y", -200)
      d3.select(".confirmHEAD").transition().duration(500)
        .attr("y", -200)
      d3.select(".confirmYES").transition().duration(500)
        .attr("y", -200)
      d3.select(".confirmNO").transition().duration(500)
        .attr("y", -200);
      window.setTimeout(function() {
        hideQuarantine();
        hideSyringe();
        wipeOut();
        svg = d3.select("svg")
          .attr("width", "100%")
          .attr("height", "85%")
          .attr("viewBox", "0 0 " + width + " " + height)
          .style("pointer-events", "all")
        guideTextSVG = guideTextSVG.append("svg:svg")
          .attr("class", "guideTextSVG")
          .attr("x", width/2)
          .attr("y", height-200)
        guide = guideTextSVG.append("text")
          .attr("class", "guide")
          .attr("font-size", "28px")
          .attr("opacity", 0)
          .attr("x", guideXCoord)
          .attr("y", guideYCoord)
          .style("font-family", "Nunito")
          .style("fill", "#707070")
          .style("font-weight", 300)
          .text("Please select a lesson from");
        lessonText = svg.append("text")
          .attr("class", "lessonText")
          .attr("x", 55)
          .attr("y", 105)
          .style("font-size", "28px")
          .style("font-family", "Nunito")
          .style("fill", "#707070")
          .style("font-weight", 700)
          .attr("opacity", 1)
          .text("Lesson: ")
        guide2 = guideTextSVG.append("text")
          .attr("class", "guide2")
          .attr("x", guideXCoord)
          .attr("y", guideYCoord + guide2YCoordChange)
          .attr("font-size", "28px")
          .attr("opacity", 0)
          .style("font-family", "Nunito")
          .style("fill", "#707070")
          .style("font-weight", 300)
          .text("the menu bar below.");
        centerElement(guide, "guide");
        centerElement(guide2, "guide2");
        d3.select(".guide")
          .attr("opacity", 1);
        d3.select(".guide2")
          .attr("opacity", 1);
        createMenuBox(1)
        keepFlashing = false
      }, 501);
    });
    svg.append("text")
      .attr("class", "confirmNO")
      .attr("x", window.innerWidth / 4 + 240)
      .attr("y", -200)
      .style("font-family", "Nunito")
      .style("fill", "#707070")
      .style("font-weight", 500)
      .style("font-size", "28px")
      .style("cursor", "pointer")
      .text("No")
      .on("mouseover", function() {
        d3.select(this).style("fill", "#2692F2")
      }).on("mouseout", function() {
        d3.select(this).style("fill", "#707070")
      }).on("click", function() {
        d3.select(".confirmShadow").transition().duration(500).attr("y", -200),
        d3.select(".confirmBOX").transition().duration(500).attr("y", -200),
        d3.select(".confirmHEAD").transition().duration(500).attr("y", -200),
        d3.select(".confirmYES").transition().duration(500).attr("y", -200),
        d3.select(".confirmNO").transition().duration(500).attr("y", -200)
      });
      d3.select(".confirmShadow").transition().duration(500).attr("y", window.innerHeight / 2 - 300 + 7),
      d3.select(".confirmBOX").transition().duration(500).attr("y", window.innerHeight / 2 - 300),
      d3.select(".confirmHEAD").transition().duration(500).attr("y", window.innerHeight / 2 - 250),
      d3.select(".confirmYES").transition().duration(500).attr("y", window.innerHeight / 2 - 200),
      d3.select(".confirmNO").transition().duration(500).attr("y", window.innerHeight / 2 - 200)
}

function initTutorial() {
  startButton = d3.select(".guideTextSVG").append("text")
    .attr("class", "startButton")
    .attr("font-size", "18px")
    .attr("opacity", 1)
    .attr("x", nextX)
    .attr("y", nextY)
    .style("cursor", "pointer")
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 470)
    .text("Start >")
    .on("click", function() {
      guideRailsPosition++;
      guideRails();
      d3.select(this).transition().duration(500)
        .attr("opacity", 0);
      d3.select(this).transition().duration(500).text("");
    });
  link = svg.selectAll(".link").data(trivialGraph.links).enter().append("line")
    .attr("class", "link");
  node = svg.selectAll(".node").data(trivialGraph.nodes).enter().append("circle")
    .attr("class", "node")
    .attr("r", 15)
    .style("fill", "#2fa0ef")
    .call(drag)
    .on("click", function(t) {
      if (vaccinateMode) {
        if (0 >= vaccineSupply) return window.alert("Out of Vaccines!"),
        void 0;
        try {
          pop.play()
        } catch (e) {}
        t.status = "V", vaccineSupply--, numberVaccinated++, tutorialUpdate()
      }
    });
  force = d3.forceSimulation(trivialGraph.nodes)
    .force("links", d3.forceLink(trivialGraph.links))
    .force("charge", d3.forceManyBody().strength(charge))
    .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
    .on("tick", tick);
  d3.select(".guide")
    .attr("x", guideXCoord)
    .attr("y", guideYCoord)
    .attr("font-size", "28px")
    .attr("opacity", 0)
    .text("Suppose this is you");
  centerElement(guide, "guide");
  d3.select(".guide").transition().duration(500)
    .attr("opacity", 1);
  d3.selectAll(".node")
    .style("cursor", "pointer");
  d3.select(".lessonText")
    .attr("opacity", 1);
  createMenuBox(1);
}

function flashRedX() {
  if (!(xFlashCounter > 2)) {
    var t = [.15, .75];
    0 == opacityIndex ? opacityIndex = 1 : 1 == opacityIndex && (opacityIndex = 0),
    d3.selectAll(".redX").transition().duration(750)
      .attr("opacity", t[opacityIndex]);
    xFlashCounter++;
    window.setTimeout(flashRedX, 750);
  }
}

function unFixNodes(t) {
  for (var e = 0; e < t.nodes.length; e++){
    1 == t.nodes[e].fixed && (t.nodes[e].fixed = false);
  }
}

function loadSyringe() {
  d3.select("#vaxShieldText")
    .style("color", "white")
    .style("fill", "white");
  quarantineMode && hideQuarantine();
  d3.select(".actionVax")
    .style("visibility", "visible");
  d3.select(".actionVax")
    .style("right", 0);
  d3.select(".vaccineCounterText").remove();
  d3.select(".actionVax").append("text")
    .attr("class", "vaccineCounterText")
    .style("font-size", "16px")
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("");
  d3.select(".vaccineCounterText")
    .text(vaccineSupply + " / " + vax);
}

function hideSyringe() {
  vaccinationMode = false;
  d3.select(".actionVax")
    .style("right", "-200px");
  svg
    .style("cursor", "pointer");
  d3.selectAll(".node")
    .style("cursor", "pointer");
  d3.select(".vaccineDepressedState")
    .style("visibility", "hidden");
}

function loadQuarantine() {
  d3.select("#quarantineText")
    .style("color", "white"),
  vaccinateMode && hideSyringe(),
  quarantineMode = true;
  d3.select(".actionQuarantine")
    .style("visibility", "visible")
    .style("right", "0px")
    .append("text")
    .attr("class", "quarantineCounterText")
    .style("font-size", "16px")
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("");
  d3.select(".quarantineCounterText").remove();
  d3.select(".quarantineCounterText")
    .style("color", "white")
    .text("x" + numberQuarantined);
}

function hideQuarantine() {
  quarantineMode = false;
  d3.select(".actionQuarantine")
    .style("right", "-200px"),
  svg
    .style("cursor", "pointer"),
  d3.selectAll(".node")
    .style("cursor", "pointer"),
  d3.select(".quarantineDepressedState")
    .style("visibility", "hidden")
}

function flashNode() {
  var t = graph.nodes[0];
  0 == currentFlash ? currentFlash = 1 : 1 == currentFlash && (currentFlash = 0);
  var e = ["#d9d678", "#b7b7b7"];
  d3.selectAll(".node").transition().duration(500)
    .style("fill", n => n.id == t.id ? e[currentFlash] : e[1]);
  d3.selectAll(".node")
    .on("click", function(e) {
      if (e.id == t.id && vaccinateMode) {
        e.status = "V";
        try {
          pop.play()
        } catch (n) {}
        vaccineSupply--;
        numberVaccinated++;
        keepFlashing = false;
        nextEnable = true;
        backEnable = false;
        resetBack();
        resetNext();
        tutorialUpdate();
      }
    });
  keepFlashing && 9 == guideRailsPosition && window.setTimeout(flashNode, 500);
}

function flashNodes() {
  graph.nodes[3]
  graph.nodes[5]
  graph.nodes[9]
  0 == currentFlash ? currentFlash = 1 : 1 == currentFlash && (currentFlash = 0);
  var t = ["#d9d678", "#b7b7b7"];
  d3.selectAll(".node").transition().duration(500)
    .style("fill", function(e) {
      return 10 == e.id || 4 == e.id || 6 == e.id ? t[currentFlash] : t[1]
    }),
  d3.selectAll(".node")
    .on("click", function(t) {
      if ((10 == t.id || 4 == t.id || 6 == t.id) && vaccinateMode) {
        t.status = "V";
        try {
          pop.play()
        } catch (e) {}
        vaccineSupply--;
        numberVaccinated++;
        keepFlashing = false;
        nextEnable = true;
        backEnable = false;
        resetBack();
        resetNext();
        tutorialUpdate()
      }
    });
  keepFlashing && window.setTimeout(flashNodes, 500)
}

function activateVaccinationMode() {
  wiggle && wiggleHack();
  wiggle = false;
  vaccinateMode = true;
  d3.selectAll(".node")
    .style("cursor", "url(/assets/vax_cursor.cur)"),
  svg
    .style("cursor", "url(/assets/vax_cursor.cur)"),
  vaccineResearched = true;
  intervention = true;
  d3.select(".vaccineCounterText")
    .style("color", "white")
    .text(vaccineSupply + " / " + vax);
  d3.select(".vaccineDepressedState")
    .style("visibility", "visible");
}

function activateQuarantineMode() {
  friction = .9;
  vaccinateMode = false;
  quarantineMode = true;
  d3.selectAll(".node")
    .style("cursor", "url(/assets/vax_cursor.cur)");
  svg
    .style("cursor", "url(/assets/vax_cursor.cur)");
  d3.select(".quarantineDepressedState")
    .style("visibility", "visible");
  window.setTimeout(startQuarantineOutbreak, 500)
}

function startQuarantineOutbreak() {
  for (var t = 0; t < graph.nodes.length; t++){
    graph.nodes.status = "S";
    graph.nodes.infectedBy = null;
    graph.nodes.exposureTimestep = null;
  }
  graph.nodes[5].status = "I";
  diseaseIsSpreading = true;
  resetMenu();
  timestep = 0;
  timeToStop = false;
  postInitialOutbreak = true;
  numberOfIndividuals = graph.nodes.length;
  quarantineUpdate();
}

function quarantineTimesteps() {
  exposureEdges = [];
  infection();
  stateChanges();
  newInfections = [];
  newInfections = updateExposures();
  xyCoords = getPathogen_xyCoords(newInfections);
  this.timestep++, detectCompletion();
  timeToStop ? (
    animateQuarantinePathogens_thenUpdate(),
    nextEnable = true,
    resetNext(),
    resetMenu()
    ) : animateQuarantinePathogens_thenUpdate();
}

function redraw() {
  quarantineMode && svg
    .attr("transform", `translate(${d3.event.translate}) scale(${d3.event.scale})`)
}

function quarantineUpdate() {
  var t = removeVaccinatedNodes(graph),
  e = removeOldLinks(graph);
  graph.links = e, updateCommunities(),
  force.nodes(t).charge(charge).friction(.8).links(e).start(),
  link = svg.selectAll("line.link").data(e, t => t.source.id + "-" + t.target.id),
  link.enter().insert("svg:line", ".node")
    .attr("class", "link")
    .attr("x1", t => t.source.x)
    .attr("y1", t => t.source.y)
    .attr("x2", t => t.target.x)
    .attr("y2", t => t.target.y);
  link.exit().remove();
  node = svg.selectAll("circle.node").data(t, t => t.id)
    .attr("r", 8)
    .style("fill", function(t) {
      var e = null;
      return
        "S" == t.status && (e = "#b7b7b7"),
        "E" == t.status && (e = "#ef5555"),
        "I" == t.status && (e = "#ef5555"),
        "V" == t.status && (e = "#d9d678"),
        e
      }),
  node.enter().append("svg:circle")
    .attr("class", "node")
    .attr("cx", t => t.x)
    .attr("cy", t => t.y)
    .attr("r", 8)
    .style("fill", t => {
      var e = null;
      return
        "S" == t.status && (e = "#b7b7b7"),
        "E" == t.status && (e = "#ef5555"),
        "I" == t.status && (e = "#ef5555"),
        "V" == t.status && (e = "#d9d678"),
        "Q" == t.status && (e = "#d9d678"),
        e
    })
    .on("click", function(t) {
      if (quarantineMode && "S" == t.status) {
        t.status = "Q";
        try {
          pop.play()
        } catch (e) {}
        quarantineUpdate();
        numberQuarantined++;
        d3.select(".quarantineCounterText").text("x" + numberQuarantined);
        quarantineTimesteps()
      }
    })
    .call(drag);
  node.exit().remove();
  d3.select(".quarantineCounterText")
    .style("color", "white")
    .text("x" + numberQuarantined);
}

function countSaved() {
  numberSaved = 0;
  for (var t = 0; t < graph.nodes.length; t++){
    ("Q" == graph.nodes[t].status || "S" == graph.nodes[t].status) && numberSaved++;
  }
}

function initRecap() {
  svg.append("text")
    .attr("class", "networkSizeText")
    .attr("x", backX)
    .attr("y", 195)
    .text("Network Size: " + numberOfIndividuals),
  svg.append("text")
    .attr("class", "numberQuarantinedText")
    .attr("x", backX)
    .attr("y", 230)
    .text("Quarantined: " + numberQuarantined),
  svg.append("text")
    .attr("class", "numberVaccinatedText")
    .attr("x", backX)
    .attr("y", 265)
    .attr("opacity", 0)
    .text("Vaccinated: " + numberVaccinated);
  var t = 100,
      e = 380,
      n = e - t,
      a = (1 - (numberSaved / numberOfIndividuals).toFixed(2)) * n,
      i = (numberSaved / numberOfIndividuals).toFixed(2) * n;
  infectedBar = svg.append("rect")
    .attr("class", "infectedBar")
    .attr("x", 1200)
    .attr("y", 310)
    .attr("height", a)
    .attr("width", 85)
    .attr("opacity", 0)
    .attr("fill", "#ef5555"),
  centerElement(infectedBar, "infectedBar"),
  infectedBar.attr("opacity", 1),
  infectedBar.attr("x", infectedBar.node().getBBox().x + 35),
  uninfectedBar = svg.append("rect")
    .attr("class", "uninfectedBar")
    .attr("x", 1200)
    .attr("y", 300)
    .attr("height", i)
    .attr("width", 85)
    .attr("opacity", 0)
    .attr("fill", "#b7b7b7");
  centerElement(uninfectedBar, "uninfectedBar"),
  uninfectedBar.attr("opacity", 1),
  uninfectedBar.attr("y", infectedBar.node().getBBox().height + 15),
  infectedBar.attr("y", infectedBar.node().getBBox().y + 10),
  centerElement(uninfectedBar, "uninfectedBar"),
  uninfectedBar.attr("x", uninfectedBar.node().getBBox().x + 35),
  uninfectedBar.attr("opacity", 1),
  svg.append("text")
    .attr("class", "uninfectedLegendText")
    .attr("x", backX + 550)
    .attr("y", 195).text("Uninfected"),
  svg.append("text")
    .attr("class", "infectedLegendText")
    .attr("x", backX + 550)
    .attr("y", 245).text("Infected"),
  svg.append("text")
    .attr("class", "uninfectedPercentage")
    .attr("x", backX + 675)
    .attr("y", 195)
    .text(Math.round(100 * (numberSaved / numberOfIndividuals)).toFixed(0) + "%"),
svg.append("rect")
  .attr("class", "uninfectedLegendBox")
  .attr("x", backX + 521)
  .attr("y", 177)
  .attr("height", 20)
  .attr("width", 20)
  .attr("fill", "#b7b7b7"),
svg.append("rect")
  .attr("class", "infectedLegendBox")
  .attr("x", backX + 521)
  .attr("y", 227)
  .attr("height", 20)
  .attr("width", 20)
  .attr("fill", "#ef5555")
}

trivialGraph.nodes.push(player);
var numberOfIndividuals = tailoredNodes.length,
weakTieNodes = getWeakTieNodes(),
weakTieLinks = getWeakTieLinks(),
backArrow, nextArrow;
pop = document.getElementById("audio");

svg = d3.select("svg")
  .attr("class", "svg")
  .style("pointer-events", "all");

guideTextSVG = svg.append("g")
  .attr("class", "guideTextSVG")
  .attr("x", width/2)
  .attr("y", height-200);

guide = guideTextSVG.append("text")
  .attr("class", "guide")
  .attr("font-size", "28px")
  .style("font-family", "Nunito")
  .style("fill", "#707070")
  .style("font-weight", 300);

lessonText = svg.append("text")
  .attr("class", "lessonText")
  .attr("x", 145)
  .attr("y", 100)
  .style("font-size", "28px")
  .style("font-family", "Nunito")
  .style("fill", "#707070")
  .style("font-weight", 700)
  .attr("opacity", 1)
  .text("Lesson 1: Networks");

guide2 = guideTextSVG.append("text")
  .attr("class", "guide2")
  .attr("x", guideXCoord)
  .attr("y", guideYCoord + guide2YCoordChange)
  .attr("font-size", "28px")
  .style("font-family", "Nunito")
  .style("fill", "#707070")
  .style("font-weight", 300);

start ? guideRails() : (start = true, initTutorial());

function wiggleHack() {
  d3.select(".guide").text("Try dragging nodes around to get a different perspective.")
    .attr("opacity", 0),
  d3.select(".guide2").text("Sometimes you'll find hidden connections you might otherwise miss.")
    .attr("opacity", 0),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
    .attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
    .attr("opacity", 1)
}

function resetBack() {
  d3.select(".backArrow")
    .attr("fill", function() {
      return backEnable ? "white" : "#838383"
    }).on("click", function() {
      backEnable && (diseaseIsSpreading || (guideRailsPosition--, guideRailsReverse(),
      9 == guideRailsPosition && (loadSyringe(),
      backEnable = false, resetBack())))
    });
}

function resetNext() {
  d3.select(".nextArrow")
    .attr("fill", () => nextEnable ? "white" : "#838383")
    .text("Next >")
    .on("click", () => nextEnable && (diseaseIsSpreading || (guideRailsPosition++, guideRails())));
}
function resetMenu() {
  d3.select(".menuNav")
    .attr("fill", () => diseaseIsSpreading ? "#838383" : "white")
    .on("click", () => diseaseIsSpreading || menuConfirm());
}
function disableBack() {
  d3.select(".backArrow")
    .attr("fill", "#838383")
    .text("< Back")
    .on("click", function() {});
}
function disableNext() {
  d3.select(".nextArrow")
    .attr("fill", "#838383")
    .text("Next >")
    .on("click", function() {});
}
function wipeOut() {
  endGame = false;
  timeToStop = false;
  diseaseIsSpreading = false;
  vaccinateMode = false;
  quarantineMode = false;
  finalStop = false;
  intervention = false;
  for (var e = 0; e < tailoredNodes.length; e++){
    tailoredNodes[e].status = "S";
    tailoredNodes[e].exposureTimestep = null;
    tailoredNodes[e].infectedBy = null;
  } 
  d3.select(".stepwiseNavBar").remove();
  svg.remove();
  graph.nodes.length > 30 && resetToSmallGraph();
}
function resetToSmallGraph() {
  for (var e = 0; e < tailoredNodes.length; e++){
    tailoredNodes[e].infectedBy = null;
    tailoredNodes[e].exposureTimestep = null;
    tailoredNodes[e].status = "S";
    graph.nodes.push(tailoredNodes[e]);
  }
  for (var e = 0; e < tailoredLinks.length; e++){
    graph.links.push(tailoredLinks[e]);
  }
}
function restoreVaccineLesson() {
  d3.select(".startButton").remove(),
  d3.select(".guideTextSVG").append("text")
    .attr("class", "startButton")
    .attr("font-size", "18px")
    .attr("opacity", 1)
    .attr("x", nextX)
    .attr("y", nextY)
    .style("cursor", "pointer")
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 470)
    .text("Start >")
    .on("click", function() {
      flashNode(),
      d3.select(this).remove()
    });
  guideRailsPosition = 9;
  guideRailsReverse();
  d3.select("#networkSxn")
    .attr("class", "menuItemNormal");
  d3.select("#epidemicSxn")
    .attr("class", "menuItemNormal");
  d3.select("#vaccinateSxn")
    .attr("class", "menuItemBold");
  d3.select("#quarantineSxn")
    .attr("class", "menuItemNormal");
}
function restoreQuarantineLesson() {
  numberQuarantined = 0;
  d3.select(".startButton").remove();
  diseaseIsSpreading = false;
  backEnable = false;
  nextEnable = true;
  resetBack();
  resetNext();
  guideRailsPosition = 18;
  vax2QuarantineTransition();
  d3.select("#networkSxn")
    .attr("class", "menuItemNormal");
  d3.select("#epidemicSxn")
    .attr("class", "menuItemNormal");
  d3.select("#vaccinateSxn")
    .attr("class", "menuItemNormal");
  d3.select("#quarantineSxn")
    .attr("class", "menuItemBold");
}
function restoreNetworkLesson() {
  d3.select(".startButton").remove(),
  d3.select("#networkSxn")
    .attr("class", "menuItemBold"),
  d3.select("#epidemicSxn")
    .attr("class", "menuItemNormal"),
  d3.select("#vaccinateSxn")
    .attr("class", "menuItemNormal"),
  d3.select("#quarantineSxn")
    .attr("class", "menuItemNormal"),
  graph.nodes = [];
  graph.links = [];
  for (var e = 0; e < tailoredNodes.length; e++){
    tailoredNodes[e].status = "S";
    tailoredNodes[e].infectedBy = null;
    tailoredNodes[e].exposureTimestep = null;
    graph.nodes.push(tailoredNodes[e]);
  }
  for (var e = 0; e < tailoredLinks.length; e++){
    graph.links.push(tailoredLinks[e]);
  }
  removeDuplicateEdges(graph);
  quarantineMode = false;
  vaccinateMode = false;
  diseaseIsSpreading = false;
  timeToStop = false;
  hideQuarantine();
  wipeOut();
  svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", "85%")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("class", "svg")
    .style("pointer-events", "all");
  guideTextSVG = svg.append("svg:svg")
    .attr("class", "guideTextSVG")
    .attr("x", width/2)
    .attr("y", height-200);
  guide = d3.select(".guideTextSVG").append("text")
    .attr("class", "guide")
    .attr("font-size", "28px")
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 300).text("");
  lessonText = svg.append("text")
    .attr("class", "lessonText").attr("x", 35).attr("y", 80)
    .style("font-size", "28px")
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 700)
    .attr("opacity", 1)
    .text("Lesson 1: Networks");
  guide2 = d3.select(".guideTextSVG").append("text")
    .attr("class", "guide2")
    .attr("x", guideXCoord)
    .attr("y", guideYCoord + guide2YCoordChange)
    .attr("font-size", "28px")
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 300)
    .text("");
  trivialGraph = {};
  trivialGraph.nodes = [];
  trivialGraph.links = [];
  trivialGraph.nodes.push(tailoredNodes[0]);
  d3.selectAll(".node")
    .style("fill", "#2fa0ef"),
  stepWiseUpdate(),
  startButton = d3.select(".guideTextSVG").append("text")
    .attr("class", "startButton")
    .attr("font-size", "18px")
    .attr("opacity", 1)
    .attr("x", nextX)
    .attr("y", nextY)
    .style("cursor", "pointer")
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 470)
    .text("Start >")
    .on("click", function() {
      guideRailsPosition++;
      guideRails();
      d3.select(this).transition().duration(500)
        .attr("opacity", 0),
      d3.select(this).transition().duration(500).text("")
    });
  force.stop(),
  force = [],
  force = d3.forceSimulation()
    .nodes(trivialGraph.nodes)
    .links(trivialGraph.links)
    .size([width, height])
    .charge(charge)
    .friction(friction)
    .on("tick", tick)
    .start(),
  link = [],
  link = svg.selectAll(".link")
    .data(trivialGraph.links)
    .enter()
    .append("line")
    .attr("class", "link"),
  node = [],
  node = svg.selectAll(".node")
    .data(trivialGraph.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 15)
    .style("fill", "#2fa0ef")
    .call(drag)
    .on("click", function(e) {
      if (vaccinateMode) {
        if (0 >= vaccineSupply) return window.alert("Out of Vaccines!"),
        void 0;
        e.status = "V", vaccineSupply--, numberVaccinated++
      }
    }),
  d3.select(".guide")
    .attr("x", guideXCoord)
    .attr("y", guideYCoord)
    .attr("font-size", "28px")
    .attr("opacity", 0).text("Suppose this is you"),
  d3.select(".guide2").text(""),
  centerElement(guide, "guide"),
  d3.select(".guide").transition().duration(500)
    .attr("opacity", 1),
  createMenuBox(1),
  guideRailsPosition = 0,
  d3.select(".node")
    .attr("r", 15)
}
function restoreEpidemicLesson() {
  d3.select(".startButton").remove(),
  d3.select("#networkSxn")
    .attr("class", "menuItemNormal"),
  d3.select("#epidemicSxn")
    .attr("class", "menuItemBold"),
  d3.select("#vaccinateSxn")
    .attr("class", "menuItemNormal"),
  d3.select("#quarantineSxn")
    .attr("class", "menuItemNormal"),
  hideSyringe(),
  hideQuarantine(),
  quarantineMode = false,
  d3.select(".redX").remove(),
  graph.nodes = [],
  graph.links = [],
  timestep = 0,
  diseaseIsSpreading = false,
  timeToStop = false,
  tailoredNodes.splice(13, 1);
  for (var e = 0; e < tailoredNodes.length; e++) tailoredNodes[e].status = "S", tailoredNodes[e].infectedBy = null, tailoredNodes[e].exposureTimestep = null, graph.nodes.push(tailoredNodes[e]);
  for (var t = 0; t < tailoredLinks.length; t++) graph.links.push(tailoredLinks[t]);
  removeDuplicateEdges(graph),
  tutorialUpdate(),
  endGame = false,
  startButton = d3.select(".guideTextSVG")
    .append("text")
    .attr("class", "startButton")
    .attr("font-size", "18px")
    .attr("opacity", 1)
    .attr("x", nextX)
    .attr("y", nextY)
    .style("cursor", "pointer")
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 470)
    .text("Start >")
    .on("click", function() {
      var e = Math.floor(Math.random() * numberOfIndividuals);
      graph.nodes[e].status = "I",
      diseaseIsSpreading = true,
      tutorialTimesteps(),
      resetMenu(),
      nextEnable = false,
      backEnable = false,
      disableNext(),
      disableBack(),
      timeToStop = false
    }),
  guideRailsPosition = 4,
  guideRails()
}
function net2epiTransition() {
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
    .attr("opacity", 0).text("Next, we'll look at how diseases move through a network"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
    .attr("opacity", 0).text("in lesson 2: epidemics."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
    .attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
    .attr("opacity", 1),
  d3.selectAll(".node")
    .style("cursor", "pointer"),
  d3.select(".nextArrow").text("Finish >").on("click", function() {
    guideRailsPosition++,
    guideRails(),
    slideOutStepwiseNav()
  }),
  resetBack()
}

function epi2VaxTransition() {
  slideOutStepwiseNav(),
  d3.select(".guide")
    .attr("x", guideXCoord)
    .attr("y", guideYCoord)
    .attr("opacity", 0)
    .text("Coming up, in lesson 3: vaccines, we'll cover how to prevent"),
  d3.select(".guide2")
    .attr("x", guideXCoord)
    .attr("y", guideYCoord + guide2YCoordChange)
    .attr("opacity", 0)
    .text("epidemics by containing outbreaks before they spread."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
    .attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
    .attr("opacity", 1)
}

function vax2QuarantineTransition() {
  d3.selectAll(".node").remove(),
  d3.select(".lessonText").text("Lesson 4: Quarantine"),
  graph.nodes = [],
  graph.links = [],
  graph = generateSmallWorld(35, 0.1, 3),
  quarantineUpdate(),
  removeDuplicateEdges(graph);
  for (var e = 0; e < graph.nodes.length; e++) graph.nodes[e].status = "S";
  hideSyringe(),
  d3.select(".lessonText").text("Lesson 4: Quarantine"),
  d3.select("#quarantineSxn")
    .attr("class", "menuItemBold"),
  d3.select("#vaccineSxn")
    .attr("class", "menuItemNormal"),
  d3.select(".guide")
    .attr("x", guideXCoord)
    .attr("y", guideYCoord)
    .attr("opacity", 0)
    .text("Vaccines take time to 'kick in' so they're ineffective"),
  d3.select(".guide2")
    .attr("x", guideXCoord)
    .attr("y", guideYCoord + guide2YCoordChange)
    .attr("opacity", 0)
    .text("if an infection has already begun to spread."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
    .attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
    .attr("opacity", 1),
  startButton = d3.select(".guideTextSVG").append("text")
    .attr("class", "startButton")
    .attr("font-size", "18px")
    .attr("opacity", 1)
    .attr("x", nextX)
    .attr("y", nextY)
    .style("cursor", "pointer")
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-weight", 470)
    .text("Start >")
    .on("click", function() {
      guideRailsPosition++;
      guideRails();
      d3.select(this).transition().duration(500)
        .attr("opacity", 0),
      d3.select(this).transition().duration(500)
        .text("")
    })
}
function guideRails(e) {
  if (!diseaseIsSpreading) {
    if (
      0 == guideRailsPosition && (
        backEnable = false
      ),
      1 == guideRailsPosition && (
        nextEnable = true,
        backEnable = true,
        resetBack(),
        resetNext(),
        e || addOneFriend(),
        d3.selectAll(".node")
          .style("cursor", "pointer"),
        d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
          .attr("opacity", 0).text("And this is you with one friend. The connection"),
        d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
          .attr("opacity", 0).text("represents contact between you two."),
        centerElement(guide, "guide"),
        centerElement(guide2, "guide2"),
        d3.select(".guide").transition().duration(500)
          .attr("opacity", 1),
        d3.select(".guide2").transition().duration(500)
          .attr("opacity", 1)
      ),
      2 == guideRailsPosition && (
        nextEnable = true,
        backEnable = true,
        resetBack(),
        resetNext(),
        e || buildGraph(),
        d3.selectAll(".node")
          .style("cursor", "pointer"),
        d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
          .attr("opacity", 0).text("Now here are more friends who are connected to you and"),
        d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
          .attr("opacity", 0).text("to each other. This is your immediate contact group."),
        centerElement(guide, "guide"),
        centerElement(guide2, "guide2"),
        d3.select(".guide").transition().duration(500)
          .attr("opacity", 1),
        d3.select(".guide2").transition().duration(500)
          .attr("opacity", 1)
      ),
      3 == guideRailsPosition && (
        nextEnable = true,
        backEnable = true,
        resetBack(),
        resetNext(),
        charge = -400,
        e || tutorialUpdate(),
        d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
          .attr("opacity", 0).text("Your friends have friends, who may be strangers to you,"),
        d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
          .attr("opacity", 0).text("but together they make up your contact network."),
        centerElement(guide, "guide"),
        centerElement(guide2, "guide2"),
        d3.select(".guide").transition().duration(500)
          .attr("opacity", 1),
        d3.select(".guide2").transition().duration(500)
          .attr("opacity", 1),
        d3.selectAll(".node")
          .style("cursor", "pointer"),
        d3.select("#networkSxn")
          .attr("class", "menuItemBold"),
        removeDuplicateEdges(graph),
        d3.select(".nextArrow").on("click", function() {
          net2epiTransition()
        })
      ),
      4 == guideRailsPosition) {
        if (
          d3.select(".lessonText").text("Lesson 2: Epidemics"),
          removeDuplicateEdges(graph),
          d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
            .attr("opacity", 0).text("When someone in your contact network gets sick,"),
          d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
            .attr("opacity", 0).text("the infection will spread across the network..."),
          centerElement(guide, "guide"),
          centerElement(guide2, "guide2"),
          d3.select(".guide").transition().duration(500)
            .attr("opacity", 1),
          d3.select(".guide2").transition().duration(500)
            .attr("opacity", 1),
          d3.select(".guideTextSVG").append("text")
            .attr("class", ".startButton").on("click", function() {
              var e = Math.floor(Math.random() * numberOfIndividuals);
              graph.nodes[e].status = "I";
              removeDuplicateEdges(graph);
              diseaseIsSpreading = true;
              tutorialUpdate();
              slideOutMenuBox();
              tutorialTimesteps();
              d3.select(this).remove();
            }),
          e
        ){
          var t = Math.floor(Math.random() * numberOfIndividuals);
          graph.nodes[t].status = "I", removeDuplicateEdges(graph),
          diseaseIsSpreading = true, tutorialUpdate(),
          tutorialTimesteps()
        }
        resetMenu(),
        nextEnable = false,
        backEnable = false,
        disableNext(),
        disableBack(),
        timeToStop = false
      }
  if (5 == guideRailsPosition) {
    nextEnable = true, backEnable = true, resetBack(),
    resetNext();
    var i = svg.selectAll("image").data([0]);
    i.enter().append("image")
      .attr("xlink:href", "/assets/redX.svg").transition().duration(500)
      .attr("x", "280")
      .attr("y", "85")
      .attr("width", "450")
      .attr("height", "450")
      .attr("opacity", .6)
      .attr("class", "redX"),
    flashRedX(),
    d3.select(".guide")
      .attr("x", guideXCoord)
      .attr("y", guideYCoord)
      .attr("opacity", 0)
      .text("If no action is taken, then pretty soon"),
    d3.select(".guide2")
      .attr("x", guideXCoord)
      .attr("y", guideYCoord + guide2YCoordChange)
      .attr("opacity", 0)
      .text("the entire network will be infected."),
    centerElement(guide, "guide"),
    centerElement(guide2, "guide2"),
    d3.select(".guide").transition().duration(500)
      .attr("opacity", 1),
    d3.select(".guide2").transition().duration(500)
      .attr("opacity", 1),
    d3.select(".backArrow").on("click", function() {
      d3.select(".redX").remove(),
      guideRailsPosition = 3,
      guideRailsReverse()
    })
  }
  if (6 == guideRailsPosition) {
    nextEnable = true,
    backEnable = true,
    resetBack(),
    resetNext(),
    d3.select(".redX").remove();
    for (var a = 0; a < graph.nodes.length; a++) graph.nodes.status = "S";
    svg.selectAll("circle.node")
      .style("fill", "#b7b7b7"),
    d3.select(".guide")
      .attr("x", guideXCoord)
      .attr("y", guideYCoord)
      .attr("opacity", 0)
      .text("The chance that someone spreads the infection"),
    d3.select(".guide2")
      .attr("x", guideXCoord)
      .attr("y", guideYCoord + guide2YCoordChange)
      .attr("opacity", 0)
      .text("depends on how many neighbors they have."),
    centerElement(guide, "guide"),
    centerElement(guide2, "guide2"),
    d3.select(".guide").transition().duration(500)
      .attr("opacity", 1),
    d3.select(".guide2").transition().duration(500)
      .attr("opacity", 1)
  }
  if (7 == guideRailsPosition && (
    nextEnable = true,
    backEnable = true,
    resetBack(),
    resetNext(),
    d3.selectAll("circle.node").transition().duration(500)
      .attr("r", function(e) {
        return 3 * findNeighbors(e).length
      }),
    force.nodes(graph.nodes).charge(-1100).links(graph.links).start(),
    d3.select(".guide")
      .attr("x", guideXCoord)
      .attr("y", guideYCoord)
      .attr("opacity", 0)
      .text("Here the nodes have been resized based on the chance"),
    d3.select(".guide2")
      .attr("x", guideXCoord)
      .attr("y", guideYCoord + guide2YCoordChange)
      .attr("opacity", 0)
      .text("that they'll infect at least one of their neighbors."),
    centerElement(guide, "guide"),
    centerElement(guide2, "guide2"),
    d3.select(".guide").transition().duration(500)
      .attr("opacity", 1),
    d3.select(".guide2").transition().duration(500)
      .attr("opacity", 1)
    ),
    8 == guideRailsPosition && (
      nextEnable = true,
      backEnable = true,
      resetBack(),
      resetNext(),
      d3.select(".guide")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord)
        .attr("opacity", 0)
        .text("Most of the time, focusing treatment on people with"),
      d3.select(".guide2")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord + guide2YCoordChange)
        .attr("opacity", 0)
        .text("a lot of neighbors is a good strategy, but not always..."),
      centerElement(guide, "guide"),
      centerElement(guide2, "guide2"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".guide2").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".nextArrow").on("click", epi2VaxTransition)),
    9 == guideRailsPosition) {
      graph.nodes = [], 
      nextEnable = false,
      backEnable = false,
      resetBack(),
      resetNext(),
      vaccineSupply = 1,
      vax = 1,
      numberVaccinated = 0,
      loadSyringe(),
      d3.select(".lessonText").text("Lesson 3: Vaccines"),
      d3.select(".guide")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord)
        .attr("opacity", 0)
        .text("Select the 'Vaccinate' tool in the upper right"),
      d3.select(".guide2")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord + guide2YCoordChange)
        .attr("opacity", 0)
        .text("then click the flashing node to vaccinate it."),
      centerElement(guide, "guide"),
      centerElement(guide2, "guide2"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".guide2").transition().duration(500)
        .attr("opacity", 1),
      graph.nodes = [],
      graph.links = [];
      for (var a = 0; a < tailoredNodes.length; a++) tailoredNodes[a].status = "S", tailoredNodes[a].infectedBy = null, tailoredNodes[a].exposureTimestep = null;
      graph.nodes.push(tailoredNodes[2]),
      graph.nodes.push(tailoredNodes[1]),
      graph.nodes.push(tailoredNodes[3]),
      graph.nodes.push(tailoredNodes[8]),
      graph.nodes.push(tailoredNodes[9]),
      graph.nodes.push(tailoredNodes[10]),
      graph.nodes.push(tailoredNodes[11]),
      graph.nodes.push(tailoredNodes[12]);
      for (var a = 0; a < tailoredLinks.length; a++) {
        var o = tailoredLinks[a];
        (o.source.id == tailoredNodes[2].id || o.target.id == tailoredNodes[2].id) && graph.links.push(o)
      }
      removeDuplicateEdges(graph),
      tutorialUpdate()
    }
    if (10 == guideRailsPosition && (
      nextEnable = true,
      backEnable = false,
      resetNext(),
      resetBack(),
      keepFlashing = false,
      d3.select(".guide")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord)
        .attr("opacity", 0)
        .text("When we vaccinate a node,"),
      d3.select(".guide2")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord + guide2YCoordChange)
        .attr("opacity", 0)
        .text("it is removed because it cannot be infected."),
      centerElement(guide, "guide"),
      centerElement(guide2, "guide2"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".guide2").transition().duration(500)
        .attr("opacity", 1),
      tutorialUpdate()
    ), 11 == guideRailsPosition) {
      weakTieNodes = getWeakTieNodes(),
      weakTieLinks = getWeakTieLinks(),
      nextEnable = false,
      backEnable = false,
      d3.select(".nextArrow")
        .attr("fill", "#838383")
        .on("click", function() {}),
      d3.select(".nextArrow")
        .attr("fill", "#838383")
        .on("click", function() {}),
      keepFlashing = true,
      loadSyringe(),
      vaccineSupply = 1,
      numberVaccinated = 0,
      charge = -300,
      d3.select(".guide")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord)
        .attr("opacity", 0)
        .text("Separate this network into two groups"),
      d3.select(".guide2")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord + guide2YCoordChange)
        .attr("opacity", 0)
        .text("by vaccinating any of the flashing nodes."),
      centerElement(guide, "guide"),
      centerElement(guide2, "guide2"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".guide2").transition().duration(500)
        .attr("opacity", 1),
      graph.nodes = [],
      graph.links = [];
      for (var a = 0; a < weakTieNodes.length; a++) graph.nodes.push(weakTieNodes[a]);
      for (var r = 0; r < weakTieLinks.length; r++) graph.links.push(weakTieLinks[r]);
      for (var d = 0; d < graph.nodes.length; d++) {
        for (var n = 0, s = graph.nodes[d], l = 0; l < graph.links.length; l++) {
          var o = graph.links[l];
          (o.source.id == s.id || o.target.id == s.id) && n++
        }
        0 == n && graph.nodes.splice(d, 1)
      }
      removeDuplicateEdges(graph),
      tutorialUpdate(),
      flashNodes()
    }
    if (12 == guideRailsPosition && (vaccinateMode = false, d3.selectAll(".node")
.attr("r", 8)
.style("fill", "#b7b7b7"),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Now if an outbreak were to occur,"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("it would not spread to both groups."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1),
  d3.selectAll(".node")
.style("fill", "#b7b7b7")),
  13 == guideRailsPosition) {
      hideSyringe(),
  vaccinateMode = false, timeToStop = true, d3.select(".vaccineDepressedState")
.style("visibility", "hidden"),
  graph.nodes = [], graph.links = [], tailoredNodes.splice(13, 1);
      for (var a = 0; a < tailoredNodes.length; a++) graph.nodes.push(tailoredNodes[a]),
  graph.nodes[a].status = "S", graph.nodes[a].infectedBy = null, graph.nodes[a].exposureTimestep = null;
      for (var r = 0; r < tailoredLinks.length; r++) graph.links.push(tailoredLinks[r]);
      removeDuplicateEdges(graph),
  d3.selectAll(".node").on("click", function(e) {
        if (vaccinateMode) {
          if (0 >= vaccineSupply) return window.alert("Out of Vaccines!"),
  void 0;
          e.status = "V", d3.select(this)
.style("fill", "#d9d678"),
  vaccineSupply--, numberVaccinated++, 2 == vaccineSupply && (guideRailsPosition++, guideRails()),
  0 == vaccineSupply && intervention && (guideRailsPosition++, guideRails()),
  removeDuplicateEdges(graph),
  tutorialUpdate()
        }
      }),
  removeDuplicateEdges(graph),
  tutorialUpdate(),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Now let's look at the original network again, but this time"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("we'll use vaccines to break up the network. "),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1),
  vaccinateMode = false
    }
    if (14 == guideRailsPosition && (nextEnable = false, backEnable = true, resetBack(),
  resetNext(),
  timeToStop = true, vaccineSupply = 3, vax = 3, wiggle = true, loadSyringe(),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Select the 'Vaccinate' tool in the upper right and select"),
  vaccineSupply = 3, diseaseIsSpreading = false, postInitialOutbreak = true, d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("nodes to vaccinate. You only get " + vaccineSupply + " vaccines, so choose wisely."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1)),
  15 == guideRailsPosition && (nextEnable = true, resetNext(),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("When you vaccinate a node, they are effectively removed from"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("the network because they can no longer spread the infection."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1)),
  16 == guideRailsPosition && (nextEnable = true, resetNext(),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Vaccinating breaks the network into smaller pieces"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("making it less likely for an infection to spread to every node."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1)),
  17 == guideRailsPosition) {
      nextEnable = false, backEnable = false, resetNext(),
  resetBack(),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
    .attr("opacity", 0).text("Now, when an infection spreads, it is more likely"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
    .attr("opacity", 0).text("to be confined to a smaller network."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
    .attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
    .attr("opacity", 1);
  var u = graph.nodes.length;
  do var c = Math.floor(Math.random() * u),
    g = graph.nodes[c]; while ("V" == g.status);
  g.status = "I", diseaseIsSpreading = true,
  resetMenu(),
  timestep = 0, timeToStop = false, postInitialOutbreak = false, finalStop = true, tutorialTimesteps(),
  tutorialUpdate()
  }
  if (
    18 == guideRailsPosition && (
      finalStop = false,
      d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
        .attr("opacity", 0).text("In lesson 4: quarantine, we'll consider actions that"),
      d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
        .attr("opacity", 0).text("can be taken after an infection has begun to spread."),
      centerElement(guide, "guide"),
      centerElement(guide2, "guide2"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".guide2").transition().duration(500)
        .attr("opacity", 1),
      vax = 0,
      vaccineSupply = 0,
      d3.select(".nextArrow").text("Finish >").on("click", function() {
        vax2QuarantineTransition(),
        slideOutStepwiseNav()
      })),
    19 == guideRailsPosition && (
      d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
        .attr("opacity", 0).text("Quarantining is a way to immediately remove nodes that"),
      d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
        .attr("opacity", 0).text("are likely to be infected during an epidemic outbreak."),
      centerElement(guide, "guide"),
      centerElement(guide2, "guide2"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".guide2").transition().duration(500)
        .attr("opacity", 1)),
    20 == guideRailsPosition && (
      nextEnable = false,
      backEnable = false,
      resetNext(),
      resetBack(),
      transmissionRate = .35,
      rerun = false,
      hideSyringe(),
      loadQuarantine(),
      d3.select(".guide")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord)
        .attr("opacity", 0)
        .text("Select the 'Quarantine' tool in the upper right and click uninfected nodes"),
      d3.select(".guide2")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord + guide2YCoordChange)
        .attr("opacity", 0)
        .text("to quarantine. A new round of infections begins after every quarantine."),
      centerElement(guide, "guide"),
      centerElement(guide2, "guide2"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".guide2").transition().duration(500)
        .attr("opacity", 1)),
    21 == guideRailsPosition && (
      nextEnable = true,
      resetNext(),
      d3.select(".guide")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord)
        .attr("opacity", 0)
        .text("Great! Now, let's see how many you saved..."),
      d3.select(".guide2")
        .attr("x", guideXCoord)
        .attr("y", guideYCoord + guide2YCoordChange)
        .attr("opacity", 0).text(""),
      centerElement(guide, "guide"),
      centerElement(guide2, "guide2"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".guide2").transition().duration(500)
        .attr("opacity", 1)),
    22 == guideRailsPosition) {
      countSaved();
      var p = graph.nodes.length;
      graph = {}, graph.nodes = [], graph.links = [], quarantineUpdate();
      var y = ".";
      100 * (numberSaved / p) > 50 && (y = "!");
      var h = "Congratulations! You saved " + numberSaved + " people. That's about " + (100 * (numberSaved / p)).toFixed(0) + "%" + y,
        x = "This represents how effective you were at containing the outbreak.";
      1 == numberSaved && (h = "", x = "You only saved one person... ಠ_ಠ"),
      numberSaved >= p - 1 && (x = "Did you cheat? ಠ_ಠ", h = ""),
      d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
        .attr("opacity", 0).text(x),
      d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
        .attr("opacity", 0).text(h),
      centerElement(guide, "guide"),
      centerElement(guide2, "guide2"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.select(".guide2").transition().duration(500)
        .attr("opacity", 1),
      d3.select("#quarantineSxn")
        .attr("class", "menuItemNormal"),
      d3.select("#gameLink")
        .attr("class", "menuItemBold"),
      initRecap(),
      hideQuarantine(),
      menuColors = ["#007138", "#ffffff"],
      d3.select(".nextArrow")
        .text("Play!")
        .on("click", function() {
          window.location.href = "/game.html";
        });
      }
    }
  }

function flashFullGame() {
  colorIndex = menuColorFlash ? 0 : 1, d3.select("#gameLink")
    .style("color", menuColors[colorIndex]),
  menuColorFlash = !menuColorFlash
}

var menuColorFlash = true,
  colorIndex = 0,
  menuColors = ["#007138", "#ffffff"],
  wiggle = false;
  function guideRailsReverse() {
    var e = true;
    if (0 == guideRailsPosition && (
      trivialGraph = {},
      trivialGraph.nodes = [],
      trivialGraph.links = [],
      d3.selectAll(".node").remove(),
      d3.selectAll(".link").remove(),
      quarantineMode = false, diseaseIsSpreading = false, timeToStop = true, backEnable = false, resetBack(),
      d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord).attr("font-size", "28px")
        .attr("opacity", 0).text("Suppose this is you"),
      d3.select(".guide2").text(""),
      centerElement(guide, "guide"),
      d3.select(".guide").transition().duration(500)
        .attr("opacity", 1),
      d3.selectAll(".node")
        .style("cursor", "pointer"),
      d3.select("#networkSxn")
        .attr("class", "menuItemBold"),
      d3.select("#epidemicSxn")
        .attr("class", "menuItemNormal"),
      d3.select("#vaccineSxn")
        .attr("class", "menuItemNormal"),
      d3.select("#quarantineSxn")
        .attr("class", "menuItemNormal"),
      trivialGraph.nodes.push(tailoredNodes[0]),
      stepWiseUpdate()
    ), 1 == guideRailsPosition) {
      quarantineMode = false,
      trivialGraph.nodes = [],
      trivialGraph.links = [],
      trivialGraph.nodes.push(tailoredNodes[0]),
      trivialGraph.nodes.push(tailoredNodes[1]);
      for (var i = 0; i < tailoredLinks.length; i++) {
        var t = tailoredLinks[i];
        (t.source.id == tailoredNodes[0].id && t.target.id == tailoredNodes[1].id || t.source.id == tailoredNodes[1].id && t.target.id == tailoredNodes[0].id) && trivialGraph.links.push(t)
      }
      removeDuplicateEdges(trivialGraph);
      stepWiseUpdate();
    }
    if (2 == guideRailsPosition) {
      quarantineMode = false,
      trivialGraph.nodes = [],
      trivialGraph.links = [],
      trivialGraph.nodes.push(tailoredNodes[0]),
      trivialGraph.nodes.push(tailoredNodes[1]),
      trivialGraph.nodes.push(tailoredNodes[4]),
      trivialGraph.nodes.push(tailoredNodes[5]),
      trivialGraph.nodes.push(tailoredNodes[12]);
      for (var a = 0; a < trivialGraph.nodes.length; a++){
        for (var s = 0; s < trivialGraph.nodes.length; s++){
          if (edgeExists(trivialGraph.nodes[a], trivialGraph.nodes[s], graph)) {
            var r = {
              source: trivialGraph.nodes[a],
              target: trivialGraph.nodes[s],
              remove: false
            };
            if (testDuplicate(trivialGraph.links, r)) continue;
            trivialGraph.links.push(r);
          }
          removeDuplicateEdges(trivialGraph);
          stepWiseUpdate();
        }
      }
    }
    if (3 == guideRailsPosition && (timestep = 0, guideRailsPosition++, guideRails()), 4 == guideRailsPosition) {
      quarantineMode = false, d3.select("#networkSxn")
        .attr("class", "menuItemNormal"),
      d3.select("#epidemicSxn")
        .attr("class", "menuItemBold"),
      d3.select("#vaccineSxn")
        .attr("class", "menuItemNormal"),
      d3.select("#quarantineSxn")
        .attr("class", "menuItemNormal"),
      d3.select(".redX").remove(),
      graph.nodes = [],
      graph.links = [],
      timestep = 0,
      diseaseIsSpreading = false,
      timeToStop = false;
      for (var i = 0; i < tailoredNodes.length; i++){
        tailoredNodes[i].status = "S";
        tailoredNodes[i].infectedBy = null;
        tailoredNodes[i].exposureTimestep = null;
        graph.nodes.push(tailoredNodes[i])
      }
      for (var a = 0; a < tailoredLinks.length; a++) graph.links.push(tailoredLinks[a]);
      removeDuplicateEdges(graph);
      tutorialUpdate();
      net2epiTransition();
    }
    if (9 == guideRailsPosition) {
      force.stop(),
      quarantineMode = false
      hideQuarantine(),
      graph.nodes = [],
      graph.links = [];
      for (var i = 0; i < tailoredNodes.length; i++){
        tailoredNodes[i].status = "S";
        tailoredNodes[i].infectedBy = null;
        tailoredNodes[i].exposureTimestep = null;
      }
      graph.nodes.push(tailoredNodes[2]),
      tutorialUpdate(),
      loadSyringe(),
      vax = 1, vaccineSupply = 1;
      d3.selectAll(".node").transition().duration(500)
        .attr("r", e => "S" == e.status ? 8 : "V" == e.status ? 15 : void 0)
        .style("fill", e => "S" == e.status ? "#b7b7b7" : "V" == e.status ? "#d9d678" : void 0);
      keepFlashing = true;
    }
    if (guideRailsPosition >= 13 && 17 >= guideRailsPosition) {
      backEnable = true,
      nextEnable = true,
      resetBack(),
      resetNext(),
      quarantineMode = false,
      guideRailsPosition = 13,
      vaccineSupply = 3,
      vax = 3,
      graph.nodes = [],
      graph.links = [];
      for (var i = 0; i < tailoredNodes.length; i++){
        tailoredNodes[i].status = "S";
        tailoredNodes[i].fixed = false;
        graph.nodes.push(tailoredNodes[i]);
      }
      for (var a = 0; a < tailoredLinks.length; a++) graph.links.push(tailoredLinks[a]);
      removeDuplicateEdges(graph);
      tutorialUpdate();
      timeToStop = false;
      diseaseIsSpreading = false;
      finalStop = true;
      endGame = false;
    }
    guideRails(e);
  }