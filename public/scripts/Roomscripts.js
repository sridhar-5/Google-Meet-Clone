var socket = io();
//here is where the actual video call thing lies
const videoGrid = document.querySelector(".videoGrid");
const videoHolder = document.createElement("video");
videoHolder.muted = true;
var VideoStream;
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
    VideoStream = stream;
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

//bringing input-field and the paper rocket button
const inputText = document.getElementById("chat-message");
const send = document.getElementById("send");

inputText.addEventListener("input", changeTheColorOfSend);

function changeTheColorOfSend(event) {
  if (inputText.value) {
    send.style.color = `rgb(55,118,224)`;
  } else {
    send.style.color = `grey`;
  }
}

//adding event listener to the send button
send.addEventListener("click", sendMessage);
//enter key
document.addEventListener("keydown", function (event) {
  if (event.code == "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  var messageText = inputText.value;
  if (messageText) {
    //emit the message text
    socket.emit("chat message", messageText);
    //and clear the chat
    inputText.value = "";
    send.style.color = `grey`;
  }
}

const chatWindowTexts = document.getElementById("UserTexts");
//recieving the message and adding that as a list
socket.on("chat message", (message) => {
  var messageElement = document.createElement("li");
  console.log(message);
  messageElement.textContent = message;
  chatWindowTexts.appendChild(messageElement);
  window.scrollTo(0, document.body.scrollHeight);
});

//getting the mute button here
const MuteButton = document.getElementById("MicButton");

//adding event listener
MuteButton.addEventListener("click", Mute_if_Mic_Is_On_Else_Of);

function Mute_if_Mic_Is_On_Else_Of() {
  //this is your Audio track
  const CheckMic = VideoStream.getAudioTracks()[0].enabled;

  if (CheckMic) {
    VideoStream.getAudioTracks()[0].enabled = false;
    DisplayUnMuteIcon();
  } else {
    VideoStream.getAudioTracks()[0].enabled = true;
    DisplayMuteIcon();
  }
}

function DisplayUnMuteIcon() {
  //const unMute = `<i class="fas fa-microphone-slash fa-lg"></i>`;
  //MuteButton.innerHTML = unMute;
  MuteButton.classList.remove("fa-microphone");
  MuteButton.classList.add("fa-microphone-slash");
}

function DisplayMuteIcon() {
  //const Mute = `<i class="fas fa-microphone fa-lg"></i>`;
  //MuteButton.innerHTML = Mute;
  MuteButton.classList.remove("fa-microphone-slash");
  MuteButton.classList.add("fa-microphone");
}

const VideoButton = document.getElementById("VideoButton");

//adding event listener to video button
VideoButton.addEventListener("click", MuteVideoUnMuteVideo);

function MuteVideoUnMuteVideo() {
  //this is your Audio track
  const CheckVideo = VideoStream.getVideoTracks()[0].enabled;

  if (CheckVideo) {
    VideoStream.getVideoTracks()[0].enabled = false;
    DisplayVideoUnMuteIcon();
  } else {
    VideoStream.getVideoTracks()[0].enabled = true;
    DisplayVideoMuteIcon();
  }
}

function DisplayVideoUnMuteIcon() {
  //replace with unmute video icon
  VideoButton.classList.remove("fa-video");
  //video is now off
  VideoButton.classList.add("fa-video-slash");
}

function DisplayVideoMuteIcon() {
  //replace with mute video icon
  VideoButton.classList.add("fa-video");
  //removing video slash icon meaning video is now on
  VideoButton.classList.remove("fa-video-slash");
}

//disconnect from the call
const disconnectCall = document.getElementById("disconnectCall");

//adding event listener
disconnectCall.addEventListener("click", DisconnectFromTheCall);

function DisconnectFromTheCall() {
  //Disconnect from the call;
}
