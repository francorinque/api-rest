import express from 'express'

const app = express()

app.use(express.json())

let notes = [
  { id: 1, title: 'note 1', desc: 'desc...' },
  { id: 2, title: 'note 2', desc: 'desc...' },
  { id: 3, title: 'note 3', desc: 'desc...' },
]

app.get('/', (req, res) => {
  res.send('home')
})
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const singleNote = notes.find((note) => note.id === id)

  if (singleNote) {
    res.json(singleNote)
  } else {
    res.status(404).json({
      message: `note ${id} not found`,
    })
  }
})

app.post('/api/notes', (req, res) => {
  const content = req.body.content

  if (!content) {
    return res.status(400).json({
      message: 'note is missing',
    })
  }

  const newNote = {
    id: notes.length + 1,
    title: content.title,
    desc: content.desc,
  }
  console.log(newNote)

  notes.concat(newNote)
  res.status(201).json(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.status(404).end()
})

app.use((req, res) => {
  res.status(404).json({
    error: 'not found',
  })
})

app.listen(3000, () => {
  console.log('server running')
})
