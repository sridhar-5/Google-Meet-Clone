const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const time = new Date();
const d = time.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const DisplayDateOnP = document.getElementById("date");

DisplayDateOnP.innerHTML =
  `${d}` +
  "  " +
  `${Days[time.getDay()]}` +
  ",  " +
  `${monthNames[time.getMonth()]}` +
  " " +
  `${time.getDate()}`;
DisplayDateOnP.style.color = "grey";
DisplayDateOnP.style.fontSize = "20px";

const slideshowHeads = [
  `Get a link you can share`,
  `See everyone together`,
  `Plan ahead`,
  `Your meeting is safe`,
];

const slideshowTexts = [
  `Click&nbsp;<b>New meeting</b>&nbsp;to get a link you can send to people you want ot meet with`,
  `To see more peopleat the same time, go to Change layout in More options menu`,
  `Click&nbsp;<b>New meeting</b>&nbsp;to schedule the meetings in Google Calender and send invites to participants`,
  `No one can join a meeting unless invited or admitted by the host`,
];

const images = [
  "./assets/img1.svg",
  "./assets/img2.svg",
  "./assets/img3.svg",
  "./assets/img4.svg",
];

//importing all the buttonsa and places to dynamically change things
const nextbutton = document.querySelector(".next-btn");
const prevbutton = document.querySelector(".prev-btn");
const image = document.querySelector(".change-image");
const text = document.getElementById("info");
const infotext = document.getElementById("infotext");
//setting default image and default content
window.addEventListener("DOMContentLoaded", DefaultContentLoad);

function DefaultContentLoad() {
  image.src = images[0];
  text.innerHTML = slideshowHeads[0];
  infotext.innerHTML = slideshowTexts[0];
}

var currentConcept = 0;
//adding event listeners to the previious and next buttons
nextbutton.addEventListener("click", nextconcept);

function nextconcept(event) {
  currentConcept++;
  if (currentConcept > images.length - 1) {
    nextbutton.style.color = "lightgrey";
    currentConcept = images.length - 1;
  }
  if (currentConcept > 0 && currentConcept < images.length - 1) {
    prevbutton.style.color = "grey";
    nextbutton.style.color = "grey";
  }
  LoadContent(currentConcept);
}

//adding event listener to the prevbutton
prevbutton.addEventListener("click", prevConcept);

function prevConcept() {
  currentConcept--;
  if (currentConcept < 0) {
    prevbutton.style.color = "lightgrey";
    currentConcept = 0;
  }
  if (currentConcept > 0 && currentConcept < images.length - 1) {
    prevbutton.style.color = "grey";
    nextbutton.style.color = "grey";
  }
  LoadContent(currentConcept);
}
function LoadContent(currentConcept) {
  image.src = images[currentConcept];
  text.innerHTML = slideshowHeads[currentConcept];
  infotext.innerHTML = slideshowTexts[currentConcept];
}
