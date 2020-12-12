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
});
