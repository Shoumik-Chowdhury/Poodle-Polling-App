// Client facing scripts here

$(document).ready(function() {

  $("#poll-form").on("submit", function(event) {
    event.preventDefault();
    const formInfo = $(this).serialize();

    $.post("/api/links", formInfo)
      .then((res) => {

        $("#poll-form").hide(1000);
        const h3 = `Thank you for filling out the form! Check your email for updates!`;
        $("#thanks-message").append(h3);
        const li = `<li>Follow the result <a target="_blank" href="/results/${res.link1admin}">here</a>.</li><li>Share <a target="_blank" href="/polls/${res.link2everyone}">this link</a> with your friends.</li>`;
        $("#links").append(li);

      })
      .catch((error) => {
        console.log(error);
      });
  });
});
