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
    nextX = 750,
    nextY = 140,
    guideXCoord = 400,
    guideYCoord = 70,
    guide2YCoordChange = 35,
    width = window.innerWidth,
    height = window.innerheight,
    rewire = .1,
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
    nextX = 750,
    nextY = 140,
    guideXCoord = 400,
    guideYCoord = 70,
    guide2YCoordChange = 35,
    width = window.innerWidth,
    height = window.innerHeight,
    svg,
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
    simulation = !0,
    vaccineResearched = !1,
    pleaseWait = !1,
    game = !1,
    startButton,
    backEnable = !0,
    nextEnable = !0,
    pop,
    tailoredGraph = {},
    tailoredNodes = getTailoredNodes(),
    tailoredLinks = getTailoredLinks(),
    graph = {
      nodes: tailoredNodes,
      links: tailoredLinks
    },
    trivialGraph = {
      nodes: [],
      links: []
    };

var player = graph.nodes[0];

function tick() {
  node
    .attr("cx", t => Math.max(8, Math.min(width - 8, t.x)))
    .attr("cy", t => Math.max(8, Math.min(492, t.y)));
  link
    .attr("x1", t => t.source.x)
    .attr("y1", t => t.source.y)
    .attr("x2", t => t.target.x)
    .attr("y2", t => t.target.y)
}

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
        vaccinateMode = !1;
        d3.status = "Q";
      }
      if (vaccinateMode) {
        if (quarantineMode = !1, 0 >= vaccineSupply) return window.alert("Out of Vaccines!"),
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
    .call(force.drag);
  node.exit().remove();
  d3.select(".vaccineCounterText").text(vaccineSupply + " / " + vax);
}

function addOneFriend() {
  trivialGraph.nodes.push(graph.nodes[1]);
  trivialGraph.links.push({
    source: trivialGraph.nodes[0],
    target: trivialGraph.nodes[1],
    remove: !1
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
  tutorial = !0;
  for (var t = 0; t < graph.nodes.length; t++){
    edgeExists(graph.nodes[t], trivialGraph.nodes[0], graph) && trivialGraph.nodes.push(graph.nodes[t]);
  }
  for (var e = 0; e < trivialGraph.nodes.length; e++){
    for (var n = 0; n < trivialGraph.nodes.length; n++){
      if (edgeExists(trivialGraph.nodes[e], trivialGraph.nodes[n], graph)){
        var a = {
          source: trivialGraph.nodes[e],
          target: trivialGraph.nodes[n],
          remove: !1
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
  force.nodes(e).charge(charge).friction(friction).links(t).start();
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
    .call(force.drag).on("click", function(t) {
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
    animatePathogens_thenUpdate(), nextEnable = !0, resetBack(), resetNext(), resetMenu()) : (
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
    timeToStop = !0,
    diseaseIsSpreading = !1
  ) : detectEndGame();
  finalStop && (detectEndGame(), endGame && (timeToStop = !0));
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
    .attr("y", height - 200)
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
        diseaseIsSpreading = !0;
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
  d3.select(".menuBox").remove()
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
        backEnable = !1, resetBack()))
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
        keepFlashing = !1
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
  force = d3.layout.force()
    .nodes(trivialGraph.nodes)
    .links(trivialGraph.links)
    .size([width, height])
    .charge(charge)
    .friction(friction)
    .on("tick", tick)
    .start();
  link = svg.selectAll(".link").data(trivialGraph.links).enter().append("line")
    .attr("class", "link");
  node = svg.selectAll(".node").data(trivialGraph.nodes).enter().append("circle")
    .attr("class", "node")
    .attr("r", 15)
    .style("fill", "#2fa0ef")
    .call(force.drag)
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
    1 == t.nodes[e].fixed && (t.nodes[e].fixed = !1);
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
  vaccinationMode = !1;
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
  quarantineMode = !0;
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
  quarantineMode = !1;
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
        keepFlashing = !1;
        nextEnable = !0;
        backEnable = !1;
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
        keepFlashing = !1;
        nextEnable = !0;
        backEnable = !1;
        resetBack();
        resetNext();
        tutorialUpdate()
      }
    });
  keepFlashing && window.setTimeout(flashNodes, 500)
}

function activateVaccinationMode() {
  wiggle && wiggleHack();
  wiggle = !1;
  vaccinateMode = !0;
  d3.selectAll(".node")
    .style("cursor", "url(/assets/vax_cursor.cur)"),
  svg
    .style("cursor", "url(/assets/vax_cursor.cur)"),
  vaccineResearched = !0;
  intervention = !0;
  d3.select(".vaccineCounterText")
    .style("color", "white")
    .text(vaccineSupply + " / " + vax);
  d3.select(".vaccineDepressedState")
    .style("visibility", "visible");
}

function activateQuarantineMode() {
  friction = .9;
  vaccinateMode = !1;
  quarantineMode = !0;
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
  diseaseIsSpreading = !0;
  resetMenu();
  timestep = 0;
  timeToStop = !1;
  postInitialOutbreak = !0;
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
    nextEnable = !0,
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
    .call(force.drag);
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

start ? guideRails() : (start = !0, initTutorial());

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
      backEnable = !1, resetBack())))
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
  endGame = !1;
  timeToStop = !1;
  diseaseIsSpreading = !1;
  vaccinateMode = !1;
  quarantineMode = !1;
  finalStop = !1;
  intervention = !1;
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
  diseaseIsSpreading = !1;
  backEnable = !1;
  nextEnable = !0;
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
  quarantineMode = !1;
  vaccinateMode = !1;
  diseaseIsSpreading = !1;
  timeToStop = !1;
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
  force = [], force = d3.layout.force().nodes(trivialGraph.nodes).links(trivialGraph.links).size([width, height]).charge(charge).friction(friction).on("tick", tick).start(),
  link = [], link = svg.selectAll(".link").data(trivialGraph.links).enter().append("line")
.attr("class", "link"),
  node = [], node = svg.selectAll(".node").data(trivialGraph.nodes).enter().append("circle").attr("class", "node")
.attr("r", 15)
.style("fill", "#2fa0ef").call(force.drag).on("click", function(e) {
    if (vaccinateMode) {
      if (0 >= vaccineSupply) return window.alert("Out of Vaccines!"),
  void 0;
      e.status = "V", vaccineSupply--, numberVaccinated++
    }
  }),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord).attr("font-size", "28px")
.attr("opacity", 0).text("Suppose this is you"),
  d3.select(".guide2").text(""),
  centerElement(guide, "guide"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  createMenuBox(1),
  guideRailsPosition = 0, d3.select(".node")
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
  quarantineMode = !1, d3.select(".redX").remove(),
  graph.nodes = [], graph.links = [], timestep = 0, diseaseIsSpreading = !1, timeToStop = !1, tailoredNodes.splice(13, 1);
  for (var e = 0; e < tailoredNodes.length; e++) tailoredNodes[e].status = "S", tailoredNodes[e].infectedBy = null, tailoredNodes[e].exposureTimestep = null, graph.nodes.push(tailoredNodes[e]);
  for (var t = 0; t < tailoredLinks.length; t++) graph.links.push(tailoredLinks[t]);
  removeDuplicateEdges(graph),
  tutorialUpdate(),
  endGame = !1, startButton = d3.select(".guideTextSVG").append("text").attr("class", "startButton").attr("font-size", "18px").attr("opacity", 1).attr("x", nextX)
.attr("y", nextY)
.style("cursor", "pointer")
.style("font-family", "Nunito")
.style("fill", "#707070")
.style("font-weight", 470).text("Start >").on("click", function() {
    var e = Math.floor(Math.random() * numberOfIndividuals);
    graph.nodes[e].status = "I", diseaseIsSpreading = !0, tutorialTimesteps(),
  resetMenu(),
  nextEnable = !1, backEnable = !1, disableNext(),
  disableBack(),
  timeToStop = !1
  }),
  guideRailsPosition = 4, guideRails()
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
    guideRailsPosition++, guideRails(),
  slideOutStepwiseNav()
  }),
  resetBack()
}
function epi2VaxTransition() {
  slideOutStepwiseNav(),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Coming up, in lesson 3: vaccines, we'll cover how to prevent"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("epidemics by containing outbreaks before they spread."),
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
  graph.nodes = [], graph.links = [], graph = generateSmallWorld(35, rewire, meanDegree),
  quarantineUpdate(),
  removeDuplicateEdges(graph);
  for (var e = 0; e < graph.nodes.length; e++) graph.nodes[e].status = "S";
  hideSyringe(),
  d3.select(".lessonText").text("Lesson 4: Quarantine"),
  d3.select("#quarantineSxn")
    .attr("class", "menuItemBold"),
  d3.select("#vaccineSxn")
    .attr("class", "menuItemNormal"),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
    .attr("opacity", 0).text("Vaccines take time to 'kick in' so they're ineffective"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
    .attr("opacity", 0).text("if an infection has already begun to spread."),
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
      0 == guideRailsPosition && (backEnable = !1),
      1 == guideRailsPosition && (
        nextEnable = !0,
        backEnable = !0,
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
        nextEnable = !0,
        backEnable = !0,
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
        nextEnable = !0,
        backEnable = !0,
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
              diseaseIsSpreading = !0;
              tutorialUpdate();
              slideOutMenuBox();
              tutorialTimesteps();
              d3.select(this).remove();
            }),
          e
        ){
          var t = Math.floor(Math.random() * numberOfIndividuals);
          graph.nodes[t].status = "I", removeDuplicateEdges(graph),
          diseaseIsSpreading = !0, tutorialUpdate(),
          tutorialTimesteps()
        }
        resetMenu(),
        nextEnable = !1,
        backEnable = !1,
        disableNext(),
        disableBack(),
        timeToStop = !1
      }
  if (5 == guideRailsPosition) {
    nextEnable = !0, backEnable = !0, resetBack(),
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
      nextEnable = !0, backEnable = !0, resetBack(),
  resetNext(),
  d3.select(".redX").remove();
      for (var a = 0; a < graph.nodes.length; a++) graph.nodes.status = "S";
      svg.selectAll("circle.node")
.style("fill", "#b7b7b7"),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("The chance that someone spreads the infection"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("depends on how many neighbors they have."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1)
    }
    if (7 == guideRailsPosition && (nextEnable = !0, backEnable = !0, resetBack(),
  resetNext(),
  d3.selectAll("circle.node").transition().duration(500)
.attr("r", function(e) {
        return 3 * findNeighbors(e).length
      }),
  force.nodes(graph.nodes).charge(-1100).links(graph.links).start(),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Here the nodes have been resized based on the chance"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("that they'll infect at least one of their neighbors."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1)),
  8 == guideRailsPosition && (nextEnable = !0, backEnable = !0, resetBack(),
  resetNext(),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Most of the time, focusing treatment on people with"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("a lot of neighbors is a good strategy, but not always..."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1),
  d3.select(".nextArrow").on("click", epi2VaxTransition)),
  9 == guideRailsPosition) {
      graph.nodes = [], nextEnable = !1, backEnable = !1, resetBack(),
  resetNext(),
  vaccineSupply = 1, vax = 1, numberVaccinated = 0, loadSyringe(),
  d3.select(".lessonText").text("Lesson 3: Vaccines"),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Select the 'Vaccinate' tool in the upper right"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("then click the flashing node to vaccinate it."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1),
  graph.nodes = [], graph.links = [];
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
    if (10 == guideRailsPosition && (nextEnable = !0, backEnable = !1, resetNext(),
  resetBack(),
  keepFlashing = !1, d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("When we vaccinate a node,"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("it is removed because it cannot be infected."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1),
  tutorialUpdate()),
  11 == guideRailsPosition) {
      weakTieNodes = getWeakTieNodes(),
  weakTieLinks = getWeakTieLinks(),
  nextEnable = !1, backEnable = !1, d3.select(".nextArrow")
.attr("fill", "#838383").on("click", function() {}),
  d3.select(".nextArrow")
.attr("fill", "#838383").on("click", function() {}),
  keepFlashing = !0, loadSyringe(),
  vaccineSupply = 1, numberVaccinated = 0, charge = -300, d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Separate this network into two groups"),
  d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("by vaccinating any of the flashing nodes."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1),
  graph.nodes = [], graph.links = [];
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
    if (12 == guideRailsPosition && (vaccinateMode = !1, d3.selectAll(".node")
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
  vaccinateMode = !1, timeToStop = !0, d3.select(".vaccineDepressedState")
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
  vaccinateMode = !1
    }
    if (14 == guideRailsPosition && (nextEnable = !1, backEnable = !0, resetBack(),
  resetNext(),
  timeToStop = !0, vaccineSupply = 3, vax = 3, wiggle = !0, loadSyringe(),
  d3.select(".guide").attr("x", guideXCoord).attr("y", guideYCoord)
.attr("opacity", 0).text("Select the 'Vaccinate' tool in the upper right and select"),
  vaccineSupply = 3, diseaseIsSpreading = !1, postInitialOutbreak = !0, d3.select(".guide2").attr("x", guideXCoord).attr("y", guideYCoord + guide2YCoordChange)
.attr("opacity", 0).text("nodes to vaccinate. You only get " + vaccineSupply + " vaccines, so choose wisely."),
  centerElement(guide, "guide"),
  centerElement(guide2, "guide2"),
  d3.select(".guide").transition().duration(500)
.attr("opacity", 1),
  d3.select(".guide2").transition().duration(500)
.attr("opacity", 1)),
  15 == guideRailsPosition && (nextEnable = !0, resetNext(),
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
  16 == guideRailsPosition && (nextEnable = !0, resetNext(),
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
      nextEnable = !1, backEnable = !1, resetNext(),
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
  g.status = "I", diseaseIsSpreading = !0,
  resetMenu(),
  timestep = 0, timeToStop = !1, postInitialOutbreak = !1, finalStop = !0, tutorialTimesteps(),
  tutorialUpdate()
  }
  if (
    18 == guideRailsPosition && (
      finalStop = !1,
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
      nextEnable = !1,
      backEnable = !1,
      resetNext(),
      resetBack(),
      transmissionRate = .35,
      rerun = !1,
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
      nextEnable = !0,
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

var menuColorFlash = !0,
  colorIndex = 0,
  menuColors = ["#007138", "#ffffff"],
  wiggle = !1;
  function guideRailsReverse() {
    var e = !0;
    if (0 == guideRailsPosition && (
      trivialGraph = {},
      trivialGraph.nodes = [],
      trivialGraph.links = [],
      d3.selectAll(".node").remove(),
      d3.selectAll(".link").remove(),
      quarantineMode = !1, diseaseIsSpreading = !1, timeToStop = !0, backEnable = !1, resetBack(),
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
      quarantineMode = !1,
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
      quarantineMode = !1,
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
              remove: !1
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
      quarantineMode = !1, d3.select("#networkSxn")
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
      diseaseIsSpreading = !1,
      timeToStop = !1;
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
      quarantineMode = !1
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
      keepFlashing = !0;
    }
    if (guideRailsPosition >= 13 && 17 >= guideRailsPosition) {
      backEnable = !0,
      nextEnable = !0,
      resetBack(),
      resetNext(),
      quarantineMode = !1,
      guideRailsPosition = 13,
      vaccineSupply = 3,
      vax = 3,
      graph.nodes = [],
      graph.links = [];
      for (var i = 0; i < tailoredNodes.length; i++){
        tailoredNodes[i].status = "S";
        tailoredNodes[i].fixed = !1;
        graph.nodes.push(tailoredNodes[i]);
      }
      for (var a = 0; a < tailoredLinks.length; a++) graph.links.push(tailoredLinks[a]);
      removeDuplicateEdges(graph);
      tutorialUpdate();
      timeToStop = !1;
      diseaseIsSpreading = !1;
      finalStop = !0;
      endGame = !1;
    }
    guideRails(e);
  }