const LIMIT = 1000;

var randomBlue = function () {
  return "rgb(0, 0, " + (Math.floor(Math.random() * 255)) + ")";
}

var randomNumbers = function () {
  var numbers = [];
  for (var i = 0; i < 10; i++) {
    numbers.push(Math.round(Math.random() * LIMIT));
  }
  return numbers;
};

var createDiv = function (value) {
  var div = document.createElement('div');
  div.style.width = value + 'px';
  div.style.background = randomBlue();
  div.textContent = value;
  return div;
};

var generateBars = function (container, dataset) {
  dataset.map(function (d, i) {
    container.appendChild(createDiv(d));
  });
};

function updateBars(container, value) {
  container.removeChild(container.firstChild);
  container.appendChild(createDiv(value));
}
var execute = function () {
  var container = document.getElementById('barChart');
  generateBars(container, randomNumbers());
  setInterval(function () {
    var value = Math.round(Math.random() * LIMIT);
    updateBars(container, value);
  }, 1000);
};

window.onload = execute;