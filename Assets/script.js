// creating routes for all buttons and time blocks.
const saveButtons = document.querySelectorAll(".btn");
const timeBlocks = document.querySelectorAll("li");

// creating variables for the different time related features.
let today = moment();
let currentHour = today.hour();

// button to display at top of the screen to reset your days events. 
// Added a confirmation alert in an if statement so you dont accidentilly reset your events.
$("#resetDay").on("click", (e) => {
    if (confirm("Are you sure?")) {
        localStorage.clear();
        location.reload();
        console.log("Welcome to a wonderful new day 🌞");
    } else {
        console.log("good luck on the rest of your day!");
    }
})

// here I use forEach to cylce through all save buttons and add an event listener to them that saves the event and renders the event.
saveButtons.forEach(function (element) {
    element.addEventListener("click", (e) => {
        e.preventDefault();
        saveMeeting(e);
        renderMeeting();
    })
})


// Here is where I dynamically change the timeblock's class based on the current time.
// for each of our list elements (each hour's block), I want to check if the block's set time is less than, equal to, or greater than the current hour variable.
// based on where it lands within the if statement, the class will be changed to past, present, or future.
// index + 9 creates a way to compare our list element to the current hour, since current hour is between 0-24, and index + 9 will let our first element = 9(am).
// the last if statement is checking when hour reaches 0 (new day), the classes will all reset to future. (likely not necessary, but it was hard to test these time sensitive functions.)
timeBlocks.forEach(function(hourLi, index) {
    if (index+9 < currentHour) {
        hourLi.setAttribute("class", "past");
    } else if (index+9 == currentHour) {
        hourLi.setAttribute("class", "present");
    } else {
        hourLi.setAttribute("class", "future");
    }

    if (currentHour == 0) {
        hourLi.setAttribute("class", "future");
    }
})

// here is where the meetings are saved to local storage for later. 
// data const is used to create an object with jason.parse to pull from. when creating data and there is no local storage, create an empty object.
// text area const is set equal the the event target's (button) previous sibling, which in this case will be the coorisponding text area used to display meetings.
// line 54 I am tying the key value pairs together by setting the key (id of the textArea element), to the value submitted to the textarea.
// lastly the added meetings will be stored in the daily meetings local storage object using stringify
let saveMeeting = function(e) {
    const data = JSON.parse(localStorage.getItem("dailyMeetings")) || {};
    const textArea = e.target.previousElementSibling;
    
    data[textArea.id] = textArea.value;

    localStorage.setItem('dailyMeetings', JSON.stringify(data));
}

// this is how meetings will remain rendered on screen.
// currentEvent is created similarly to data from above.
// we then will use object.keys to grab the keys of all data pairs in local storage,
// for each key, we seach for the ID that corrisponds with the key (9am, 10am, ect..) and sets the value (innertext) = to our current event value of that key.
let renderMeeting = function() {
    let currentEvent = JSON.parse(localStorage.getItem("dailyMeetings")) || {};

    Object.keys(currentEvent).forEach(function(key) {
        document.getElementById(key).value = currentEvent[key]
    })
}

// calling this function makes sure that our meetings will always display if availible.
renderMeeting();


// here we are creating format veriations of our moment function to display on the site.
$("#currentDay").text(today.format("[Today's date is] MMM Do, YYYY"));
$("#currentTime").text(today.format("[It is currently] LT"));

