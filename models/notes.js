import { Schema, model } from 'mongoose'

const noteSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  important: Boolean,
  date: String,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Note = new model('note', noteSchema)
export default Note
