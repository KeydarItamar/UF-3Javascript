

function validateNIF_NIE(value){
  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var str = value.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  var nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');

  var letter = str.substr(-1);
  var charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
}


function checkDni(event){
  let input = event.target;
  let valor = input.value.trim(); 

  if (valor === "") {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");

      let feedbackDiv = input.nextElementSibling;
      feedbackDiv.innerHTML = "Aquest camp és obligatori.";

      feedbackDiv.classList.remove("valid-feedback");
      feedbackDiv.classList.add("invalid-feedback");
  } else {
      if (validateNIF_NIE(valor)) {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");

          let feedbackDiv = input.nextElementSibling;
          feedbackDiv.innerHTML = "";

          feedbackDiv.classList.remove("invalid-feedback");
          feedbackDiv.classList.add("valid-feedback");
      } else {
          input.classList.remove("is-valid");
          input.classList.add("is-invalid");

          let feedbackDiv = input.nextElementSibling;
          feedbackDiv.innerHTML = "El DNI no és vàlid.";

          feedbackDiv.classList.remove("valid-feedback");
          feedbackDiv.classList.add("invalid-feedback");
      }
  }
}


function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    alert("OK");
  }else{
    alert("KO");
  }
}

document.addEventListener("DOMContentLoaded", function() {
function validarInput(event) {
    let input = event.target;
    let valor = input.value.trim(); 

    if (valor === "") {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");

        let feedbackDiv = input.nextElementSibling;
        feedbackDiv.innerHTML = "Aquest camp és obligatori.";

        feedbackDiv.classList.remove("valid-feedback");
        feedbackDiv.classList.add("invalid-feedback");
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");

        let feedbackDiv = input.nextElementSibling;
        feedbackDiv.innerHTML = "";

        feedbackDiv.classList.remove("invalid-feedback");
        feedbackDiv.classList.add("valid-feedback");
    }
}

$('#form-user-register').submit(function(e) {
  let inputNom = document.getElementById("validationNom");
  let inputCognoms = document.getElementById("validationCognoms");
  let inputDni = document.getElementById("validationDNI");
  
  validarInput({target: inputNom});
  validarInput({target: inputCognoms});
  checkDni({target: inputDni});

  if (inputNom.classList.contains("is-invalid") || inputCognoms.classList.contains("is-invalid") || inputDni.classList.contains("is-invalid")) {
      e.preventDefault();
  }
});


function generateName(name, lastname, number){
  lastname = lastname.replace(/\s+/g, '');
  let newName = name[0].toLowerCase() + "" + lastname.substring(0, 4).toUpperCase();
  for(let i = 0; i < number.length; i++) {
    if (number[i] % 2 != 0) {
        newName += number[i];
    }
  }
  return newName
}


btnUserName = document.getElementById("btnUsername");
btnUserName.addEventListener('click', function(){
  let inputNom = document.getElementById("validationNom").value;  
  let inputCognoms = document.getElementById("validationCognoms").value;
  let inputDni = document.getElementById("validationDNI").value;
  let userName = document.getElementById("validationUsername")
  userName.value = generateName(inputNom, inputCognoms,inputDni)
})

document.getElementById("validationNom").addEventListener("focusout", function() {
  let inputNom = document.getElementById("validationNom");
  validarInput({target: inputNom});
});

document.getElementById("validationCognoms").addEventListener("focusout", function() {
  let inputCognoms = document.getElementById("validationCognoms");
  validarInput({target: inputCognoms});
});
document.getElementById("validationDNI").addEventListener("focusout", function() {
  let inputDni = document.getElementById("validationDNI");
  checkDni({target: inputDni});
});



});