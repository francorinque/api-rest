const HandleErrors = (error, req, res, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    res.status(400).send({ message: 'id used not valid' })
  } else {
    res.status(500).end()
  }
}

export default HandleErrors
