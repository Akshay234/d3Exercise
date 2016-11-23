const WIDTH = 600;
const HEIGHT = 600;

var PieChart = function (data) {
  this.data = data;
};

PieChart.prototype.translate = function (x, y, override) {
  if (override) {
    return 'translate(' + override.x + ',' + override.y + ')';
  }
  return 'translate(' + x + ',' + y + ')';
};

PieChart.prototype.createPie = function (angles) {
  var pie = d3.pie()
    .value(function (d) {
      return d
    })
    .sort(null);

  if (angles) {
    pie.startAngle(angles.startAngle).endAngle(angles.endAngle);
  }

  return pie;
};

PieChart.prototype.create = function (args) {
  var self = this;
  var radius = WIDTH / 2;

  var pie = self.createPie(args.angles);

  var svg = d3.select('.container').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .append('g')
    .attr('transform', self.translate(WIDTH / 2, HEIGHT / 2, args.translate));

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(args.innerRadius || 0);

  var g = svg.selectAll('.arc')
    .data(pie(this.data))
    .enter().append('g')
    .attr('class', 'arc');

  var colorCategory = args.colorCategory || d3.schemeCategory10;

  g.append('path')
    .attr('d', arc)
    .style('fill', function (d, i) {
      return colorCategory[i];
    });
};
