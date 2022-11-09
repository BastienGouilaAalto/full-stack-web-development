require('dotenv').config();
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(url)

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })  
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: [true, 'User is already in the phonebook']
  },
  number: {
    type: String,
    minlength: 8,    
    validate: {
      validator: function(v) {
        return /\d{2}?(\d{1})-\D/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema)