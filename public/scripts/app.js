// Client facing scripts here

$(document).ready(function() {
  // const mailgun = require("mailgun-js");
  // const DOMAIN = 'sandbox6e533c3294974b95aad303caf09e4b39';
  // const mg = mailgun({apiKey: '25d968bed0b96556988610587b2ee8ed-7b8c9ba8-d4fd1a68', domain: 'sandbox6e533c3294974b95aad303caf09e4b39'});
  // const data = {
  //   from: 'shoumik.atique@gmail.com',
  //   to: 'anonymous.129501@gmail.com',
  //   subject: 'Hello',
  //   text: 'Testing some Mailgun awesomness!'
  // };

  // mg.messages().send(data, function (error, body) {
  //   console.log(body);
  // });

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
