import playList from "./playlist.js";

const time = document.querySelector('.time');
const myDate = document.querySelector('.date');
const options = { weekday: 'long', month: 'long', day: 'numeric' };

const date = new Date();
const greetings = document.querySelector('.greeting');
const hours = date.getHours();

const nameSharp = document.querySelector('.name');

const localSettings = {};

//------------------------------TRANSLATE--------------------------------------------

const greetingTranslation = {
  en: ['Good Morning', 'Good Afternoon', 'Good Evening', 'Good Night'],
  pl: ['Dzień dobry', 'Dzień dobry', 'Dobry wieczór', 'Dobranoc'],
  ru: ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи']
}

const placeHolderNameTranslation = ['Enter name', 'Wpisz imię', 'Введите имя'];

function showPlaceHolder() {
  nameSharp.placeholder = placeHolderNameTranslation[i];
}

function showGreeting(lang = 'en') {
  let getTime = getTimeOfDay();
  let count;
  switch (getTime) {
    case 'morning':
      count = 0;
      break;
    case 'afternoon':
      count = 1;
      break;
    case 'evening':
      count = 2;
      break;
    case 'night':
      count = 3;
      break;
  }
  greetings.textContent = greetingTranslation[lang][count];
  showPlaceHolder();
}

const languageBtn = document.querySelector('.language');
languageBtn.textContent = 'en';

const arrLang = ['en', 'pl', 'ru'];
let i = 0;
let quotesSwitch = '';

languageBtn.addEventListener('click', () => {
  i++;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${arrLang[i]}&appid=a7d6cf5c06b60ebd06921df6a6b2725a&units=metric`;
  if (i === 3) { i = 0 };
  languageBtn.textContent = arrLang[i];
  showGreeting(arrLang[i]);
  getWeather(url);
  if (i === 2) {
    quotesSwitch = 'rus'
    getQuotesRus();
  }
  else {
    quotesSwitch = 'eng'
    getQuotes();
  }
});

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate(date);
  setTimeout(showTime, 1000);
  showGreeting(arrLang[i]);
}
showTime();

function showDate(date) {
  const currentDate = date.toLocaleDateString(arrLang[i], options);
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

const arrOfPhotoBank = document.querySelectorAll('.bibl-photo');
let globalActiveTag = getTimeOfDay();

function setBg() {
  const img = new Image();
  let timeOfDay = getTimeOfDay();
  img.src = `https://raw.githubusercontent.com/ShArPman13/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/ShArPman13/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  });
}
setBg()

function getSlideNext() {
  if (arrOfPhotoBank[0].classList.contains('active')) {
    const num = +bgNum + 1;
    bgNum = fixNum(num);
    if (bgNum === 21) {
      bgNum = '01';
    }
    setBg(bgNum);
  }
  else if (arrOfPhotoBank[1].classList.contains('active')) {
    getLinkToImageFromUnsplash();
  }
  else {
    getLinkToImageFromFlickr();
  }
}

slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
  if (arrOfPhotoBank[0].classList.contains('active')) {
    const num = +bgNum - 1;
    bgNum = fixNum(num);
    if (bgNum === '00') {
      bgNum = '20';
    }
    setBg(bgNum);
  }
  else if (arrOfPhotoBank[1].classList.contains('active')) {
    getLinkToImageFromUnsplash();
  }
  else {
    getLinkToImageFromFlickr();
  }
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
    humidity.textContent = `Humidity: ${data.main.humidity}`;
  } catch (error) {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = `Error! City ${city.value} not found.`;
  }
}

city.addEventListener('change', () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${arrLang[i]}&appid=a7d6cf5c06b60ebd06921df6a6b2725a&units=metric`;
  localSettings.url = url;
  getWeather(url);
  let cityNameFirstLetterBig = city.value.toString();
  cityNameFirstLetterBig = cityNameFirstLetterBig[0].toUpperCase() + cityNameFirstLetterBig.slice(1);
  city.value = cityNameFirstLetterBig;
})

function setLocalStorage() {
  localStorage.setItem('url', localSettings.url);
  localStorage.setItem('nameSharp', nameSharp.value);
  localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('url')) {
    localSettings.url = localStorage.getItem('url');
    getWeather(localSettings.url);
  } else {
    getWeather(defaultUrl);
    city.value = 'Minsk';
  }
  if (localStorage.getItem('nameSharp')) {
    nameSharp.value = localStorage.getItem('nameSharp');
  }
  if (localStorage.getItem('city')) {
    let cityNameFirstLetterBig = (localStorage.getItem('city')).toString();
    cityNameFirstLetterBig = cityNameFirstLetterBig[0].toUpperCase() + cityNameFirstLetterBig.slice(1);
    city.value = cityNameFirstLetterBig;
  }
  else {
    city.placeholder = 'Enter city';
  }
}
window.addEventListener('load', getLocalStorage);

//------------------------------QUOTES---------------------------------------------

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
  const quotes = 'assets/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuote = Math.floor(Math.random() * 1623)
  quote.textContent = `" ${data[randomQuote].text} "`;
  author.textContent = `- ${data[randomQuote].author} -`;
}

getQuotes();

async function getQuotesRus() {
  const quotesRus = 'assets/quotes_rus.json'
  const resRus = await fetch(quotesRus);
  const dataRus = await resRus.json();
  let randomQuoteRus = Math.floor(Math.random() * 479)
  quote.textContent = `" ${dataRus[randomQuoteRus]} "`;
  author.textContent = `- Программист под номером ${randomQuoteRus} -`;
}

changeQuote.addEventListener('click', () => {
  if (quotesSwitch == 'rus') {
    getQuotesRus();
  }
  else {
    getQuotes();
  }
});

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
let globalVolume = 0.3;

const volume = document.querySelector('.volume');
const audioPlayer = document.querySelector('.player')

audioPlayer.querySelector(".volume-percentage").style.height = globalVolume * 100 + '%';

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
});

setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".current").textContent = getTimeCodeFromNum(audio.currentTime);
  globalTimeToSeek = audio.currentTime;
}, 100);

const volumeSlider = audioPlayer.querySelector(".volume-slider");

volumeSlider.addEventListener('click', (e) => {
  const sliderHeight = window.getComputedStyle(volumeSlider).height;
  const newVolume = (e.offsetY) / parseInt(sliderHeight);
  audio.volume = newVolume;
  globalVolume = newVolume;
  audioPlayer.querySelector(".volume-percentage").style.height = newVolume * 100 + '%';
});

//------------------------------SETTINGS--------------------------------------------

const settingsBtn = document.querySelector('.settings');
const settingsBack = document.querySelector('.settings-bg');


settingsBtn.addEventListener('click', () => {
  settingsBack.classList.toggle('active');
  settingsBtn.classList.toggle('active');
})


//------------------------------PHOTOS-from-API--------------------------------------------

async function getLinkToImageFromUnsplash() {
  let timeOfDay = globalActiveTag;
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=dp0dFHpt-gWwEbAVwVYdt1FguTTWKvkC3sOcgmNMotM`;
  const res = await fetch(url);
  const data = await res.json();
  let picUrl = data.urls.raw + "&w=1920";
  console.log('Unsplash');
  const img = new Image();
  img.src = picUrl;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${picUrl})`;
  });
}

async function getLinkToImageFromFlickr() {
  let timeOfDay = globalActiveTag;
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=af211cc952f928c1ef726f9c5111b3c7&tags=${timeOfDay}&orientation=landscape&width=1920&height=1080&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  let picUrl = data.photos.photo[Math.floor(Math.random() * 90)].url_l
  console.log('flickr');
  const img = new Image();
  img.src = picUrl;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${picUrl})`;
  });
}

const select = document.getElementById('select')

select.onchange = function () {
  const activeTag = this.value;
  globalActiveTag = activeTag;
}

arrOfPhotoBank.forEach((el) => {
  el.addEventListener('click', () => {
    arrOfPhotoBank.forEach((el) => {
      el.classList.remove('active')
    });
    el.classList.toggle('active')
    if (arrOfPhotoBank[0].classList.contains('active')) {
      select.classList.remove('active')
    }
    else {
      select.classList.add('active')
    }
  })
});

