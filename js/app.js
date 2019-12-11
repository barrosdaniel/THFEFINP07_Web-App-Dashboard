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
const userAutocompleteContainer = document.querySelector('.user__autocomplete-container');
const userMessage = document.querySelector('.user__message');
const userSendButton = document.querySelector('.user__button--send');



/* ======================================================================
Event Listeners
====================================================================== */
body.addEventListener('click', notificationsDropdownHideOnClickOutside);
notificationsIcon.addEventListener('click', notificationsDropdownClick);
alertBox.addEventListener('click', closeAlertBox);
trafficButtonsList.addEventListener('click', ChangeTrafficChartPeriod);
userSearch.addEventListener('input', searchUsers);
userAutocompleteContainer.addEventListener('click', fillUserInput);
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
function searchUsers(e) {
  const searchText = e.target.value.toLowerCase();
  let matches = [];
  // Get matches to current text input
  users.forEach(user => {
    if (user.toLowerCase().includes(searchText)) {
      matches.push(user);
    }
  });
  if (searchText.length === 0) {
    matches = [];
  }
  // Render autocomplete container
  renderAutocompleteContainer(matches);
}

function renderAutocompleteContainer(matches) {
  if (matches.length > 0) {
    userAutocompleteContainer.style.display = 'block';
    let content = '';

    matches.forEach(match => {
      content += `<div class="user__autocomplete-item">${match}</div>`;
    });
    userAutocompleteContainer.innerHTML = '';
    userAutocompleteContainer.innerHTML = content;
  } else if (matches.length === 0) {
    userAutocompleteContainer.innerHTML = '';
    userAutocompleteContainer.style.display = 'none';
  }
}

function fillUserInput(e) {
  console.log(e.target);
  let chosenName = '';

  if (e.target.className === 'user__autocomplete-item') {
    chosenName = e.target.textContent;
  }

  console.log(chosenName);

  userSearch.value = chosenName;
  userAutocompleteContainer.innerHTML = '';
  userAutocompleteContainer.style.display = 'none';

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
const users = [
  "Janey Beecham",
  "Carman Hirt",
  "Garfield Fuston",
  "Lynell Calixte",
  "Maribel Smathers",
  "Tracy Araujo",
  "Kesha Kinoshita",
  "Eliza Scoville",
  "Allegra Ringgold",
  "Shaun Stelzer",
  "Lizeth Wagner",
  "Chara Pires",
  "Harrison Thistle",
  "Deandra Wan",
  "Glory Mattice",
  "Elroy Greenhill",
  "Sophia Ruzicka",
  "Winona Champney",
  "Cherie Wooster",
  "Berniece Dabney",
  "Cecily Fail",
  "Cassondra Quiroz",
  "Tyrone Mull",
  "Ernestina Mungo",
  "Taylor Magwood",
  "Verda Felberbaum",
  "Jordon Barmore",
  "Dewitt Ton",
  "Verdell Horsman",
  "Brett Killoran",
  "Cherry Brunswick",
  "Bryanna Nalley",
  "Irvin Outen",
  "Lesli Vanpelt",
  "Shante Wadkins",
  "Maryam Gay",
  "Lezlie Vonruden",
  "Merlyn Braaten",
  "Shelly Bosque",
  "Cary Ketner",
  "Tabitha Alameda",
  "Janis Chauncey",
  "Jenette Madonna",
  "Art Pitzer",
  "Klara Depasquale",
  "Kandy Carmona",
  "Marcellus Cordon",
  "Ernestine Berthelot",
  "Annie Sweetman",
  "Brigid Washburn",
  "Noelia Clute",
  "Stephania Brunn",
  "Russ Vanderveer",
  "Dannielle Brodnax",
  "Cassondra Mcduffie",
  "Lynell Maroon",
  "Vicky Penwell",
  "Virginia Markland",
  "Dot Covarrubias",
  "Leonard Steve",
  "Lorine Thronson",
  "Beula Linger",
  "Ashlyn Primer",
  "Rene Kopp",
  "Janet Beckert",
  "Pat Nardone",
  "Maricela Manzano",
  "Latisha Marable",
  "Tamara Cossette",
  "Tracey Carrithers",
  "Lorrine Eber",
  "Nina Licht",
  "Takako Sorg",
  "Samantha Maglione",
  "Samara Rickerson",
  "Elizebeth Swank",
  "Verona Cron",
  "Lavette Ritch",
  "Diann Gelb",
  "Robbie Fabiani",
  "Elfrieda Minelli",
  "Clara Tuller",
  "Amina Raske",
  "Hayley Piscopo",
  "Jena Elkins",
  "Joe Baney",
  "Neda Gains",
  "Micheline Pulsifer",
  "Paulina Holzworth",
  "Merry Ketcher",
  "Leighann Fauver",
  "Agustina Bethea",
  "Margaret Amell",
  "Maida Herrin",
  "Leo Coughlin",
  "Mohammed Lauro",
  "Conrad Corcoran",
  "Ronny Penner",
  "Jake Yelle",
  "Teodoro Bickham",
  "Trina Downer",
  "Larissa Pair",
  "Huey Depriest",
  "Thomas Ewald",
  "James Lindholm",
  "Chrissy Laverdiere",
  "Mercedez Poisson",
  "Steve Rodden",
  "Refugio Richey",
  "Grant Kubat",
  "Jeannine Vowels",
  "Lanny Darland",
  "Mac Armijo",
  "Ginger Cunniff",
  "Thora Heyman",
  "Tula Lingenfelter",
  "Minda Miah",
  "Minnie Comerford",
  "Evie Freire",
  "Gearldine Radosevich",
  "Rachel Hartle",
  "Blanche Ogletree",
  "Billie Warden",
  "Ingrid Lard",
  "Janita Prevatte",
  "Bok Lupi",
  "Belle Currin",
  "Vi Doerr",
  "Gertrude Calvillo",
  "Ben Capito",
  "Rutha Bulmer",
  "Leann Lengyel",
  "Inga Smelser",
  "Veta Bowe",
  "Marilou Vantassell",
  "Sean Dearman",
  "Deadra Mccalla",
  "Lianne Severns",
  "Athena Janelle",
  "Frieda Sallee",
  "Chassidy Helm",
  "Clay Belanger",
  "Thomasina Ferrera",
  "Marvin Crose",
  "Tobias Gaudin",
  "Alejandro Alva",
  "Issac Seales",
  "Kim Jock",
  "Marhta Bridgers",
  "Aileen Hubbs",
  "Debbi Maul",
  "Sonya Jourdan",
  "Franklyn Swope",
  "Dolly Espiritu",
  "Theresia Berrian",
  "Troy Traverso",
  "Lamar Strawbridge",
  "Lillie Rio",
  "Lanita King",
  "Rosette Fairey",
  "Edda Rymer",
  "Cinda Bundick",
  "Elvin Oelke",
  "Lemuel Shavers",
  "Annalisa Clanton",
  "Kyoko Edmondson",
  "Jimmy Currey",
  "Camie Square",
  "Jeramy Carls",
  "Nola Weems",
  "Mona Straube",
  "Clement Belgarde",
  "Alethia Belmonte",
  "Shyla Woolbright",
  "Ella Rieger",
  "Craig Tamashiro",
  "Denisha Golub",
  "Zofia Lavalle",
  "Derick Farwell",
  "Kiesha Dengler",
  "Corine Deppen",
  "Graig Conder",
  "Celine Devalle",
  "Eve Doyon",
  "Alishia Molder",
  "Neda Mollica",
  "Blondell Jepson",
  "Julienne Galicia",
  "Chana Rakes",
  "Garry Stoecker",
  "Nichelle Cuddy",
  "Hans Roop",
  "Maire Maziarz",
  "Jaunita Kerrigan",
  "Diedre Rosati",
  "Humberto Chancellor",
  "Brittany Abrams",
  "Nicola Yeats",
  "Donita Tunstall",
  "Dean Binney",
  "Li Boer",
  "Latisha Brumm",
  "Tammera Gordillo",
  "Geralyn Mower",
  "Zita Snelling",
  "Enriqueta Wetzel",
  "Anisha Chapel",
  "Dario Huneycutt",
  "Elwood Strader",
  "Helen Milo",
  "Sonia Rhone",
  "Kylie Betters",
  "Stewart Rowan",
  "Leroy Reece",
  "Kimberli Koehn",
  "Frida Bourgault",
  "Alene Bunde",
  "Liana Moronta",
  "Gabrielle Hochman",
  "Fay Manning",
  "Carlotta Rueb",
  "Joellen Bossi",
  "Ginger Wakeland",
  "Wynona Pires",
  "Allen Brazier",
  "Madeline Blackstone",
  "Christy Natoli",
  "Delorse Sprowl",
  "Serita Meunier",
  "Rico Silverstein",
  "Alfonzo Kroger",
  "Georgann Goya",
  "Wonda Engler",
  "Morton Youngren",
  "Floria Yap",
  "Mikki Baranowski",
  "Kristen Jayne",
  "Coralie Brothers",
  "Eduardo Donahoe",
  "Andre Orth",
  "Georgiann Mohamed",
  "Argelia Purpura",
  "Fatima Gillette",
  "Nathaniel Keck",
  "Jordan Caceres",
  "Michel Kearney",
  "Christel Shufelt",
  "Efren Minks",
  "Glenn Vendetti",
  "Teodora Bastien"
];