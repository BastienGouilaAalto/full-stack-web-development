# Phonebook

## Backend folder
The first folder is the backend. It contains the nodejs backend, the frontend production build and the heroku configuration.

## Frontend folder
The second folder is the frontend. It contains the modified part2/phonebook React App.
It is built and sent to production as a folder to the backend folder.

### Heroku Application
To access the phonebook application online, use the following URL.
https://enigmatic-peak-42342.herokuapp.com

```bash
# Check heroku logs
$ npm run logs:prod
```

### Locally

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