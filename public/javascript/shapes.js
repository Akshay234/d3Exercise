const LENGTH = 100;
const LEFT_MARGIN = 50;
const UPPER_MARGIN = 10;

function calculateDistance(length) {
  var distance = [];
  distance.push(LEFT_MARGIN);
  for (var i = 1; i < length; i++) {
    distance.push(distance[i-1] + LENGTH + LEFT_MARGIN);
  }
  return distance;
};

generateShapes = function (data) {
  var shapes = d3.select('.shapesContainer').append('svg');
  var keys = Object.keys(data);
  var startPosition = calculateDistance(keys.length);
  for (var i = 0; i < keys.length; i++) {
    data[keys[i]](shapes, startPosition[i]);
  }
};

var line = function (svg, startPoint) {
  svg.append('line')
    .attr('x1',startPoint)
    .attr('y1',LENGTH)
    .attr('x2',startPoint+LENGTH)
    .attr('y2',UPPER_MARGIN)
    .attr('id','line');
};

var circle = function (svg, startPoint) {
  svg.append('circle')
    .attr('cx',startPoint+LENGTH/2)
    .attr('cy',LENGTH/2+UPPER_MARGIN)
    .attr('r',LENGTH/2)
    .attr('id','circle');
};

var square = function (svg, startPoint) {
  svg.append('rect')
    .attr('x', startPoint)
    .attr('y', UPPER_MARGIN)
    .attr('width',LENGTH)
    .attr('height',LENGTH)
    .attr('id','square');
};

var calculateTrianglePoints = function(startPoint) {
  return startPoint + ' ' + (LENGTH+UPPER_MARGIN) + ',' + (startPoint + LENGTH / 2) + ' ' + UPPER_MARGIN + ',' + (startPoint + LENGTH) + ' ' + (LENGTH+UPPER_MARGIN);
};

var triangle = function (svg, startPoint) {
  svg.append('polygon')
    .attr('points', calculateTrianglePoints(startPoint))
    .attr('id', 'triangle');
};

var generateShapes = function () {
  var data = {
    line: line,
    circle: circle,
    square: square,
    triangle: triangle
  };
  generateShapes(data);
};


window.onload = generateShapes;

