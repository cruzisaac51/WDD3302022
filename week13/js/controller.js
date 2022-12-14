import {dataUpdate,location,inputChecker,windDirection} from './weatherApiCalls.js';

// global variables
let latitude, longitude, zip, cityname;

// APi Calls
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const weatherAPI = `,us&units=imperial&APPID=f2872719ed7cdab5d0af213076f4c716`;

const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const forecastAPI = ',us&units=imperial&cnt=5&appid=f2872719ed7cdab5d0af213076f4c716';

//buttons
const apiWeather = document.getElementById('weather');
const apiAirQuality = document.getElementById('air');
const apiForecast = document.getElementById('forecast');
const UVindex = document.getElementById('uv');

//elements
const outputDiv = document.getElementById('output');
const alertOutput = document.getElementById('Alert');
const forecastOutput = document.getElementById('forecastOutput');
document.getElementById('icon').style.display = 'none';
forecastOutput.style.display = 'none';

let zipInput = document.getElementById('zipCode');
//events
window.addEventListener('change', () => {
    inputChange()
}, false);
UVindex.addEventListener('click', () => {
    sunSky()
}, false);
apiWeather.addEventListener('click', () => {
    weather()
}, false);
apiAirQuality.addEventListener('click', () => {
    airQuality()
}, false);
apiForecast.addEventListener('click', () => {
    forecast()
}, false);
zipInput.addEventListener('input', () => {
    inputChecker()
}, false);


function inputChange() {
    location('output');
    dataUpdate();
    forecastOutput.style.display = 'none';
    zip = parseInt(document.getElementById('zipCode').value);
    zipInput.focus();
    fetch(weatherURL + zip + weatherAPI)
        .then(response => {
            outputDiv.innerHTML = 'Add a valid zip code';
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText)
        })
        .then(response => response.json())
        .then((data) => {
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            cityname = data.name;
            // console.log(data);
            document.getElementById('tempIcon').setAttribute('alt', data.weather[0].description);
            let dayNight = data.weather[0].icon;
            dayNight.slice(-1);
            if (dayNight.slice(-1) == 'n') {
                document.getElementById('icon').style.backgroundColor = "darkgray";
            }
            outputDiv.innerHTML = `<div id='starting'><h2>${cityname}</h2><br>${data.main.temp}°F</div>`
            return fetch(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('icon').style.display = 'block';
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.blob())
        .then((img) => {
            document.getElementById('tempIcon').src = URL.createObjectURL(img);
        })
        .catch(error => console.log('There was an error:', error))
}


function weather() {
    zip = parseInt(document.getElementById('zipCode').value);
    forecastOutput.style.display = 'none';
    fetch(weatherURL + zip + weatherAPI)
        .then(response => {
            outputDiv.innerHTML = 'Add a valid zip code';
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then((data) => {
            let output = `<h2 class="mb-4">Weather Conditions <b>${data.name}</b> </h2>`;
            outputDiv.innerHTML = output +=
                `<ul>
            <li>Weather Description: <b>${ data.weather[0].description} </b></li>
            <li>Currently: <b>${data.main.temp }°F</b></li>
            <li>Apparent temperature: <b> ${data.main.feels_like}°F </b></li>
            <li>Barometric pressure: <b>${ data.main.pressure}</b></li>
            <li>Humidity: <b> ${ data.main.humidity }% </b></li>
            <li>Visibility: <b>${ data.visibility}</b></li>
            <li>Wind speed: <b> ${ data.wind.speed} MPH</b></li>
            <li>Wind Direction:<b> ${windDirection(data.wind.deg)}</b></li>
            </ul>
            `
        })
        .catch(error => console.log('There was an error:', error))
}


function airQuality() {
    zip = parseInt(document.getElementById('zipCode').value);
    forecastOutput.style.display = 'none';
    fetch(weatherURL + zip + weatherAPI)
        .then(response => {
            outputDiv.innerHTML = 'Add a valid zip code';
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then((data) => {
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            cityname = data.name;
            const pollutionAPI = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=f2872719ed7cdab5d0af213076f4c716`;
            return fetch(pollutionAPI)
                .then(console.log(pollutionAPI))
                .then(response => {
                    if (response.ok) {
                        return response;
                    }
                    throw Error(response.statusText);
                })
        })
        .then(response => response.json())
        .then((data) => {
            let output = `<h2 class="mb-4">Air Quality for ${cityname}</h2>`;
            outputDiv.innerHTML = output +=
                `<h3>Air Quality conditions</h3>
            <div class='explain' >
            1 = Good <br> 2 = Fair <br> 3 = Moderate <br> 4 = Poor <br> 5 = Very Poor <br>
            </div>
            <ul>
            <li>Air Quality: <b> ${data.list[0].main.aqi }</b></li>
            <li>Carbon Monoxide: <b>${ data.list[0].components.co }</b></li>
            <li>Nitrogen monoxide: <b>${ data.list[0].components.no }</b></li>
            <li>Nitrogen dioxide: <b>${ data.list[0].components.no2}</b></li>
            <li>Ozone: <b>${data.list[0].components.o3}</b></li>
            <li>Sulphur dioxide: <b>${ data.list[0].components.so2 }</b></li>
            <li>Ammonia: <b>${data.list[0].components.nh3}</b></li>
            </ul>`
        })
        .catch(error => console.log('There was an error:', error))
}



function forecast() {
    zip = parseInt(document.getElementById('zipCode').value);
    forecastOutput.innerHTML = '';
    forecastOutput.style.display = 'flex';
    fetch(forecastURL + zip + forecastAPI)
        .then(response => {
            outputDiv.innerHTML = 'Add a valid zip code';
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then((data) => {
            let output = `<h2 class="mb-4">Forecast for  ${data.city.name}</h2>`;
            outputDiv.innerHTML = output += `
            <ul>
            <li>Sunrise: ${new Date(data.city.sunrise*1000).toLocaleString()}</li>  
            <li>Sunset: ${new Date(data.city.sunset*1000).toLocaleString()}</li>
            </ul>
        `;
            for (let i = 0; i < 5; i++) {
                forecastOutput.innerHTML += `
            <div class='forecast'>
            <ul>
            <li><b>${new Date(data.list[i].dt*1000).toLocaleString()}</b></li><br>
            <li>Projected temp: <b>${data.list[i].main.temp}°F</b></li>
            <li>Min Temp: <b>${data.list[i].main.temp_min}°F</b></li>
            <li>Max Temp: <b>${data.list[i].main.temp_max}°F</b></li>
            <li>Feels Like: <b>${data.list[i].main.feels_like}°F</b></li>
            <li>Description: <b>${data.list[i].weather[0].description} </b></li>
            <li>Wind: <b>${data.list[i].wind.speed}mph ${windDirection(data.list[0].wind.deg)}</b></li>
            </ul>
            </div>
            `;
            }
        })
        .catch(error => console.log('There was an error:', error))
}


function sunSky() {
    zip = parseInt(document.getElementById('zipCode').value);
    forecastOutput.style.display = 'none';
    fetch(weatherURL + zip + weatherAPI)
        .then(response => {
            outputDiv.innerHTML = 'Add a valid zip code';
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText)
        })
        .then(response => response.json())
        .then((data) => {
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            cityname = data.name;
            console.log(cityname);
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely&appid=f2872719ed7cdab5d0af213076f4c716`)
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then((data) => {
            //console.log(data);
            if (data.alerts == undefined) {
                alertOutput.innerHTML = `<h2>There are no current alerts for ${cityname}.</h2>`
            } else {
                alertOutput.innerHTML = `<h2>${data.alerts[0].description}</h2>`;
            }
            let output = `<h2 class="mb-4">Sun Conditions for ${cityname} </h2>`;
            outputDiv.innerHTML = output +=
                `                
                <div class='explain' style="color:red;">
                1 - 2 = Low <br> 3-5 = Moderate <br> 6-7 = High <br> 8-10 = Very High <br> 11+ = Extreme <br>
                </div>
                <ul>
            <li>Currently: <b>${data.current.temp}°F</b></li>
            <li style="font-size:larger">UV Index: <b>${data.current.uvi} </b></li>
            <li>Cloud porcentage: <b>${data.current.clouds}% </b></li>
            <li>Description: <b>${data.current.weather[0].description} </b></li>
            </ul>
            `;
        })
        .catch(error => console.log('There was an error:', error));
}
