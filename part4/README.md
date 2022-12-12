Exercises 4.1 to 4.23 bloglist

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

## JEST tests

25 tests with 3 suites

Run them all with:
```
npm test
```

Or separately with:
```
npm test -- -t '{test name}'
```