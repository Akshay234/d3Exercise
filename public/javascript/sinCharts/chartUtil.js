const WIDTH = 650;
const HEIGHT = 650;
const MARGIN = 30;
const RECT_ALLOWANCE = 5;

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

Chart.prototype.calculateValue = function (value, domain) {
  return value / 10 * (domain[0] + domain[1]);
};

Chart.prototype.createDots = function (group, data) {
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

Chart.prototype.createArea = function (args) {
  var self = this;
  var domain = this.domain;
  var areaGroup = args.chart.append('g')
    .attr('transform', self.translate(MARGIN, MARGIN));

  var area = d3.area()
    .curve(args.interpolation || d3.curveLinear)
    .x(function (d) {
      return self.xScale(self.calculateValue(d.x, domain.x));
    })
    .y1(function (d) {
      return self.yScale(self.calculateValue(d.y, domain.y));
    })
    .y0(INNER_HEIGHT);

  areaGroup.append('path').attr('id', 'area').attr('d', area(args.data));
};

Chart.prototype.createLine = function (args) {
  var self = this;
  var domain = self.domain;
  var lineGroup = args.chart.append('g')
    .attr('transform', self.translate(MARGIN, MARGIN));

  var line = d3.line()
    .curve(args.interpolation || d3.curveLinear)
    .x(function (d) {
      return (self.xScale(self.calculateValue(d.x, domain.x)))
    })
    .y(function (d) {
      return self.yScale(self.calculateValue(d.y, domain.y))
    });

  lineGroup.append('path').attr('id', args.id).attr('d', line(args.data));
  return lineGroup;
};

Chart.prototype.createAxis = function (domain, overrideScale) {
  overrideScale = overrideScale ? overrideScale : {};
  this.domain = domain;
  var chart = d3.select('.container').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

  var scale = overrideScale.scale || d3.scaleLinear();

  var x = this.xScale = scale
    .domain(domain.x)
    .range([0, INNER_WIDTH]);

  var y = this.yScale = d3.scaleLinear()
    .domain(domain.y)
    .range([0, INNER_HEIGHT]);


  if(overrideScale.ticks){
    var xTicks = overrideScale.ticks.x || 12;
    var yTicks = overrideScale.ticks.y || 10;
  }

  var xAxis = d3.axisBottom(x).ticks(xTicks);
  var yAxis = d3.axisLeft(y).ticks(yTicks);

  chart.append('g')
    .attr('transform', this.translate(MARGIN, HEIGHT - MARGIN))
    .call(xAxis)
    .classed('xAxis', true);

  chart.append('g')
    .attr('transform', this.translate(MARGIN, MARGIN))
    .call(yAxis)
    .classed('yAxis', true);

  return chart;
};

Chart.prototype.createHistogram = function (data) {
  var self = this;
  var svg = d3.select('.container').select('svg');

  var bars = svg.selectAll('rect')
    .data(data, function (d) {
      return d.value;
    });

  bars.enter()
    .append('rect')
    .attr('x', function (d, i) {
      return self.xScale(i) + RECT_ALLOWANCE;
    })
    .attr('y', function (d) {
      return self.yScale(d.value) + MARGIN;
    })
    .attr('height', function (d) {
      return INNER_HEIGHT - self.yScale(d.value);
    })
    .attr('class', function (d) {
      return d.type;
    })
    .attr('fill', 'lightblue')
    .attr('width', 75)
    .attr('transform', function (d) {
      return self.translate(MARGIN, 0);
    });
  return bars;
};
