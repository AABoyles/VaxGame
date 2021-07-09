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

//TODO: Refactor spliceDuplicateEdges into removeDuplicateEdges
function removeDuplicateEdges(t) {
  for (var e = 0; e < t.nodes.length; e++)
    for (var n = t.nodes[e], r = 0; r < t.nodes.length; r++) {
      var i = t.nodes[r];
      spliceDuplicateEdges(n, i, t)
    }
}

function spliceDuplicateEdges(t, e, n) {
  for (var r = 0, i = 0; i < n.links.length; i++) {
    var o = n.links[i];
    o.source.id == t.id && o.target.id == e.id && r++,
    o.target.id == t.id && o.source.id == e.id && r++,
    r > 1 && (r = 1, n.links.splice(i, 1))
  }
  return r;
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

function updateCommunities() {
  twine = [],
  twineIndex = 0,
  groupCounter = 1;
  for (var t = 0; t < graph.nodes.length; t++) {
    var e = graph.nodes[t];
    e.group = null,
    e.marked = false
  }
  while(true) {
    var t = [];
    for (var t = [], e = 0; e < graph.nodes.length; e++) {
      var n = graph.nodes[e];
      0 == n.marked && t.push(n)
    }
    if (0 == t.length) {
      numberOfCommunities = groupCounter - 1;
      break
    }
    pacMan(t[0]) && 0 != t.length && groupCounter++
  }
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

function shuffle(t) {
  for (var e, n, r = t.length; r; e = Math.floor(Math.random() * r),
    n = t[--r],
    t[r] = t[e],
    t[e] = n)
    ;
  return t
}

var rerun = false;

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

// TODO: Refactor infectedToRecovered into stateChanges()
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

