import mysql from 'mysql2/promise'

const configConnection = {
  host: 'localhost', 
  user: 'root',
  password: '404220.Sql$',
  port: 3306,
  database: 'moviesdb'  
}

const connection = await mysql.createConnection(configConnection)

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // get genre ids from database table using genre names
      const [genres] = await connection.query(
        'SELECT id, name FROM genres WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      // no genre found
      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados..
      return []
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, BIN_TO_UUID(id) id FROM movies;'
    )
    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      'SELECT title, year, director, duration, poster, BIN_TO_UUID(id) id FROM movies WHERE id= UUID_TO_BIN(?);',
      [id]
    )

    if (movie.le === 0) return null
    return movie[0]
  }

  static async create({ input }) {
    const {
      genre: genreInput, //genre is an array
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    //Todo: crear conexión de genre

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate)
          VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (e) {
      //return e
      // no mandar error al usuario puede enviarle información sensible
      throw new Error('Error creating movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    const [movie] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movies WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movie[0]
  }
  

  static async delete ({ id }) {
    try {
      const [movie] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
          FROM movies WHERE id = UUID_TO_BIN(?);`,
        [id]
      )
      if (movie.length === 0) return false

      await connection.query(
        'DELETE FROM movies WHERE id= UUID_TO_BIN(?);',
      [id]
      )      
    } catch (e) {
      return e
      // no mandar error al usuario puede enviarle información sensible
      //throw new Error('Error deleting movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    return true

  }

  static async update({ id, input }) {
   
    const [movie] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movies WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    if (movie.length === 0) return false

    const movieUpdate = {
      ...movie[0],
      ...input
    }
    console.log(movieUpdate)

    const {
      genre: genreInput, //genre is an array
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = movieUpdate
    console.log(movieUpdate)

    try {

      await connection.query(
        'UPDATE movies SET title=?, year= ?,director= ?, duration= ?, poster= ?, rate= ? WHERE id= UUID_TO_BIN(?);',
        [title, year, director, duration, poster, rate, id]
      )
    } catch (e) {
      return e
      // no mandar error al usuario puede enviarle información sensible
      //throw new Error('Error deleting movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    return true

  }
}