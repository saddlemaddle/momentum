const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
let randomNum;

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
  randomNum = Math.floor(Math.random() * 20) + 1;
  return randomNum;
}

const setBg = () => {
  let timeOfDay = getTimeOfDay();
  let bgNumb = randomNum;
  bgNumb = String(bgNumb);
  bgNumb = bgNumb.padStart(2, '0');
  let image = new Image();
  image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNumb}.jpg`;
  image.addEventListener("load", function() {
    document.body.style.backgroundImage = `url('${image.src}')`;
  });
}
const getSlideNext = () => {
  if (randomNum != 20) {
    randomNum += 1;
  } else {
    randomNum = 1;
  }
  setBg()
}
const getSlidePrev = () => {
  if (randomNum != 1) {
    randomNum -= 1;
  } else {
    randomNum = 20;
  }
  setBg()
}
async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Караганда&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
getWeather();
document.querySelector('.city').addEventListener('change', getWeather);

document.querySelector('.slide-next').addEventListener('click', getSlideNext);
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev);
getRandomNum();
setBg();
showTime();
