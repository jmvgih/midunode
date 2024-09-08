const express = require('express')


const app = express()
app.disable('x-powered-by')
app.use(express.json())

const movies = require('./movies.json')
const { validateMovie } = require('./schemas/movies')
const { validatePartialMovie } = require('./schemas/movies')

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
    id: crypto.randomUUID(), //Crea uuid v4
    ...result.data
  }

  //Esto no sería REST al estar guardando información en el servidor. Más adelante iremos a la base de datos
  movies.push(newMovie)

  res.status(201).json(newMovie)

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