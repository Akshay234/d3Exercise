var generateNumberExpansionChart = function () {
  var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  var font = fontStyleScale();
  var width = widthSizeScale();

  var numbers = d3.select('.container').selectAll('.box').data(data);
  numbers.enter().append('div')
    .classed("box", true)
    .text(function (d) {
      return d;
    })
    .style("font", function (d) {
      return font(d);
    })
    .style("width", function (d) {
      return width(d);
    })
};

var fontStyleScale = function () {
  return d3.scaleLinear().domain([0, 10]).range(["bold italic 12px/30px serif", "bold italic 120px/180px serif"]);
};

var widthSizeScale = function () {
  return d3.scaleLinear().domain([0, 10]).range([30, 130]);
};

window.onload = generateNumberExpansionChart();
