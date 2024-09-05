const path = require('node:path');

//Separador segun el sistema operativo
console.log(path.sep);

//unir rutas independientemente del SO

const filePath = path.join("/content", 'subfolder', 'text.txt');
console.log(filePath);

//Solo el nombre del fichero
const fileName = path.basename(filePath);
console.log("Nombre: ", fileName);

//Solo el nombre del fichero sin extensión
const fileNameSin = path.basename(filePath, '.txt');
console.log("Sin extensión: ", fileNameSin);

//Obtener Extensión
const ext = path.extname(filePath);
console.log("extensión: ", ext);

