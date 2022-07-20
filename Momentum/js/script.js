const time = document.querySelector('.time');
const myDate = document.querySelector('.date');
const options = { weekday: 'long', month: 'long', day: 'numeric' };


function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate(date);
  setTimeout(showTime, 1000);
}
showTime();

function showDate(date) {
  const currentDate = date.toLocaleDateString('en-US', options);
  myDate.textContent = currentDate;
}


