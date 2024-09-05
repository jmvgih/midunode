
const fs =require ('node:fs/promises');


Promise.all([
    fs.readFile('./archivo.txt','utf-8'),
    fs.readFile('./archivo2.txt','utf-8')
]).then(([text, secondTxt]) =>{
    console.log(text);
    console.log(secondTxt);
})



