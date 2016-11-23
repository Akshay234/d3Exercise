var generate = function () {
  var data = [1, 1, 2, 2, 1, 2, 1];
  var pieChart = new PieChart(data);
  pieChart.create({innerRadius: 10, colorCategory: d3.schemeCategory20});
};

window.onload = generate;