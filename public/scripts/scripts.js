// Mimic jQuery like selection
const $ = (selector) => document.querySelector(selector);

// Sets date and time in the nav bar
const computeDateTime = () => {
  const date = new Date();
  $(".datetime").innerHTML = `${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} • ${date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  })}`;
  setTimeout(computeDateTime, 60000);
};
computeDateTime();

// Show join button once the field is filled
const joinBtn = $(".join");
$(".meeting-code").addEventListener("keyup", (e) => {
  joinBtn.disabled = !e.target.value;
  joinBtn.classList[e.target.value ? "remove" : "add"]("hidden");
});

// Slideshow
let currentSlide = 0;
const slideshow = [
  [
    "Get a link you can share",
    "Click <strong>New meeting</strong> to get a link you can send to people you want ot meet with",
  ],
  [
    "See everyone together",
    "To see more people at the same time, go to Change layout in More options menu",
  ],
  [
    "Plan ahead",
    "Click <strong>New meeting</strong> to schedule the meetings in Google Calender and send invites to participants",
  ],
  [
    "Your meeting is safe",
    "No one can join a meeting unless invited or admitted by the host",
  ],
];

const promoBox = $(".promo-box");
const [headingElem, textElem, imgElem] = [
  ".promo-title",
  ".promo-subtitle",
  "img",
].map((sel) => promoBox.querySelector(sel));
const setSlide = () => {
  [headingElem.innerHTML, textElem.innerHTML, imgElem.src] = [
    ...slideshow[currentSlide],
    `assets/img${currentSlide + 1}.svg`,
  ];
};
setSlide();

const changeSlide = (change) => {
  promoBox.classList.remove(`slide-${currentSlide}`);
  promoBox.classList.add(`slide-${(currentSlide += change)}`);
  setSlide();
};

// Button event listeners for slideshow
[
  [".prev-slide", -1],
  [".next-slide", 1],
].forEach(([selector, change]) =>
  $(selector).addEventListener("click", (e) => changeSlide(change))
);
