// Front end operation

// on Click for 'Article Notes' button
$(document).on("click", "#articleNote", function() {
  // Empty the notes from the note section
  $("#artnoteText").empty();
  // Save the id from the tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // If there's a note in the article
      if (data.note) {
        // Place the body of the note in the body textarea
        $(`#artnoteText${thisId}`).val(data.note.body);
      }
    });
});
