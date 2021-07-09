var numberOfIndividuals,
  meanDegree,
  graph = {},
  force,
  node,
  link,
  invisibleParameter = 1.9,
  transmissionRate,
  recoveryRate,
  independentOutbreaks = 1,
  numberVaccinated,
  numberQuarantined,
  numberSaved,
  numberInfected,
  numberOfRefusers,
  gameSVG,
  width = window.innerWidth,
  height = window.innerHeight,
  charge = -900,
  friction = .9,
  numberOfVaccines = 0,
  vaccineSupply = 0,
  difficultyString,
  customNodeChoice,
  customNeighborChoice,
  customVaccineChoice,
  customOutbreakChoice,
  customRefuserChoice,
  timestep = 0,
  newInfections = [],
  exposureEdges = [],
  xyCoords = [],
  diseaseIsSpreading = false,
  timeToStop = false,
  infectedBar,
  uninfectedBar,
  infectedHeight,
  uninfectedHeight,
  game,
  easyBar = 70,
  mediumBar = 50,
  hardBar = 40,
  vaxEasyCompletion,
  vaxMediumCompletion,
  vaxHardCompletion,
  vaxEasyHiScore,
  vaxMediumHiScore,
  vaxHardHiScore,
  vaxEasyHiScoreRT,
  vaxMediumHiScoreRT,
  vaxHardHiScoreRT,
  easyScores,
  mediumScores,
  hardScores,
  scores = {
    easy: easyScores,
    medium: mediumScores,
    hard: hardScores
  },
  easyScoresRT,
  mediumScoresRT,
  hardScoresRT,
  scoresRT = {
    easy: easyScoresRT,
    medium: mediumScoresRT,
    hard: hardScoresRT
  },
  currentNode,
  currentElement,
  cookie = {},
  pop = document.getElementById("audio"),
  best,
  current,
  originalLocation = [0, 0],
  newLocation = [0, 0],
  dragStartDateObject,
  dragStartMillis,
  dragEndDateObject,
  dragEndMillis,
  clickTime,
  dragDistanceThreshold = 10,
  clickTimeThreshold = 100,
  customNodeChoice = 1,
  customVaccineChoice = 1,
  customNeighborChocie = 1,
  customOutbreakChoice = 1,
  speed = false,
  toggleDegree = true;

function initCookiesJSON() {
  var e = Cookies.get("vaxEasyCompletion");
  e || isNaN(customNodeChoice) ? clearCookies() : (
    !e || isNaN(customNodeChoice)
  ) && clearCookies(),
  Cookies.set("customNodes",  75);
  Cookies.set("customNeighbors",  3);
  Cookies.set("customVaccines",  10);
  Cookies.set("customOutbreaks",  2);
  Cookies.set("customRefusers",  .05);
  Cookies.set("json", true);
  easyScores = [];
  mediumScores = [];
  hardScores = [];
  var t = [easyScores, mediumScores, hardScores];
  easyScoresRT = [],
  mediumScoresRT = [],
  hardScoresRT = [];
  var o = [easyScoresRT, mediumScoresRT, hardScoresRT],
      s = {
        easy: false,
        medium: false,
        hard: false,
        scores: t,
        scoresRT: o
      };
  Cookies.set("vaxCookie", s, {
    expires: 365,
    path: "/"
  });
}

function readCookiesJSON() {
  Cookies.set("json", true);
  var e = Cookies.getJSON("vaxCookie");
  if (
    void 0 == e &&
      initCookiesJSON(),
      cookie = JSON.parse(Cookies.get("vaxCookie")),
      vaxEasyCompletion = cookie.easy,
      vaxMediumCompletion = cookie.medium,
      vaxHardCompletion = cookie.hard,
      vaxEasyHiScore = Math.max.apply(Math, cookie.scores[0]),
      vaxMediumHiScore = Math.max.apply(Math, cookie.scores[1]),
      vaxHardHiScore = Math.max.apply(Math, cookie.scores[2]),
      void 0 == cookie.scoresRT
  ) {
    var t = [],
      i = [],
      a = [],
      o = [t, i, a];
    cookie.scoresRT = o
  }
  vaxEasyHiScoreRT = Math.max.apply(Math, cookie.scoresRT[0]),
  vaxMediumHiScoreRT = Math.max.apply(Math, cookie.scoresRT[1]),
  vaxHardHiScoreRT = Math.max.apply(Math, cookie.scoresRT[2]),
  Cookies.set("json", false),
  customNodeChoice = parseInt(Cookies.get("customNodes")), 
  customNeighborChoice = parseInt(Cookies.get("customNeighbors")),
  customVaccineChoice = parseInt(Cookies.get("customVaccines")),
  customOutbreakChoice = parseInt(Cookies.get("customOutbreaks")),
  customRefuserChoice = parseInt(Cookies.get("customRefusers")),
  isNaN(customNodeChoice) && (customNodeChoice = 75, Cookies.set("customNodes",  75)),
  isNaN(customNeighborChoice) && (customNeighborChoice = 3, Cookies.set("customNeighbors",  3)),
  isNaN(customVaccineChoice) && (customVaccineChoice = 10, Cookies.set("customVaccines",  10)),
  isNaN(customOutbreakChoice) && (customOutbreakChoice = 2, Cookies.set("customOutbreaks",  2)),
  isNaN(customRefuserChoice) && (customRefuserChoice = .05, Cookies.set("customRefusers",  .05)),
  Cookies.set("json", true),
  cookieBasedModeSelection()
}

function clearCookies() {
  Cookies.remove("vaxCookie"),
  Cookies.remove("customNodes"),
  Cookies.remove("customNeighbors"),
  Cookies.remove("customVaccines"),
  Cookies.remove("customOutbreaks"),
  Cookies.remove("customRefusers"),
  Cookies.remove("vaxEasyCompletion"),
  Cookies.remove("vaxMediumCompletion"),
  Cookies.remove("vaxHardCompletion"),
  Cookies.remove("vaxEasyHiScore"),
  Cookies.remove("vaxMediumHiScore"),
  Cookies.remove("vaxHardHiScore");
}

function allAccess() {
  Cookies.set("json", true),
  easyScores = ["99"],
  mediumScores = ["99"],
  hardScores = ["99"];
  var e = [easyScores, mediumScores, hardScores];
  easyScoresRT = ["99"],
  mediumScoresRT = ["99"],
  hardScoresRT = ["99"];
  var t = [easyScoresRT, mediumScoresRT, hardScoresRT],
    i = {
      easy: true,
      medium: true,
      hard: true,
      scores: e,
      scoresRT: t
    };
  Cookies.remove("vaxCookie"),
  Cookies.set("vaxCookie", i, {
    expires: 365,
    path: "/"
  });
}

function cookieBasedModeSelection() {
  vaxEasyHiScore   == -1 / 0 || d3.select("#score-easy")  .text("(Best: " + (speed ? vaxEasyHiScoreRT   : vaxEasyHiScore)   + "%)");
  vaxMediumHiScore == -1 / 0 || d3.select("#score-medium").text("(Best: " + (speed ? vaxMediumHiScoreRT : vaxMediumHiScore) + "%)");
  vaxHardHiScore   == -1 / 0 || d3.select("#score-hard")  .text("(Best: " + (speed ? vaxHardHiScoreRT   : vaxHardHiScore)   + "%)");
  d3.select("#difficulty-medium")
    .classed('difficultyItem', vaxEasyCompletion)
    .classed('difficultyItemGrey', !vaxEasyCompletion)
    .on("click", function() {
      if(1 == vaxEasyCompletion){
        difficultyString = "medium";
        initBasicGame(difficultyString);
      }
    });
  d3.select("#difficulty-hard")
    .classed("difficultyItem", vaxMediumCompletion)
    .classed("difficultyItemGrey", !vaxMediumCompletion)
    .on("click", function() {
      if(vaxMediumCompletion){
        difficultyString = "hard";
        initBasicGame(difficultyString);  
      }
    });
}

function initBasicGame(e) {
  d3.select(".difficultySelection").remove(),
  d3.select(".newGameHeader").remove(),
  d3.select("#customMenuDiv").remove(),
  graph = {},
  graph.nodes = [],
  graph.links = [],
  "easy" == e && (
    numberOfIndividuals = 50,
    meanDegree = 3,
    numberOfVaccines = 5,
    independentOutbreaks = 1,
    transmissionRate = 0.7,
    recoveryRate = 0
  ),
  "medium" == e && (
    numberOfIndividuals = 75,
    meanDegree = 4,
    numberOfVaccines = 7,
    independentOutbreaks = 2,
    transmissionRate = 0.7,
    recoveryRate = 0
  ),
  "hard" == e && (
    charge = -300,
    numberOfIndividuals = 100,
    meanDegree = 4,
    numberOfVaccines = 15,
    transmissionRate = 0.4,
    recoveryRate = 0,
    independentOutbreaks = 3
  ),
  graph = generateSmallWorld(numberOfIndividuals, 0.1, meanDegree);
  for (var t = 0; t < graph.nodes.length; t++){
    graph.nodes[t].fixed = false;
  }
  if ("hard" == e){
    for (var t = 0; t < graph.nodes.length; t++){
      Math.random() < .05 && (graph.nodes[t].refuser = true);
    }
  }
  removeDuplicateEdges(graph);
  initGameSpace();
}

d3.select("#custom-launch").on('click', initCustomGame);

function initCustomGame() {
  difficultyString = null,
  d3.select(".newGameHeader").remove(),
  graph = {},
  graph.nodes = [],
  graph.links = [],
  transmissionRate = .5,
  numberOfIndividuals = customNodeChoice,
  meanDegree = customNeighborChoice,
  numberOfVaccines = customVaccineChoice,
  vaccineSupply = numberOfVaccines,
  independentOutbreaks = customOutbreakChoice,
  numberOfRefusers = customRefuserChoice,
  0 == numberOfVaccines && (numberOfVaccines = 1),
  numberOfIndividuals - numberOfVaccines > independentOutbreaks && (independentOutbreaks = 1),
  customNodeChoice > 100 && (charge = -150),
  customNodeChoice > 125 && (charge = -130),
  graph = generateSmallWorld(numberOfIndividuals, 0.1, meanDegree),
  removeDuplicateEdges(graph);
  for (var e = 0; e < graph.nodes.length; e++) graph.nodes[e].refuser = false;
  for (var e = 0; numberOfRefusers > e; e++) {
    do var t = graph.nodes[Math.floor(Math.random() * graph.nodes.length)]; while (t.refuser);
    t.refuser = true
  }
  for (var i = 0, e = 0; e < graph.nodes.length; e++) graph.nodes[e].refuser && i++;
  i == numberOfIndividuals && (numberOfVaccines = 1, graph.nodes[0].refuser = false),
  d3.select("#customMenuDiv")
    .style("right", "-1000px")
    .style("visibility", "hidden");
  window.setTimeout(function() {
    d3.select("#customMenuDiv").remove();
    initGameSpace();
  }, 500);
}

function initGameSpace() {
  game = true,
  loadGameSyringe(),
  vaccinateMode = false,
  quarantineMode = false,
  numberVaccinated = 0,
  numberQuarantined = 0;
  var e = "undefined" != typeof InstallTrigger,
    t = false || document.documentMode;
  gameSVG = e || t ?
    d3.select("body").append("svg").append("svg:g") :
    d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("class", "gameSVG")
      .attr("pointer-events", "all")
      .append("svg:g"),
  link = gameSVG.selectAll(".link")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("class", "link"),
  drag = d3.drag()
    .on("start", function(e, d) {
      dragStartDateObject = {},
      dragStartMillis = 0,
      dragEndMillis = 0,
      clickTime = 1e4,
      dragStartDateObject = new Date,
      dragStartMillis = dragStartDateObject.getMilliseconds(),
      originalLocation = [],
      newLocation = [],
      originalLocation[0] = e.x,
      originalLocation[1] = e.y,
      d.fixed = true
    })
    .on("drag", function(e, d) {
      d.px += e.dx,
      d.py += e.dy,
      d.x += e.dx,
      d.y += e.dy,
      tick(),
      newLocation[0] = d.x,
      newLocation[1] = d.y
    })
    .on("end", function(e, d) {
      dragEndDateObject = new Date,
      dragEndMillis = dragEndDateObject.getMilliseconds(),
      clickTime = Math.abs(dragEndMillis - dragStartMillis),
      d.fixed = false,
      tick(),
      force.alpha(0.3).restart(),
      getCartesianDistance(originalLocation, newLocation) < dragDistanceThreshold ?
        clickTimeThreshold > clickTime && (speed ? speedModeGameClick(e) : gameClick(e)) :
        clickTimeThreshold > clickTime && (speed ? speedModeGameClick(e) : gameClick(e))
    });
  clickArea = gameSVG.selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("class", "clickArea")
    .attr("r", function(e) {
      var t;
      return
        "easy" == difficultyString && (t = invisibleParameter * nodeSize(e)),
        "medium" == difficultyString && (t = (invisibleParameter - .2) * nodeSize(e)),
        "hard" == difficultyString && (t = (invisibleParameter - .3) * nodeSize(e)),
        t
    })
    .attr("fill", "black")
    .attr("opacity", 0)
    .on("click", function(e) {
      speed ? speedModeGameClick(e) : gameClick(e)
    })
    .call(drag),
  node = gameSVG.selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", nodeSize)
    .attr("fill", nodeColor)
    .on("click", function(e) {
      speed ? speedModeGameClick(e) : gameClick(e)
    })
    .on("mouseover", function(e) {
      d3.select(this).style("stroke-width", "3px"),
      currentNode = e,
      currentElement = d3.select(this)
    })
    .on("mouseout", function() {
      d3.select(this).style("stroke-width", "2px"),
      1 == currentNode.fixed && d3.select(this).style("stroke-width", "3px"),
      currentNode = null,
      currentElement = null
    })
    .call(drag);
  force = d3.forceSimulation(graph.nodes)
    .force("charge", d3.forceManyBody().strength(-charge))
    .force("link", d3.forceLink(graph.links))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", tick);
  if(difficultyString == "hard" || difficultyString == null){
    refusersPresent();
  }
  if(toggleDegree){
    charge = (difficultyString == "easy"  ) ? -850 : charge;
    charge = (difficultyString == "medium") ? -450 : charge;
    charge = (difficultyString == "hard"  ) ? -300 : charge;
  }
}

function nodeSize(e) {
  return toggleDegree ? (findNeighbors(e).length + 1.5) * 2 : 8
}

function nodeColor(e) {
  var t = null;
  return
    "S" == e.status && (t = "#b7b7b7"),
    "E" == e.status && (t = "#ef5555"),
    "I" == e.status && (t = "#ef5555"),
    "R" == e.status && (t = "#9400D3"),
    "V" == e.status && (t = "#76A788"),
    "Q" == e.status && (t = "#d9d678"),
    "S" == e.status && e.refuser && (t = "#fab45a"),
    t
}

function gameClick(e) {
  if (vaccinateMode) {
    if (1 == e.refuser) return;
    try {
      pop.play()
    } catch (t) {}
    e.status = "V", numberOfVaccines--, numberVaccinated++
  } else if (quarantineMode && "S" == e.status) {
    try {
      pop.play()
    } catch (t) {}
    diseaseIsSpreading = true, e.status = "Q", numberQuarantined++, window.setTimeout(gameTimesteps, 500)
  }
  0 != numberOfVaccines || diseaseIsSpreading || loadGameQuarantine(), gameUpdate()
}

function speedModeGameClick(e) {
  if (vaccinateMode) {
    if (1 == e.refuser) return;
    try {
      pop.play()
    } catch (t) {}
    e.status = "V", numberOfVaccines--, numberVaccinated++
  } else if (quarantineMode && "S" == e.status) {
    diseaseIsSpreading || speedModeTimesteps();
    try {
      pop.play()
    } catch (t) {}
    diseaseIsSpreading = true, e.status = "Q", numberQuarantined++
  }
  0 != numberOfVaccines || diseaseIsSpreading || loadGameQuarantine(), gameUpdate()
}

function tick() {
  node
    .attr("cx", e => e.x)
    .attr("cy", e => e.y);
  link
    .attr("x1", e => e.source.x)
    .attr("y1", e => e.source.y)
    .attr("x2", e => e.target.x)
    .attr("y2", e => e.target.y)
}

function countSavedGAME() {
  for (var e = 0, t = 0; t < graph.nodes.length; t++) "S" == graph.nodes[t].status && e++;
  return e
}

function gameUpdate() {
  friction = .83,
  d3.select(".vaccineCounterText").text(numberOfVaccines),
  d3.select(".quarantineCounterText").text("x" + numberQuarantined);
  var e = removeVaccinatedNodes(graph),
      t = removeOldLinks(graph);
  graph.links = t,
  updateCommunities(),
  force.nodes(e)
    .force("charge", d3.forceManyBody().strength(-charge))
    .force("links", d3.forceLink(graph.links)),
  link = gameSVG.selectAll("line.link").data(t, function(e) {
    return e.source.id + "-" + e.target.id
  }),
  link.enter().insert("svg:line", ".node")
    .attr("class", "link")
    .attr("x1", function(e) {
      return e.source.x
    }).attr("y1", function(e) {
      return e.source.y
    }).attr("x2", function(e) {
      return e.target.x
    }).attr("y2", function(e) {
      return e.target.y
    }),
  link.exit().remove(),
  node = gameSVG.selectAll("circle.node").data(e, e => e.id).style("fill", nodeColor),
  d3.selectAll(".node").transition().duration(100).attr("r", nodeSize),
  d3.selectAll(".clickArea")
    .attr("fill", "black")
    .attr("opacity", 0).on("click", function(e) {
      "V" != e.status && "Q" != e.status && (speed ? speedModeGameClick(e) : gameClick(e))
    })
    .attr("r", function(e) {
      var t;
      return findNeighbors(e).length <= 1 ? t = 0 : (
        "easy" == difficultyString && (t = 1.9 * nodeSize(e)),
        "medium" == difficultyString && (t = (invisibleParameter - .2) * nodeSize(e)),
        "hard" == difficultyString && (t = (invisibleParameter - .3) * nodeSize(e))
      ), t
    }),
  node.enter().append("svg:circle")
    .attr("class", "node")
    .attr("cx", e => e.x)
    .attr("cy", e => e.y)
    .style("fill", nodeColor)
    .on("click", e => speed ? speedModeGameClick(e) : gameClick(e))
    .call(drag);
  node.exit().remove();
}

function gameTimesteps() {
  infection(),
  stateChanges(),
  newInfections = [],
  newInfections = updateExposures(),
  timestep++,
  detectGameCompletion(),
  timeToStop ? animateGamePathogens_thenUpdate() : animateGamePathogens_thenUpdate()
}

function speedModeTimesteps() {
  infection(),
  stateChanges(),
  newInfections = [],
  newInfections = updateExposures(), 
  timestep++,
  detectGameCompletion(),
  timeToStop ? animateGamePathogens_thenUpdate() : (
    animateGamePathogens_thenUpdate(),
    window.setTimeout(speedModeTimesteps, 1750)
  );
}

function detectGameCompletion() {
  if (!timeToStop && diseaseIsSpreading) {
    updateCommunities();
    for (var e = 0, t = 1; numberOfCommunities + 1 > t; t++) {
      for (var i = 0, a = 0, o = 0; o < graph.nodes.length; o++) {
        var r = graph.nodes[o];
        parseFloat(r.group) != t || ("S" == r.status && i++, "I" == r.status && a++, "E" == r.status && a++)
      }
      a > 0 && i > 0 && e++
    }
    0 == e && diseaseIsSpreading && (
      diseaseIsSpreading = false,
      timeToStop = true,
      animateGamePathogens_thenUpdate(),
      window.setTimeout(endGameSession, 1e3)
    )
  }
}

function animateGamePathogens_thenUpdate() {
  window.setTimeout(createGamePathogens, 50),
  window.setTimeout(moveGamePathogens, 100),
  window.setTimeout(popNewGameInfection, 300),
  window.setTimeout(removeGamePathogens, 800),
  window.setTimeout(gameUpdate, 850);
}

function popNewGameInfection() {
  d3.selectAll(".node").transition().duration(500)
    .attr("r", function(e) {
      var t;
      return t = toggleDegree ? (findNeighbors(e).length + 1.5) * 2 : 8,
        "I" == e.status ? 1 == timestep - e.exposureTimestep ? 1.5 * t : t : t
    });
}

function moveGamePathogens() {
  d3.selectAll(".pathogen").sort()
    .transition().duration(600)
    .attr("cx", e => e.receiverX)
    .attr("cy", e => e.receiverY);
}

function createGamePathogens() {
  xyCoords = getPathogen_xyCoords(newInfections),
  gameSVG.selectAll(".pathogen").data(xyCoords)
    .enter().append("circle")
    .attr("class", "pathogen")
    .attr("cx", e => e.transmitterX)
    .attr("cy", e => e.transmitterY)
    .attr("r", 4)
    .style("fill", "black")
}

function getPathogen_xyCoords(e) {
  for (var t = [], i = [], a = 0; a < e.length; a++) {
    i.push(e[a].infectedBy);
    var o = {
      id: a,
      receiverX: e[a].x,
      receiverY: e[a].y,
      transmitterX: e[a].infectedBy.x,
      transmitterY: e[a].infectedBy.y
    };
    t.push(o)
  }
  return t
}

function removeGamePathogens() {
  d3.selectAll(".node").transition().duration(200).attr("r", 8);
  d3.selectAll(".pathogen").transition().duration(200).style("opacity", 0);
  d3.selectAll(".pathogen").remove();
}

function gameIndexPatients() {
  quarantineMode = true;
  for (var e = 0; independentOutbreaks > 0;) {
    do e = Math.floor(Math.random() * graph.nodes.length); while ("S" != graph.nodes[e].status);
    graph.nodes[e].status = "I",
    graph.nodes[e].infectedBy = "indexPatient",
    graph.nodes[e].exposureTimestep = 0, independentOutbreaks--
  }
  gameUpdate()
}

function loadGameSyringe() {
  d3.select(".actionVax").style("visibility", "visible"),
  d3.select(".actionVax").style("right", 0),
  d3.select("#vaxShieldText").style("color", "white"),
  d3.select(".actionVax").append("text")
    .attr("class", "vaccineCounterText")
    .style("font-size", "16px")
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("color", "white")
    .text("")
    .style("right", function() {
      return 1 == numberOfVaccines.toString().length ? "49px" :
             2 == numberOfVaccines.toString().length ? "46px" :
             void 0;
    }),
  d3.select(".vaccineCounterText").text(numberOfVaccines),
  window.setTimeout(activateGameVaccinationMode, 100)
}

function hideGameSyringe() {
  vaccinationMode = false,
  d3.select(".actionVax").style("right", "-200px"),
  d3.select("svg").style("cursor", "pointer"),
  d3.selectAll(".node").style("cursor", "pointer"),
  d3.select(".vaccineDepressedState").style("visibility", "hidden")
}

function loadGameQuarantine() {
  vaccinateMode && hideGameSyringe();
  vaccinateMode = false;
  d3.select(".actionQuarantine").style("visibility", "visible");
  d3.select(".actionQuarantine").style("right", "0px");
  d3.select(".quarantineCounterText").remove();
  d3.select("#quarantineText").style("color", "white");
  d3.select(".actionQuarantine").append("text")
    .attr("class", "quarantineCounterText")
    .style("font-size", "16px")
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("color", "white")
    .text(""),
  d3.select(".quarantineCounterText").text("x" + numberQuarantined);
  window.setTimeout(activateGameQuarantineMode, 1e3);
}

function hideGameQuarantine() {
  quarantineMode = false,
  d3.select(".actionQuarantine").style("right", "-200px"),
  d3.select("svg").style("cursor", "pointer"),
  d3.selectAll(".node").style("cursor", "pointer"),
  d3.select(".quarantineDepressedState").style("visibility", "hidden");
}

function activateGameVaccinationMode() {
  vaccinateMode = true,
  d3.selectAll(".node").style("cursor", "url(/assets/vax_cursor.cur)"),
  d3.select("svg").style("cursor", "url(/assets/vax_cursor.cur)"),
  d3.select(".vaccineCounterText").text(numberOfVaccines),
  d3.select(".vaccineDepressedState").style("visibility", "visible")
}

function activateGameQuarantineMode() {
  vaccinateMode = false,
  quarantineMode = true,
  d3.selectAll(".node").style("cursor", "url(/assets/vax_cursor.cur)"),
  d3.select("svg").style("cursor", "url(/assets/vax_cursor.cur)"),
  d3.select(".quarantineDepressedState").style("visibility", "visible"),
  gameIndexPatients(),
  outbreakDetected();
}

function refusersPresent() {
  d3.select("svg").append("rect")
    .attr("class", "refuserNotifyShadow")
    .attr("x", window.innerWidth / 4 + 62 + 5 - 50)
    .attr("y", -100)
    .attr("width", 325)
    .attr("height", 50)
    .attr("fill", "#838383")
    .attr("opacity", 1),
  d3.select("svg").append("rect")
    .attr("class", "refuserNotifyBox")
    .attr("x", window.innerWidth / 4 + 62 - 50)
    .attr("y", -100)
    .attr("width", 325)
    .attr("height", 50)
    .attr("fill", "#85bc99")
    .attr("opacity", 1),
  d3.select("svg").append("text")
    .attr("class", "refuserNotifyText")
    .attr("x", window.innerWidth / 4 + 62 + 5 - 50 + 15)
    .attr("y", -100)
    .attr("fill", "white")
    .style("font-family", "Nunito")
    .style("font-size", "24px")
    .style("font-weight", 300)
    .text("Vaccine refusers present!")
    .attr("opacity", 1),
  d3.select(".refuserNotifyText").transition().duration(500).attr("y", 232),
  d3.select(".refuserNotifyBox").transition().duration(500).attr("y", 200),
  d3.select(".refuserNotifyShadow").transition().duration(500).attr("y", 207),
  window.setTimeout(function() {
    d3.select(".refuserNotifyShadow").transition().duration(500).attr("y", -100),
    d3.select(".refuserNotifyBox").transition().duration(500).attr("y", -100),
    d3.select(".refuserNotifyText").transition().duration(500).attr("y", -100)
  }, 2500)
}

function outbreakDetected() {
  d3.select("svg").append("rect")
    .attr("class", "outbreakNotifyShadow")
    .attr("x", window.innerWidth / 4 + 62 + 5 - 50)
    .attr("y", -100)
    .attr("width", 250)
    .attr("height", 50)
    .attr("fill", "#838383")
    .attr("opacity", 1), d3.select("svg").append("rect")
    .attr("class", "outbreakNotifyBox")
    .attr("x", window.innerWidth / 4 + 62 - 50)
    .attr("y", -100)
    .attr("width", 250)
    .attr("height", 50)
    .attr("fill", "#85bc99")
    .attr("opacity", 1), d3.select("svg").append("text")
    .attr("class", "outbreakNotifyText")
    .attr("x", window.innerWidth / 4 + 62 + 5 - 50 + 12)
    .attr("y", -100)
    .attr("fill", "white")
    .style("font-family", "Nunito")
    .style("font-size", "24px")
    .style("font-weight", 300).text("Outbreak Detected!")
    .attr("opacity", 1), d3.select(".outbreakNotifyText").transition().duration(500)
    .attr("y", window.innerHeight / 2 - 300 + 100 - 70 + 5),
  d3.select(".outbreakNotifyBox").transition().duration(500)
    .attr("y", window.innerHeight / 2 - 300),
  d3.select(".outbreakNotifyShadow").transition().duration(500)
    .attr("y", window.innerHeight / 2 - 300 + 7),
  window.setTimeout(function() {
    d3.select(".outbreakNotifyShadow").transition().duration(500).attr("y", -100),
    d3.select(".outbreakNotifyBox").transition().duration(500).attr("y", -100),
    d3.select(".outbreakNotifyText").transition().duration(500).attr("y", -100)
  }, 2e3)
}

function endGameSession() {
  d3.select("svg").append("rect")
    .attr("class", "endGameShadow")
    .attr("x", window.innerWidth / 4 + 62 + 5 - 100)
    .attr("y", -100)
    .attr("width", 500)
    .attr("height", 125)
    .attr("fill", "#838383"), d3.select("svg").append("rect")
    .attr("class", "endGameBox")
    .attr("x", window.innerWidth / 4 + 62 - 100)
    .attr("y", -100)
    .attr("width", 500)
    .attr("height", 125)
    .attr("fill", "#85bc99"), d3.select("svg").append("text")
    .attr("class", "endGameText")
    .attr("x", window.innerWidth / 4 + 135 - 100)
    .attr("y", -100)
    .style("font-family", "Nunito")
    .style("fill", "white")
    .style("font-weight", 500)
    .style("font-size", "25px").text("Outbreak has run its course."), d3.select("svg").append("text")
    .attr("class", "endGameSUBMIT")
    .attr("x", window.innerWidth / 4 + 275 - 90)
    .attr("y", -100)
    .style("font-family", "Nunito")
    .style("fill", "white")
    .style("font-weight", 500)
    .style("font-size", "15px")
    .style("cursor", "pointer").text("Submit").on("mouseover", function() {
      d3.select(this).style("fill", "#2692F2")
    }).on("mouseout", function() {
      d3.select(this).style("fill", "white")
    }).on("click", function() {
      d3.select(".endGameText").transition().duration(250)
        .attr("x", window.innerWidth / 4 + 85)
        .text("Reticulating splines."),
      window.setTimeout(addPeriod1, 350),
      window.setTimeout(addPeriod2, 800),
      window.setTimeout(initScoreRecap, 1200)
    }),
    d3.select(".endGameBox").transition().duration(500)
      .attr("y", window.innerHeight / 2 - 300),
    d3.select(".endGameShadow").transition().duration(500)
      .attr("y", window.innerHeight / 2 - 300 + 7),
    d3.select(".endGameText").transition().duration(500)
      .attr("y", window.innerHeight / 2 - 250),
    d3.select(".endGameSUBMIT").transition().duration(500)
      .attr("y", window.innerHeight / 2 - 250 + 50)
}

function addPeriod1() {
  d3.select(".endGameText").transition().duration(250)
    .attr("x", window.innerWidth / 4 + 85).text("Reticulating splines..")
}

function addPeriod2() {
  d3.select(".endGameText").transition().duration(250)
    .attr("x", window.innerWidth / 4 + 85).text("Reticulating splines...")
}

function setCookies() {
  var e = Math.round(100 * ((countSavedGAME() + numberQuarantined + numberVaccinated) / numberOfIndividuals)).toFixed(0);
  "easy" == difficultyString && (
    speed ? (
      Cookies.get("vaxEasyHiScoreRT") < e &&
      Cookies.set("vaxEasyHiScoreRT", e),
      e >= easyBar &&
      Cookies.set("vaxEasyCompletion",  "true")
    ) : (
      Cookies.get("vaxEasyHiScore") < e &&
      Cookies.set("vaxEasyHiScore", e),
      e >= easyBar && 
      Cookies.set("vaxEasyCompletion",  "true")
    )
  ),
  "medium" == difficultyString && (
    speed ? (
      Cookies.get("vaxMediumHiScoreRT") < e &&
      Cookies.set("vaxMediumHiScoreRT", e),
      e >= mediumBar && 
      Cookies.set("vaxMediumCompletion",  "true")
    ) : (
      Cookies.get("vaxMediumHiScore") < e &&
      Cookies.set("vaxMediumHiScore", e),
      e >= mediumBar &&
      Cookies.set("vaxMediumCompletion",  "true")
    )
  ),
  "hard" == difficultyString && (
    speed ? (
      Cookies.get("vaxHardHiScoreRT") < e &&
      Cookies.set("vaxHardHiScoreRT", e),
      e >= hardBar &&
      Cookies.set("vaxHardCompletion",  "true")
    ) : (
      Cookies.get("vaxHardHiScore") < e &&
      Cookies.set("vaxHardHiScore", e),
      e >= hardBar &&
      Cookies.set("vaxHardCompletion",  "true")
    )
  )
}

function writeCookiesJSON() {
  var e = Math.round(100 * ((countSavedGAME() + numberQuarantined + numberVaccinated) / numberOfIndividuals)).toFixed(0);
  "easy" == difficultyString && (
    speed ? (
      cookie.scoresRT[0].push(e),
      e > easyBar &&
      (vaxEasyCompletion = true),
      vaxEasyHiScoreRT = Math.max.apply(Math, cookie.scoresRT[0])
    ) : (
      cookie.scores[0].push(e),
      e > easyBar &&
      (vaxEasyCompletion = true),
      vaxEasyHiScore = Math.max.apply(Math, cookie.scores[0])
    )
  ), "medium" == difficultyString && (
    speed ? (
      cookie.scoresRT[1].push(e),
      e > mediumBar &&
      (vaxMediumCompletion = true),
      vaxMediumHiScoreRT = Math.max.apply(Math, cookie.scoresRT[1])
    ) : (
      cookie.scores[1].push(e),
      e > mediumBar && (vaxMediumCompletion = true),
      vaxMediumHiScore = Math.max.apply(Math, cookie.scores[1])
    )
  ), "hard" == difficultyString && (
    speed ? (
      cookie.scoresRT[2].push(e),
      e > hardBar &&
      (vaxHardCompletion = true),
      vaxHardHiScoreRT = Math.max.apply(Math, cookie.scoresRT[2])
    ) : (
      cookie.scores[2].push(e),
      e > hardBar &&
      (vaxHardCompletion = true),
      vaxHardHiScore = Math.max.apply(Math, cookie.scores[2])
    )
  ),
  Cookies.set("json", false),
  void 0 == difficultyString && (
    Cookies.set("customNodes",  customNodeChoice),
    Cookies.set("customNeighbors",  customNeighborChoice),
    Cookies.set("customVaccines",  customVaccineChoice),
    Cookies.set("customOutbreaks",  customOutbreakChoice),
    Cookies.set("customRefusers",  customRefuserChoice)
  );
  var t = cookie.scores[0],
    i = cookie.scores[1],
    a = cookie.scores[2],
    o = [t, i, a],
    r = cookie.scoresRT[0],
    n = cookie.scoresRT[1],
    s = cookie.scoresRT[2],
    c = [r, n, s],
    d = {
      easy: vaxEasyCompletion,
      medium: vaxMediumCompletion,
      hard: vaxHardCompletion,
      scores: o,
      scoresRT: c
    };
  Cookies.remove("vaxCookie"),
  Cookies.set("vaxCookie", d, {
    expires: 365,
    path: "/"
  })
}

function generateStackedBarChart() {
  var e = 125,
    t = 320,
    i = d3.select("svg").append("svg")
      .attr("class", "stacked")
      .attr("width", e)
      .attr("height", t)
      .attr("x", 20)
      .attr("y", 150)
      .append("svg:g")
      .attr("transform", "translate(10,320)");
  x = d3.scale.ordinal().rangeRoundBands([0, e - 50]),
  y = d3.scale.linear().range([0, t]),
  z = d3.scale.ordinal().range(["#b7b7b7", "#85BC99", "#d9d678", "#ef5555"]);
  var a = [
      [
        1,
        countSavedGAME(),
        numberVaccinated,
        numberQuarantined,
        numberOfIndividuals - numberQuarantined - numberVaccinated - countSavedGAME()
      ]
    ],
  o = ["uninfected", "vaccinated", "quarantined", "infected"].map(function(e, t) {
    return a.map(function(e, i) {
      return {
        x: i,
        y: e[t + 1]
      }
    })
  }),
  r = d3.layout.stack()(o);
  x.domain(r[0].map(function(e) {
    return e.x
  })),
  y.domain([0, d3.max(r[r.length - 1], function(e) {
    return e.y0 + e.y
  })]);
  var n = i.selectAll("g.valgroup")
    .data(r)
    .enter()
    .append("svg:g")
    .attr("class", "valgroup")
    .style("fill", function(e, t) {
      return z(t)
    })
    .attr("id", function(e, t) {
      return 0 == t ? "uninfected" : 1 == t ? "infected" : 2 == t ? "quarantined" : 3 == t ? "vaccinated" : void 0
    });
  n.selectAll("rect").data(function(e) {
    return e
  }).enter().append("svg:rect")
    .attr("x", function(e) {
      return x(e.x)
    })
    .attr("y", function(e) {
      return -y(e.y0) - y(e.y)
    })
    .attr("height", function(e) {
      return y(e.y)
    })
    .attr("width", x.rangeBand()),
  d3.select("svg").append("line")
    .style("stroke", "#707070")
    .style("stroke-width", "1px")
    .attr("x1", -35)
    .attr("x2", 200)
    .attr("y1", 470)
    .attr("y2", 470),
  d3.select("svg").append("line")
    .style("stroke", "#707070")
    .style("stroke-width", "1px")
    .attr("x1", -35)
    .attr("x2", -35)
    .attr("y1", 140)
    .attr("y2", 470),
  d3.select("svg").append("text")
    .attr("x", -83)
    .attr("y", 162)
    .style("font-family", "Nunito")
    .style("font-size", "15px")
    .style("font-weight", "500")
    .style("fill", "#707070")
    .text("100%"),
  d3.select("svg").append("text")
    .attr("x", -76)
    .attr("y", 310)
    .style("font-family", "Nunito")
    .style("font-size", "15px")
    .style("font-weight", "500")
    .style("fill", "#707070")
    .text("50%"),
  d3.select("svg").append("text")
    .attr("x", -72)
    .attr("y", 455)
    .style("font-family", "Nunito")
    .style("font-size", "15px")
    .style("font-weight", "500")
    .style("fill", "#707070")
    .text("0%"),
  d3.select("svg").append("rect")
    .attr("height", 15)
    .attr("width", 15)
    .attr("x", 150)
    .attr("y", 200)
    .attr("fill", "#ef5555"),
  d3.select("svg").append("rect")
    .attr("height", 15)
    .attr("width", 15)
    .attr("x", 150)
    .attr("y", 230)
    .attr("fill", "#d9d678"),
  d3.select("svg").append("rect")
    .attr("height", 15)
    .attr("width", 15)
    .attr("x", 150)
    .attr("y", 260)
    .attr("fill", "#85BC99"),
  d3.select("svg").append("rect")
    .attr("height", 15)
    .attr("width", 15)
    .attr("x", 150)
    .attr("y", 290)
    .attr("fill", "#b7b7b7"),
  d3.select("svg").append("text")
    .style("font-family", "Nunito")
    .style("font-size", "15px")
    .style("fill", "#707070")
    .attr("x", 180)
    .attr("y", 213)
    .text("Infected"),
  d3.select("svg").append("text")
    .style("font-family", "Nunito")
    .style("font-size", "15px")
    .style("fill", "#707070")
    .attr("x", 180)
    .attr("y", 243)
    .text("Quarantined"),
  d3.select("svg").append("text")
    .style("font-family", "Nunito")
    .style("font-size", "15px")
    .style("fill", "#707070")
    .attr("x", 180)
    .attr("y", 273)
    .text("Vaccinated"),
  d3.select("svg").append("text")
    .style("font-family", "Nunito")
    .style("font-size", "15px")
    .style("fill", "#707070")
    .attr("x", 180)
    .attr("y", 303)
    .text("Uninfected");
}

function generateUninfectedBar(e, t) {
  var i = [{
      score: e
    }, {
      score: t
    }],
    a = 75,
    o = (a + 25) * i.length,
    r = 320,
    n = d3.scale.linear().domain([0, i.length]).range([0, o]),
    s = d3.scale.linear().domain([0, d3.max(i, function() {
      return 100
    })]).rangeRound([0, r]),
    c = d3.select("svg").append("svg")
      .attr("class", "barSVG")
      .attr("width", o)
      .attr("height", r)
      .attr("x", 420)
      .attr("y", 150);
    c.selectAll("rect").data(i).enter().append("svg:rect")
      .attr("x", function(e, t) {
        return n(t)
      })
      .attr("y", function(e) {
        return r - s(e.score)
      })
      .attr("height", function(e) {
        return s(e.score)
      })
      .attr("class", function(e, t) {
        return 0 == t ? "current" : "best"
      })
      .attr("width", a)
      .attr("fill", function(e, t) {
        return 0 == t ? "#b7b7b7" : "#00adea"
      });
  var d = d3.select(".best"),
    l = d3.select(".current");
  d3.select("svg").append("text")
    .attr("x", d.node().getBBox().x + 426)
    .attr("y", d.node().getBBox().y + 145)
    .style("font-size", "30px")
    .style("color", "#707070")
    .attr("color", "#707070")
    .attr("fill", "#707070")
    .text(t + "%"),
  d3.select("svg").append("text")
    .attr("x", l.node().getBBox().x + 427)
    .attr("y", l.node().getBBox().y + 145)
    .style("font-size", "30px")
    .style("color", "#707070")
    .attr("color", "#707070")
    .attr("fill", "#707070")
    .text(e + "%"),
  d3.select("svg").append("line")
    .style("stroke", "#707070")
    .style("stroke-width", "1px")
    .attr("x1", 395)
    .attr("x2", 625)
    .attr("y1", 470)
    .attr("y2", 470),
  d3.select("svg").append("line")
    .style("stroke", "#707070")
    .style("stroke-width", "1px")
    .attr("x1", 395)
    .attr("x2", 395)
    .attr("y1", 140)
    .attr("y2", 470),
  d3.select("svg").append("text")
    .attr("x", 347)
    .attr("y", 162)
    .style("font-size", "15px")
    .style("font-weight", "500")
    .style("fill", "#707070")
    .text("100%"),
  d3.select("svg").append("text")
    .attr("x", 359)
    .attr("y", 310)
    .style("font-size", "15px")
    .style("font-weight", "500")
    .style("fill", "#707070")
    .text("50%"),
  d3.select("svg").append("text")
    .attr("x", 355)
    .attr("y", 455)
    .style("font-size", "15px")
    .style("font-weight", "500")
    .style("fill", "#707070")
    .text("0%"),
  d3.select("svg").append("text")
    .attr("x", 430)
    .attr("y", 489)
    .style("font-size", "15px")
    .style("font-weight", "500")
    .style("fill", "#707070")
    .text("Current"),
  d3.select("svg").append("text")
    .attr("x", 540)
    .attr("y", 489)
    .style("font-size", "15px")
    .style("font-weight", "500")
    .style("fill", "#707070")
    .text("Best")
}

function initScoreRecap() {
  writeCookiesJSON(),
  d3.select(".endGameShadow").transition().duration(500).attr("y", -200),
  d3.select(".endGameBox").transition().duration(500).attr("y", -200),
  d3.select(".endGameText").transition().duration(500).attr("y", -200),
  d3.select(".endGameSUBMIT").transition().duration(500).attr("y", -200),
  d3.select("#pinNodesDiv").remove(),
  d3.select("svg").select("g").style("visibility", "hidden"),
  hideGameQuarantine();
  var e, t, i, a, o = Math.round(100 * ((countSavedGAME() + numberQuarantined + numberVaccinated) / numberOfIndividuals)).toFixed(0);
  "easy" == difficultyString && (speed ? (a = "Easy", i = vaxEasyHiScoreRT, t = easyBar) : (a = "Easy", i = vaxEasyHiScore, t = easyBar)),
  "medium" == difficultyString && (speed ? (a = "Medium", i = vaxMediumHiScoreRT, t = mediumBar) : (a = "Medium", i = vaxMediumHiScore, t = mediumBar)),
  "hard" == difficultyString && (speed ? (a = "Hard", i = vaxHardHiScoreRT, t = hardBar) : (a = "Hard", i = vaxHardHiScore, t = hardBar)),
  null == difficultyString && (i = o, t = 0),
  e = o >= t ? true : false,
  d3.select("svg").append("text")
    .attr("class", "networkSizeText")
    .attr("x", -85)
    .attr("y", 90)
    .style("font-size", "40px")
    .text("Network Size: " + numberOfIndividuals),
  generateStackedBarChart(),
  generateUninfectedBar(o, i),
  addTextRecap(t, e)
}

function addTextRecap(e, t) {
  if (t) {
    if (null == difficultyString){
      d3.select("svg").append("text")
        .style("font-family", "Nunito")
        .style("font-size", "55px")
        .style("font-weight", "500")
        .style("fill", "#707070")
        .attr("class", "recapBinaryText")
        .attr("x", 732)
        .attr("y", 180)
        .text("Play Again!");
      d3.select("svg").append("text")
        .attr("class", "recapButton")
        .attr("x", 450)
        .attr("y", 625)
        .text("Retry")
        .style("font-size", "45px")
        .on("click", retry)
        .on("mouseover", function() {
          d3.select(this).style("fill", "#2692F2")
        })
        .on("mouseout", function() {
          d3.select(this).style("fill", "#707070")
        });
      void 0;
    } 
    d3.select("svg").append("text")
      .style("font-family", "Nunito")
      .style("font-size", "75px")
      .style("font-weight", "500")
      .style("fill", "#707070")
      .attr("class", "recapBinaryText")
      .attr("x", 749)
      .attr("y", 180)
      .text("Passed!");
    d3.select("svg").append("text")
      .attr("class", "recapText1")
      .attr("x", 755)
      .attr("y", 230)
      .style("font-family", "Nunito")
      .style("font-size", "20px")
      .style("font-weight", "300")
      .style("fill", "#707070")
      .text("Well done! You exceeded the");
    d3.select("svg").append("text")
      .attr("class", "recapText2")
      .attr("x", 755)
      .attr("y", 255)
      .style("font-family", "Nunito")
      .style("font-size", "20px")
      .style("font-weight", "300")
      .style("fill", "#707070")
      .text(e + "% survival rate required to");
    d3.select("svg").append("text")
      .attr("class", "recapText3")
      .attr("x", 755)
      .attr("y", 280)
      .style("font-family", "Nunito")
      .style("font-size", "20px")
      .style("font-weight", "300")
      .style("fill", "#707070")
      .text("move on to the next level.");
    d3.select("svg").append("text")
      .attr("class", "recapButton")
      .attr("x", 645)
      .attr("y", 590)
      .style("font-size", "45px")
      .text("Next")
      .on("click", next)
      .on("mouseover", function() {
        d3.select(this).style("fill", "#2692F2")
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "#707070")
      });
    d3.select("svg").append("text")
      .attr("class", "recapButton")
      .style("font-size", "45px")
      .attr("x", 240)
      .attr("y", 590)
      .text("Retry")
      .on("click", retry)
      .on("mouseover", function() {
        d3.select(this).style("fill", "#2692F2")
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "#707070")
      });
  } else {
    d3.select("svg").append("text")
      .style("font-family", "Nunito")
      .style("font-size", "55px")
      .style("font-weight", "500")
      .style("fill", "#707070")
      .attr("class", "recapBinaryText")
      .attr("x", 735)
      .attr("y", 180)
      .text("Try Again!");
    d3.select("svg").append("text")
      .attr("class", "recapText1")
      .attr("x", 755)
      .attr("y", 225)
      .style("font-family", "Nunito")
      .style("font-size", "20px")
      .style("font-weight", "300")
      .style("fill", "#707070")
      .text("You did not exceed the");
    d3.select("svg").append("text")
      .attr("class", "recapText2")
      .attr("x", 730)
      .attr("y", 250)
      .style("font-family", "Nunito")
      .style("font-size", "20px")
      .style("font-weight", "300")
      .style("fill", "#707070")
      .text(e + "% survival rate required to");
    d3.select("svg").append("text")
      .attr("class", "recapText3")
      .attr("x", 742)
      .attr("y", 273)
      .style("font-family", "Nunito")
      .style("font-size", "20px")
      .style("font-weight", "300")
      .style("fill", "#707070")
      .text("move on to the next level.");
    d3.select("svg").append("text")
      .attr("class", "recapButton")
      .attr("x", 450)
      .attr("y", 625)
      .style("font-size", "45px")
      .text("Retry")
      .on("click", retry)
      .on("mouseover", function() {
        d3.select(this).style("fill", "#2692F2")
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "#707070")
      });
  }
}

function loadConclusionText() {
  var e = Math.round(100 * ((numberSaved + numberQuarantined + numberVaccinated) / numberOfIndividuals)).toFixed(0);
  d3.select("#pinNodesDiv").remove();
  var t, i;
  "easy" == difficultyString && (i = vaxEasyHiScore, t = easyBar),
  "medium" == difficultyString && (i = vaxMediumHiScore, t = mediumBar),
  "hard" == difficultyString && (i = vaxHardHiScore, t = hardBar),
  null == difficultyString && (i = e),
  d3.select("svg").append("text")
    .attr("class", "bestScore")
    .attr("x", backX + 25)
    .attr("y", 420)
    .style("font-family", "Nunito")
    .style("fill", "#707070")
    .style("font-size", "24px")
    .style("font-weight", "500")
    .text("Best Score: " + i + "%");
  var a;
  "easy" == difficultyString && (a = "Easy"),
  "medium" == difficultyString && (a = "Medium"),
  "hard" == difficultyString && (a = "Hard"),
  null == difficultyString && (a = "Custom", i = e);
  null == difficultyString ? (
    d3.select("svg").append("text")
      .attr("class", "recapText")
      .attr("x", 260)
      .attr("y", 525)
      .text("Well done, you saved " + e + "% of the network."),
    d3.select("svg").append("text")
      .attr("class", "recapButton")
      .attr("x", 470)
      .attr("y", 590)
      .text("Retry")
      .on("click", retry)
      .on("mouseover", function() {
        d3.select(this).style("fill", "#2692F2")
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "#707070")
      })
  ) : e > t ? (
    d3.select("svg").append("text")
      .attr("class", "recapText")
      .attr("x", 260)
      .attr("y", 525)
      .text("Well done, you saved " + e + "% of the network."),
    d3.select("svg").append("text")
      .attr("class", "recapButton")
      .attr("x", 355)
      .attr("y", 590)
      .text("Retry")
      .on("click", retry)
      .on("mouseover", function() {
        d3.select(this).style("fill", "#2692F2")
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "#707070")
      }),
    d3.select("svg").append("text")
      .attr("class", "recapButton")
      .attr("x", 580)
      .attr("y", 590)
      .text("Next")
      .on("click", next)
      .on("mouseover", function() {
        d3.select(this).style("fill", "#2692F2")
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "#707070")
      })
  ) : (
    d3.select("svg").append("text")
      .attr("class", "recapText")
      .attr("x", 200)
      .attr("y", 525)
      .text("Save " + t + "% of the network to unlock the next stage."),
    d3.select("svg").append("text")
      .attr("class", "recapButton")
      .attr("x", 470)
      .attr("y", 590)
      .text("Retry")
      .on("click", retry)
      .on("mouseover", function() {
        d3.select(this).style("fill", "#2692F2")
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "#707070")
      })
  )
}

function retry() {
  d3.select("svg").remove(),
  graph = {},
  timestep = 0,
  diseaseIsSpreading = false,
  timeToStop = false,
  null == difficultyString ? initCustomGame() : initBasicGame(difficultyString)
}

function next() {
  if (
    d3.select("svg").remove(),
    graph = {},
    timestep = 0,
    diseaseIsSpreading = false,
    timeToStop = false,
    hideGameQuarantine(),
    "hard" == difficultyString || null == difficultyString
  ){
    window.location.href = "/game.html";
  } else {
    if ("easy" == difficultyString) return difficultyString = "medium", initBasicGame("medium"), void 0;
    if ("medium" == difficultyString) return difficultyString = "hard", initBasicGame("hard"), void 0
  }
}

function toggleDegreeFxn() {
  toggleDegree = !toggleDegree,
  toggleDegree && "easy" == difficultyString && (charge = -900),
  toggleDegree && "medium" == difficultyString && (charge = -700),
  toggleDegree && "hard" == difficultyString && (charge = -600),
  toggleDegree || (charge = -300),
  gameUpdate()
}

function getCartesianDistance(e, t) {
  var i = e[0],
    a = e[1],
    o = t[0],
    r = t[1],
    n = Math.pow(i - o, 2),
    s = Math.pow(a - r, 2);
  return Math.pow(n + s, .5)
}

let difficultySelection = d3.select("#difficulty-selection");

d3.select("#difficulty-easy").on("click", function() {
  difficultyString = "easy",
  initBasicGame(difficultyString);
});

d3.select("#difficulty-medium").on("click", function() {
  difficultyString = "medium",
  initBasicGame(difficultyString);
});

d3.select("#difficulty-hard").on("click", function() {
  difficultyString = "hard",
  initBasicGame(difficultyString);
});

difficultySelection.select(".degreeToggleMenuTrue")
  .on("click", function() {
    d3.select(".degreeToggleMenuTrue")
      .style("color", "#2692F2")
      .style("font-weight", "500");
    d3.select(".degreeToggleMenuFalse")
      .style("color", "#BABABA")
      .style("font-weight", "300");
    toggleDegree = true
  });

difficultySelection.select(".degreeToggleMenuFalse")
  .on("click", function() {
    d3.select(".degreeToggleMenuTrue").style("color", "#BABABA").style("font-weight", "300");
    d3.select(".degreeToggleMenuFalse").style("color", "#2692F2").style("font-weight", "500");
    toggleDegree = false
  });

difficultySelection.select(".turnBasedTrue")
  .on("click", function() {
    d3.select(".turnBasedTrue")
      .style("color", "#2692F2")
      .style("font-weight", "500");
    d3.select(".realTimeTrue")
      .style("color", "#BABABA")
      .style("font-weight", "300");
    speed = false;
    vaxEasyHiScore == -1 / 0 || d3.select("#score-easy").text("(Best: " + vaxEasyHiScore + "%)");
    vaxMediumHiScore == -1 / 0 || d3.select("#score-medium").text("(Best: " + vaxMediumHiScore + "%)");
    vaxHardHiScore == -1 / 0 || d3.select("#score-hard").text("(Best: " + vaxHardHiScore + "%)");
  });

difficultySelection.select(".realTimeTrue")
  .on("click", function() {
    d3.select(".turnBasedTrue")
      .style("color", "#BABABA")
      .style("font-weight", "300");
    d3.select(".realTimeTrue")
      .style("color", "#2692F2")
      .style("font-weight", "500");
    speed = true;
    d3.select("#score-easy").text(0 > vaxEasyHiScoreRT ? "" : "(Best: " + vaxEasyHiScoreRT + "%)");
    d3.select("#score-medium").text(0 > vaxMediumHiScoreRT ? "" : "(Best: " + vaxMediumHiScoreRT + "%)");
    d3.select("#score-hard").text(0 > vaxHardHiScoreRT ? "" : "(Best: " + vaxHardHiScoreRT + "%)");
  });

window.setTimeout(readCookiesJSON, 500);
