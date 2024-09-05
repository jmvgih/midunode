const fs =require ('node:fs');
// //Sincrono
// const txt = fs.readFileSync('./archivo.txt','utf-8');
// console.log(txt);

// console.log('Leyendo el segundo archivo')

// const secondTxt = fs.readFileSync('./archivo2.txt','utf-8');
// console.log(secondTxt);

//Asíncrono

const txt = fs.readFile('./archivo.txt','utf-8', (err, text) => {
    console.log(text);
});

console.log('HACER COSAS MIENTRAS LEE EL ARCHIVO')

console.log('Leyendo el segundo archivo')

const secondTxt = fs.readFile('./archivo2.txt','utf-8', (err,text) => {
    console.log(text);
});

