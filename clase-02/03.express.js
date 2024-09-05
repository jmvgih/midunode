const express = require('express')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

const dittoJSON = require('./pokemon/ditto.json')

app.use((req,res, next)=>{
    if (req.method !== "POST") return next()
    if (req.headers['content-type'] !== "application/json") return next()
    
    //Solo llegan peticiones con el métodod POST y cabecera application/josn
    let body = ''
    //Escuchar el evento data
    req.on('data', chunk =>{
        body += chunk.toString()
    })

    req.on('end', ()=>{
        const data =JSON.parse(body);
        data.timestamp = Date.now()
        //Cambiamos la request y metemos la información en el objeto body
        req.body = data
        next()
    })
    
})

//app.use(express.json()) Hace los mismo que todas las líneas de arriba


app.get('/', (req, res)=>{
    res.send('<h1>Mi página<h1>')
})

app.get('/pokemon/ditto', (req,res) =>{
    return res.send(JSON.stringify(dittoJSON))
})

app.post('/pokemon', (req, res) =>{
    //con req.body deberíamos guardar en la base de datos
    res.status(201).json(req.body)
})

app.use((req, res) =>{
    res.status(404).send('<h1>404<h1>')
})

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en https://localhost:${PORT}`)
})