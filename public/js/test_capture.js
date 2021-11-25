$(function () {
  $("#cap").on("click", async function () {
    // 캡쳐 라이브러리를 통해서 canvas 오브젝트를 받고 이미지 파일로 리턴한다.
    html2canvas(document.querySelector("canvas")).then((canvas) => {
      let file = canvas.toDataURL("image/jpeg");
      var form = canvas[0];
      var formData = new FormData();
      formData.append("image", file);

      $.ajax({
        url: "https://172.31.99.211:3004/index",
        type: "POST",
        dataType: "josn",
        data: formData,
        contentType: false,
        processData: false,
      });
    });
  });
});
