// Country list data
const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Australia", "Austria",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Bulgaria", "Burkina Faso",
    "Burundi", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Finland", "France", "Gabon",
    "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Korea", "Kuwait", "Latvia", "Lebanon", "Liberia",
    "Lithuania", "Luxembourg", "Madagascar", "Malaysia", "Malta", "Mexico", "Mongolia", "Morocco",
    "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Nigeria",
    "Norway", "Oman", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia",
    "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "Spain", "Sri Lanka",
    "Sudan", "Sweden", "Switzerland", "Syria", "Taiwan", "Tanzania", "Thailand", "Togo",
    "Tunisia", "Turkey", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Zambia", "Zimbabwe"
];

// Populate country dropdown
document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.toLowerCase().replace(/\s+/g, '-');
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // Add input event listeners for real-time validation
    const form = document.getElementById('personalInfoForm');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
});

// Validate individual input
function validateInput(input) {
    const formGroup = input.closest('.form-group');
    
    if (input.validity.valid) {
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
    } else {
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
    }
}

// Form validation
function validateForm(event) {
    event.preventDefault();
    
    const form = event.target;
    let isValid = true;

    // Validate text inputs
    const textInputs = form.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        if (input.required && !input.value) {
            isValid = false;
            showError(input, 'This field is required');
        } else if (input.pattern) {
            const regex = new RegExp(input.pattern);
            if (!regex.test(input.value)) {
                isValid = false;
                showError(input, input.nextElementSibling.textContent);
            }
        }
    });

    // Validate email
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput.value) {
        isValid = false;
        showError(emailInput, 'Email is required');
    } else if (!isValidEmail(emailInput.value)) {
        isValid = false;
        showError(emailInput, 'Please enter a valid email address');
    }

    // Validate selects
    const selects = form.querySelectorAll('select');
    selects.forEach(select => {
        if (!select.value) {
            isValid = false;
            showError(select, 'Please select an option');
        }
    });

    // Validate checkboxes
    const checkboxes = form.querySelectorAll('input[name="heard_from"]');
    let isChecked = false;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) isChecked = true;
    });
    if (!isChecked) {
        isValid = false;
        alert('Please select at least one option for how you heard about the program');
    }

    // Validate radio buttons
    const radios = form.querySelectorAll('input[name="future_plan"]');
    let isRadioSelected = false;
    radios.forEach(radio => {
        if (radio.checked) isRadioSelected = true;
    });
    if (!isRadioSelected) {
        isValid = false;
        alert('Please select what you will do after finishing your study');
    }

    // Validate feedback
    const feedback = form.querySelector('#feedback');
    if (!feedback.value.trim()) {
        isValid = false;
        showError(feedback, 'Please provide your feedback');
    }

    if (isValid) {
        // Show success message
        alert('Form submitted successfully!');
        // Optionally reset the form
        // form.reset();
    }

    return false; // Prevent form submission for this demo
}

// Helper function to validate email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Show error message
function showError(element, message) {
    const formGroup = element.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        element.parentNode.appendChild(error);
    }
    formGroup.classList.add('error');
} 