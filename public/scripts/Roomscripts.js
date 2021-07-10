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

    socket.on("user-connected", (userId) => {
      ConnectToNewUser(userId, stream);
    });

    peer.on(
      "call",
      function (call) {
        call.answer(stream); // Answer the call with an A/V stream.
        const video = document.createElement("video");
        call.on("stream", function (userVideoStream) {
          // Show stream in some video/canvas element.
          PlayVideoStream(video, userVideoStream);
        });
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
  });

var peer = new Peer(undefined, {
  host: "localhost",
  port: "3000",
  path: "/peerjs",
});

// if there is a new peer this will trigger
peer.on("open", (id) => {
  //this id is person specific and this says to browser that
  //personx with this id has joined this room
  socket.emit("join-room", Room_id, id);
  //now we have to listen for this persons id on the server
});
//joining the room with that particular room id

ConnectToNewUser = (userId, stream) => {
  //now this user id here is the user that is other user that is connected
  //we should call him now
  const call = peer.call(userId, stream);
  //create a new space for the user to stream
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    PlayVideoStream(video, userVideoStream);
  });
};
//video stream function
const PlayVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", function () {
    video.play();
  });
  videoGrid.append(video);
};

//date
const time = new Date();
const d = time.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

//rendering the meeting idin the fronend
const meetingIDforFrontEnd = document.querySelector(".meeting_id");

if (Room_id) {
  meetingIDforFrontEnd.innerHTML = `<strong>${d + " | " + Room_id}</strong>`;
}

const pageTitle = document.getElementById("title-id");
pageTitle.innerHTML = `Meeting-${Room_id}`;
