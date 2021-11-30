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

  optionObject.forEach(choice => {
    json.elements[0]["choices"].push(choice.option_name);
  });

  window.survey = new Survey.Model(json);

  survey
    .onComplete
    .add(function(sender) {
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/poll",
        data: {rank: sender.data, optionEntry: optionObject}
      });

      document
        .querySelector('#surveyResult')
        .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    });

  $("#surveyElement").Survey({model: survey});

});
