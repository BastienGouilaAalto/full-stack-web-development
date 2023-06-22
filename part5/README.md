Exercises 5.1 to 5.23 bloglist backend and frontend

# Bloglist backend

## To run the application locally
create a .env file and put there the MONGODB_URI for connecting to your mongodb database:
```
MONGODB_URI=<YOUR-MONGODB-URI>
PORT=3003

SECRET=<YOUR SECRET>

TEST_MONGODB_URI=<YOUR-MONGODB-URI>
```
## REST
The REST tests are also available, feel free to modify the randomly generated IDs and names to match your tests based on the API's response.

## JEST backend tests

25 tests with 3 suites

Run them all with:
```
npm test
```

Or separately with:
```
npm test -- -t '{test name}'
```

# Bloglist frontend

## To run the application locally

Install the node packages:
```
npm install
```

To run the application:
```
npm start
```

## JEST frontend tests

To run the tests:
```
npm run test
```

# Cypress tests

Cypress needs both the backend and frontend to be running.

## Backend

Put the application in test mode with:
```
npm run start:test
```

## Frontend

Start the application with:
```
npm start
```

To run the cypress tests:
```
npm run cypress:open
```

## Note regarding the Cypress tests 

There is a duplicated test in cypress regarding the blogs order according to the number of likes. One test waits between the clicks and the other one does not:

```
Blogs are ordered according to likes with wait between clicks
Blogs are ordered according to likes no wait between clicks
```

Depending on your system, it could happen that the test that does not wait fails. If that is the case, please run the test again. This is mainly due to the fact that Cypress clicks "too fast" and the backend does not have time to update the likes before the test checks the order of the blogs.