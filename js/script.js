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
    const currentDate = date.toLocaleDateString('ru-Ru', options);
    data.textContent = currentDate;
}
const getTimeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    console.log(hours)
    if (hours >= 6 && hours < 12) {
        return 'Доброе утро, ';
      } else if (hours >= 12 && hours < 18) {
        return 'Добрый день, ';
      } else if (hours >= 18 && hours < 24) {
        return 'Добрый вечер, ';
      } else if (hours >= 0 && hours < 6) {
        return 'Доброй ночи, ';
      } else {
        return 'Привет, ';
      }
}
const showGreeting = () => {
    const timeOfDay = getTimeOfDay();
    const greetingText = `${timeOfDay}`;
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
showTime();
