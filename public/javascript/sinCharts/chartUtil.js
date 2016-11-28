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
  this.domain = domain;
  var chart = d3.select('.container').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

  var scale = overrideScale || d3.scaleLinear();

  var x = this.xScale = scale
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

Chart.prototype.createHistogram = function (data, type) {
  var xScale = this.xScale;
  var yScale = this.yScale;
  var translate = this.translate;

  var histogram = d3.histogram()
    .value(function (d) {
      return type;
    })
    .domain(xScale.domain());

  var bars = histogram(data);

  var svg = d3.select('.container').select('svg');

  svg.selectAll("rect")
    .data(bars)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", 1)
    .attr('transform', function(d){
      translate(MARGIN, HEIGHT- MARGIN);
    })
    // .attr("transform", function(d) {
    //   return "translate(" + xScale(d) + "," + yScale(d) + ")"; })
    .attr("width", function(d) { return xScale(d)})
    .attr("height", function(d) { return yScale(d) });

};
