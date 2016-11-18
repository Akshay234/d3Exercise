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
    {x: 9, y: 2},
    {x: 10, y: 2}
  ];

  var chart = new Chart();
  var domain = {x:[0,10],y:[1,0]};
  var svg = chart.createAxis(domain);

  var sinData = data.map(function (v, index) {
    return {x: v.x, y: (3*Math.sin(index)) + 5};
  });

  options = {
    chart: svg,
    data: sinData,
    id: 'sinLine'
  };

  chart.createArea(options);

  var sinLineGroup = chart.createLine(options);
  chart.createDots(sinLineGroup, sinData);

  options = {
    chart: svg,
    data: sinData
  };
};

window.onload = generate;
