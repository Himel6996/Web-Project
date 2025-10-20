document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.signin');
    const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
    const birthdateInput = document.getElementById('birth-date');
    const mobileInput = document.getElementById('mobile');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('pass');
    const confirmPasswordInput = document.getElementById('conpass');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const submitButton = document.getElementById('button');

    function showCaution(inputElement, message) { 
        let cautionDiv = inputElement.nextElementSibling;
        
        if (cautionDiv && cautionDiv.classList.contains('caution-message')) {
            if (cautionDiv.textContent === message) return; 
            cautionDiv.textContent = message;
        } else {
            cautionDiv = document.createElement('div');
            cautionDiv.className = 'caution-message';
            cautionDiv.style.color = 'red';
            cautionDiv.style.fontSize = '0.8em';
            cautionDiv.style.marginTop = '5px';
            cautionDiv.textContent = message;
            inputElement.parentNode.insertBefore(cautionDiv, inputElement.nextSibling);
        }
        updateSubmitButtonState();
    }

    function clearCaution(inputElement) {
        let cautionDiv = inputElement.nextElementSibling;
        if (cautionDiv && cautionDiv.classList.contains('caution-message')) {
            cautionDiv.remove();
        }
        updateSubmitButtonState();
    }
    
    function updateSubmitButtonState() {
        const allCautions = document.querySelectorAll('.caution-message');
        if (allCautions.length > 0) {
            submitButton.style.opacity = '0.6';
            submitButton.disabled = true;
            submitButton.style.cursor = 'not-allowed';
        } else {
            submitButton.style.opacity = '1';
            submitButton.disabled = false;
            submitButton.style.cursor = 'pointer';
        }
    }

    firstnameInput.addEventListener('input', function() {
        const value = firstnameInput.value.trim();
        if (value === '') {
            showCaution(firstnameInput, 'First name cannot be empty.');
        } else if (/\d/.test(value)) {
            showCaution(firstnameInput, 'First name cannot contain numbers.'); 
        } else {
            clearCaution(firstnameInput);
        }
    });

    lastnameInput.addEventListener('input', function() {
        const value = lastnameInput.value.trim();
        if (value === '') {
            showCaution(lastnameInput, 'Last name cannot be empty.'); 
        } else if (/\d/.test(value)) {
            showCaution(lastnameInput, 'Last name cannot contain numbers.'); 
        } else {
            clearCaution(lastnameInput);
        }
    });

    birthdateInput.addEventListener('change', function() {
        if (birthdateInput.value === '') {
            showCaution(birthdateInput, 'Please select your birth date.'); 
        } else {
            clearCaution(birthdateInput);
        }
    });

    genderInputs.forEach(gender => gender.addEventListener('change', function() {
        let isGenderSelected = false;
        for (const g of genderInputs) {
            if (g.checked) {
                isGenderSelected = true;
                break;
            }
        }
        const cautionPlacementElement = genderInputs[genderInputs.length - 1].nextElementSibling;
        if (!isGenderSelected) {
            showCaution(cautionPlacementElement, 'Please select your gender.'); 
        } else {
            clearCaution(cautionPlacementElement);
        }
    }));

    mobileInput.addEventListener('input', function() {
        const value = mobileInput.value.trim();
        if (value === '') {
            showCaution(mobileInput, 'Phone number cannot be empty.'); 
        } else if (/[^0-10]/.test(value)) {
            showCaution(mobileInput, 'Phone number can only contain digits.');
        } else if (!/^\d{11,}$/.test(value)) {
            showCaution(mobileInput, 'Please enter a valid phone number (at least 11 digits).');
        } else {
            clearCaution(mobileInput);
        }
    });

    emailInput.addEventListener('input', function() {
        const value = emailInput.value.trim();
        if (value === '') {
            showCaution(emailInput, 'Email cannot be empty.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showCaution(emailInput, 'Please enter a valid email address.');
        } else {
            clearCaution(emailInput);
        }
    });

    passwordInput.addEventListener('input', function() {
        const value = passwordInput.value;
        if (value === '') {
            showCaution(passwordInput, 'Password cannot be empty.');
        } else if (value.length < 8) {
            showCaution(passwordInput, 'Password must be at least 8 characters long.');
        } else if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value) || !/[^A-Za-z0-9]/.test(value)) {
            showCaution(passwordInput, 'Password must contain uppercase, lowercase, number, and special character.');
        } else {
            clearCaution(passwordInput);
        }
        // Also check confirm password if password changes
        if (confirmPasswordInput.value !== '' && confirmPasswordInput.value !== value) {
            showCaution(confirmPasswordInput, 'Passwords do not match.');
        } else if (confirmPasswordInput.value !== '') {
            clearCaution(confirmPasswordInput);
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        const value = confirmPasswordInput.value;
        const passwordValue = passwordInput.value;
        if (value === '') {
            showCaution(confirmPasswordInput, 'Please confirm your password.');
        } else if (value !== passwordValue) {
            showCaution(confirmPasswordInput, 'Passwords do not match.');
        } else {
            clearCaution(confirmPasswordInput);
        }
    });
    
    updateSubmitButtonState();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let allValid = true;
        if (!firstnameInput.value.trim() || /\d/.test(firstnameInput.value)) { showCaution(firstnameInput, 'Check first name.'); allValid = false; } else { clearCaution(firstnameInput); }
        if (!lastnameInput.value.trim() || /\d/.test(lastnameInput.value)) { showCaution(lastnameInput, 'Check last name.'); allValid = false; } else { clearCaution(lastnameInput); }
        if (birthdateInput.value === '') { showCaution(birthdateInput, 'Select birth date.'); allValid = false; } else { clearCaution(birthdateInput); }
        
        let genderSelected = false;
        for (const g of genderInputs) { if (g.checked) { genderSelected = true; break; } }
        const genderCautionElement = genderInputs[genderInputs.length - 1].nextElementSibling;
        if (!genderSelected) { showCaution(genderCautionElement, 'Select gender.'); allValid = false; } else { clearCaution(genderCautionElement); }

        if (!mobileInput.value.trim() || /[^0-9]/.test(mobileInput.value) || !/^\d{10,}$/.test(mobileInput.value)) { showCaution(mobileInput, 'Check phone number.'); allValid = false; } else { clearCaution(mobileInput); }
        if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) { showCaution(emailInput, 'Check email.'); allValid = false; } else { clearCaution(emailInput); }
        if (!passwordInput.value || passwordInput.value.length < 8 || !/[A-Z]/.test(passwordInput.value) || !/[a-z]/.test(passwordInput.value) || !/\d/.test(passwordInput.value) || !/[^A-Za-z0-9]/.test(passwordInput.value)) { showCaution(passwordInput, 'Check password.'); allValid = false; } else { clearCaution(passwordInput); }
        if (!confirmPasswordInput.value || confirmPasswordInput.value !== passwordInput.value) { showCaution(confirmPasswordInput, 'Passwords do not match.'); allValid = false; } else { clearCaution(confirmPasswordInput); }

        if (allValid) {
            alert('Form submitted successfully!');
            form.reset(); 
            document.querySelectorAll('.caution-message').forEach(el => el.remove());
            updateSubmitButtonState();
        } else {
            updateSubmitButtonState();
        }
    });

    mobileInput.addEventListener('keypress', function(event) {
        if (event.key.length === 1 && !/\d/.test(event.key) &&
            event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab' &&
            event.key !== 'Escape' && event.key !== 'Enter'
        ) {
            event.preventDefault(); 
            showCaution(mobileInput, 'Only digits allowed.');
        } else {
            clearCaution(mobileInput);
        }
    });

    firstnameInput.addEventListener('keypress', function(event) {
        if (event.key.length === 1 && /\d/.test(event.key)) {
            event.preventDefault();
            showCaution(firstnameInput, 'No numbers here.');
        } else {
            clearCaution(firstnameInput);
        }
    });

    lastnameInput.addEventListener('keypress', function(event) {
        if (event.key.length === 1 && /\d/.test(event.key)) {
            event.preventDefault();
            showCaution(lastnameInput, 'No numbers here.'); 
        } else {
            clearCaution(lastnameInput);
        }
    });
});