const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./modules/person')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms ',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(phonebook => {
    res.json(phonebook)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(phonebook => {
      res.send(`<p>Phonebook has info for ${phonebook.length} people</p> <p>${new Date()}</p>`)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const name = req.body.name
  const number = req.body.number
  console.log(name)
  console.log(number)
  if (!name) {
    res.status(404).json({ error: 'name is missing' })
  }
  if (!number) {
    res.status(404).json({ error: 'number is missing' })
  }
  const person = new Person({
    name,
    number
  })
  person.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})