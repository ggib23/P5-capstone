require('dotenv').config()
const path = require('path');
const fetch = require("node-fetch");
// Express to run server and routes
var express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// This line of code connects our server-side code to our client-side code
app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

/* Spin up the server, what port the app will listen to for incoming requests */
const port = 8800;
const server = app.listen(port, function () {
    console.log(`App is running on localhost: ${port}`);
})

/* Callback to GET all current data */
let currentData = {};
let foundMedia = {};
let foundMedia2 = {};
let locInfo = {};

app.get('/all', (req, res) => {
    // console.log(currentData);
    // console.log('------------------------- /all -------------------------');
    res.send(currentData);  // returns the JS Obj (route "endpoint") to the browser
})

app.get('/media', (req, res) => {
    // console.log(foundMedia);
    res.send(foundMedia); // returns the JS Obj (route "endpoint") to the browser
})

app.get('/countryImage', (req, res) => {
    // console.log(foundMedia2)
    res.send(foundMedia2);
})

/* API URLs */
let geoNamesURL = 'http://api.geonames.org/searchJSON?';
let weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
let pixabayURL = 'https://pixabay.com/api/?';

/* Personal API Keys accessed through .env file */
let myKey = process.env.GEONAMES_API_KEY;
let myKey2 = process.env.WEATHER_API_KEY;
let myKey3 = process.env.PIX_API_KEY;
// console.log(process.env);

/* Function to GET Web API Data*/
async function getWebApiData(url, key) {
    const res = await fetch(url + key)
    try {
        const apiData = await res.json();
        // console.log(apiData);
        // console.log('------------------------- apiData -------------------------')
        return apiData;
    } catch (error) {
        console.log("Error retrieving Web API Data:", error);
        alert("Error retrieving Web API Data!");
    }
}

/* Post Route to set data to route "endpoint", currentData{} */
app.post('/inputSubmit', async (req, res) => {
    try {
        // below declaration should return City, State values
        let locationData = req.body.Data; //req.body.Data is the input value (body:) given from the formHandler.js API call
        let splitLoc = locationData.split(',');
        let city = splitLoc[0];
        const apiKey = `q=${city}&maxRows=1&username=${myKey}`;
        // GEONAMES - returning latitude and longitude of input city to locInfo
        locInfo = await getWebApiData(geoNamesURL, apiKey);
        const lat = locInfo.geonames[0].lat;
        const lon = locInfo.geonames[0].lng;
        const apiKey2 = `lat=${lat}&lon=${lon}&key=${myKey2}`;
        const apiKey3 = `key=${myKey3}&q=${locationData}&image_type=photo&orientation=horizontal`;
        let apiKey4;
        // WEATHERBIT - returning weather data to currentData
        currentData = await getWebApiData(weatherURL, apiKey2);
        // PIXABAY - returning destination image to foundMedia
        foundMedia = await getWebApiData(pixabayURL, apiKey3);
        // if the travel city does not return an image this api request will be sent, returning an image of the country
        apiKey4 = `key=${myKey3}&category=places&q=${currentData.country_code}&image_type=photo&orientation=horizontal`;
        foundMedia2 = await getWebApiData(pixabayURL, apiKey4);
        // console.log(foundMedia2);
    } catch (error) {
        console.log('API Post Route error:', error);
        alert('API Post Route error!')
    }
    res.send(currentData);
})

module.exports = { app }