const fs =require ('node:fs/promises');

(async ()=>{
    const txt = await fs.readFile('./archivo.txt','utf-8')
    console.log(txt);
    
    console.log('HACER COSAS MIENTRAS LEE EL ARCHIVO')
    
    console.log('Leyendo el segundo archivo')
    const secondTxt = await fs.readFile('./archivo2.txt','utf-8')
    console.log(secondTxt);
    
})()

