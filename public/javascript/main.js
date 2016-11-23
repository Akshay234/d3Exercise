var types = {
  sinCharts: '../html/sinCharts/index.html',
  barCharts: '../html/barCharts/index.html',
  pieCharts: '../html/pieCharts/index.html'
};

var render = function (type) {
  window.location = types[type];
};
