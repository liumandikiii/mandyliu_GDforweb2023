// assuming these constants are correctly initialized before this script

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const timeEl2 = document.getElementById('block-time');
const dateEl = document.getElementById('date');


const tempEl2 = document.getElementById('block-temp');

const descriptionEl2 = document.getElementById('block-description');


const API_KEY = "137fc0de4d4523203ee438d4c731c2b1";
// ... other element references

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();

    // using template literals for better readability
    
    timeEl2.textContent = `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
    dateEl.textContent = `${days[day]}, ${date} ${months[month]}`;
    console.log(hour);
}, 1000); 






getWeatherData()
async function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

       let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        .then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData(data) {
    let { humidity, wind_speed, temp, visibility, weather } = data.current;


    windspeedEl.innerHTML = wind_speed + ' km/h';
    visibilityEl.innerHTML = visibility / 1000 + ' km';
    windspeedEl.innerHTML = wind_speed + ' km/h';
    humidityEl.innerHTML = humidity + '%';
    tempEl.innerHTML = Math.round(temp); tempEl2.innerHTML = Math.round(temp);
    


    descriptionEl.innerHTML = weather[0].description;
    descriptionEl2.innerHTML = weather[0].description


    let day = data.daily[0].feels_like.day;
    let night = data.daily[0].feels_like.night;
    dayEl.innerHTML = Math.round(day);
    nightEl.innerHTML = Math.round(night);

    let isItRaining = data.daily[0];
    if ('rain' in isItRaining) {
        // Rain info is available; display it. You can also add additional text or units (e.g., 'mm' for millimeters)
        precipiationEl.innerHTML = isItRaining.rain + 'mm';
    } else {
        // No rain info available for the current day; display 'None' or any other appropriate message
        precipiationEl.innerHTML = 'none';
    }
}




//jquery down here//



$(document).ready(function () {
    $('#link-block-2').click(function () {
        
        window.location.href = "2.html";
    });
});

$(document).ready(function () {
    $('#link-block-3').click(function () {

        window.location.href = "3.html";
    });
});

$(document).ready(function () {
    $('#link-block-1').click(function () {

        window.location.href = "home.html";
    });
});
