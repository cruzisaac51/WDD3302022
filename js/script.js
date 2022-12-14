const d = new Date();
const year = d.getFullYear();
const fulldate = `${year}`;
document.querySelector("#dateyear").textContent = fulldate;
const options = {weekday: "long", year: "numeric", month: "long", day: "numeric" };
const fdate = d.toLocaleDateString("en-uk", options);


// create ol elements


var weeklist = [
    {label: "Week 1", url: "week1/notes.html"},
    {label: "Week 2", url: "week2/index.html"},
    {label: "Week 3", url: "week3/index.html"},
    {label: "week 4", url: "week4/index.html"},
    {label: "week 5", url: "week5/index.html"},
    {label: "week 6", url: "week6/index.html"},
    {label: "week 7", url: "week7/index.html"},
    {label: "week 8", url: "week8/index.html"},
    {label: "week 9", url: "week9/index.html"},
    {label: "week 10", url: "week10/index.html"},
    {label: "week 11", url: "week11/client/index.html"},
    {label: "Final Project", url: "week13/index.html"}
]; 
listWeeklyItems (weeklist, "weekList");

function listWeeklyItems (weekItems, listElementName) {
    let ol = window.weekList;
    if(ol) {
        weekItems.forEach(element => {
            //create the anchor and set attributes
            let anchor = document.createElement('a'); 
            anchor.innerHTML = element.label; 
            anchor.href = element.url; 
            anchor,target="_blank";

            //create list item and attach anchor 
            let li = document.createElement("li");
            li.appendChild(anchor);
            document.querySelector("#weekList").appendChild(li);
        });
    }
}