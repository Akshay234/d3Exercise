var types = {
  pieChart: '../../html/pieCharts/pieChart.html',
  semiPieChart: '../../html/pieCharts/semiPieChart.html',
  donutChart: '../../html/pieCharts/donutChart.html',
  semiDonutChart: '../../html/pieCharts/semiDonutChart.html'
};

var render = function (type) {
  document.getElementById("iframe").src=types[type];
};