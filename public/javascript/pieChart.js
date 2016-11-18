const WIDTH = 600;
const HEIGHT = 600;

var generate = function () {
  var data = [1, 1, 2, 2, 1, 2, 1];
  var radius = WIDTH / 2;

  var color = d3.schemeCategory20;

  var pie = d3.pie()
    .value(function(d) { return d });

  var svg = d3.select('.container').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .append('g')
    .attr('transform', 'translate(' + WIDTH / 2 + ',' + HEIGHT / 2 + ')');

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var g = svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');

  g.append('path')
    .attr('d', arc)
    .style('fill', function(d,i) { return color[i]; });

};

window.onload = generate;