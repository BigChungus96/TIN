function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const checkTextLengthRangeMessage = document.getElementById('errorMessage-checkTextLengthRange').innerText;
    const checkEmailMessage = document.getElementById('errorMessage-checkEmail').innerText;
    const sumMessage = document.getElementById('errorMessage-sumMessage').innerText;

    resetErrors([firstNameInput, lastNameInput, emailInput, passwordInput], [errorFirstName, errorLastName, errorEmail, errorPassword], errorsSummary);

    let valid = true;
//firstName
    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = checkTextLengthRangeMessage;
    }
//lastName
    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = checkTextLengthRangeMessage;
    }
//email
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = checkTextLengthRangeMessage;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = checkEmailMessage;
    }
    //password
    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    } else if (!checkTextLengthRange(passwordInput.value, 2, 60)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = checkTextLengthRangeMessage;
    }

    if (!valid) {
        errorsSummary.innerText = sumMessage;
    }
    return valid;
}