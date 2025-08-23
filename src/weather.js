//getSelector
const data = document.getElementById('data');
const time = document.getElementById('time');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const wind = document.getElementById('wind');
const pictureOfWeather = document.getElementById('picture-of-Weather');
const sity = document.getElementById('sity');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feelsLike');
const cloudy = document.getElementById('cloudy');
const lastOnloadTime = document.getElementById('lastOnloadTime');
const btnForReload = document.getElementById('btnForReload');

//for date and time
function updateClock() {
    const now = new Date();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[now.getDay()];
    const date = now.getDate().toString().padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    data.textContent = `${month} ${date}, ${year} - ${day}`;

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    time.textContent = `${hours}:${minutes}:${seconds}`;   
}

updateClock();
setInterval(updateClock, 1000);


//for asynx
const city = 'Kyiv';
const countryCode = 'UA';
const userId = '740057e41bca091ec8828af7c646a0c9';

const askServer = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${userId}&units=metric`;

async function weatherInfo() {
  try {
    const response = await fetch(askServer);
    const data = await response.json();

    sity.textContent = data.name;
    temperature.textContent = data.main.temp;
    humidity.textContent = `humidity: ${data.main.humidity}`;
    pressure.textContent = `pressure: ${data.main.pressure}`;
    wind.textContent = `wind: ${data.wind.speed} km/h SSE`;

    const feelsLikeCelsius = data.main.feels_like.toFixed(1);
    feelsLike.textContent = `Відчувається як: ${feelsLikeCelsius}°C`;

    cloudy.textContent = `cloudy: ${data.weather[0].description}`;

    const now = new Date();
    lastOnloadTime.textContent = `Останнє оновлення: ${now.toLocaleTimeString()}`;

  } catch (error) {
    console.error('Помилка:', error);
  }
}

weatherInfo();

btnForReload.addEventListener('click', weatherInfo);