google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable(result);

  var options = {
    title:`${title}  \n Poll by: ${email}>`
  };

  var chart = new google.visualization.BarChart(document.getElementById('myChart'));
    chart.draw(data, options);
}
