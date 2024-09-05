const os = require('node:os');

console.log('Información del sistema');
console.log('---------------------------------')
console.log('Nombre del sistema: ', os.hostname());
console.log('Versión: ', os.release());
console.log('Arquitectura: ', os.arch());
console.log('cpus: ', os.cpus());
console.log('Memoria RAM: ', os.totalmem() / 1024 / 1024)
console.log('Memoria disponible: ', os.freemem() /1024 / 1024)
