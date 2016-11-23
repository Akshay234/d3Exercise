var generate = function () {
  var data = [1, 1, 2, 2, 1, 2, 1];
  var pieChart = new PieChart(data);
  pieChart.setColorScheme(d3.schemeCategory20);
  pieChart.create({});
};

window.onload = generate;