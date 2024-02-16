
 let dropArea = document.querySelector(".drop-area");
 let dragDropText  = document.querySelector(".drop-area h2");
 let button = document.querySelector(".drop-area button");
 let input  = document.getElementById("input-file");
 let preview = document.getElementById("preview");
 let fitxers = [];
 let esdevenimets = ['dragover', 'dragleave', 'drop'];
 let prev;
function prevDefault (e) {
    e.preventDefault();
    }

esdevenimets.forEach(function(evt){
    dropArea.addEventListener(evt, prevDefault);
});

dropArea.addEventListener("dragover", function(){
    dragDropText.innerHTML = "Drop to upload files" 
    dropArea.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    });
dropArea.addEventListener("dragleave", function(){
    dragDropText.innerHTML = "Drag & Drop files" 
    dropArea.style.backgroundColor = "white";
    });

dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    let filesDropped = Array.from(e.dataTransfer.files);
    fitxers = fitxers.concat(filesDropped);
    showFiles(fitxers)
    console.log(fitxers)
});

function showFiles(arrayFitxer){
    preview.innerHTML= '';
    if(arrayFitxer.length > 0){
        arrayFitxer.forEach(function (fitxer, index){
            procesFiles(fitxer, index);
        });
    }
}

function procesFiles(fitxer,index){
    const validExtensions = ["image/jpeg", "image/jpg", "image/png","image/gif"];
    const docType = fitxer.type;
    if (validExtensions.includes(docType)){
        let reader = new FileReader();
        reader.readAsDataURL(fitxer);
        var image = new Image();
        image.height = 250;
        image.title = fitxer.name;
        image.src = this.result;
        prev = `
        <div class="previewImage">
        <img id="img_${index}" src="${image.src}"/>
        <span>${fitxer.name}</span>
        <button onclick="remove(${index})" class="material-symbols-outlined
        removeBtn">borrar</button>
        </div>`;
        preview.innerHTML += prev;
        reader.addEventListener("load",function () {
            let img = document.getElementById(`img_${index}`)
            img.src = this.result;
            },
            false,
          );
    }else{
        fitxers.splice(index,1)
    }
}
function remove(i){
    console.log(`${i}`)
    console.log(fitxers[i])
    fitxers.splice(i,1); 
    showFiles(fitxers)  
}

button.addEventListener("click", function(e){
    e.preventDefault();
    input.click();
});

input.addEventListener("change", function(event){
    let upload_files = event.target.files; 
    let filesDropped = Array.from(upload_files); 
    fitxers = fitxers.concat(filesDropped);
    showFiles(fitxers);
    subirData(event)
    
});

async function subirData(event) {
    const files = event.target.files;

    // Crear un objeto FormData
    const formData = new FormData();

    // Agregar los archivos al FormData
    for (let i = 0; i < fitxers.length; i++) {
        formData.append('files', fitxers[i]);
    }

    try {
        // Hacer la solicitud HTTP POST al backend
        const response = await fetch('http://localhost:3000/subirArchivo', {
            method: 'POST',
            body: formData
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            console.log('Archivos subidos correctamente');
        } else {
            console.error('Error al subir archivos');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}
