let svg = d3.select("svg"),
    width = window.innerWidth;
    height = window.innerHeight;

let nodes = [
  {id: 0},
  {id: 1},
  {id: 2},
  {id: 3}
];
let links = [
  {
    source: nodes[0],
    target: nodes[1]
  }, {
    source: nodes[1],
    target: nodes[2]
  }, {
    source: nodes[2],
    target: nodes[0]
  }, {
    source: nodes[1],
    target: nodes[3]
  }
];

frontLink = svg.select("g.links").selectAll("line")
  .data(links)
  .join("line");

frontNode = svg.select("g.nodes").selectAll("circle")
  .data(nodes)
  .join("circle")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

function dragstarted(event) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

function dragended(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

simulation = d3.forceSimulation(nodes)
  .force("charge", d3.forceManyBody().strength(-1000))
  .force("links", d3.forceLink(links).distance(300))
  .force("center", d3.forceCenter(width/2, height/2))
  .on("tick", () => {
    frontNode
      .attr("cx", t => t.x = Math.max(8, Math.min(width - 50, t.x)))
      .attr("cy", t => t.y = Math.max(8, Math.min(height, t.y)));
    frontLink
      .attr("x1", t => t.source.x)
      .attr("y1", t => t.source.y)
      .attr("x2", t => t.target.x)
      .attr("y2", t => t.target.y)
    });

const resize = function(){
  width = window.innerWidth;
  height = window.innerHeight;
  svg.attr('viewBox', `0 0 ${width} ${height}`);
  simulation.force("center", d3.forceCenter(width/2, height/2));
};

resize();

window.addEventListener('resize', resize);