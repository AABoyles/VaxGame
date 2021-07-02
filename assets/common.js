function generateSmallWorld(t, e, n) {
  for (var r = [], i = [], o = [], a = 0; t > a; a++) {
    r.push(a);
    var u = {
      id: r[a],
      status: "S",
      group: null,
      edges: [],
      marked: false,
      degree: null,
      bcScore: null,
      exposureTimestep: null,
      infectedBy: null
    };
    o.push(u)
  }
  for (var s = 0; t > s; s++)
    for (var l = 0; n > l; l++) {
      var c = Math.floor(l / 2 + 1);
      1 == l % 2 && (c *= -1);
      var f = s + c;
      0 > f && (f += t),
        f >= t && (f -= t);
      var h = [s, f];
      i.push(h)
    }
  for (var d = 0; d < i.length; d++)
    if (Math.random() < e) {
      var p = i[d][0];
      do
        var g = Math.floor(Math.random() * t)
          , m = r[g];
      while (p == m);
      i[d][1] = m
    }
  for (var v = {}, y = [], b = 0; b < i.length; b++) {
    var x = {
      source: i[b][0],
      target: i[b][1],
      remove: false
    };
    testDuplicate(y, x) || y.push(x)
  }
  return v.nodes = o,
    v.links = y,
    v
}

function removeDuplicateEdges(t) {
  for (var e = 0; e < t.nodes.length; e++)
    for (var n = t.nodes[e], r = 0; r < t.nodes.length; r++) {
      var i = t.nodes[r];
      spliceDuplicateEdges(n, i, t)
    }
}

function testDuplicate(t, e) {
  for (var n = e.source, r = e.target, i = false, o = 0; o < t.length; o++) {
    var a = t[o], u = a.source, s = a.target;
    u == n && s == r && (i = true),
    u == r && s == n && (i = true)
  }
  return i
}

function degree(t) {
  for (var e = 0, n = 0; n < graph.links.length; n++)
    (graph.links[n].source == t || graph.links[n].target == t) && e++;
  return e
}

function findNeighbors(t) {
  for (var e = [], n = 0; n < graph.links.length; n++) {
    var r = graph.links[n];
    r.source == t && e.push(r.target),
    r.target == t && e.push(r.source)
  }
  return e
}

function findLink(t, e) {
  for (var n = null, r = 0; r < graph.links.length; r++)
    graph.links[r].source == t && graph.links[r].target == e && (n = graph.links[r]),
    graph.links[r].target == t && graph.links[r].source == e && (n = graph.links[r]);
  return n
}

function edgeExists(t, e, n) {
  for (var r = false, i = 0; i < n.links.length; i++) {
    var o = n.links[i];
    o.source.id == t.id ? o.target.id == e.id && (r = true) : o.target.id == t.id && o.source.id == e.id && (r = true)
  }
  return r
}

function spliceDuplicateEdges(t, e, n) {
  for (var r = 0, i = 0; i < n.links.length; i++) {
    var o = n.links[i];
    o.source.id == t.id && o.target.id == e.id && r++,
      o.target.id == t.id && o.source.id == e.id && r++,
      r > 1 && (r = 1,
        n.links.splice(i, 1))
  }
  return r
}

function removeVaccinatedNodes(t) {
  for (var e = [], n = 0; n < t.nodes.length; n++)
    "V" != t.nodes[n].status && "Q" != t.nodes[n].status && "VOL" != t.nodes[n].status && e.push(t.nodes[n]);
  return e
}

function removeOldLinks(t) {
  for (var e = [], n = 0; n < t.links.length; n++)
    "V" != t.links[n].source.status && "V" != t.links[n].target.status && "R" != t.links[n].source.status && "R" != t.links[n].target.status && "Q" != t.links[n].source.status && "Q" != t.links[n].target.status && 1 != t.links[n].remove && e.push(t.links[n]);
  return e
}

function assignEdgeListsToNodes(t) {
  for (var e = 0; e < t.nodes.length; e++)
    for (var n = t.nodes[e], r = 0; r < t.links.length; r++) {
      var i = t.links[r];
      (i.source == n || i.target == n) && n.edges.push(i)
    }
  return t
}

function updateCommunities() {
  twine = [],
  twineIndex = 0,
  groupCounter = 1;
  for (var t = 0; t < graph.nodes.length; t++) {
    var e = graph.nodes[t];
    e.group = null,
    e.marked = false
  }
  assignGroups()
}

function assignGroups() {
  for (; ;) {
    var t = getUnmarkedUngroupedNodes();
    if (0 == t.length) {
      numberOfCommunities = groupCounter - 1;
      break
    }
    pacMan(t[0]) && 0 != t.length && groupCounter++
  }
}

function getUnmarkedUngroupedNodes() {
  for (var t = [], e = 0; e < graph.nodes.length; e++) {
    var n = graph.nodes[e];
    0 == n.marked && t.push(n)
  }
  return t
}

function pacMan(t) {
  t.group = groupCounter;
  var e = null;
  if (null != t && !t.marked) {
    t.marked = true,
      t.group = groupCounter,
      twine.push(t);
    for (var n = degree(t), r = findNeighbors(t), i = 0; n > i; i++) {
      var o = r[i];
      o.marked || (e = o,
        pacMan(e))
    }
  }
  return null != t || 0 == twineIndex ? true : (twineIndex = -1,
    e = twine[twineIndex],
    pacMan(e),
    void 0)
}

function findLargestCommunity() {
  communities = [];
  for (var t = 0; groupCounter > t; t++)
    communities[t] = 0;
  for (var e = 0; groupCounter > e; e++)
    for (var n = 0; n < graph.nodes.length; n++)
      graph.nodes[n].group == e && communities[e]++;
  largestCommunity = Array.max(communities)
}

function convertGraphForNetX(t) {
  for (var e = [], n = [], r = jsnx.Graph(), i = 0; i < t.nodes.length; i++)
    e.push(t.nodes[i].id);
  for (var o = 0; o < t.links.length; o++) {
    var a = [];
    a.push(t.links[o].source.id),
      a.push(t.links[o].target.id),
      n.push(a)
  }
  return r.add_nodes_from(e),
    r.add_edges_from(n),
    r
}

function assignDegree() {
  for (var t = 0; t < graph.nodes.length; t++)
    graph.nodes[t].degree = degree(graph.nodes[t])
}

function computeBetweennessCentrality() {
  G = convertGraphForNetX(graph);
  for (var t = jsnx.betweenness_centrality(G), e = 0; e < graph.nodes.length; e++)
    0 == t[e] && (t[e] = 1e-4),
      graph.nodes[e].bcScore = t[e];
  return t
}

function shuffle(t) {
  for (var e, n, r = t.length; r; e = Math.floor(Math.random() * r),
    n = t[--r],
    t[r] = t[e],
    t[e] = n)
    ;
  return t
}

function getTailoredNodes() {
  for (var t = [], e = 0; 13 > e; e++) {
    var n = {
      id: e + 13,
      status: "S",
      group: null,
      edges: [],
      marked: false,
      degree: null,
      bcScore: null,
      exposureTimestep: null,
      infectedBy: null
    };
    t.push(n)
  }
  return t
}

function cleanup(t, e) {
  var n = [], r = {};
  for (var i in t)
    r[t[i][e]] = t[i];
  for (i in r)
    n.push(r[i]);
  return n
}

function getTailoredLinks() {
  var t = [];
  return t = [{
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
  }]
}

function getWeakTieNodes() {
  for (var t = [], e = 0; 30 > e; e++) {
    var n = {
      id: e,
      status: "S",
      group: null,
      edges: [],
      marked: false,
      degree: null,
      bcScore: null,
      exposureTimestep: null,
      infectedBy: null
    };
    t.push(n)
  }
  return t
}

function getWeakTieLinks() {
  var t = [{
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
  return t
}

function generateFrontGraph() {
  var t = -3e4;
  frontGraph = {},
    frontNodes = [{
      id: 0
    }, {
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }],
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
    }],
    frontGraph.nodes = frontNodes,
    frontGraph.links = frontLinks,
    frontForce = d3.layout.force().nodes(frontGraph.nodes).links(frontGraph.links).size([width, height]).charge(t).friction(.8).on("tick", frontTick).start(),
    frontLink = homeSVG.selectAll(".link").data(frontGraph.links).enter().append("line").attr("class", "link").style("fill", "#707070").style("stroke-width", "10px").style("stroke", "#d5d5d5"),
    frontNode = homeSVG.selectAll(".node").data(frontGraph.nodes).enter().append("circle").attr("class", "node").attr("r", 50).style("stroke", "#b7b7b7").style("stroke-width", "10px").attr("fill", function (t) {
      return 3 == t.id ? "#f1d2d2" : "#d5d5d5"
    }).call(frontForce.drag)
}

function frontTick() {
  frontNode.attr("cx", function (t) {
    return t.x = Math.max(8, Math.min(width - 50, t.x))
  }).attr("cy", function (t) {
    return t.y = Math.max(8, Math.min(450, t.y))
  }),
  frontLink.attr("x1", function (t) {
    return t.source.x
  }).attr("y1", function (t) {
    return t.source.y
  }).attr("x2", function (t) {
    return t.target.x
  }).attr("y2", function (t) {
    return t.target.y
  })
}

var rerun = false;

function selectIndexCase() {
  var t = graph.nodes.length, e = 0;
  do {
    var n = Math.floor(Math.random() * t),
        r = graph.nodes[n];
    e++
  } while ("V" == r.status && 500 > e);
  500 == e && (r.status = "S"),
    this.indexCase = null,
    this.indexCase = r,
    infectIndividual(this.indexCase)
}

function infectIndividual(t) {
  ("S" == t.status || "REF" == t.status) && (t.status = "I",
    t.exposureTimestep = this.timestep)
}

function exposeIndividual(t, e) {
  exposureEdges = [],
    ("S" == t.status || "REF" == t.status) && (t.status = "E",
      t.infectedBy = e);
  for (var n = 0; n < graph.links.length; n++)
    graph.links[n].source.id == e.id && graph.links[n].target.id == t.id ? exposureEdges.push(graph.links[n]) : graph.links[n].source.id == t.id && graph.links[n].target.id == e.id && exposureEdges.push(graph.links[n])
}

function updateExposures() {
  for (var t = [], e = 0; e < graph.nodes.length; e++)
    "E" == graph.nodes[e].status && (graph.nodes[e].status = "I",
      t.push(graph.nodes[e]),
      graph.nodes[e].exposureTimestep = this.timestep);
  return t
}

function infectedToRecovered(t) {
  if ("I" == t.status) {
    var e = this.timestep - t.exposureTimestep;
    if (Math.random() < 1 - Math.pow(1 - recoveryRate, e) || e > 10) {
      if (game)
        return;
      t.status = "R"
    }
  }
}

function forceRecovery(t) {
  "I" == t.status && (t.status = "R")
}

function stateChanges() {
  for (var t = 0; t < graph.nodes.length; t++) {
    var e = graph.nodes[t];
    infectedToRecovered(e)
  }
}

function infection() {
  transmissionRate = rerun ? 1 : .35;
  for (var t = 0, e = 0; e < graph.nodes.length; e++)
    if ("S" == graph.nodes[e].status) {
      for (var n = graph.nodes[e], r = findNeighbors(n), i = [], o = 0, a = 0; a < r.length; a++) {
        var u = r[a];
        "I" == u.status && (i.push(r[a]),
          o++)
      }
      var s = 1 - Math.pow(1 - transmissionRate, o);
      if (Math.random() < s) {
        t++;
        var l = shuffle(i)
          , c = l[0];
        exposeIndividual(n, c)
      }
    }
  if (t > 0)
    rerun = false,
      transmissionRate = .35;
  else {
    if (game ? detectGameCompletion() : detectCompletion(),
      timeToStop)
      return;
    rerun = true,
      transmissionRate = 1,
      infection()
  }
}

function infection_noGuaranteedTransmission() {
  for (var t = 0, e = 0; e < graph.nodes.length; e++)
    if ("S" == graph.nodes[e].status) {
      for (var n = graph.nodes[e], r = findNeighbors(n), i = [], o = 0, a = 0; a < r.length; a++) {
        var u = r[a];
        "I" == u.status && (i.push(r[a]), o++)
      }
      var s = 1 - Math.pow(1 - transmissionRate, o);
      if (Math.random() < s) {
        t++;
        var l = shuffle(i), c = l[0];
        exposeIndividual(n, c)
      }
    }
}

function getStatuses(t) {
  for (var e = 0, n = 0, r = 0, i = 0, o = 0; o < graph.nodes.length; o++) {
    var a = graph.nodes[o];
    "S" == a.status && e++,
    "I" == a.status && n++,
    "R" == a.status && r++,
    "V" == a.status && i++;
  }
  return "S" == t ? e : "I" == t ? n : "R" == t ? r : "V" == t ? i : void 0
}

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
