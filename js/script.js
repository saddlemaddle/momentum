const time = document.querySelector('.time');
const data = document.querySelector('.date');

const showTime = (showDate) => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}
const showDate = () => {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-Ru', options);
    data.textContent = currentDate;
}
showTime(showDate())

