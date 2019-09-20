# Weatherapp

There was a beautiful idea of building an app that would show the upcoming weather. The developers wrote a nice backend and a frontend following the latest principles and - to be honest - bells and whistles. However, the developers did not remember to add any information about the infrastructure or even setup instructions in the source code.

Luckily we now have [docker compose](https://docs.docker.com/compose/) saving us from installing the tools on our computer, and making sure the app looks (and is) the same in development and in production. All we need is someone to add the few missing files!

## Returning your solution

### Via github

* Make a copy of this repository in your own github account (do not fork unless you really want to be public).
* Create a personal repository in github.
* Make changes, commit them, and push them in your own repository.
* Send us the url where to find the code.

## Exercises

There are a few things you must do to get the app up and running. After that there are a few things you can do to make it better.

### Mandatory

* Get yourself an API key to make queries in the [openweathermap](http://openweathermap.org/).

* Either run the app locally (using `npm i && npm start`) or move to the next step.

### Optional (do as many as you like)

* The application now only reports the current weather. It should probably report the forecast e.g. a few hours from now. (tip: [openweathermap api](https://openweathermap.org/forecast5))

* There are [eslint](http://eslint.org/) errors. Sloppy coding it seems. Please help.

* The app currently reports the weather only for location defined in the *backend*. Shouldn't it check the browser location and use that as the reference for making a forecast? (tip: [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation))

* There are no tests. Where are the tests? (tip: [mocha](https://mochajs.org/) or [robot framework](http://robotframework.org/)) Disclaimer: this is not an easy task. If you really want to try writing robot tests, start by creating a third container that gives expected weather data, and direct the backend queries there by redefining the **MAP_ENDPOINT**.
