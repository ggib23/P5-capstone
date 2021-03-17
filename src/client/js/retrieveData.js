const fetch = require("node-fetch");
import { handleSubmit } from "../js/formHandler";

/* Function to GET Project Data stored in projectData {} "endpoint"*/
// returns 16 day forecast by default  
async function retrieveData(event) {
    event.preventDefault();
    // handleSubmit first needs to post the weather API data and return the data to the "endpoint", currentData{}
    await handleSubmit(); // once currentData has been set, /all can be called to
    const fetchAllData = await fetch('http://localhost:8800/all');
    const allData = await fetchAllData.json();
    // console.log(allData);
    const fetchMedia = await fetch('http://localhost:8800/media');
    const allImages = await fetchMedia.json();
    // console.log(allImages);
    const fetchMedia2 = await fetch('http://localhost:8800/countryImage');
    const countryImages = await fetchMedia2.json();
    // return input travel date values to display only necessary data
    const travelDate = document.getElementById('day').value;
    try {
        let travelDateIndex;
        let i = 0;
        for (i; i < 16; i++) {
            let indexDate = allData.data[i].datetime;
            if (travelDate.match(indexDate) !== null) {
                travelDateIndex = i;
            }
        }
        document.getElementById('dest').innerHTML = `Your trip to ${allData.city_name}, ${allData.state_code} is <b>${travelDateIndex} Days Away!</b>`;
        document.getElementById('date').innerHTML = `Departing Date: ${allData.data[travelDateIndex].datetime}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.data[travelDateIndex].temp} Degrees Celsius`;
        document.getElementById('precip').innerHTML = `Precipitation: ${allData.data[travelDateIndex].precip}`;
        document.getElementById('skies').innerHTML = `Skies: ${allData.data[travelDateIndex].weather.description}`;
        // if the fetch to pixaby does not return any hits
        if (allImages.hits[0]) {
            document.getElementById('mediaImage').innerHTML = `<img src="${allImages.hits[0].webformatURL}" id="cityImage" alt="${allData.city_name}, ${allData.state_code}"></img>`;
        } else {
            document.getElementById('mediaImage').innerHTML = `<img src="${countryImages.hits[0].webformatURL}" id="cityImage" alt="${allData.country_code}"></img>`;
        }
        return allData
    }
    catch (error) {
        console.log('Error retreiving data:', error);
        alert('Error retrieving data.');
    }
}

export { retrieveData }