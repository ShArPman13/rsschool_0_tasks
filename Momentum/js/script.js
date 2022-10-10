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

const settingsTranslation = {
  en: ['Language', 'Photo API', 'Visibility blocks'],
  pl: ['Język', 'Zdjęcie API', 'Wyświetlanie bloków'],
  ru: ['Язык', 'Фото API', 'Отображение блоков']
}

const settingsItem = document.querySelectorAll('.settings-item-name');

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
  showTime();
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
  function setLocalStorage() {
    localStorage.setItem('url', url);
  }
  settingsItem.forEach((el, index) => {
    el.textContent = settingsTranslation[arrLang[i]][index];
  })
  window.addEventListener('beforeunload', setLocalStorage)
});

settingsItem.forEach((el, index) => {
  el.textContent = settingsTranslation[arrLang[i]][index];
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

const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let bgNum = getRandomNum();

const arrOfPhotoBank = document.querySelectorAll('.bibl-photo');
let globalActiveTag = getTimeOfDay();
const body = document.querySelector('body');

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
    let cityTranslate = data.name;
    city.value = cityTranslate;
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
  localStorage.setItem('city', city.value);
  localStorage.setItem('i', i);
  localStorage.setItem('quoteSwitch', quotesSwitch);
}
window.addEventListener('beforeunload', setLocalStorage)

getWeather(defaultUrl);
function getLocalStorage() {
  if (localStorage.getItem('url') === 'undefined') {
    getWeather(defaultUrl);
    city.value = 'Minsk';
  } else if (localStorage.getItem('url')) {
    localSettings.url = localStorage.getItem('url');
    getWeather(localSettings.url);
  }
  else {
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
  if (localStorage.getItem('quoteSwitch')) {
    quotesSwitch = localStorage.getItem('quoteSwitch');
    if (quotesSwitch == 'rus') {
      getQuotesRus();
    }
    else {
      getQuotes();
    }
  }
  if (localStorage.getItem('i')) {
    i = localStorage.getItem('i');
    showGreeting(arrLang[i]);
    languageBtn.textContent = arrLang[i];
    settingsItem.forEach((el, index) => {
      el.textContent = settingsTranslation[arrLang[i]][index];
    });
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
});

const state = {
  language: 'en',
  photoSource: 'github',
  blocks: ['time', 'date', 'greeting', 'quote', 'audio', 'weather']
}
const visibleItems = document.querySelectorAll('.block');
const weather = document.querySelector('.weather')
const logger = document.querySelector('.logger');

visibleItems.forEach((el) => {
  el.addEventListener('click', () => {
    el.classList.toggle('active');
    // logger.classList.toggle('active');
    if (el.innerHTML === 'Time') {
      time.classList.toggle('hidden')
    }
    if (el.innerHTML === 'Date') {
      myDate.classList.toggle('hidden')
    }
    if (el.innerHTML === 'Greeting') {
      greetings.classList.toggle('hidden')
      nameSharp.classList.toggle('hidden')
    }
    if (el.innerHTML === 'Quote') {
      quote.classList.toggle('hidden')
      author.classList.toggle('hidden')
      changeQuote.classList.toggle('hidden')
    }
    if (el.innerHTML === 'Audio') {
      audioPlayer.classList.toggle('hidden')
    }
    if (el.innerHTML === 'Weather') {
      weather.classList.toggle('hidden')
    }
  })
})

let arrActiveBlock = [];
let arrActiveBlockMain = [];
let arrActiveApi = [];

window.addEventListener('beforeunload', () => {
  let arrOfPhotoBankFromLocalStorage = [];
  arrOfPhotoBank.forEach((el) => {
    if (el.classList.contains('active')) {
      arrOfPhotoBankFromLocalStorage.push('active')
    }
    else {
      arrOfPhotoBankFromLocalStorage.push('none')
    }
    localStorage.setItem('activeApi', arrOfPhotoBankFromLocalStorage);
  });
  arrActiveApi = arrOfPhotoBankFromLocalStorage;
})
arrActiveApi = (localStorage.getItem('activeApi')).split(',');

function getHiddenBlocks() { // Получаем пользовательские настройки по открытым и закрытым блокам
  visibleItems.forEach((elem) => {
    if (elem.classList.contains('active')) {
      arrActiveBlock.push('active');
    }
    else {
      arrActiveBlock.push('none');
    }
  });
  localStorage.setItem('activeBlocks', arrActiveBlock); // сохраняем их в Local Storage
}
window.addEventListener('beforeunload', getHiddenBlocks); // запускаем функциию перед обновленинм страницы
arrActiveBlockMain = localStorage.getItem('activeBlocks'); // получаем из Local Storage
let value = arrActiveBlockMain.split(','); // Pack settings to Array

window.addEventListener('load', () => { // в момент загрузки страницы
  arrOfPhotoBank.forEach((el) => {
    el.classList.remove('active')
  })
  arrOfPhotoBank.forEach((el, i) => {
    if (arrActiveApi[i] === 'active') {
      el.classList.add('active')
    }
    if (arrOfPhotoBank[0].classList.contains('active')) {
      inputText.classList.remove('active')
    }
    else {
      inputText.classList.add('active')
    }
  })
  globalActiveTag = localStorage.getItem('globalActiveTag');
  inputText.value = globalActiveTag;
  getSlideNext()

  visibleItems.forEach((e, i) => { // проходим по блокам
    if (value[i] === 'none') { // удаляем класс active, если блок был скрыт пользователем ранее
      e.classList.remove('active');
    }
  })
  visibleItems.forEach((el) => {  // и проходим еще раз по блокам и скрываем, те которые скрыл пользователь ранее 
    if (!el.classList.contains('active')) {
      if (el.innerHTML === 'Time') {
        time.classList.toggle('hidden')
      }
      if (el.innerHTML === 'Date') {
        myDate.classList.toggle('hidden')
      }
      if (el.innerHTML === 'Greeting') {
        greetings.classList.toggle('hidden')
        nameSharp.classList.toggle('hidden')
      }
      if (el.innerHTML === 'Quote') {
        quote.classList.toggle('hidden')
        author.classList.toggle('hidden')
        changeQuote.classList.toggle('hidden')
      }
      if (el.innerHTML === 'Audio') {
        audioPlayer.classList.toggle('hidden')
      }
      if (el.innerHTML === 'Weather') {
        weather.classList.toggle('hidden')
      }
    }
  })
});

//------------------------------PHOTOS-from-API--------------------------------------------

async function getLinkToImageFromUnsplash() {
  try {
    let timeOfDay = globalActiveTag;
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=dp0dFHpt-gWwEbAVwVYdt1FguTTWKvkC3sOcgmNMotM`;
    const res = await fetch(url);
    const data = await res.json();
    let picUrl = data.urls.raw + "&w=1920";
    // console.log('Unsplash');
    const img = new Image();
    img.src = picUrl;
    img.addEventListener('load', () => {
      body.style.backgroundImage = `url(${picUrl})`;
    });
  }
  catch (error) {
    inputText.value = '';
    inputText.placeholder = 'Wrong tag!'
  }
}

async function getLinkToImageFromFlickr() {
  try {
    let timeOfDay = globalActiveTag;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=af211cc952f928c1ef726f9c5111b3c7&tags=${timeOfDay}&orientation=landscape&width=1920&height=1080&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    let picUrl = data.photos.photo[Math.floor(Math.random() * 90)].url_l
    // console.log('flickr');
    const img = new Image();
    img.src = picUrl;
    img.addEventListener('load', () => {
      body.style.backgroundImage = `url(${picUrl})`;
    });
  }
  catch (error) {
    inputText.value = '';
    inputText.placeholder = 'Wrong tag!'
  }
}

const inputText = document.querySelector('.input-text');

inputText.onchange = function () {
  const activeTag = this.value;
  globalActiveTag = activeTag;
  localStorage.setItem('globalActiveTag', globalActiveTag);
}

arrOfPhotoBank.forEach((el) => {
  el.addEventListener('click', () => {
    arrOfPhotoBank.forEach((el) => {
      el.classList.remove('active')
    });
    el.classList.toggle('active')
    if (arrOfPhotoBank[0].classList.contains('active')) {
      inputText.classList.remove('active')
    }
    else {
      inputText.classList.add('active')
    }
  })
})

//------------------------------TODO--------------------------------------------

const todoBtn = document.querySelector('.todo');
const todoBg = document.querySelector('.todo-bg');
const newTodo = document.querySelector('.new-todo');
const inputTodo = document.querySelector('.input-todo');
const todoList = document.querySelector('.todo-list');
const getStarted = document.querySelector('.get-started')

let dotsArray = [];
let popupTodoItemArray = [];

todoBtn.addEventListener('click', () => {
  if (array.length > 0) {
    newTodo.classList.add('hidden');
    getStarted.classList.add('hidden');
  }
  else {
    setTimeout(() => {
      newTodo.classList.remove('hidden');
      getStarted.classList.remove('hidden');
    }, 100);
  }
  todoBg.classList.toggle('active');
  if (todoBg.classList.contains('active')) {
    todoBtn.classList.add('active');
    if (array.length === 0) {
      inputTodo.classList.remove('active');
      todoList.classList.remove('active');
    }
    else {
      inputTodo.classList.add('active');
    }

  }
  else {
    todoBtn.classList.remove('active');
    inputTodo.classList.remove('active');
  }
})

newTodo.addEventListener('click', () => {
  inputTodo.classList.add('active');
  inputTodo.focus();
  newTodo.classList.add('hidden');
  getStarted.classList.add('hidden');
})


let array = JSON.parse(localStorage.getItem("arrayTodo"));
if (array === null) {
  array = [];
}
//create _item_for_todo_ after filling the input
inputTodo.addEventListener('change', () => {
  array.push({
    value: inputTodo.value,
    checked: false,
    id: Date.now(),
    contentEditAble: false
  })
  todoList.innerHTML = '';
  if (array.length !== 0) {
    array.forEach((el) => addItemForTodo(el));
  }
  inputTodo.value = '';
})


const addItemForTodo = (el) => {
  //create _..._
  const dots = document.createElement('div');
  dots.classList.add('dot');
  dots.textContent = '...';
  //create div_for_contextMmenu
  const popupTodoItem = document.createElement('div');
  popupTodoItem.classList.add('popup-todo-item');
  //create ul_for_contextMenu
  const ul = document.createElement('ul');
  ul.classList.add('popup-todo-item-ul');
  //create chekBox_for_contextMmenu
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = el.checked;
  //create label_for_checkBox
  const label = document.createElement('label');
  label.textContent = el.value;
  label.contentEditable = el.contentEditAble;
  label.style.outline = 'none';
  label.classList.add('label');
  if (el.checked) {
    label.classList.add('done');
  }
  label.addEventListener('dblclick', () => {
    label.contentEditable = true;
    label.focus();
  })
  label.addEventListener('keydown', (e) => {//change el.value after pressing Enter
    if (e.code === 'Enter') {
      el.value = label.textContent;
      label.contentEditable = false;
    }
  })
  label.addEventListener('blur', () => {//change el.value after loose the focus
    el.value = label.textContent;
    label.contentEditable = false;
  })
  //create todo_list_item
  const li = document.createElement('li');
  li.id = el.id;
  li.classList.add('todo-list-item');
  // li.setAttribute('data-atribute', Math.random());
  //create edit_for_conextMenu
  const li2 = document.createElement('li');
  li2.textContent = 'Edit';
  li2.classList.add('edit');
  //create delete_for_conextMenu
  const li3 = document.createElement('li');
  li3.textContent = 'Delete';
  li3.classList.add('delete');

  todoList.classList.add('active');

  todoList.append(li);//add_item_in_todolist
  li.append(checkBox);//add_checkBox_in_item
  li.append(label);//add_label_in_item
  li.append(dots);//add_..._in_item
  dots.append(popupTodoItem);//add_contextMenu_in_...
  popupTodoItem.appendChild(ul);//add_ul_in_contextMenu
  ul.append(li2);//add_edit_in_contextMenu
  ul.append(li3);//add_delete_in_contextMenu

  dotsArray.push(dots);
  popupTodoItemArray.push(popupTodoItem);

  isItemDone(checkBox, label, el);
  openContextMenuByPressingDots(dots, popupTodoItem);
  deleteItem(el, popupTodoItem);
  editItem(el, popupTodoItem, label);
}

const isItemDone = (checkBox, label, el) => {
  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
      label.classList.add('done');
      el.checked = true;
    }
    else {
      label.classList.remove('done');
      el.checked = false;
    }
  })
}

const openContextMenuByPressingDots = (dots, popupTodoItem) => {
  dots.addEventListener('click', (e) => {
    clearAllStyles();
    popupTodoItem.classList.add('active');
    if (popupTodoItem.classList.contains('active')) {
      dots.classList.add('opacity-temp');
      inputTodo.classList.remove('active');

      //  style.pointerEvents = 'none';

      if (!e.target.classList.contains('dot')) {
        popupTodoItem.classList.remove('active');
        dots.classList.remove('opacity-temp');
        inputTodo.classList.add('active');
      }
    }
    else {
      dots.style.opacity = '0';
    }
  })
}

const clearAllStyles = () => {
  popupTodoItemArray.forEach((e) => {
    e.classList.remove('active');
  })
  dotsArray.forEach((el) => {
    el.classList.remove('opacity-temp');
  })
}

const deleteItem = (el, popupTodoItem) => {
  popupTodoItem.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      array.splice(array.indexOf(el), 1);
      todoList.innerHTML = '';
      array.forEach((el) => addItemForTodo(el));
    }
  })

}

const editItem = (el, popupTodoItem, label) => {
  popupTodoItem.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit')) {
      el.contentEditAble = true;
      label.focus(); // does not work =(
      todoList.innerHTML = '';
      array.forEach((el) => addItemForTodo(el));
    }
  })
}

window.addEventListener('beforeunload', () => {
  localStorage.setItem('arrayTodo', JSON.stringify(array));
})

array.forEach((el) => addItemForTodo(el));