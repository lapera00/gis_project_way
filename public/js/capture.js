/**
 * 비디오 이미지 캡쳐
 */
function capture() {
  const context = $canvas.getContext("2d");
  context.drawImage($video, 0, 0, width, height);
  insertImage($canvas.toDataURL("image/png"));
}

/**
 * getUserMedia 성공
 * @param stream
 */
function success(stream) {
  $video.srcObject = stream;
}

/**
 * getUserMedia 실패
 * @param err
 */
function error(err) {
  console.log("error", err);
  alert(err.message);
}

/**
 * 미디어 호출
 */
async function startMedia() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    success(stream);
  } catch (err) {
    error(err);
  }
}

/**
 * 초기 이벤트 바인딩
 */
function initialize() {
  document.querySelector("#btn-camera").addEventListener("click", startMedia);
  document.querySelector("#btn-capture").addEventListener("click", capture);
}

initialize();
