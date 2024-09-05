const fs = require('node:fs');

fs.readdir('.',(err, files) =>{
    if(err) {
        console.log('Errror al leer el directorio')
        return;
    }

    files.forEach(file => {console.log(file)})
})


