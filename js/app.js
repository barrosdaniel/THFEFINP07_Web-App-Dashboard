/* ======================================================================
UI Elements
====================================================================== */
const body = document.querySelector('body');
const notificationsIcon = document.querySelector('.header__widgets--icon-container');
const newNotificationsMarker = document.querySelector('.header__widgets--notification');
const dropdownContent = document.querySelector('.header__widgets--dropdown-content');
const alertSection = document.querySelector('.alert');
const alertBox = document.querySelector('.alert-box');
const trafficButtonsList = document.querySelector('.traffic__menu');
const trafficButtons = document.querySelectorAll('.traffic__button');
const trafficButtonActive = document.querySelectorAll('.traffic__button--active');
const userSearch = document.querySelector('.user__search');
const userMessage = document.querySelector('.user__message');
const userSendButton = document.querySelector('.user__button--send');

/* ======================================================================
Event Listeners
====================================================================== */
body.addEventListener('click', notificationsDropdownHideOnClickOutside);
notificationsIcon.addEventListener('click', notificationsDropdownClick);
trafficButtonsList.addEventListener('click', ChangeTrafficChartPeriod);
alertBox.addEventListener('click', closeAlertBox);
userSendButton.addEventListener('click', sendUserMessage);


/* ======================================================================
Global Controllers
====================================================================== */
dropdownContent.style.display = 'none';



/* ======================================================================
Logic
====================================================================== */
// Header
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

// Traffic Chart Section
function ChangeTrafficChartPeriod(e) {
  if (e.target.classList.value.includes('traffic__button')) {
    // Change chart period
    trafficChartPeriod = e.target.textContent.toLowerCase();
    renderTrafficCanvas();
    // Change active button
    trafficButtons.forEach((button) => {
      button.classList.remove('traffic__button--active');
    });
    e.target.classList.add('traffic__button--active');
  }
}

// User Section
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
const hourlyLabels = ["00-06", "06-12", "12-18", "18-00"];
const hourlyData = [750, 3380, 2750, 4800];
const dailyLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
const dailyData = [450, 350, 400, 425, 525, 1100, 980, 450, 350, 400, 425, 525, 1100, 980, 450, 350, 400, 425, 525, 1100, 980, 450, 350, 400, 425, 525, 1100, 980, 450, 350];
const weeklyLabels = ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
  "4-10", "11-17", "18-24", "25-31"
];
const weeklyData = [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250,
  1750
];
const monthlyLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const monthlyData = [26800, 25750, 25500, 26000, 23780, 21200, 16950, 17250, 17500, 19200, 21750, 24800, 25750];

let trafficChartPeriod = 'weekly';

function getTrafficChartData() {
  const period = trafficChartPeriod;
  const chartData = [];

  if (period === 'hourly') {
    chartData.push(hourlyLabels);
    chartData.push(hourlyData);
  } else if (period === 'daily') {
    chartData.push(dailyLabels);
    chartData.push(dailyData);
  } else if (period === 'weekly') {
    chartData.push(weeklyLabels);
    chartData.push(weeklyData);
  } else if (period === 'monthly') {
    chartData.push(monthlyLabels);
    chartData.push(monthlyData);
  }
  return chartData;
}

function renderTrafficCanvas() {
  const chartData = getTrafficChartData();
  const labels = chartData[0];
  const data = chartData[1];

  let trafficData = {
    labels: labels,
    datasets: [{
      data: data,
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

}

renderTrafficCanvas();

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

// User search

let users = [
  "Kylie Schrantz",
  "Wilber Vandergrift",
  "Maurine Ballerini",
  "Marceline Amen",
  "Freddie Bator",
  "Daphine Canipe",
  "Tracey Mather",
  "Mendy Homeyer",
  "Chelsea Carreira",
  "Rosetta Skeeter",
  "Jennine Bohland",
  "Ping Hershman",
  "Wallace Kroner",
  "Bernarda Gillard",
  "Alene Clendenin",
  "Ardath Millspaugh",
  "Gillian Morillo",
  "Lakisha Livsey",
  "Verlene Dieckman",
  "Sheryl Schulman",
  "Beckie Lasko",
  "Issac Linares",
  "Georgianna Lesh",
  "Marinda Hatten",
  "Delia Fiorita",
  "Shanon Abdo",
  "Antionette Antone",
  "Gerri Funderburg",
  "Leonor Battin",
  "Cesar Killebrew",
  "Sherlyn Buscemi",
  "Eva Kahn",
  "Renaldo Kish",
  "Seth Mcfadin",
  "Tomika Iannuzzi",
  "Lakesha Hook",
  "Ula Maris",
  "Argentina Bonfiglio",
  "Kecia Rollman",
  "Marisol Madkins",
  "Guillermo Lafleur",
  "Ellena Gaw",
  "Sook Shima",
  "Golda Catalano",
  "Sacha Bettis",
  "Edmond Ng",
  "Whitley Edick",
  "Arminda Follmer",
  "Ashlee Orvis",
  "Carmina Ellsworth",
  "Majorie Peay",
  "Marge Moffat",
  "Dann Piccolo",
  "Gaylord Weckerly",
  "Brenda Tumlin",
  "Benedict Malbrough",
  "Laraine Hitch",
  "Carter Mccune",
  "Rosaria Degeorge",
  "Rico Spruell",
  "Akiko Gaither",
  "Glayds Antunez",
  "Catarina Beeks",
  "Alexander Brase",
  "Deeann Hubbert",
  "Colin Huckaby",
  "Raquel Nova",
  "Britt Gies",
  "Jamika Bilodeau",
  "Leighann Partee",
  "Guillermo Ruffin",
  "Barrett Hostetler",
  "Odelia Klenke",
  "Lauren Abrev",
  "Shery Rohe",
  "Clifford Sturdivant",
  "Olen Regnier",
  "Francisco Chappell",
  "Odette Demartini",
  "Oleta Zamarripa",
  "Tanika Drane",
  "Janean Neathery",
  "Juanita Dabbs",
  "Emmaline Cerna",
  "Jonnie Laurin",
  "Santa Thor",
  "Manda Hendley",
  "Elva Dykes",
  "Bea Lyttle",
  "Giuseppe Letarte",
  "Whitney Reder",
  "Eleanora Liner",
  "Clemmie Folsom",
  "Gussie Schempp",
  "Bethann Moylan",
  "Tomeka Godbold",
  "Charlette Monreal",
  "Monty Foor",
  "Marquis Fitzsimons",
  "Marylynn Reith",
  "Launa Winston",
  "Melodie Urman",
  "Beckie Beckles",
  "Mari Alejandre",
  "Fleta Frankum",
  "Bryon Oldenburg",
  "Dominga Zamorano",
  "Laurice Jury",
  "Krystle Halas",
  "Angelita Denk",
  "Samella Leaver",
  "Renata Lemke",
  "Summer Herman",
  "Roxanne Scarboro",
  "Jake Shimp",
  "Caryl Speights",
  "Belen Fairbairn",
  "Hester Menz",
  "Bethel Begum",
  "Alejandrina Pender",
  "Frieda Kinyon",
  "Alysha Thornsberry",
  "Kena Garvin",
  "Elin Levins",
  "Elizbeth Osterberg",
  "Jerlene Servais",
  "Edyth Suire",
  "Nia Judkins",
  "Kisha Oler",
  "Mayme Fretz",
  "Magaly Macintosh",
  "Kristine Osterhout",
  "Jolyn Camacho",
  "Columbus Pfeffer",
  "Delma Alpers",
  "Emerson Stuck",
  "Reena Lepage",
  "Lizabeth Yokley",
  "Katelynn Grissom",
  "Reggie Beall",
  "Kassie Rickett",
  "Retha Wallington",
  "Wendi Neumeister",
  "Cassy Micheals",
  "Neva Tubb",
  "Lou Suarez",
  "Randee Delosreyes",
  "Eun Bonham",
  "Clorinda Pietrzak",
  "Daryl Dull",
  "Maryellen Mineau",
  "Mona Folkers",
  "Lesia Cattaneo",
  "Cortez Nathaniel",
  "Janeen Burnside",
  "Emil Cumbee",
  "Tania Alexandre",
  "Rhonda Koontz",
  "Darline Marble",
  "Lynell Winford",
  "Chase Dela",
  "Hildred Eyre",
  "Merilyn Zeringue",
  "Adele Cage",
  "Katlyn Horney",
  "Shea Purinton",
  "Delsie Carreon",
  "Theda Berlin",
  "Tish Duhe",
  "Maddie Schreier",
  "Sun Purdie",
  "Vivienne Kari",
  "Donnie Tweedy",
  "Sherika Griswold",
  "Fanny Higa",
  "Rosalia Shore",
  "Beth Willhite",
  "Edison Peaden",
  "Lavern Hick",
  "Carolyne Ballow",
  "Kyla Bryan",
  "Otha Helmer",
  "Marita Markowitz",
  "Eddie Jarrard",
  "Sal Hosea",
  "Taren Nuttall",
  "Racquel Bucci",
  "Tillie Deibel",
  "Roselyn Camilleri",
  "Jamal Toenjes",
  "Karoline Shirley",
  "Sheryll Wardle",
  "Janean Lindblad",
  "Yaeko Baillie",
  "Norene Burks",
  "Matt Harriger",
  "Hermelinda Bara",
  "Ethelyn Arboleda",
  "Meda Lynch",
  "Lenny Amison",
]