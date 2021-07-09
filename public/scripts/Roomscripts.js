var socket = io();
//here is where the actual video call thing lies
const videoGrid = document.querySelector(".videoGrid");
const videoHolder = document.createElement("video");
videoHolder.muted = true;
let VideoStream;
//what this does is that it asks user for his media control
//like chrome permissions for the video and audio
//getUserMedia takes in an object
//this returns a promise so .then and .catch should be used to handle
//this
navigator.mediaDevices
  .getUserMedia({
    //we need video so this is true
    video: true,
    //we also need the audio then so audio is true
    audio: true,
  })
  .then((stream) => {
    VideoStream: stream;
    PlayVideoStream(videoHolder, stream);
  });
console.log("here");
//joining the room with that particular room id
socket.emit("join-room", Room_id);

socket.on("user-connected", () => {
  ConnectToNewUser();
});

ConnectToNewUser = () => {
  console.log("new user incoming");
};
//video stream function
const PlayVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", function () {
    video.play();
  });
  videoGrid.append(video);
};

module.exports = {
  Room_id: this.Room_id,
};
