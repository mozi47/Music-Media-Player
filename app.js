let allMusic = [
  {
    name: "Harley Bird - Home",
    artist: "Jordan Schor",
    img: "1",
    src: "music-1",
  },
  {
    name: "Ikson Anywhere – Ikson",
    artist: "Audio Library",
    img: "2",
    src: "music-2",
  },
  {
    name: "Beauz & Jvna - Crazy",
    artist: "Beauz & Jvna",
    img: "3",
    src: "music-3",
  },
  {
    name: "Hardwind - Want Me",
    artist: "Mike Archangelo",
    img: "4",
    src: "music-4",
  },
  {
    name: "Jim - Sun Goes Down",
    artist: "Jim Yosef x Roy",
    img: "5",
    src: "music-5",
  },
  {
    name: "Lost Sky - Vision NCS",
    artist: "NCS Release",
    img: "6",
    src: "music-6",
  },
  {
    name: "Childhood",
    artist: "rauf & faik",
    img: "7",
    src: "music-7",
  },
  {
    name: "Lost On You",
    artist: "LP",
    img: "8",
    src: "music-8",
  },
  {
    name: "Rockstar",
    artist: "Post Malone",
    img: "9",
    src: "music-9",
  },
];

const progress = document.querySelector(".progress-bar");
const progressDot = document.querySelector(".progress-bar span");
const audioLength = document.querySelector(".total-time");
const currTime = document.querySelector(".current-time");
const playbtn = document.querySelector(".main");
const shufflebtn = document.querySelector(".shuffle");
const prevbtn = document.querySelector(".prev");
const nextbtn = document.querySelector(".next");
const listbtn = document.querySelector(".list");

//list songs details
const musicCard = document.querySelector(".music-list");
const mainCard = document.querySelector(".card");
//song details
const audiosrc = document.getElementById("audio");
const song = document.querySelector(".song");
const singer = document.querySelector(".singer");
const image = document.querySelector("#banner");
const backbtn = document.querySelector(".back");

//show song lists
listbtn.addEventListener("click", () => {
  musicCard.classList.toggle("active");
  mainCard.classList.toggle("slide");
});

backbtn.addEventListener("click", () => {
  musicCard.classList.remove("active");
});

//load song and add detail
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

let musicIndex = 1;
function loadMusic(index) {
  song.innerHTML = allMusic[index].name;
  singer.innerHTML = allMusic[index].artist;
  image.src = `./img/${allMusic[index].img}.jpg`;
  audiosrc.src = `./songs/${allMusic[index].src}.mp3`;
  audiosrc.addEventListener("loadedmetadata", () => {
    const timeFormat = new Date(audiosrc.duration * 1000)
      .toISOString()
      .slice(14, 19);
    audioLength.innerText = `${timeFormat}`;
  });
  musicIndex = index;
}

//play and pause songs
playbtn.addEventListener("click", () => {
  const isPaused = playbtn.classList.contains("pause");
  isPaused ? pauseAudio() : playAudio();
});

function playAudio() {
  playbtn.classList.add("pause");
  playbtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  audiosrc.play();
  image.closest(".music-image").classList.add("animation");
  makeAllPlay();
  playIcon(musicIndex);
  //Audio Visualization function
  animate();
  start();
}

function pauseAudio() {
  playbtn.classList.remove("pause");
  playbtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  audiosrc.pause();
  image.closest(".music-image").classList.remove("animation");
  pauseIcon(musicIndex);
}

//next and prev songs
nextbtn.addEventListener("click", function () {
  nextMusic();
});

prevbtn.addEventListener("click", function () {
  prevMusic();
});

function nextMusic() {
  if (musicIndex == allMusic.length - 1) musicIndex = 0;
  else musicIndex++;
  loadMusic(musicIndex);
  playAudio();
}

function prevMusic() {
  if (musicIndex < 1) musicIndex = allMusic.length - 1;
  else musicIndex--;
  loadMusic(musicIndex);
  playAudio();
}

//suffle repeat and loop
let getClass = 0;
shufflebtn.addEventListener("click", () => {
  getClass++;
  if (getClass == 1) {
    shufflebtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
    shufflebtn.setAttribute("title", "repeat all");
  } else if (getClass == 2) {
    shufflebtn.innerHTML = '<i class="fa-solid fa-arrow-rotate-right"></i>';
    shufflebtn.setAttribute("title", "repeat once");
  } else if (getClass == 3) {
    shufflebtn.innerHTML = '<i class="fa-solid fa-shuffle"></i>';
    shufflebtn.setAttribute("title", "shuffle");
    getClass = 0;
  }
});

//Progress bar
audiosrc.addEventListener("timeupdate", function (e) {
  const { duration, currentTime } = audiosrc;
  const currTimeFormat = new Date(currentTime * 1000)
    .toISOString()
    .slice(14, 19);
  currTime.innerText = `${currTimeFormat}`;
  //accept statis value
  // const progresslive = window.getComputedStyle(progress, "::after");
  progress.style.setProperty(
    "--progress-width",
    `${(currentTime / duration) * 100}%`
  );

  progressDot.style.left = `${(currentTime / duration) * 100 - 2}%`;
  if (currentTime === duration && getClass == 1) repeatAll();
  if (currentTime === duration && getClass == 2) repeatOnce();
  if (currentTime === duration && (getClass == 3 || getClass == 0)) shuffle();
});

//progress bar update on click
progress.addEventListener("click", (e) => {
  let progressWidth = progress.clientWidth;
  let X = e.offsetX;
  audiosrc.currentTime = (X / progressWidth) * audiosrc.duration;
});

//shuffle repeat and repeat once
function shuffle() {
  let index = Math.floor(Math.random() * (allMusic.length - 1)) + 1;
  do {
    index = Math.floor(Math.random() * (allMusic.length - 1)) + 1;
  } while (musicIndex == index);
  loadMusic(index);
  playAudio();
}

function repeatAll() {
  nextMusic();
  playAudio();
}

function repeatOnce() {
  audiosrc.currentTime = 0;
  playAudio();
}

//list details
const listCards = musicCard.querySelector(".songs-list");
for (let i = 0; i < allMusic.length; i++) {
  let listData = `
    <div class="music-box">
      <div class="music-detail">
        <i class="fa-regular fa-circle-play"></i>
        <div>
          <span class="song">${allMusic[i].name}</span>
          <span class="singer">${allMusic[i].artist}</span>
        </div>
      </div>
      <span id="${allMusic[i].src}"></span>
      <audio class="${allMusic[i].src}" src='./songs/${allMusic[i].src}.mp3'></audio>
    </div>
  `;

  listCards.insertAdjacentHTML("beforeend", listData);
  let listDuration = document.querySelector(`.${allMusic[i].src}`);
  let listspan = document.querySelector(`#${allMusic[i].src}`);
  listDuration.addEventListener("loadeddata", () => {
    const timeFormat = new Date(listDuration.duration * 1000)
      .toISOString()
      .slice(14, 19);
    listspan.innerText = `${timeFormat}`;
  });
}

const allsongs = listCards.querySelectorAll(".fa-regular");
// const card = listCards.querySelector(".music-box");
allsongs.forEach((song, i) => {
  song.addEventListener("click", () => {
    let isPlayed = song.classList.contains("fa-circle-pause");
    if (!isPlayed) {
      loadMusic(i);
      playAudio();
    } else {
      loadMusic(i);
      pauseAudio();
    }
  });
});

//change or update play and pause icons on list
function playIcon(i) {
  allsongs[i].classList.remove("fa-circle-play");
  allsongs[i].classList.add("fa-circle-pause");
}

function pauseIcon(i) {
  allsongs[i].classList.remove("fa-circle-pause");
  allsongs[i].classList.add("fa-circle-play");
}

function makeAllPlay() {
  allsongs.forEach((song) => {
    song.classList.remove("fa-circle-pause");
    song.classList.add("fa-circle-play");
  });
}

//Audio Visualization
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 200;
canvas.height = 200;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let analyser = null;

audioSource = audioCtx.createMediaElementSource(audiosrc);
analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
const barWidth = (canvas.width / bufferLength) * 6;

function start() {
  if (audioCtx.state == "suspended") audioCtx.resume();
}

function animate() {
  x = 0;
  let barHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    ctx.fillStyle = "#cf9e66";
    ctx.fillRect(x, canvas.height - barHeight / 4, barWidth, barHeight);
    x += barWidth + 1;
  }

  requestAnimationFrame(animate);
}
