import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
//import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.disable('x-powered-by')
app.use(json())
//app.use(corsMiddleware)  //soluciona el CORS poniendo * en las cabeceras Tiene opciones para limitarlas


//Todos los recursos que sean movies, se identifican con esta URL /movies
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`App escuchando en http://localhost:${PORT}`)
})

