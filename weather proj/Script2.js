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


//p5 down here/
var particalNum = 200;
var noiseScale = 0.02;
var particals = [];
var xSet = new Array(640).fill(0);
var wind;
var fps = 60;


function setup() {
    var particalNum = 2000; 
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');  // This makes the position fixed in the viewport
    canvas.style('top', '0');           // Ensure it's at the very top-left of the page
    canvas.style('left', '0');
    canvas.style('z-index', '-1'); 
    clear();
    particals = [];
    for (var i = 0; i < particalNum; i++) {
        particals[i] = new Partical(random(width), random(-800, -10), random(0.5, 1));
    }
    xSet = new Array(width);  // Make sure the array spans the entire width
    for (var i = 0; i < width; i++) {
        xSet[i] = 0;  // or whatever initial value you want
    }
}

function windowResized() {
    // Resize the canvas whenever the window is resized
    resizeCanvas(windowWidth, windowHeight);
    xSet = new Array(width);  // Adjust array size based on new width
    for (var i = 0; i < width; i++) {
        xSet[i] = 0;  // or whatever initial value you want
    }
}


function draw() {
    background(234);
    clear();

    push();
    strokeWeight(4);
    stroke(2000);
    line(0, height, width, height);
    pop();

    if (mouseIsPressed) {
        wind = new Force(pmouseX, pmouseY, mouseX, mouseY);
    } else {
        wind = null;
    }

    for (var i = 0; i < particalNum; i++) {
        particals[i].applyForce(wind);
        particals[i].move();
        particals[i].display();
    }

    for (var i = 0; i < xSet.length; i++) {
        push();
        stroke(255);
        line(i, height, i, height - xSet[i]);  // make sure it's the correct height
        pop();
    }

    push();
    noStroke();
    fill(40, 116, 178, 180);
    if (mouseIsPressed) {
        ellipse(mouseX, mouseY, 12, 12);
    }
    pop();
}

function Partical(tempX, tempY, tempSpeed) {
    this.x = tempX;
    this.y = tempY;
    this.originSpeed = [random(-0.01, 0.01), tempSpeed];
    this.speed = [this.originSpeed[0], tempSpeed];
    this.snowSize = random(2, 5);


    this.move = function () {
        this.x += this.speed[0];
        this.y += this.speed[1];

        // Get the current ground level from the xSet array
        var groundLevel = height - xSet[int(this.x)];

        // Check if the snowflake is at or below the current ground level
        if (this.y >= groundLevel) {
            // The snowflake has hit the pile. We adjust its position and stop its movement.
            this.y = groundLevel; // Set y to the current ground level
            this.speed[0] = 0; // Stop horizontal movement
            this.speed[1] = 0; // Stop vertical movement

            // Instead of resetting, we adjust the ground level (pile height) at this point on the x axis.
            for (var i = 0; i <= 20; i++) {
                var snowHeight = this.snowSize * 0.2 * sin(PI / 100 * (100 - i * 5));
                var index = int(constrain(this.x - 10 + i, 0, width - 1));
                xSet[index] = height - (height - xSet[index] + snowHeight); // Adjust the pile height
            }
        }
    }

    this.display = function () {
        push();
        stroke(255);
        fill(255);
        ellipse(this.x, this.y, this.snowSize, this.snowSize);
        noStroke();
        fill(255, 40);
        ellipse(this.x, this.y, this.snowSize * 2, this.snowSize * 2);
        pop();
    }

    this.reset = function () {
        this.x = random(width);
        this.y = random(-800, 0);
        this.speed = [this.originSpeed[0], this.originSpeed[1]];
        this.snowSize = random(2, 5);
    }

    this.applyForce = function (force) {
        // console.log(force);
        if (force == null || force.mag <= 0.01) {
            this.speed[0] += (this.originSpeed[0] - this.speed[0]) * 0.01;
            this.speed[1] += (this.originSpeed[1] - this.speed[1]) * 0.01;
        } else {
            if (this.x >= min(force.fx1, force.fx2) &&
                this.x <= max(force.fx1, force.fx2) &&
                this.y >= min(force.fy1, force.fy2) &&
                this.y <= max(force.fy1, force.fy2)) {
                this.speed[0] += force.dir[0] * force.mag * 0.01;
                this.speed[1] += force.dir[1] * force.mag * 0.01;
            } else {
                var mid_x = (force.fx1 + force.fx2) / 2;
                var mid_y = (force.fy1 + force.fy2) / 2;
                var distance = dist(this.x, this.y, mid_x, mid_y);
                if (distance > 200) {
                    this.speed[0] += (this.originSpeed[0] - this.speed[0]) * 0.01;
                    this.speed[1] += (this.originSpeed[1] - this.speed[1]) * 0.01;
                } else {
                    this.speed[0] += force.dir[0] * force.mag * 0.1 / (1 + distance);
                    this.speed[1] += force.dir[1] * force.mag * 0.1 / (1 + distance);
                }
            }
        }
    }
}


function Force(fx1, fy1, fx2, fy2) {
    this.fx1 = fx1;
    this.fx2 = fx2;
    this.fy1 = fy1;
    this.fy2 = fy2;
    this.x = -fx1 + fx2;
    this.y = -fy1 + fy2;
    this.mag = sqrt(this.x * this.x + this.y * this.y);
    if (this.mag == 0) {
        this.dir = [0, 0];
    } else {
        this.dir = [this.x / this.mag, this.y / this.mag];
    }


}

