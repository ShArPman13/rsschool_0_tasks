const time = document.querySelector('.time');
const myDate = document.querySelector('.date');
const options = { weekday: 'long', month: 'long', day: 'numeric' };

const date = new Date();
const greetings = document.querySelector('.greeting');
const hours = date.getHours();

const nameSharp = document.querySelector('.name');

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

function setLocalStorage() {
  localStorage.setItem('nameSharp', nameSharp.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('nameSharp')) {
    nameSharp.value = localStorage.getItem('nameSharp');
  }
}
window.addEventListener('load', getLocalStorage);



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