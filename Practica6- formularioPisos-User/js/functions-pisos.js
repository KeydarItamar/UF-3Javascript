document.addEventListener("DOMContentLoaded", function() {

document.getElementById("districteSelector").addEventListener('change', function(){
  alert('Has cambiado al distrito: ' + document.getElementById("districteSelector").value)
})



function getData() {
    let nom = document.getElementById("nom").value;
    let nomVia = document.getElementById("nomVia").value;
    let numVia = document.getElementById("numVia").value;
    let barri = document.getElementById("barriSelector").value;
    let districte = document.getElementById("districteSelector").value;
    let via = document.getElementById("selectorVia").value;
    let pis = document.getElementById("pis").value;
    let escala = document.getElementById("escala").value;
    let porta = document.getElementById("porta").value;
    let cp = document.getElementById("cp").value;
    let poblacio = document.getElementById("poblacio").value;
    let preu = document.getElementById("preu").value;

    var col6DataDiv = document.getElementById("col6-data");
    col6DataDiv.innerHTML = `<h4> Nom: ${nom}, Barri: ${barri}, Districte: ${districte} </h4>` +
                           ` <ul>
                              <li><strong>Via:</strong>${via}</li>
                              <li><strong>Nom:</strong>${nomVia}</li>
                              <li><strong>Número:</strong>${numVia}</li>
                              <li><strong>Pis:</strong>${pis}</li>
                              <li><strong>Escala:</strong>${escala}</li>
                              <li><strong>Porta:</strong>${porta}</li>
                              <li><strong>CP:</strong>${cp}</li>
                              <li><strong>Poblacio:</strong>${poblacio}</li>
                            </ul>`+
                            `<p><strong>Preu:</strong>${preu}</p>`
                              ;
  }
  
  document.getElementById("btnVisual").addEventListener('click', function(){
    event.preventDefault();
    getData()

  })
  $(document).ready(function() {
    $('#districteSelector').change(function() {
        var selectedDistrict = $(this).val();
        let formData = new FormData();
        formData.append("district", selectedDistrict);

        let options = {
            method: 'POST',
            body: formData
        };

        fetch("getBarris.php", options)
            .then(response => response.json())
            .then(data => {
                var barrios = data;
                $('#barriSelector').empty();
                $.each(barrios, function(index, barri) {
                    console.log(barri)
                    $('#barriSelector').append('<option>' + barri["name"] + '</option>');
                });
                $('#barriSelector').prop('disabled', false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
  });


});