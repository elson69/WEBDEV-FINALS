const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link"),
    loginButton = document.getElementById("login-button"),
    registerButton = document.getElementById("register-button");

function clearInputFields(form) {
    const inputFields = form.querySelectorAll('.input-field input');
    inputFields.forEach(input => {
        input.value = '';
    });

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function areFieldsFilled(form) {
    const requiredFields = form.querySelectorAll('[required]');
    return Array.from(requiredFields).every(field => field.value.trim() !== '');
}

function isPasswordValid(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{12}$/;
    return regex.test(password);
}

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            pwField.type = pwField.type === "password" ? "text" : "password";
        });

        pwShowHide.forEach(icon => {
            icon.classList.toggle("uil-eye-slash");
            icon.classList.toggle("uil-eye");
        });
    });
});

signUp.addEventListener("click", () => {
    container.classList.add("active");
    const registerForm = document.querySelector('.form.signup form');
    clearInputFields(registerForm);
});

login.addEventListener("click", () => {
    container.classList.remove("active");
    const loginForm = document.querySelector('.form.login form');
    clearInputFields(loginForm);
});

loginButton.addEventListener("click", () => {
    const loginForm = document.querySelector('.form.login form');
    if (areFieldsFilled(loginForm)) {
        alert('Login successful!');
        clearInputFields(loginForm);
    } else {
        alert('Please fill in all required fields.');
    }
});

registerButton.addEventListener("click", () => {
    const registerForm = document.querySelector('.form.signup form');
    const passwordInput = registerForm.querySelector('.password');
    const ageInput = registerForm.querySelector('input[placeholder="Enter your Age"]');

    if (
        areFieldsFilled(registerForm) &&
        isPasswordValid(passwordInput.value) &&
        isAgeValid(ageInput.value)
    ) {
        alert('Registration successful!');
        clearInputFields(registerForm);
        window.location.href = 'index.html';
    } else {
        alert('Please fill in all required fields, ensure the password meets the requirements, and provide a valid age.');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const mobileNumberInput = document.querySelector('input[placeholder="Enter your mobile number"]');
    const ageInput = document.querySelector('input[placeholder="Enter your Age"]');
    
    mobileNumberInput.addEventListener("input", function () {
        this.value = this.value.slice(0, 11);
        this.value = this.value.replace(/\D/g, '');
    });

    ageInput.addEventListener("input", function () {
        this.value = this.value.slice(0, 2);
        this.value = this.value.replace(/\D/g, '');
    });

    pwFields.forEach(pwField => {
        pwField.addEventListener("input", function () {
            this.value = this.value.slice(0, 12);
        });
    });
});

function isAgeValid(age) {
    const ageValue = parseInt(age);
    return !isNaN(ageValue) && ageValue >= 0 && ageValue <= 99;
}