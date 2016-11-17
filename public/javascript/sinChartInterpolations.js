var createChart = function () {
  var interpolations = [
    d3.curveLinear,
    d3.curveStep,
    d3.curveStepBefore,
    d3.curveStepAfter,
    d3.curveBasis,
    d3.curveCardinal,
    d3.curveMonotoneX,
    d3.curveCatmullRom
  ];

  interpolations.forEach(function(interpolation){
    generateSinChart(interpolation);
  });
};

createChart();
