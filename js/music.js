let musicContainer = document.getElementById("music-container");
let title = document.getElementById("title");
let progressContainer = document.getElementById("progress-container");
let progress = document.getElementById("progress");
let time = document.getElementById("time");
let progressTime = document.getElementById("progress-time");
let progressTimeLeft = document.getElementById("timeLeft");

let audio = document.getElementById("audio");
let cover = document.getElementById("cover");

let shuffleBtn = document.getElementById("shuffle");
let prevBtn = document.getElementById("prev");
let playBtn = document.getElementById("play");
let nextBtn = document.getElementById("next");

// Songs /////////////////////////////////////////////
let songPlaylist = ["How You Like That", "Kill This Love", "SOLO", "WHISTLE"];
let songs = [...songPlaylist];

// // INDEX /////////////////////////////////////////////
// for (i = 0; i < songs.length; i++) {
//   let songIndex = [i];
// }
let songIndex = 0;

// Load song //////////////////////////////////////////
// call
loadSong(songs[songIndex]);

function loadSong(song) {
  console.log(song);
  title.innerText = song;
  cover.src = `./image/${song}.jpeg`;
  audio.src = `./music/${song}.mp3`;
}

// Play song ///////////////////////////////////////////////////////////////
function playSong() {
  musicContainer.classList.add("play");
  //   property .classList giúp thêm mới hoặc xóa bớt class trong HTML hoặc một vài các Events khác

  audio.play();

  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");
}

// Pause song ////////////////////////////////////////
function pauseSong() {
  musicContainer.classList.remove("play");
  audio.pause();

  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");
}

// How to know the song is playing or not? ///////////
function playOrPause() {
  if (playBtn.querySelector("i.fa-solid").classList.contains("fa-play")) {
    playSong();
  } else if (
    playBtn.querySelector("i.fa-solid").classList.contains("fa-pause")
  ) {
    pauseSong();
  }

  // Same //////////////////
  // if (musicContainer.classList.contains("play")) {
  //   pauseSong();
  // } else {
  //   playSong();
  // }
}

// Play / Pause with Space //////////////////////////
document.body.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (musicContainer.classList.contains("play")) {
      pauseSong();
    } else {
      playSong();
    }
  }
  // console.log(event)
});

// EVENT Play or Pause song //////////////////////////////////////////////
playBtn.addEventListener("click", playOrPause);
let oldSounds = [];

///////////////////////////////////////////////////////
function random() {
  shuffleBtn.querySelector("i.fa-solid").classList.remove("fa-shuffle");
  shuffleBtn.querySelector("i.fa-solid").classList.add("fa-right-left");
}

function stopRandom() {
  shuffleBtn.querySelector("i.fa-solid").classList.remove("fa-right-left");
  shuffleBtn.querySelector("i.fa-solid").classList.add("fa-shuffle");

  let songRandom = Math.floor(Math.random(songs) * songs.length);
  console.log(songRandom);
  loadSong(songs[songRandom]);
  playSong();
  // nextSong()
}

function playRandom() {
  if (shuffleBtn.querySelector("i.fa-solid").classList.contains("fa-shuffle")) {
    random();
  } else if (
    shuffleBtn.querySelector("i.fa-solid").classList.contains("fa-right-left")
  ) {
    stopRandom();
  }
}

// EVENT random //////////////////////////////////////////
shuffleBtn.addEventListener("click", playRandom);

// Next & Previous button /////////////////////////////////////
nextBtn.addEventListener("click", nextSong);
function nextSong() {
  if (shuffleBtn.querySelector("i.fa-solid").classList.contains("fa-shuffle")) {
    let songRandom = Math.floor(Math.random(songs) * songs.length);

    oldSounds.push(songs[songRandom]);
    console.log(oldSounds);
    loadSong(songs[songRandom]);
    playSong();

    songs.splice(songRandom, 1);

    if (songs.length < 1) {
      songs = oldSounds.splice(0, oldSounds.length);
    }
  } else {
    songIndex++;

    if (songIndex === songPlaylist.length) {
      songIndex = 0;
    }
    loadSong(songPlaylist[songIndex]);
    playSong();
  }
}

prevBtn.addEventListener("click", prevSong);
function prevSong() {
  if (shuffleBtn.querySelector("i.fa-solid").classList.contains("fa-shuffle")) {
    let songRandom = Math.floor(Math.random(songs) * songs.length);

    oldSounds.push(songs[songRandom]);
    console.log(oldSounds);
    loadSong(songs[songRandom]);
    playSong();

    songs.splice(songRandom, 1);

    if (songs.length < 1) {
      songs = oldSounds.splice(0, oldSounds.length);
    }
  } else {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songPlaylist.length - 1;
    }

    loadSong(songPlaylist[songIndex]);
    playSong();
  }
}

// Song's progress Update ///////////////////////////////////////////////
function updateProgress(event) {
  // console.log(event); // --> currentTime / duration //
  let currentTime = event.srcElement.currentTime;
  let duration = event.srcElement.duration;
  // console.log(currentTime, duration);

  let progressPercent = (currentTime / duration) * 100;
  // Thay đổi style width thanh progress nhạc //
  progress.style.width = `${progressPercent}%`;

  // Time song play//////////////////////////
  let secconds = Math.floor(currentTime % 60);
  let minutes = Math.floor(currentTime - secconds) / 60;
  progressTime.textContent = `${addMinutes(minutes)}:${changeTime(secconds)}`;

  // How much time song is left?//////////////
  let seccondsDur = Math.floor(duration % 60);
  let minutesDur = Math.floor(duration - seccondsDur) / 60 - minutes;
  let diffSec = seccondsDur - secconds;
  // console.log(diffSec);

  if (diffSec < 0) {
    minutesDur--;
    diffSec = diffSec + 60;
    // console.log(diffSec);

    progressTimeLeft.textContent = `
  -${addMinutes(minutesDur)}:${changeDiffTime(diffSec)}
  `;
  }

  progressTimeLeft.textContent = `
  -${addMinutes(minutesDur)}:${changeDiffTime(diffSec)}
  `;

  if (isNaN(minutesDur)) {
    progressTimeLeft.textContent = `00:00`;
  }

  function addMinutes(item) {
    return item < 10 ? "0" + item : item;
  }
  function changeTime(item) {
    return item < 10 ? "0" + item : item;
  }
  function changeDiffTime(item) {
    return item < 10 ? "0" + item : item;
  }
}

// set Progress ////////////////////////////////////
function setProgress(event) {
  let width = this.clientWidth; // clientWidth là bao gồm phần content và padding của máy khách hàng
  // console.log(width);

  // console.log(event);
  let clickX = event.offsetX;
  // console.log(clickX);
  let duration = audio.duration;
  // console.log(duration);

  audio.currentTime = (clickX * duration) / width;
}

// change song ///////////////////////////////////////
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
