# Weatherapp

## Installation

Since there is no docker setup running in dev mode needs some installation. For both frontend and backend run:

`npm install`

Make sure that you have environment values set up. You can do this by creating .env -file to backend root folder. Needed environment parameters are:

`APPID=...`
`REFRESH_INTERVAL=10`

Run frontend and backend the same time and make sure you have default ports 3000 and 9000. Frontend runs using:

`npm start´

and backend runs using command:

`npm run dev`

## Exercises

Here is the list of exercises that are done in this git repository:

### Mandatory

* Get yourself an API key to make queries in the [openweathermap](http://openweathermap.org/).

* Either run the app locally (using `npm i && npm start`) or move to the next step.

### Optional (do as many as you like)

* The application now only reports the current weather. It should probably report the forecast e.g. a few hours from now. (tip: [openweathermap api](https://openweathermap.org/forecast5))

* There are [eslint](http://eslint.org/) errors. Sloppy coding it seems. Please help.

* The app currently reports the weather only for location defined in the *backend*. Shouldn't it check the browser location and use that as the reference for making a forecast? (tip: [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation))
