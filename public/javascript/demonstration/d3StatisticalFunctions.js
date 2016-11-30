var lastUpdatedClass;

var statisticalMethods = [
  {method: d3.min, type: 'min'},
  {method: d3.max, type: 'max'},
  {method: d3.sum, type: 'sum'},
  {method: d3.median, type: 'median'},
  {method: d3.quantile, type: 'quantile'},
  {method: d3.variance, type: 'variance'},
  {method: d3.deviation, type: 'deviation'}];

var createButtons = function () {
  d3.select('body').selectAll('input')
    .data(statisticalMethods)
    .enter()
    .append('input')
    .attr('type', 'button')
    .attr('class', 'button')
    .attr('value', function (d) {
      return d.type;
    })
};

var generateStatisticalData = function () {
  var data = [1, 3, 6, 3, 6, 8, 9, 6, 2, 4];
  return statisticalMethods.map(function (statistic) {
    if (statistic.type == 'quantile') {
      return {value: statistic.method(data, 0.5), type: statistic.type};
    }
    return {value: statistic.method(data), type: statistic.type};
  });
};

var getMaxValue = function (data) {
  return data.reduce(function (current, next) {
    return current.value >= next.value ? current : next;
  }).value;
};

var create = function () {
  createButtons();
  var data = generateStatisticalData();
  var domain = {x: [0, statisticalMethods.length], y: [getMaxValue(data) + RECT_ALLOWANCE, 0]};

  var chart = new Chart();
  var axis = chart.createAxis(domain, {ticks: {x: statisticalMethods.length}});
  var bars = chart.createHistogram(data, axis);
};

document.onclick = function (click) {
  var inputValue = click.toElement.value;

  var t = d3.transition()
    .duration(1000)
    .ease(d3.easeLinear);

  if (lastUpdatedClass) {
    d3.select(prefixDot(lastUpdatedClass))
      .transition(t)
      .style('fill', 'lightblue');
  }

  d3.select(prefixDot(inputValue))
    .transition(t)
    .style('fill', 'steelblue');

  lastUpdatedClass = inputValue;
};

var prefixDot = function (value) {
  return '.' + value;
};

window.onload = create;