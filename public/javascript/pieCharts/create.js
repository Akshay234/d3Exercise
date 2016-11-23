var createChartOf = function (chart) {
  var charts = {
    'pieChart': {
      colorCategory: d3.schemeCategory20
    },
    'semiPieChart': {
      angles: {
        startAngle: Math.PI / 180,
        endAngle: 180 * Math.PI / 180
      }
      ,
      colorCategory: d3.schemeCategory20
    },
    'donutChart': {
      innerRadius: 150,
      colorCategory: d3.schemeCategory20
    },
    'semiDonutChart': {
      angles: {
        startAngle: Math.PI / 180,
        endAngle: 180 * Math.PI / 180
      }
      ,
      innerRadius: 150,
      colorCategory: d3.schemeCategory20
    }
  };

  var data = [1, 1, 2, 2, 1, 2, 1];
  var pieChart = new PieChart(data);
  debugger;
  document.getElementsByClassName('container')[0].innerHTML = '';
  pieChart.create(charts[chart]);
};

