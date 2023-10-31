// assuming these constants are correctly initialized before this script

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const timeEl = document.getElementById('time');
const timeEl2 = document.getElementById('block-time');
const dateEl = document.getElementById('date');
const windspeedEl = document.getElementById('wind-speed');
const visibilityEl = document.getElementById('visibility');
const humidityEl = document.getElementById('humidity');
const tempEl = document.getElementById('temp');
const tempEl2 = document.getElementById('block-temp');
const descriptionEl = document.getElementById('description');
const descriptionEl2 = document.getElementById('block-description');
const dayEl = document.getElementById('day');
const nightEl = document.getElementById('night');
const precipiationEl = document.getElementById('precipiation');

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
    timeEl.textContent = `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
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



var hour = new Date().getHours();
//jquery down here//
function updateBackground() {
     // gets the current hour
    
    // Remove all previously set classes
    $('body').removeClass('star-container sunrise morning noon afternoon sunset evening');

    // Add the appropriate class based on the current hour
    if (hour >= 0 && hour < 5) {
        $('body').addClass('star-container');

    } else if (hour >= 5 && hour < 6) {
        $('body').addClass('sunrise');
    } else if (hour >= 6 && hour < 12) {
        $('body').addClass('morning');
    } else if (hour >= 12 && hour < 13) {
        $('body').addClass('noon');
    } else if (hour >= 12 && hour < 19) {
        $('body').addClass('afternoon');
    } else if (hour >= 19 && hour < 20) {
        $('body').addClass('sunset');
    } else {
        $('body').addClass('evening');
    }

}

updateBackground();


setInterval(updateBackground, 600000); 

function updateLinkBlockBackground() {
    const hour = new Date().getHours();
    let bgColor;


    if (hour >= 0 && hour < 5) {
        bgColor = 'linear-gradient(35deg, rgba(50,41,83,1) 0%, rgba(113,142,223,1) 100%);'

    } else if (hour >= 5 && hour < 6) {
        bgColor = 'linear-gradient(35deg, rgba(53,55,135,1) 0%, rgba(223,132,113,1) 100%)'
    } else if (hour >= 6 && hour < 12) {
        bgColor = 'linear-gradient(35deg, rgba(70,177,176,1) 0%, rgba(224,206,140,1) 100%)'
    } else if (hour >= 12 && hour < 13) {
        bgColor = 'linear-gradient(35deg, rgba(255,180,48,1) 0%, rgba(255,244,106,1) 100%)'
    } else if (hour >= 12 && hour < 19) {
        bgColor = 'linear-gradient(35deg, rgba(27,195,255,1) 0%, rgba(255,215,106,1) 100%)'
    } else if (hour >= 19 && hour < 20) {
        bgColor = 'linear-gradient(35deg, rgba(255,111,111,1) 0%, rgba(255,215,106,1) 100%)'
    } else {
        bgColor = 'linear-gradient(35deg, rgba(133,63,228,1) 0%, rgba(106,187,255,1) 100%)'
    }
    

    $('.link-block1').css('background', bgColor);
}

// Call the function to immediately set the background
updateLinkBlockBackground();

// Optionally, you can set an interval to keep updating the background color at regular intervals, if needed
setInterval(updateLinkBlockBackground, 60000);  // Update every 60 seconds (60000 milliseconds)

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


//p5 down here//

let stars = []; // Array to hold a collection of stars

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');  // This makes the position fixed in the viewport
    canvas.style('top', '0');           // Ensure it's at the very top-left of the page
    canvas.style('left', '0');
    canvas.style('z-index', '-1'); 

    // Here, we're selecting the first element with the class 'star-container-class'
    let containers = selectAll('.star-container');
    if (containers.length > 0) {
        canvas.parent(containers[0].elt); // attaching the canvas to the first container
    }

    // Initialize stars randomly on the canvas
    for (let i = 0; i < 100; i++) { // You can change 100 to however many stars you want
        stars.push(new Star(random(width), random(height)));
    }
}


function draw() {
    var hour = new Date().getHours();
    if (hour >= 19 || hour < 7) {

        for (let star of stars) {
            star.blink();
            star.display();
        }
    } else {

        clear();
    }
}

   


// Star class to manage each star's position and display
class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(0.25, 3); // Random initial size
        this.t = random(TAU); // For noise-based blinking
    }

    blink() {
        // Noise-based blinking effect
        this.t += 0.1; // Controls speed of blinking
        this.size = (noise(this.t) * 3) + 0.25; // Change star size over time
    }

    display() {
        noStroke();
        ellipse(this.x, this.y, this.size); // Draw an ellipse (circle) at the star's position
    }
}
function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
}