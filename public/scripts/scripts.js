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
  "Get a link you can share",
  "See everyone together",
  "Plan ahead",
  "Your meeting is safe",
];

const slideshowTexts = [
  "Click <b>New meeting</b> to get a link you can send to people you want ot meet with",
  "To see more peopleat the same time, go to Change layout in More options menu",
  "Click <b>New meeting</b> to schedule the meetings in Google Calender and send invites to participants",
  "No one can join a meeting unless invited or admitted by the host",
];

const images = [
  "./assets/img1",
  "./assets/img2",
  "./assets/img3",
  "./assets/img4",
];
//adding event listeners to the previious and next buttons
const nextbutton = document.querySelector(".next-btn");
nextbutton.addEventListener("click", nextconcept);

function nextconcept(event) {
  console.log(event.target.classList[0].parent);
}
