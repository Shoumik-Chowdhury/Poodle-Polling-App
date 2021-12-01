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

        $("#poll-form").hide(1000);
        const h3 = `Thank you for filling out the form! Check your email for updates!`;
        $("#thanks-message").append(h3);
        const li = `<li>Follow the result <a target="_blank" href="/results/${res.link1admin}">here</a></li><li>Share <a target="_blank" href="/polls/${res.link2everyone}">this link</a> with your friends.</li>`
        $("#links").append(li);

        //handles reponse from the server
        //res.send from links.js
      })
      .catch((error) => {
        console.log(error);
      })


  })
});
