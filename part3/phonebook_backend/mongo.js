const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
    const password = process.argv[2]
    const url = `mongodb+srv://fullstack:${password}@cluster0.baomyhi.mongodb.net/phonebook?retryWrites=true&w=majority`
    mongoose
    .connect(url)
    .then((result) => {
        Person.find({}).then(result => {
            console.log("phonebook:")
            result.forEach(person => {
              console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    })
}
else if(process.argv.length === 5){
    const password = process.argv[2]
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    const url = `mongodb+srv://fullstack:${password}@cluster0.baomyhi.mongodb.net/phonebook?retryWrites=true&w=majority`

    mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')
        const person = new Person({
        name: newName,
        number: newNumber,
        })
        return person.save()
    })
    .then(() => {
        console.log('person saved!')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}
else{
  console.log('Please provide the following arguments: node mongo.js <password> for listing the contacts and node mongo.js <password> <newName> <newNumber> for adding persons')
  process.exit(1)
}

//const password = process.argv[2] //