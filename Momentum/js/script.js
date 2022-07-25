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
// getWeather(defaultUrl)\

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
const audio = new Audio();
let playNum = 0;
let playListContainer = document.querySelector('.play-list');

function playAudio() {
  audio.src = playList[playNum].src;
  if (!isPlay) {
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
  whichTrackIsActive();
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
  isPlay = true;
  togglePlayBtn();
  whichTrackIsActive();
}

playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li);
})

playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

function whichTrackIsActive() {
  playListContainer.childNodes.forEach(el => {
    el.classList.remove('item-active');
  })
  playListContainer.childNodes[playNum].classList.add('item-active');
}

audio.addEventListener('ended', playNext); 