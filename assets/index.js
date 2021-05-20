let svg = d3.selectAll("svg"),
    width = window.innerWidth;
    height = window.innerHeight;

let frontNodes = [
  {id: 0},
  {id: 1},
  {id: 2},
  {id: 3}
];
let frontLinks = [
  {
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
  }
];

frontLink = svg.select("g.links").selectAll(".link")
  .data(frontLinks)
  .enter()
  .append("line")
  .attr("class", "link")
  .style("fill", "#707070")
  .style("stroke-width", "10px")
  .style("stroke", "#d5d5d5");

frontNode = svg.select("g.nodes").selectAll(".node")
  .data(frontNodes)
  .join("circle")
    .attr("class", "node")
    .attr("r", 50)
    .style("stroke", "#b7b7b7")
    .style("stroke-width", "10px")
    .attr("fill", t => ((3 == t.id) ? "#f1d2d2" : "#d5d5d5"))
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

simulation = d3.forceSimulation(frontNodes)
  .force("charge", d3.forceManyBody().strength(-1000))
  .force("links", d3.forceLink(frontLinks).distance(300))
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