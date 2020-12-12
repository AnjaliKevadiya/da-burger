// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $.ajax("/burgers", {
    type: "GET",
  }).then(function (data) {
    console.log(data);
  });
});
