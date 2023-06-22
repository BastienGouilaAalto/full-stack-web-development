Exercises 2.18 to 2.20 countries

Install the node packages with:

```
npm install
```

## Start the app:

You need an api-key to use almost every weather service.
You can get one from [OpenWeatherMap](https://openweathermap.org/).
Either create a file called .env in the root of the project and add the following line to it:

```
REACT_APP_API_KEY=YOUR_API_KEY
```
Then start the app with:

```
npm start
```

Or start the app with the api-key as an environment variable from command line:

```
REACT_APP_API_KEY=YOUR_API_KEY npm start // For Linux/macOS Bash
($env:REACT_APP_API_KEY="YOUR_API_KEY") -and (npm start) // For Windows PowerShell
set "REACT_APP_API_KEY=YOUR_API_KEY" && npm start // For Windows cmd.exe
```


