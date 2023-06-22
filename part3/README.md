# Phonebook Application

## Backend folder
The first folder is the backend. It contains the nodejs backend, the frontend production build and the heroku configuration.

## Frontend folder
The second folder is the frontend. It contains the modified part2/phonebook React App.
It is built and sent to production as a folder to the backend folder.

## Errors and invalid requests

Errors are visualized in the frontend using the Notication component from the previous part. They display the basic error message from the server. However, they are more detailed in the web browser console and the command line console.

### Heroku Application
To access the phonebook application online, use the following URL.
https://enigmatic-peak-42342.herokuapp.com

```bash
# Check heroku logs
$ npm run logs:prod
```

#### API calls

You can manually test the API calls using curl or Postman.
Same API calls as in the local version.

#### Get all persons
```bash
$ curl https://enigmatic-peak-42342.herokuapp.com/api/persons
```

#### Get a person
```bash
$ curl https://enigmatic-peak-42342.herokuapp.com/api/persons/5f1b0b1b1c9d440000a1b0a0
```

#### Get info
```bash
$ curl https://enigmatic-peak-42342.herokuapp.com/info
```

### Locally

#### Backend

create a .env file and put there the MONGODB_URI for connecting to your mongodb database:
```
MONGODB_URI=<YOUR-MONGODB-URI>
PORT=3001
```

On this address:
http://localhost:3001/

```bash
# Dependencies
$ npm install

# Start the application in normal mode
$ npm start

# Start the application in dev mode
$ npm run dev
```

#### REST calls

There are 3 simple REST calls to the backend that you can modify and test inside the requests folder.

Example: get_all_persons.rest
```bash
GET http://localhost:3001/api/persons
```