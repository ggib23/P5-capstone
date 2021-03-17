import { postData } from "../js/postData";

/* Function to send user input data to post */
async function handleSubmit() {
    // check what text was put into the form field
    let loc = await document.getElementById('location').value;
    const postURL = 'http://localhost:8800/inputSubmit';
    // call to post function
    await postData(postURL, loc);
}

export { handleSubmit }