function loadStory(){
    var storyName = document.getElementById("name_input").value
    var storyHTML = localStorage.getItem(storyName)
    document.getElementById("story_editor").value = storyHTML
}


function saveStory(){
    var storyName = document.getElementById("name_input").value
    var storyHTML = document.getElementById("story_editor").value
    localStorage.setItem(storyName, storyHTML)
}

function displayStory(){
    var storyName = document.getElementById("name_input").value
    var storyHTML = document.getElementById("story_editor").value
    document.getElementById("story_display").innerHTML = `${storyName} <br> ${storyHTML}`
}

const d = new Date();
const year = d.getFullYear();
const fulldate = `${year}`;
document.querySelector("#dateyear").textContent = fulldate;
const options = {weekday: "long", year: "numeric", month: "long", day: "numeric" };
const fdate = d.toLocaleDateString("en-uk", options);