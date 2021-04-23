function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('form');
const nameInput = document.getElementById('last');
const firstNameInput = document.getElementById('first');
const emailInput = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const mandatoryCheckBox = document.getElementById('checkbox1');
const submitBtn = document.querySelector('.btn-submit')
let formIsValid = true;

// Add warning when input is wrong
function addWarning(e, message) {
  if (!e.target.parentNode.querySelector('.warning-text')) {
  const warning = e.target.parentNode.appendChild(document.createElement('p'))
  warning.textContent = message;
  warning.classList.add("warning-text")
  } else {
    return;
  }
}

// Remove warning when input is right
function removeWarning(e) {
  if(e.target.parentNode.querySelector('.warning-text')) {
    e.target.parentNode.querySelector('.warning-text').remove();
  }
}

// Validate Names
function validateName(e) {
  if(e.target.value.length < 2) {
    formIsValid = false;
    toggleButton();
    const warningMessage = "Merci d'entrer 2 caractères ou plus";
    addWarning(e, warningMessage)
  } else {
    removeWarning(e);
    formIsValid = true;
    toggleButton()
  }
}


// Name validation events
firstNameInput.addEventListener("change", validateName)
nameInput.addEventListener("change", validateName)

// Validate Email

// Validate Quantity

// Validate mandatory

// Disable submit button if inputs invalid
function toggleButton() {
  if (formIsValid) {
    submitBtn.disabled = false
  } else {
    submitBtn.disabled = true
  }
}

toggleButton()

// Form validation

function validate(e) {
  e.preventDefault();
}

// Form submit event
form.addEventListener('submit', validate)

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// Close modal event
closeBtn.addEventListener('click', closeModal);

// Close modal form
function closeModal() {
  modalbg.style.display = 'none';
}

