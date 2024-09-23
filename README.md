# Weather-Journal App

## Table of Contents

* [Author](#author)
* [Project Link](#project-link)
* [Description](#description)
* [Technologies](#technologies)
* [Setup](#setup)

## Author

* **Greg Reyes**

## Project Link

* https://weather-app.gregreyes.dev/

## Description

An asynchronous web app that utilizes the Web API and user data to dynamically update the UI.

## Technologies

JavaScript, Node.js, Express.js

## Setup

This app uses the dotenv NPM package. Create a `.env` file on the root directory and add the following environment variable:
* `WEATHER_URL='https://api.openweathermap.org/data/2.5/weather?{you_secret_api_key}`

To get an api key, sign up for a free account at [openweathermap.org](https://openweathermap.org/)

```sh
git clone https://github.com/gregoryreyes/weather-app.git;
cd weather-app;
npm install;
npm start;
```