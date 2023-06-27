import 'dotenv/config'
import express from 'express'
import HandleErrors from './middleware/handleErrors.js'
import NotFound from './middleware/notFound.js'
import Note from './models/notes.js'
import './mongo.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.send('home')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => res.json(notes))
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id)
    .then((singleNote) => res.json(singleNote))
    .catch((err) => next(err))
})

app.post('/api/notes', (req, res, next) => {
  const content = req.body.content

  if (!content) {
    return res.status(400).json({
      message: 'note is missing',
    })
  }

  const note = {
    title: content.title,
    important: content.important || false,
    date: new Date().toLocaleString(),
  }
  const newNote = new Note(note)
  newNote
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.deleteOne({ _id: id })
    .then(() => res.status(204).end())
    .catch((err) => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const content = req.body.content
  const newInfo = {
    title: content.title,
    important: content.important,
  }

  Note.findByIdAndUpdate(id, newInfo, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err))
})

//middlewares
app.use(NotFound)
app.use(HandleErrors)

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`)
})
