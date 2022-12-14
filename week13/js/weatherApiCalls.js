export var lat, lon;
let note;

export function location() {
    note = document.getElementById('output2');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        note.innerHTML = "Geolocation is not supported.";
    }
}

function showPosition(position) {
    lat = Number(position.coords.latitude).toFixed(3);
    lon = Number(position.coords.longitude).toFixed(3);
    note.innerHTML = `<p>Your cordinates ${lat}  ${lon} </p>`;

}

export function dataUpdate() {
    let dateTime = new Date();
    document.getElementById('dateTime').innerHTML =
        "Last Update: " + dateTime.toLocaleTimeString();
}

// validate zip code
export function inputChecker() {
    const regex = (/\d{5}/g);
    document.getElementById('zipCode');
    let zip = document.getElementById('zipCode').value;
    if (zip != 'undefined' && regex.test(zip)) {
        console.log('passed');
        // document.getElementById('zipCode');
        document.getElementById('zipCodeCheck').innerHTML =
            `<p style="display:none";><i> . </i></p>`;
    } else {
        console.log('failed');
        document.getElementById('zipCode').autofocus;
        document.getElementById('zipCodeCheck').innerHTML =
            `<p style="color:red";><i> Invalid Zip Code</i></p>`;
    }
}
export function windDirection(degrees) {
    const windArray = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const windDir = windArray[Math.ceil(degrees / 22.5) % 16];
    return windDir;
}

// button dark/ligth mode

const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const icon = document.querySelector('.btn__icon');

//to save the dark mode use the object "local storage".

//function that stores the value true if the dark mode is activated or false if it's not.
function store(value){
  localStorage.setItem('darkmode', value);
}

//function that indicates if the "darkmode" property exists. It loads the page as we had left it.
function load(){
  const darkmode = localStorage.getItem('darkmode');

  //if the dark mode was never activated
  if(!darkmode){
    store(false);
    icon.classList.add('fa-sun');
  } else if( darkmode == 'true'){ //if the dark mode is activated
    body.classList.add('darkmode');
    icon.classList.add('fa-moon');
  } else if(darkmode == 'false'){ //if the dark mode exists but is disabled
    icon.classList.add('fa-sun');
  }
}


load();

btn.addEventListener('click', () => {

  body.classList.toggle('darkmode');
  icon.classList.add('animated');

  //save true or false
  store(body.classList.contains('darkmode'));

  if(body.classList.contains('darkmode')){
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }else{
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  setTimeout( () => {
    icon.classList.remove('animated');
  }, 500)
})