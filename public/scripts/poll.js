$(document).ready(function() {
  Survey
    .StylesManager
    .applyTheme("bootstrap");
  Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

  let json = {
    "elements": [
      {
        "type": "ranking",
        "name": "decision_maker",
        "title": "Please rank your decisions from highest to lowest priority:",
        "isRequired": true,
        "choices": [
        ]
      }]
  };

  // Sample data, eventually will come from database.
  const thing = [{id: 1, poll_id: 1, option_name: "Hiking", option_value: 11}, {id: 2, poll_id: 1, option_name: "Biking", option_value: 6}, {id: 3, poll_id: 1, option_name: "Go Karting", option_value: 15}, {id: 4, poll_id: 1, option_name: "Organized Crime", option_value: 1}];

  thing.forEach(choice => {
    json.elements[0]["choices"].push(choice.option_name);
  });

  window.survey = new Survey.Model(json);

  survey
    .onComplete
    .add(function(sender) {
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/poll",
        data: {rank: sender.data, optionEntry: thing}
      });

      document
        .querySelector('#surveyResult')
        .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });

  $("#surveyElement").Survey({model: survey});

});
