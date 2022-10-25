const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan((tokens, request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    JSON.stringify(request.body)
  ].join(' ')
}))

let persons = [
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

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/info', (request, response) => {
  const time = new Date()
  response.send(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
    </div>
    <div>
        <p>${time}</p>
    </div>`
    )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } 
  else {
    response.status(404).end()
  }})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  if(persons.filter(person => person.id === id).length > 0){
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  }
  else{
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {  
  const body = request.body
  console.log(body)
  if(!body.name){
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if(!body.number){
    return response.status(400).json({
      error: 'number is missing'
    })
  }
  if(persons.filter(person => person.name === body.name).length > 0){
    return response.status(400).json({
      error:`${body.name} is already in the phonebook`
    })
  }
    const newId = Number(Math.round(Math.random() * 1000))
    const person = {
      id : newId,
      name : body.name,
      number : body.number
    }
    persons = persons.concat(person)
    return response.status(200).json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})