const LIMIT = 1000;

var getBlueColor = function (d) {
  return "rgb("+(d * 100)%50+", " + ((d * 100)%255) + ", 255)";
}

var randomNumbers = function () {
  var numbers = [];
  for (var i = 0; i < 10; i++) {
    numbers.push(Math.round(Math.random() * LIMIT));
  }
  return numbers;
};

var generateBars = function (data) {
  var divs = d3.select('#barChart').selectAll('div').data(data);
  divs.enter()
    .append('div')
    .classed('bar', true)
    .style('width', function (d) {
      return d + 'px'
    })
    .style('background', function (d) {
      return getBlueColor(d);
    })
    .text(function (d) {
      return d
    });

  divs.exit().remove();
};

var updateBars = function (data, value) {
  data.shift();
  data.push(value);
  d3.selectAll('.bar').data(data)
    .style('width', function (d) {
      return d + 'px'
    })
    .text(function (d) {
      return d
    })
    .style('background', function (d) {
      return getBlueColor(d);
    });
};


var execute = function () {
  var data = randomNumbers();

  generateBars(data);
  setInterval(function () {
    var value = Math.round(Math.random() * LIMIT);
    updateBars(data, value);
  }, 1000);
};


window.onload = execute;