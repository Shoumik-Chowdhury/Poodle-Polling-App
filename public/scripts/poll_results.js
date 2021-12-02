$(document).ready(() => {

  Chart.register(ChartDataLabels);
  var xValues = xVal;
  var yValues = yVal;
  var barColors = ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400', '#FFA500', '#FFC0CB'];

  new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "World Wide Wine Production"
      },
      plugins: {
        datalabels: {
          formatter: (value) => {
            return value;
          },
          font: {
            size: 18,
          },
          color: '#fff',
          backgroundColor: '#404040'
        }
      }
    }
  });
});
