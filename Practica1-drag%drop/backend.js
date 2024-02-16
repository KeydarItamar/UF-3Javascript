//Guardar Documento

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files'); // La carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // El nombre original del archivo
    }
});

const upload = multer({ storage: storage });

// Ruta para subir archivos
app.post('/subirArchivo', upload.array('files'), (req, res) => {
    console.log('Archivos recibidos:', req.files);
    res.send('Archivos recibidos correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});