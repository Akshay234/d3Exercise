var generate = function () {
  var data = [1, 1, 2, 2, 1, 2, 1];
  var pieChart = new PieChart(data);
  pieChart.setColorScheme(d3.schemeCategory20);
  var args = {
    angles: {
      startAngle: Math.PI / 180,
      endAngle: 180 * Math.PI / 180
    },
    innerRadius: 150
  };
  pieChart.create(args);
};

window.onload = generate;