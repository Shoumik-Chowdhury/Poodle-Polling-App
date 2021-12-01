// Client facing scripts here

$(document).ready(function() {

  $("#poll-form").on("submit", function(event) {
    //preventing the default for submission of the form
    event.preventDefault()
    //takes the information from a form and transforms it into a string
    const formInfo = $(this).serialize();


    //form submission is handled here
    $.post("/api/links", formInfo)
      .then((res) => {
        console.log(res)

        const li = `<li>Follow the result on this page: localhost:8080/results/${res.link1admin}</li><li>Share this link with your friends: localhost:8080/polls/${res.link2everyone}</li>`
        $("#links").append(li);

        //handles reponse from the server
        //res.send from links.js
      })
      .catch((error) => {
        console.log(error);
      })


  })
});
