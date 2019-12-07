/* ======================================================================
UI Elements
====================================================================== */
const notificationsIcon = document.querySelector('.header__widgets--icon-container');
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