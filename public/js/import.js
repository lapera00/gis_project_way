$(document).ready(function () {
  $("#popup").load("../popup.html", function () {
    //페이지 별로 다른 메뉴 css 적용도 가능
    document.getElementById("sub_nav").classList.add("show");
  });
});
