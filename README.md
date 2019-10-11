# Weatherapp

## Installation

Since there is no docker setup in my solution, running in dev mode needs some installation... For both frontend and backend run:

`npm install`

Make sure that you have environment values set up. You can do this by creating .env -file to backend root folder. Needed environment parameters are:

`APPID=...`
`REFRESH_INTERVAL=10`

Run frontend and backend the same time and make sure you have default ports 3000 and 9000 available. Frontend runs using:

`npm start`

and backend runs using command:

`npm run dev`

## Running at localhost as docker containers

Make sure you have docker installed and run:

`docker run -d -p 9000:9000 -e APPID=<your_open_weather_api_key> rampemus/weatherapp-backend`

then you can run the frontend:

`docker run -p 3000:3000 rampemus/weatherapp-frontend`

and open frontend: [http://localhost:3000](http://localhost:3000)

## Exercises

Here is the list of exercises that are done in this git repository:

### Mandatory

* Get yourself an API key to make queries in the [openweathermap](http://openweathermap.org/).

* Either run the app locally (using `npm i && npm start`) or move to the next step.

* Add **Dockerfile**'s in the *frontend* and the *backend* directories to run them virtually on any environment having [docker](https://www.docker.com/) installed. It should work by saying e.g. `docker build -t weatherapp_backend . && docker run --rm -i -p 9000:9000 --name weatherapp_backend -t weatherapp_backend`. If it doesn't, remember to check your api key first.

### Optional (do as many as you like)

* The application now only reports the current weather. It should probably report the forecast e.g. a few hours from now. (tip: [openweathermap api](https://openweathermap.org/forecast5))

* There are [eslint](http://eslint.org/) errors. Sloppy coding it seems. Please help.

* The app currently reports the weather only for location defined in the *backend*. Shouldn't it check the browser location and use that as the reference for making a forecast? (tip: [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation))
