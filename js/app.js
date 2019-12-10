/* ======================================================================
UI Elements
====================================================================== */
const body = document.querySelector('body');
const notificationsIcon = document.querySelector('.header__widgets--icon-container');
const newNotificationsMarker = document.querySelector('.header__widgets--notification');
const dropdownContent = document.querySelector('.header__widgets--dropdown-content');
const alertSection = document.querySelector('.alert');
const alertBox = document.querySelector('.alert-box');
const userSearch = document.querySelector('.user__search');
const userMessage = document.querySelector('.user__message');
const userSendButton = document.querySelector('.user__button--send');

/* ======================================================================
Event Listeners
====================================================================== */
notificationsIcon.addEventListener('click', notificationsDropdownClick);
alertBox.addEventListener('click', closeAlertBox);
userSendButton.addEventListener('click', sendUserMessage);
body.addEventListener('click', notificationsDropdownHideOnClickOutside);


/* ======================================================================
Global Controllers
====================================================================== */
dropdownContent.style.display = 'none';



/* ======================================================================
Logic
====================================================================== */
function notificationsDropdownHideOnClickOutside(e) {
  if (dropdownContent.style.display === 'block' && e.target.parentElement.classList.value !== 'header__widgets--dropdown-content' && e.target.parentElement.classList.value !== 'header__widgets--icon-container') {
    dropdownContent.style.display = 'none';
  }
}

function notificationsDropdownClick() {
  newNotificationsMarker.style.visibility = 'hidden';
  if (dropdownContent.style.display === 'none') {
    dropdownContent.style.display = 'block';
  } else if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none';
  }
}

function closeAlertBox(e) {
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') {
    alertBox.style.display = 'none';
    alertSection.style.padding = '0';
  }
}

function sendUserMessage(e) {
  e.preventDefault();
  if (userSearch.value === "" && userMessage.value === "") {
    alert(`Please enter a user name and a message.`);
  } else if (userSearch.value === "") {
    alert(`Please enter a user name.`);
  } else if (userMessage.value === "") {
    alert(`Please enter a message for ${userSearch.value}.`);
  } else {
    alert(`Your message has been sent to ${userSearch.value}.`);
  }
}

/* ======================================================================
Testing
====================================================================== */
// console.log(alertBox);




/* ======================================================================
DATA
====================================================================== */
// Traffic chart
const trafficCanvas = document.querySelector('.traffic__chart');

let trafficData = {
  labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
    "4-10", "11-17", "18-24", "25-31"
  ],
  datasets: [{
    data: [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250,
      1750
    ],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    borderColor: 'rgba(116, 119, 191, 1)',
    pointBackgroundColor: 'rgba(249, 249, 249, 1)',
    pointBorderColor: 'rgba(116, 119, 191, 1)',
    pointBorderWidth: 2,
    pointRadius: 6,
    lineTension: 0
  }]
};

let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
    duration: 0
  },
  legend: {
    display: false
  }
};

let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficData,
  options: trafficOptions
});



// Daily Traffic Chart
let dailyTrafficCanvas = document.querySelector('.charts__chart--daily');

const dailyTrafficData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    label: '# of Hits',
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: '#7477BF',
    borderWidth: 1,
    barThickness: 4,
  }]
};

const dailyTrafficOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  }
}

let dailyTrafficChart = new Chart(dailyTrafficCanvas, {
  type: 'bar',
  data: dailyTrafficData,
  options: dailyTrafficOptions
});



// Mobile Users Chart
let mobileCanvas = document.querySelector('.charts__chart--mobile');

const mobileData = {
  labels: ["Desktop", "Tablet", "Phones"],
  datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: [
      '#7477BF',
      '#78CF82',
      '#51B6C8'
    ],
    rotation: 90,
  }]
};

const mobileOptions = {
  legend: {
    position: 'right',
    labels: {
      boxWidth: 20,
      fontStyle: 'bold'
    }
  }
};

let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});