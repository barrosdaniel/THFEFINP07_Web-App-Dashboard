/* ======================================================================
UI Elements
====================================================================== */
const notificationsIcon = document.querySelector('.header__widgets--icon-container');
const newNotificationsMarker = document.querySelector('.header__widgets--notification');
const dropdownContent = document.querySelector('.header__widgets--dropdown-content');
const alertSection = document.querySelector('.alert');
const alertBox = document.querySelector('.alert-box');

/* ======================================================================
Event Listeners
====================================================================== */
notificationsIcon.addEventListener('click', notificationsDropdownClick);
alertBox.addEventListener('click', closeAlertBox);


/* ======================================================================
Global Controllers
====================================================================== */
dropdownContent.style.display = 'none';



/* ======================================================================
Logic
====================================================================== */
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
    pointHitRadius: 6,
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
  },


};


let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficData,
  options: trafficOptions
});