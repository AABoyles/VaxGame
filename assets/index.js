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

frontForce = d3.layout.force()
  .nodes(frontNodes)
  .links(frontLinks)
  .size([width, height])
  .charge(-3e4)
  .friction(.8)
  .on("tick", () => {
    frontNode
      .attr("cx", t => t.x = Math.max(8, Math.min(width - 50, t.x)))
      .attr("cy", t => t.y = Math.max(8, Math.min(height, t.y)));
    frontLink
      .attr("x1", t => t.source.x)
      .attr("y1", t => t.source.y)
      .attr("x2", t => t.target.x)
      .attr("y2", t => t.target.y)
    })
  .start();

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
  .enter()
  .append("circle")
  .attr("class", "node")
  .attr("r", 50)
  .style("stroke", "#b7b7b7")
  .style("stroke-width", "10px")
  .attr("fill", t => ((3 == t.id) ? "#f1d2d2" : "#d5d5d5"))
  .call(frontForce.drag)

const resize = function(){
  width = window.innerWidth;
  height = window.innerHeight;

  frontForce.size([width, height])

  svg.select(".homeTitle")
    .attr("x", width/2)
    .attr("y", height/3)
    .style("pointer-events", "none");

  svg.select(".homeText")
    .attr("x", width/2)
    .attr("y", height/3 + 50)
    .style("pointer-events", "none");
    
  svg.select(".homeTour")
    .attr("x", width - 5)
    .attr("y", height - 110);
    
  svg.select(".homeGame")
    .attr("x", width - 5)
    .attr("y", height - 75);
    
  svg.select(".homeHI")
    .attr("x", width - 5)
    .attr("y", height - 40);

  svg.select(".copyright")
    .attr("x", width - 5)
    .attr("y", height - 10);
};

resize();

window.addEventListener('resize', resize);