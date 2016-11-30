var types = {
  sinCharts: '../html/sinCharts/index.html',
  barCharts: '../html/barCharts/index.html',
  pieCharts: '../html/pieCharts/index.html',
  demonstration: '../html/demonstration/index.html'
};

var render = function (type) {
  window.location = types[type];
};
