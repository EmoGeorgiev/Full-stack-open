const express = require('express')
const app = express()
const morgan = require('morgan')

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

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

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${phonebook.length} people</p> <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = phonebook.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const name = req.body["name"]
    const number = req.body["number"]
    if (!name) {
        res.status(404).json({error: "name is missing"})
    }
    if (!number) {
        res.status(404).json({error: "number is missing"})
    }
    if (phonebook.filter(person => person.name === name).length > 0) {
        res.status(409).json({error: "the name already exists in the phonebook"})
    }
    const id = Math.floor(Math.random() * 1000000000)
    const person = {id, name, number}
    phonebook.push(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})