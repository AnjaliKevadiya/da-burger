const burger = require("../../../models/burger");

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $.ajax("/burgers", {
    type: "GET",
  }).then(function (data) {
    console.log(data);

    var eatenBurgersElem = $("#eatenBurgers");
    var notEatenBurgersElem = $("#notEatenBurgers");

    var burgers = data.burgers;

    for (var i = 0; i < burgers.length; i++) {
      var new_elem =
        "<li>" +
        burgers[i].id +
        ". " +
        burgers[i].burger_name +
        "<button class='change-devour' data-id='" +
        burgers[i].id +
        "' data-newdevour='" +
        !burgers[i].devoured +
        "'>";

      if (burgers[i].devoured) {
        new_elem += "DEVOUR TIME!";
      } else {
        new_elem += "DEVOURED!";
      }

      new_elem += "</button>";

      new_elem +=
        "<button class='delete-burger' data-id='" +
        burgers[i].id +
        "'>DELETE!</button></li>";

      if (burgers[i].devoured) {
        eatenBurgersElem.append(new_elem);
      } else {
        notEatenBurgersElem.append(new_elem);
      }
    }
  });

  // new burger on click
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger_name").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim(),
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType: "json",
      contentType: "application/json",
    }).then(function () {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // devoured onclick to update value in db
  $(document).on("click", ".change-devour", function (event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newdevour") === true;

    var newDevourState = {
      devoured: newDevour,
    };

    // Send the PUT request.
    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(newDevourState),
      dataType: "json",
      contentType: "application/json",
    }).then(function () {
      console.log("changed devour to", newDevour);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // delete burger on click
  $(document).on("click", ".delete-burger", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
