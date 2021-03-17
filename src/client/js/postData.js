const fetch = require("node-fetch");

/*Function to Post data*/
async function postData(url, newPostData) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'Data': newPostData }) //body data responding to request from post route
    })
    try {
        return res;
    }
    catch (error) {
        console.log('Error posting data:', error);
    }
}

export { postData }