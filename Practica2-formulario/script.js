let errorVal = true

document.addEventListener("DOMContentLoaded", function() {
    // Evento que gestiona el input del nombre
    

    document.getElementById("username").addEventListener("focusout", function() {
        var usernameInput = document.getElementById("username");
        var usernameError = document.getElementById("usernameError");
        if (usernameInput.value.trim() === "") {
            usernameInput.classList.add("errorInput");
            usernameError.innerText = "El campo de usuario no puede estar vacío.";
            usernameError.style.color = "red";
            errorVal = true

        } else {
            usernameInput.classList.remove("errorInput");
            usernameError.innerText = "Nombre valido";
            usernameError.style.color = "green";
            errorVal = false
        }
    });

    // Evento que gestiona que el email sea correcto, funcion validate al final del codigo
    document.getElementById("email").addEventListener("focusout", function() {
        var emailInput = document.getElementById("email");
        var emailError = document.getElementById("emailError");
        var email = emailInput.value.trim();
        if (validateEmail(email)) {
            emailInput.classList.remove("errorInput");
            emailError.innerText = "Email correcto";
            emailError.style.color = "green";
            errorVal = false
        } else {
            emailInput.classList.add("errorInput");
            emailError.innerText = "El correo electrónico no es válido.";
            emailError.style.color = "red";
            errorVal = true
        }
    });

    //Evento que gestiona el apartado de password
    document.getElementById("password").addEventListener("input", function() {
        var passwordInput = document.getElementById("password");
        var passwordError = document.getElementById("passwordError");
        var password = passwordInput.value.trim();
        var requirements = [];

        if (password.length < 8) requirements.push("Minimo 8 caracteres");
        if (password.length > 15) requirements.push("Maximo 15 caracteres");
        if (!/[a-z]/.test(password)) requirements.push("Una letra minúscula");
        if (!/[A-Z]/.test(password)) requirements.push("Una letra mayúscula");
        if (!/\d/.test(password)) requirements.push("Minimo un dígito");
        if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) requirements.push("Un carácter especial");

        if (requirements.length === 0 || password.length == 0) {
            passwordInput.classList.remove("errorInput");
            passwordError.innerText = "Password valido";
            passwordError.style.color='green'
            errorVal = false
        } else {
            passwordInput.classList.add("errorInput");
            passwordError.innerText = "La contraseña debe contener:\n " + requirements.join("\n ") + ".";
            passwordError.style.color='red'
            errorVal = true
        }
    });

    // Evento para la gestion del confirm password
    document.getElementById("confirmPassword").addEventListener("focusout", function() {
        var passwordInput = document.getElementById("password");
        var confirmPasswordInput = document.getElementById("confirmPassword");
        var confirmPasswordError = document.getElementById("confirmPasswordError");
        if (passwordInput.value === confirmPasswordInput.value ) {
            confirmPasswordInput.classList.remove("errorInput");
            confirmPasswordError.innerText = "";
            confirmPasswordInput.style.background= 'green'
            errorVal = false
        } else {
            confirmPasswordInput.classList.add("errorInput");
            confirmPasswordError.innerText = "Las contraseñas no coinciden.";
            confirmPasswordError.style.color = "red";
            confirmPasswordInput.style.background= 'red'
            errorVal = true
        }
    });

    // Evento para ver si se ha puesto una direccion
    document.getElementById("address").addEventListener("focusout", function() {
        var addressInput = document.getElementById("address");
        var addressError = document.getElementById("addressError");
        if (addressInput.value.trim() === "") {
            addressInput.classList.add("errorInput");
            addressError.innerText = "La dirección postal no puede estar vacía.";
            addressError.style.color = "red";
            errorVal = true
        } else {
            addressInput.classList.remove("errorInput");
            addressError.innerText = "";
            errorVal = false
        }
    });

    // funcion extraña que valida si el email es correcto. 
    function validateEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
});

document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault(); 
    if(errorVal) {
        alert("Hay campos incorrectos por revisar");
        return
    } else {
     document.getElementById("registrationForm").submit(); 
    }
});