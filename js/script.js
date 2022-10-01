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
    {label: "week 4", url: "#"}
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