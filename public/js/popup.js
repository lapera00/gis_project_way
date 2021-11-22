$(document).ready(function () {
  $(".open").on("click", function () {
    $(".popup").show();
    $(".dim").show();
  });
  $(".popup .close").on("click", function () {
    $(this).parent().hide();
    $(".dim").hide();
  });
});
