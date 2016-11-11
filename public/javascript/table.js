var scales = [
  {scale: d3.scaleLinear(), row: 'tHead', division: 'Title'},
  {scale: d3.scaleLinear(), row: 'tBody', division: 'n'},
  {scale: d3.scalePow().exponent(2), row: 'tBody', division: 'n square'},
  {scale: d3.scaleLog(), row: 'tBody', division: 'log(n)'},
  {scale: d3.scaleLog().interpolate(d3.interpolateRound), row: 'tBody', division: 'log(n) rounded'}
];

var generateBody = function (scale, numbers) {
  var table = d3.select('#tableContainer').select('table');

  table.append('tr')
    .selectAll('td')
    .data(numbers)
    .enter()
    .append('td')
    .text(function (d) {
      return isNaN(scale(d)) ? d : Number(scale(d).toFixed(5));
    });
};

function generateHeading(numbers) {
  d3.select('#tableContainer').select('table').append('thead')
    .selectAll('th')
    .data(numbers)
    .enter()
    .append('th')
    .text(function (d) {
      return d;
    });
}

var execute = function () {
  var numbers = [5, 4, 8, 2, 8, 4, 8, 7, 3, 6];
  generateHeading([scales[0].division, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  for (var i = 1; i < scales.length; i++) {
    generateBody(scales[i].scale, [scales[i].division].concat(numbers));
  }
};

window.onload = execute;

