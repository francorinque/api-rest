import mongoose from 'mongoose'

//connect mongoDB
const PASSWORD = process.env.PASSWORD
const USER = process.env.USER
const connectionString = `mongodb+srv://${USER}:${PASSWORD}@cluster0.hreln6r.mongodb.net/?retryWrites=true&w=majority`
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connect mongo succes')
  })
  .catch((e) => console.log(e))
