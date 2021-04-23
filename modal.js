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
const citiesSelects = document.getElementsByName('location');
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
    addWarning(e, warningMessage);
  } else {
    removeWarning(e);
    formIsValid = true;
    toggleButton();
  }
}

// Name validation events
firstNameInput.addEventListener("change", validateName)
nameInput.addEventListener("change", validateName)

// Validate Email
function validateMail(e) {
  const userEmail = e.target.value
  console.log(userEmail);
  const regExp = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
  if(regExp.test(userEmail)) {
    formIsValid = true;
    toggleButton();
    removeWarning(e);
  } else {
    formIsValid = false;
    toggleButton()
    const errorMessage = 'Veuillez entrer une adresse mail valide';
    addWarning(e, errorMessage)
  }
}

// Email validation event
emailInput.addEventListener("change", validateMail)

// Validate Quantity
function validateQuantity(e) {
  const inputQuantity = parseInt(e.target.value);
  if (isNaN(inputQuantity)) {
    removeWarning(e)
    const errorMessage = 'Veuillez entrer un nombre';
    addWarning(e, errorMessage);
    formIsValid = false;
  } else if (inputQuantity > 20) {
    removeWarning(e)
    const errorMessage = 'Menteur';
    addWarning(e, errorMessage);   
    formIsValid = false;
    toggleButton(); 
  } else {
    removeWarning(e);
    formIsValid = true;
    // Check input quantity against number of cities checked
    if(inputQuantity > 0) {
      for (const city of citiesSelects) {
        city.disabled = false;
      }
      validateCities(e)
    } else {
      // Desactive la sélection de villes si l'utilisateur déclare 0 tournois
      for (const city of citiesSelects) {
        city.disabled = true;
      }
    }
  }
}

// Quantity validation toggle
quantity.addEventListener("change", validateQuantity)

// Cities select validation
function validateCities(e) {
  let citySelected = false;
  for (const city of citiesSelects) {
    if(!city.checked && !citySelected) {
      citySelected = false;
    } else {
      citySelected = true;
    }
  } if (citySelected) {
      removeWarning(e)
      formIsValid = true; 
      toggleButton();
  } else {
    formIsValid = false;
    const warningMessage = 'Veuillez sélectionner au moins une ville'
    addWarning(e, warningMessage)
    toggleButton()
  }
}

// Cities select event listener
citiesSelects.forEach((input) => input.addEventListener("change", validateCities));

// Validate mandatory
function validateMandatory(e) {
  if(e.target.checked) {
    formIsValid = true;
    toggleButton();
  } else {
    formIsValid = false;
    toggleButton();
    const warningMessage = "Vous devez accepter les conditions d'utilisation"
    addWarning(e, warningMessage)
  }
}


// Mandatory checkbox event listener
mandatoryCheckBox.addEventListener("change", validateMandatory)

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

