const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
city.value = "Karaganda";
let randomNum;
const objQuote = [
  {
    text: "You see things and say 'Why?', but I dream things and say 'Why not?'",
    author: "George Bernard Shaw"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas A. Edison"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston S. Churchill"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey"
  },
  {
    text: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    author: "Christian D. Larson"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky"
  }
];

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
const getQuotes = () => {
  const randomQuote = objQuote[Math.floor(Math.random() * objQuote.length)];
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');

  quote.textContent = randomQuote.text;
  author.textContent = randomQuote.author;
}
getQuotes()
document.querySelector('.change-quote').addEventListener('click', getQuotes);
async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e4bf85eb6818d0548a3773c410e84a14&units=metric`;
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
