//note 1 form validation
// varibles
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cnfpassword = document.getElementById('cnfpassword');

// event listener

form.addEventListener('submit', e => {
  e.preventDefault();

  checkInputs();
});


// function to check input and errors
function checkInputs() {
  // trim to remove the whitespaces
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const cnfpasswordValue = cnfpassword.value.trim();

  if (usernameValue === '') {
    setErrorFor(username, 'Username cannot be blank');
  } else {
    setSuccessFor(username);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Not a valid email');
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === '') {
    setErrorFor(password, 'Password cannot be blank');
  } else {
    setSuccessFor(password);
  }

  if (cnfpasswordValue === '') {
    setErrorFor(cnfpassword, 'Confirm Password cannot be blank');
  } else if (passwordValue !== cnfpasswordValue) {
    setErrorFor(cnfpassword, 'Passwords does not match');
  } else {
    setSuccessFor(cnfpassword);
  }
}

// display error message
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}



// note 2 fetch api from


//call the API

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createList(data.message)
    } catch (e) {
        console.log("There was a problem fetching the breed list.")
    }
}

start()

// create the list of dogs
function createList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function (breed) {
          return `<option>${breed}</option>`
        }).join('')}
      </select>
    `
}

//separate by breed
async function loadByBreed(breed) {
    if (breed != "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await response.json()
    showimages(data.message)
    }
}


// show images
function showimages(images) {
    const backgroundimage = document.getElementById("slideshow");
    backgroundimage.style.backgroundImage = `url('${images[0]}')`;
    backgroundimage.style.height = "400px";
    backgroundimage.style.backgroundSize = "contain";

}


//note 3

const inputs = document.querySelectorAll('.input1');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));


