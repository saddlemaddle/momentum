const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name');


const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
    showGreeting();
    setTimeout(showTime, 1000);
}

const showDate = () => {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('en-EN', options);
    data.textContent = currentDate;
}

const getTimeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    console.log(hours)
    if (hours >= 6 && hours < 12) {
        return 'morning';
      } else if (hours >= 12 && hours < 18) {
        return 'afternoon';
      } else if (hours >= 18 && hours < 24) {
        return 'evening';
      } else if (hours >= 0 && hours < 6) {
        return 'night';
      } else {
        return 'Привет, ';
      }
}

const showGreeting = () => {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}, `;
    greeting.textContent = greetingText;
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
  }
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)

const getRandomNum = () => {
  let randNum = String(Math.floor(Math.random() * 20) + 1);
  return randNum;
}

const setBg = () => {
  let timeOfDay = getTimeOfDay();
  let bgNumb = getRandomNum();
  bgNumb = bgNumb.padStart(2, '0');
  return document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNumb}.jpg')`;
}
setBg();
showTime();
