import express from 'express'
import logger from 'morgan'

const PORT = process.env.PORT || 3000


const app = express()
app.disable('x-powered-by')
app.use(logger('dev'))

app.get('/', (req, res) =>{
  res.send('<h1>Esto es el chat</h1>')
})


app.listen(PORT, () => {
  console.clear()
  console.log(`Server running op port:${PORT}`)
})
