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
  console.log(json)

  const $dogGif = $('<img id="dog" src="/image/dog.gif">');

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
        data: { rank: sender.data, optionEntry: optionObject }
      });

      document
        $("#title").hide()
        $("#description").hide()
        $(".container").append($dogGif)
        .querySelector('#surveyResult')
    });

  $("#surveyElement").Survey({ model: survey });

});
