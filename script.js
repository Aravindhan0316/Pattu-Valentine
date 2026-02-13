const quizData = [
  {
    q: "What is my favourite thing about you? 💕",
    options: [
      { text: "Your Innocence 😍", correct: true },
      { text: "Your possessiveness 😆", correct: false },
      { text: "Your smile 😌", correct: false }
    ],
    reactions: {
      correct: "That innocent smile is my weakness ❤️",
      wrong: "Nooo 😜 try again next question!"
    }
  },
  {
    q: "What do I do when I miss you? 🥹",
    options: [
      { text: "Act strong 😎", correct: false },
      { text: "Text you instantly 😌❤️", correct: true },
      { text: "Sleep 😴", correct: false }
    ],
    reactions: {
      correct: "Yes 😌❤️ I run to my phone!",
      wrong: "Nope 😜 I can't survive without texting you."
    }
  },
  {
    q: "Who is officially my favourite person? 💖",
    options: [
      { text: "You 😌❤️", correct: true },
      { text: "Food 🍕", correct: false },
      { text: "Earth 🌍", correct: false }
    ],
    reactions: {
      correct: "Nee dhan en ulagame ❤️",
      wrong: "Excuse meee 😤 only one right answer!"
    }
  }
];

let currentQ = 0;

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const slideshow = document.getElementById("slideshow");
const proposal = document.getElementById("proposal");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const popupTeddy = document.getElementById("popupTeddy");

const music = document.getElementById("bgMusic");

/* ===== START BUTTON (MUSIC STARTS HERE) ===== */
document.getElementById("startBtn").addEventListener("click", function () {
  intro.classList.remove("active");
  quiz.classList.add("active");

  music.volume = 0.7;
  music.currentTime = 0;
  music.play().catch(err => console.log(err));

  loadQuestion();
});

/* ===== QUIZ ===== */
function loadQuestion() {
  const q = quizData[currentQ];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => handleAnswer(opt.correct);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(correct) {
  const reaction = correct
    ? quizData[currentQ].reactions.correct
    : quizData[currentQ].reactions.wrong;

  showPopup(reaction);

  currentQ++;

  if (currentQ < quizData.length) {
    setTimeout(() => {
      closePopup();
      loadQuestion();
    }, 1500);
  } else {
    setTimeout(() => {
      closePopup();
      startSlideshow();
    }, 1500);
  }
}

/* ===== POPUP ===== */
function showPopup(text, final = false) {
  popupText.textContent = text;
  popupTeddy.style.display = final ? "block" : "none";
  popup.classList.remove("hidden");
}

function closePopup() {
  popup.classList.add("hidden");
}

/* ===== SLIDESHOW ===== */
const photos = [
  "images/photo1.png",
  "images/photo2.png",
  "images/photo3.png",
  "images/photo4.png",
  "images/photo5.png",
  "images/photo6.png"
];

let slideIndex = 0;
let slideInterval;

function startSlideshow() {
  quiz.classList.remove("active");
  slideshow.classList.add("active");

  slideInterval = setInterval(() => {
    slideIndex = (slideIndex + 1) % photos.length;
    document.getElementById("slide").src = photos[slideIndex];
  }, 2500);

  setTimeout(() => {
    clearInterval(slideInterval);
    slideshow.classList.remove("active");
    proposal.classList.add("active");
  }, 15000);
}

/* ===== YES / NO ===== */
const noBtn = document.getElementById("noBtn");

noBtn.onmouseover = () => {
  noBtn.style.left = Math.random() * 250 + "px";
  noBtn.style.top = Math.random() * 100 + "px";
};

document.getElementById("yesBtn").onclick = () => {
  document.querySelector(".btn-group").style.display = "none";
  showPopup(
    "Pattu 🧸❤️\n\nI don't want to the sorrow under the dark sky.\nI will be sunshine\n\nDo u trust me..? 💖",
 true
  );
};
