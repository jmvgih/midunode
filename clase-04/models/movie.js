import { randomUUID } from 'node:crypto'

//import movies from './movies.json' with {type: 'json' } //En módulos with es experimental
//Una alternativa:
//import fs from 'node:fs'
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
//Opción recomendada de momento
import {readJson} from '../utils/utils.js'
const movies = readJson('../movies.json')


export class MovieModel {
  static async getAll({genre}){
    if (genre){
      return movies.filter(
        movie => movie.genre.some(g => g.tolowerCase() === genre.tolowerCase())
      )
    }
    return movies
  } 

  static async getById({id}){

    const movie = movies.find(movie => movie.id === id)
    return movie

  } 

  static async create({data}){
    const newMovie = {
      id: randomUUID(), 
      ...data
    }
    //Esto no sería REST al estar guardando información en el servidor. Más adelante iremos a la base de datos
    movies.push(newMovie)
    return newMovie

  }

  static async delete({id}){

    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) {
      return false
    }
    movies.splice(movieIndex, 1)
    return true

  }

  static async update({ id, data }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) {
      return false
    }

    const updateMovie = {
      ...movies[movieIndex],
      ...result.data
    }

    movies[movieIndex] = updateMovie
    return updateMovie

  }
}