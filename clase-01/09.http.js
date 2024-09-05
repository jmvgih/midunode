const http = require ('node:http')
const {findAvailablePort} = require('./10.free-port')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
    console.log('reques received')
    res.end('Hola mundo')
})

findAvailablePort(desiredPort).then((port)=>{
    server.listen(port,() =>{
        console.log(`Servidor listening en el la dirección http://localhost:${server.address().port}`)
    })
})





