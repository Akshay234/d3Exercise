const WIDTH = 650;
const HEIGHT = 650;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var Chart = function () {
  this.xScale = undefined;
  this.yScale = undefined;
  this.domain = undefined;
};

Chart.prototype.translate = function (x, y) {
  return 'translate(' + x + ',' + y + ')';
};

Chart.prototype.calculateValue = function(value, domain) {
  return value / 10 * (domain[0] + domain[1]);
};

Chart.prototype.createDots = function (group,data) {
  var self = this;
  var domain = self.domain;
  group.selectAll('dot')
    .data(data)
    .enter().append('circle')
    .classed('dot', true)
    .attr('r', 4)
    .attr('cx', function (d) {
      return self.xScale(self.calculateValue(d.x, domain.x));
    })
    .attr('cy', function (d) {
      return self.yScale(self.calculateValue(d.y, domain.y));
    });
};

Chart.prototype.createLine = function (options) {
  var self = this;
  var domain = self.domain;
  var lineGroup = options.chart.append('g')
    .attr('transform',  self.translate(MARGIN, MARGIN));

  console.log('interpolation', options.interpolation);
  var line =  d3.line()
    .curve(options.interpolation || d3.curveLinear)
    .x(function(d){return (self.xScale(self.calculateValue(d.x, domain.x)))})
    .y(function(d){return self.yScale(self.calculateValue(d.y, domain.y))});

  lineGroup.append('path').attr('id', options.id).attr('d', line(options.data));
  return lineGroup;
};

Chart.prototype.createAxis = function (domain) {
  this.domain = domain;
  var chart = d3.select('.container').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

  var x = this.xScale = d3.scaleLinear()
    .domain(domain.x)
    .range([0, INNER_WIDTH]);

  var y = this.yScale = d3.scaleLinear()
    .domain(domain.y)
    .range([0, INNER_HEIGHT]);


  var xAxis = d3.axisBottom(x).ticks(12);
  var yAxis = d3.axisLeft(y).ticks(10);

  chart.append('g')
    .attr('transform', this.translate(MARGIN, HEIGHT - MARGIN))
    .call(xAxis)
    .classed('xAxis', true);

  chart.append('g')
    .attr('transform', this.translate(MARGIN, MARGIN))
    .call(yAxis)
    .classed('xAxis', true);

  return chart;
};
