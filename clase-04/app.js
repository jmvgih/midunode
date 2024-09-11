import express, { json } from 'express'
import cors from 'cors'
import { randomUUID } from 'node:crypto'
import {readJson} from './utils/utils.js'
import { validateMovie, validatePartialMovie } from './schemas/movies.js' 

//import movies from './movies.json' with {type: 'json' } //En módulos with es experimental

//Una alternativa
//import fs from 'node:fs'
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

//Opción recomendada de momento
const movies = readJson('../movies.json')

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(cors({
  origin: (origin, callback) =>{
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://movies.com',
      'http://jmv.com'
    ]
  
  if (ACCEPTED_ORIGINS.includes(origin)){
    return callback(null, true)
  }
  if (!origin){
    return callback(null, true)
  }
  
  return callback(new Error('Not allowed by CORS'))

  }
}))  //soluciona el CORS poniendo * en las cabeceras Tiene opciones para limitarlas



//Todos los recursos que sean movies, se identifican con esta URL /movies
app.get('/movies', (req, res) => {
 
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }


  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(400).json({ message: "Movie not found" })
})

app.post('/movies', (req, res) => {

  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: randomUUID(), //Crea uuid v4
    ...result.data
  }

  //Esto no sería REST al estar guardando información en el servidor. Más adelante iremos a la base de datos
  movies.push(newMovie)

  res.status(201).json(newMovie)

})

app.delete('/movies/:id', (req, res)  =>{

  const {id} = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  return res.status(200).json({messgae: 'Movie deleted'})

})

app.patch('/movies/:id', (req, res) => {
  
  const result = validatePartialMovie(req.body)
  if (!result.success){
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.status(200).json(updateMovie)

})


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`)
})