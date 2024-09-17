//import movies from './movies.json' with {type: 'json' } //En módulos with es experimental
//Una alternativa:
//import fs from 'node:fs'
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
//Opción recomendada de momento
import {createRequire} from 'node:module'

const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)