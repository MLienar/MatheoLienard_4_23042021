// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')
const closeBtn = document.querySelector('.close')
const modalClose = document.querySelector('.modal-close')
const form = document.querySelector('form')
const nameInput = document.getElementById('last')
const firstNameInput = document.getElementById('first')
const emailInput = document.getElementById('email')
const birthdate = document.getElementById('birthdate')
const quantity = document.getElementById('quantity')
const citiesSelects = document.getElementsByName('location')
const mandatoryCheckBox = document.getElementById('checkbox1')
const submitBtn = document.querySelector('.btn-submit')
const successMessage = document.querySelector('.succes-message')
let formIsValid = false


function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
  const navIcon = document.querySelector('.fa-bars')
  navIcon.style.color === 'white' ? navIcon.style.color = "black" : navIcon.style.color = "white"
}

// Add warning when input is wrong
function addWarning(e, message) {
  if (!e.target.parentNode.querySelector('.warning-text')) {
  const warning = e.target.parentNode.appendChild(document.createElement('p'))
  warning.textContent = message
  warning.classList.add("warning-text")
  } else {
    return
  }
}

// Remove warning when input is right
function removeWarning(e) {
  if(e.target.parentNode.querySelector('.warning-text')) {
    e.target.parentNode.querySelector('.warning-text').remove()
  }
}

// Validate Names
function validateName(e) {
  if(e.target.value.length < 2) {
    formIsValid = false
    toggleButton()
    const warningMessage = "Merci d'entrer 2 caractères ou plus"
    addWarning(e, warningMessage)
  } else {
    removeWarning(e)
    formIsValid = true
    toggleButton()
  }
}

// Name validation events
firstNameInput.addEventListener("change", validateName)
nameInput.addEventListener("change", validateName)

// Validate Email
function validateMail(e) {
  const userEmail = e.target.value
  console.log(userEmail)
  const regExp = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
  if(regExp.test(userEmail)) {
    formIsValid = true
    toggleButton()
    removeWarning(e)
  } else {
    formIsValid = false
    toggleButton()
    const errorMessage = 'Veuillez entrer une adresse mail valide'
    addWarning(e, errorMessage)
  }
}

// Email validation event
emailInput.addEventListener("change", validateMail)


// Validate Date
function validateBirthdate(e) {
  const birthdate = e.target.value
  if(!birthdate) {
    const warning = 'Veuillez entrer votre date de naissance'
    addWarning(e, warning)
    formIsValid = false
    toggleButton()
  } else {
    removeWarning(e)
    formIsValid = true
    toggleButton()
  }
}

// Date validation event
birthdate.addEventListener("change", validateBirthdate)


// Validate Quantity
let cityInputQuantity = 0
function validateQuantity(e) {
  cityInputQuantity = parseInt(e.target.value)
  if (isNaN(cityInputQuantity)) {
    removeWarning(e)
    const errorMessage = 'Veuillez entrer un nombre'
    addWarning(e, errorMessage)
    formIsValid = false
    toggleButton()
  } else if (cityInputQuantity > 20) {
    removeWarning(e)
    const errorMessage = 'Menteur'
    addWarning(e, errorMessage)   
    formIsValid = false
    toggleButton() 
  } else {
    removeWarning(e)
    formIsValid = true
    toggleButton()
  }
}

// Quantity validation toggle
quantity.addEventListener("change", validateQuantity)

// Cities select validation
function validateCities(e) {
  let citiesChecked = 0
  for(const city of citiesSelects) {
    if(city.checked) {
      citiesChecked ++
    }
  }
  // Cas où l'utilisateur déclare aucun autre événement
  if (cityInputQuantity < 1) {
    if (citiesChecked < 1) {
      removeWarning(e)
      formIsValid = true
      toggleButton()
    } else {
      // Incohérence entre les entrées numériques et selects
      const warning = "Vous n'avez participé à aucun événement"
      addWarning(e, warning)
      formIsValid = false
      toggleButton()
    }
    // Cas où l'utilisateur déclare un événement ou plus
  } else {
    // Incohérence entre les entrées numériques et selects
    if (citiesChecked < 1) {
      const warning = "Veuillez sélectionner au moins une ville"
      addWarning(e, warning)
      formIsValid = false
      toggleButton()
    } else {
      removeWarning(e)
      formIsValid = true
      toggleButton()
    }
  }
}

// Cities select event listener
citiesSelects.forEach((input) => input.addEventListener("change", validateCities))

// Validate mandatory
function validateMandatory(e) {
  if(e.target.checked) {
    formIsValid = true
    toggleButton()
    removeWarning(e)
  } else {
    const errorMessage = "Vous devez accepter les conditions d'utilisation"
    addWarning(e, errorMessage)
    formIsValid = false
    toggleButton()
  }
}

// Mandatory checkbox event listener
mandatoryCheckBox.addEventListener("click", validateMandatory)

// Check if form inputs have values
function checkIfInputs(e) {
  // Check first 5 inputs
  for (let i = 0; i < 5; i ++) {
    if (e.target[i].value.length < 1) {
      formIsValid = false
      toggleButton()
      const warning = "Merci de remplir tous les champs"
      addWarning(e, warning)
      return
    }
  }
  if (mandatoryCheckBox.checked && formIsValid) {
    removeWarning(e)
    setInterval(()=>{successMessage.style.display = 'flex'}, 1000)
  }
}

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
  e.preventDefault()
  checkIfInputs(e)
  
}

// Form submit event
form.addEventListener('submit', validate)

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'
}


// Close modal form
function closeModal() {
  modalbg.style.display = 'none'
}

// Close modal event
closeBtn.addEventListener('click', closeModal)
modalClose.addEventListener('click', closeModal)

