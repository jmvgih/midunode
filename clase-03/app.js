const express = require('express')
const crypto = require('node:crypto')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

const movies = require('./movies.json')

//Todos los recursos que sean movies, se identifican con esta URL /movies
app.get('/movies',(req,res)=>{
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
        

    res.json(movies)
})

app.get('/movies/:id',(req,res)=>{
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)
    res.status(400).json({message:"Movie not found"})
})

app.post('/movies', (req, res)=>{
    const {
    title,
    year,
    director,
    duratio,
    poster,
    genre,
    rate,
    } = req.body

    const newMovie = {
        id: crypto.randomUUID(), //Crea uuid v4
        title,
        year,
        director,
        duratio,
        poster,
        genre,
        rate: rate ?? 0,
    }

    //Esto no sería REST al estar guardando información en el servidor. Más adelante iremos a la base de datos
    movies.push(newMovie)

    res.status(201).json(newMovie)

})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, ()=>{
    console.log(`Escuchando en http://localhost:${PORT}`)
})