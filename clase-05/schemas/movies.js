import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required' // Y otras muchas posibilidades
  }),
  year: z.number().int().min(1900).max(2024), //Positive está como ejemplo :)
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).nullable().default(null),
  poster: z.string().url(),
  //genre: z.array(s.string()) Tambien se puede limitar con enum
  genre: z.array(z.enum(['Adventure', 'Sci-Fi', 'Action', 'Crime', 'Drama', 'Romance', 'Biography', 'Fantasy', 'Comedy', 'Horror', 'Thriller']))
})

export function validateMovie(object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie(object){
  return movieSchema.partial().safeParse(object)
}

