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
  greetings.textContent = getTimeOfDay();
}
showTime();

function showDate(date) {
  const currentDate = date.toLocaleDateString('en-US', options);
  myDate.textContent = currentDate;
}

function getTimeOfDay() {
  const timeOfDay = ['Good morning', 'Good afternoon', 'Good evening', 'Good night'];
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
window.addEventListener('load', getLocalStorage)
