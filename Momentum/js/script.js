import playList from "./playlist.js";

const time = document.querySelector('.time');
const myDate = document.querySelector('.date');
const options = { weekday: 'long', month: 'long', day: 'numeric' };

const date = new Date();
const greetings = document.querySelector('.greeting');
const hours = date.getHours();

const nameSharp = document.querySelector('.name');
const localSettings = {};

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate(date);
  setTimeout(showTime, 1000);
  greetings.textContent = `Good ${getTimeOfDay()}`;
}
showTime();

function showDate(date) {
  const currentDate = date.toLocaleDateString('en-US', options);
  myDate.textContent = currentDate;
}

function getTimeOfDay() {
  const timeOfDay = ['morning', 'afternoon', 'evening', 'night'];
  if (Math.floor(hours / 6) === 0) {
    return timeOfDay[3];
  } else if (Math.floor(hours / 6) === 1) {
    return timeOfDay[0];
  } else if (Math.floor(hours / 6) === 2) {
    return timeOfDay[1];
  } else {
    return timeOfDay[2];
  }
}


function getRandomNum() {
  let randomNum = Math.floor(Math.random() * 20)
  if (randomNum === 0) {
    return '01'
  } else {
    return fixNum(randomNum);
  }
}

function fixNum(num) {
  return num < 10 ? '0' + num : num;
}

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let bgNum = getRandomNum();

function setBg() {
  const img = new Image();
  let timeOfDay = getTimeOfDay();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  };
}
setBg()

function getSlideNext() {
  const num = +bgNum + 1;
  bgNum = fixNum(num);
  if (bgNum === 21) {
    bgNum = '01';
  }
  setBg(bgNum);
}

slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
  const num = +bgNum - 1;
  bgNum = fixNum(num);
  if (bgNum === '00') {
    bgNum = '20';
  }
  setBg(bgNum);
}

slidePrev.addEventListener('click', getSlidePrev);

//------------------------------WEATHER---------------------------------------------

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=a7d6cf5c06b60ebd06921df6a6b2725a&units=metric`;

async function getWeather(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed}`;
    humidity.textContent = `Humidity: ${data.main.humidity}`
  } catch (error) {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = `Error! City ${city.value} not found.`;
  }
}

city.addEventListener('change', () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=a7d6cf5c06b60ebd06921df6a6b2725a&units=metric`;
  localSettings.url = url;
  getWeather(url);
})

function setLocalStorage() {
  localStorage.setItem('url', localSettings.url);
  localStorage.setItem('nameSharp', nameSharp.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('url')) {
    localSettings.url = localStorage.getItem('url');
    getWeather(localSettings.url);
  } else {
    getWeather(defaultUrl);
  }
  if (localStorage.getItem('nameSharp')) {
    nameSharp.value = localStorage.getItem('nameSharp');
  }
}
window.addEventListener('load', getLocalStorage);
city.placeholder = 'Enter city';
//------------------------------QUOTES---------------------------------------------

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
  const quotes = '/assets/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuote = Math.floor(Math.random() * 101)
  quote.textContent = data[randomQuote].quote;
  author.textContent = data[randomQuote].author;
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);

//------------------------------AUDIO--------------------------------------------

let isPlay = false;
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev')
const playNextBtn = document.querySelector('.play-next')
let playNum = 0;
const audio = new Audio(playList[playNum].src);
let playListContainer = document.querySelector('.play-list');
let nameSong = document.querySelector('.name-song');
nameSong.textContent = playList[playNum].title;
let globalTimeToSeek = 0;
let globalVolume = 0.5;

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = globalTimeToSeek;
  audio.volume = globalVolume;
  if (!isPlay) {
    audio.play();
    nameSong.textContent = playList[playNum].title;
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
  whichTrackIsActive();
  togglePlayBtn()
}

playBtn.addEventListener('click', playAudio);

function togglePlayBtn() {
  if (!isPlay) {
    playBtn.classList.remove('pause');
  } else {
    playBtn.classList.add('pause');
  }
}
playBtn.addEventListener('click', togglePlayBtn);

function playNext() {
  playNum++;
  if (playNum === playList.length) {
    playNum = 0;
  }
  audio.src = playList[playNum].src;
  audio.play();
  nameSong.textContent = playList[playNum].title;
  isPlay = true;
  togglePlayBtn();
  whichTrackIsActive();
}

function playPrev() {
  playNum--;
  if (playNum === -1) {
    playNum = playList.length - 1;
  }
  audio.src = playList[playNum].src;
  audio.play();
  nameSong.textContent = playList[playNum].title;
  isPlay = true;
  togglePlayBtn();
  whichTrackIsActive();
}

playList.forEach(el => {
  const li = document.createElement('li');
  const divPlayTrack = document.createElement('div');
  li.classList.add('play-item');
  divPlayTrack.classList.add('divPlayTrack');
  li.textContent = el.title;
  playListContainer.append(li);
  li.append(divPlayTrack);
})

playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

const divPlayTrack = document.querySelectorAll('.divPlayTrack');

function whichTrackIsActive() {
  playListContainer.childNodes.forEach(el => {
    el.classList.remove('item-active');
  })
  playListContainer.childNodes[playNum].classList.add('item-active');

  divPlayTrack.forEach(el => {
    el.classList.remove('divPlayTrackActive');
  });
  if (isPlay) {
    divPlayTrack[playNum].classList.add('divPlayTrackActive');
  }
}

divPlayTrack.forEach((el, index) => {
  el.addEventListener('click', () => {
    audio.pause;
    if (playNum != index) {
      globalTimeToSeek = 0
      playNum = index;
      audio.src = playList[index].src;
      audio.volume = globalVolume;
      audio.play(index.src);
      nameSong.textContent = playList[playNum].title;
      isPlay = true;
      whichTrackIsActive();
      togglePlayBtn()
    }
    else {
      playAudio();
      isPlay ? el.classList.add('divPlayTrackActive') : el.classList.remove('divPlayTrackActive');
    }
  })
});

audio.addEventListener('ended', playNext);

const volume = document.querySelector('.volume');
const audioPlayer = document.querySelector('.player')

volume.addEventListener("click", () => {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volume.classList.add("mute");
  } else {
    volume.classList.remove("mute");
  }
});

audio.addEventListener("loadeddata", () => {
  audioPlayer.querySelector(".length").textContent = playList[playNum].duration;
  audio.volume = globalVolume;
},
  false
);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

const timeline = audioPlayer.querySelector(".timeline");

timeline.addEventListener("click", (e) => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
  globalTimeToSeek = timeToSeek;
}, false);

setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".current").textContent = getTimeCodeFromNum(audio.currentTime);
}, 100);

const volumeSlider = audioPlayer.querySelector(".volume-slider");

volumeSlider.addEventListener('click', (e) => {
  const sliderHeight = window.getComputedStyle(volumeSlider).height;
  const newVolume = (e.offsetY) / parseInt(sliderHeight);
  audio.volume = newVolume;
  globalVolume = newVolume;
  audioPlayer.querySelector(".volume-percentage").style.height = newVolume * 100 + '%';
}, false)


