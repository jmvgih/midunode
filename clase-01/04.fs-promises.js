const fs =require ('node:fs/promises');

const txt = fs.readFile('./archivo.txt','utf-8')
.then(text =>{
    console.log(text);
} );

console.log('HACER COSAS MIENTRAS LEE EL ARCHIVO')

console.log('Leyendo el segundo archivo')

const secondTxt = fs.readFile('./archivo2.txt','utf-8')
.then(text =>{
    console.log(text);
});

/**
 * Si la función que se exportar no tienen versión com romesas se puede usar: promisify
 * const fs = require('node:fs')
 * const promisify = required('node:util);
 * 
 * const readFilePromise = promisify(fs.readFile);
 * 
 * const txt = readFilePromise('./archivo.txt','utf-8')
.then(text =>{
    console.log(text);
} );
 */