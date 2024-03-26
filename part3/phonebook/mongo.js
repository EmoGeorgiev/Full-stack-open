const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url =
    `mongodb+srv://emogeorgiev788:${password}@cluster0.uevbvoz.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({}).then(persons => {
        console.log("phonebook:")
        persons.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
    })
} else {
    const personName = process.argv[3]
    const personNumber = process.argv[4]

    const person = new Person({
        id: Math.floor(Math.random() * 1000000000),
        name: personName,
        number: personNumber,
    })

    person.save().then(result => {
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}