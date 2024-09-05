const http = require ('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
    console.log('reques received')
    res.setHeader('content-type', 'text/html; charset=utf-8' )
    if (req.url == "/" ){
        res.statusCode = 200 //ok
        res.end('<h1>Bienvenido a esta nuestra página<h1>')
    }else if (req.url == '/logo'){
        fs.readFile('./comunidad.png', (err, data) =>{
            if (err){
                res.statusCode = 500
                res.end('<h1>500 Internal server error</h1>')
            }else{
                res.setHeader('content-type', 'image/png' )
                res.statusCode = 200
                res.end(data)
            }
        })
    }else if (req.url == "/contacto") {
        res.statusCode = 200 //ok
        res.end('Nombre: El presidente de la página')
    } else {
        res.statusCode = 404 //No ok
        res.end('<h1>Error 404<h1>')
    }
}

const server = http.createServer( processRequest )


server.listen(desiredPort, () => {
    console.log(`Servidor listening en el la dirección http://localhost:${server.address().port}`)
})
