var createChartOf = function (chart) {
  var charts = {
    pieChart: {},
    semiPieChart: {
      angles: {
        startAngle: Math.PI / 180,
        endAngle: 180 * Math.PI / 180
      }
    },
    donutChart: {
      innerRadius: 150
    },
    semiDonutChart: {
      angles: {
        startAngle: Math.PI / 180,
        endAngle: 180 * Math.PI / 180
      }
      ,
      innerRadius: 150
    }
  };

  var chartToCreate = charts[chart];
  chartToCreate.colorCategory = d3.schemeCategory20;
  var data = [1, 1, 2, 2, 1, 2, 1];
  var pieChart = new PieChart(data);
  document.getElementsByClassName('container')[0].innerHTML = '';
  pieChart.create(chartToCreate);
};