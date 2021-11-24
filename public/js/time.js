$(function () {
  $("#time").on("click", async function () {
    setTimeout(function () {
      //   alert("aaaaaaaaaaaaaaaaaa!");
      $("#pop").trigger("click");
    }, 1000);
  });
});
