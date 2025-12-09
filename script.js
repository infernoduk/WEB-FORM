// Form validation script
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var isValid = true;
    
    // Get form elements
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var gender = document.querySelector('input[name="gender"]:checked');
    var program = document.getElementById('program').value;
    var consent = document.getElementById('consent').checked;
    
    // Clear previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('genderError').textContent = '';
    document.getElementById('programError').textContent = '';
    document.getElementById('consentError').textContent = '';
    
    // Validate name
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Validate email
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!email.includes('@')) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Validate phone
    if (phone === '') {
        document.getElementById('phoneError').textContent = 'Phone number is required';
        isValid = false;
    } else if (phone.length < 10 || phone.length > 15) {
        document.getElementById('phoneError').textContent = 'Phone must be 10-15 digits';
        isValid = false;
    }
    
    // Validate gender
    if (!gender) {
        document.getElementById('genderError').textContent = 'Please select a gender';
        isValid = false;
    }
    
    // Validate program
    if (program === '') {
        document.getElementById('programError').textContent = 'Please select a program';
        isValid = false;
    }
    
    // Validate consent
    if (!consent) {
        document.getElementById('consentError').textContent = 'You must agree to the terms';
        isValid = false;
    }
    
    // If valid, show success message
    if (isValid) {
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('successMessage').classList.remove('hidden');
        alert('Registration successful!');
    }
});

