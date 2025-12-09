// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    // Get all form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const programSelect = document.getElementById('program');
    const consentCheckbox = document.getElementById('consent');
    
    // Get error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const genderError = document.getElementById('genderError');
    const programError = document.getElementById('programError');
    const consentError = document.getElementById('consentError');
    
    // Clear error messages on input
    function clearError(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    // Show error message
    function showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    // Validate individual fields
    function validateName() {
        const name = nameInput.value.trim();
        if (!name) {
            showError(nameError, 'Name is required');
            return false;
        }
        if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
            return false;
        }
        if (!/^[A-Za-z\s]+$/.test(name)) {
            showError(nameError, 'Name must contain only letters and spaces');
            return false;
        }
        clearError(nameError);
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        if (!email) {
            showError(emailError, 'Email is required');
            return false;
        }
        if (!emailInput.validity.valid) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }
        clearError(emailError);
        return true;
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        if (!phone) {
            showError(phoneError, 'Phone number is required');
            return false;
        }
        if (!/^[0-9]{10,15}$/.test(phone)) {
            showError(phoneError, 'Phone number must be 10-15 digits');
            return false;
        }
        clearError(phoneError);
        return true;
    }
    
    function validateGender() {
        const isSelected = Array.from(genderInputs).some(radio => radio.checked);
        if (!isSelected) {
            showError(genderError, 'Please select a gender');
            return false;
        }
        clearError(genderError);
        return true;
    }
    
    function validateProgram() {
        if (!programSelect.value) {
            showError(programError, 'Please select a program of study');
            return false;
        }
        clearError(programError);
        return true;
    }
    
    function validateConsent() {
        if (!consentCheckbox.checked) {
            showError(consentError, 'You must agree to the terms and conditions');
            return false;
        }
        clearError(consentError);
        return true;
    }
    
    // Add real-time validation
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', function() {
        if (nameError.textContent) {
            validateName();
        }
    });
    
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
        if (emailError.textContent) {
            validateEmail();
        }
    });
    
    phoneInput.addEventListener('blur', validatePhone);
    phoneInput.addEventListener('input', function() {
        if (phoneError.textContent) {
            validatePhone();
        }
    });
    
    genderInputs.forEach(radio => {
        radio.addEventListener('change', validateGender);
    });
    
    programSelect.addEventListener('change', validateProgram);
    
    consentCheckbox.addEventListener('change', validateConsent);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isGenderValid = validateGender();
        const isProgramValid = validateProgram();
        const isConsentValid = validateConsent();
        
        if (isNameValid && isEmailValid && isPhoneValid && 
            isGenderValid && isProgramValid && isConsentValid) {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Log form data (in a real application, this would be sent to a server)
            console.log('Form submitted successfully!');
            console.log('Form Data:', {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                gender: Array.from(genderInputs).find(r => r.checked)?.value,
                program: programSelect.value,
                consent: consentCheckbox.checked
            });
        } else {
            // Focus on first invalid field
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isPhoneValid) phoneInput.focus();
            else if (!isGenderValid) genderInputs[0].focus();
            else if (!isProgramValid) programSelect.focus();
            else if (!isConsentValid) consentCheckbox.focus();
        }
    });
});

