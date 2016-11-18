const WIDTH = 600;
const HEIGHT = 600;

var PieChart = function (data) {
  this.data = data;
  this.colorCategory = d3.schemeCategory10;
};

PieChart.prototype.translate = function (x, y, override) {
  if(override) {
    return 'translate(' + override.x + ',' + override.y + ')';
  }
  return 'translate(' + x + ',' + y + ')';
};

PieChart.prototype.setColorScheme = function (category) {
  this.colorCategory = category;
};

PieChart.prototype.create = function (args) {
  var self = this;
  var radius = WIDTH / 2;

  var pie = d3.pie()
    .value(function (d) {
      return d
    });
  
  var svg = d3.select('.container').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .append('g')
    .attr('transform', self.translate(WIDTH / 2, HEIGHT / 2, args.translate));

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var g = svg.selectAll('.arc')
    .data(pie(this.data))
    .enter().append('g')
    .attr('class', 'arc');

  g.append('path')
    .attr('d', arc)
    .style('fill', function (d, i) {
      return self.colorCategory[i];
    });
};
