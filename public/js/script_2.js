let video = document.getElementById("video");
let model;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let camp = "user";
//environment

const setupCamera = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: camp, width: 1000, height: 1000 },

      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
      //video.facingMode = facingMode;
    });
};

const detectFaces = async () => {
  const prediction = await model.estimateFaces(video, false);

  console.log(prediction);

  ctx.drawImage(video, 0, 0, 1000, 1000);

  prediction.forEach((pred) => {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "blue";
    ctx.rect(
      pred.topLeft[0],
      pred.topLeft[1],
      pred.bottomRight[0] - pred.topLeft[0],
      pred.bottomRight[1] - pred.topLeft[1]
    );
    ctx.stroke();

    // ctx.fillStyle = "red";
    // ctx.globalAlpha = "0.7"; // 채우기 투명도 설정
    // ctx.fillRect(
    //   pred.topLeft[0],
    //   pred.topLeft[1],
    //   pred.bottomRight[0] - pred.topLeft[0],
    //   pred.bottomRight[1] - pred.topLeft[1]
    // );
    // pred.landmarks.forEach((landmark) => {
    //   ctx.fillRect(landmark[0], landmark[1], 5, 5);
    // });
  });
};

// html2canvas(document.querySelector("#capture")).then((canvas) => {
//   document.body.appendChild(canvas);
// });

setupCamera();
video.addEventListener("loadeddata", async () => {
  model = await blazeface.load();
  setInterval(detectFaces, 100);
});
