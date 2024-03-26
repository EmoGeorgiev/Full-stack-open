const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./modules/person')

// let phonebook = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

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

app.get('/api/persons', (req, res) => {
    Person.find({}).then(phonebook => {
        res.json(phonebook)
    })
})

// app.get('/api/persons/:id', (req, res) => {
//     const id = Number(req.params.id)
//     const person = phonebook.find(person => person.id === id)

//     if (person) {
//         res.json(person)
//     } else {
//         res.status(404).end()
//     }
// })

app.post('/api/persons', (req, res) => {
    const name = req.body.name
    const number = req.body.number
    console.log(name)
    console.log(number)
    if (!name) {
        res.status(404).json({error: 'name is missing'})
    }
    if (!number) {
        res.status(404).json({error: 'number is missing'})
    }
    const person = new Person({ 
        name,
        number
    })
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})