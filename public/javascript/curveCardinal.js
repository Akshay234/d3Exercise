function generateCurveData() {
  var curves = [];
  for (var i = 0; i < 5; i++) {
    curves.push(d3.curveCardinal.tension(i * 0.20));
  }
  return curves;
}

var generate = function () {

  var data = [
    {x: 0, y: 5},
    {x: 1, y: 9},
    {x: 2, y: 7},
    {x: 3, y: 5},
    {x: 4, y: 3},
    {x: 5, y: 3.5},
    {x: 6, y: 4},
    {x: 7, y: 2},
    {x: 8, y: 3},
    {x: 9, y: 2}
  ];

  data = data.map(function (v, index) {
    var y = ((Math.sin(v.x * 3) + 1) / 2) * 10;
    return {x: v.x, y: y};
  });

  var chart = new Chart();

  generateCurveData().forEach(function (tension) {
    var domain = {x:[0,10],y:[1,0]};
    var svg = chart.createAxis(domain);

    var options = {
      chart: svg,
      data: data,
      id: 'line',
      interpolation: tension
    };

    var lineGroup = chart.createLine(options);
    chart.createDots(lineGroup, data);
  })
};

window.onload = generate;