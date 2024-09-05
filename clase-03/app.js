const express = require('express')

const app = express()
app.disable('x-powered-by')

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

const PORT = process.env.PORT ?? 1234

app.listen(PORT, ()=>{
    console.log(`Escuchando en http://localhost:${PORT}`)
})