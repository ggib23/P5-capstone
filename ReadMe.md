# Project Overview

The goal of this project is to bring all of our newly learned skilled together with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

## Getting started

I followed the course to setup Webpack and get the basic project ready, then I continued on to setting up the APIs. This portion of the project can be reviewed in Project 4, Web API's and Asynchronous.

### Step 1: Signup for an API key

There were 3 APIs used for this project. Signing up gave me an API key, which I documented in my .env file. Env files should be included in .gitignore.

### Step 2: Environment Variables

The dotenv package will allow us to use .env variables, such as our API key. I installed dotenv and added its configuration at the top of the server.index.js file. This allowed me to access our API key in index.js without having it documented.

### Step 3: Using the API

Here you will create api requests to send text and receive data.

## After the API

- Parse the response body to dynamically fill content on the page.
- Test that the server and form submission work, making sure to also handle error responses.
- Use jest testing for one application .js file and one server .js file.
- Go back to the web pack config and add the setup for service workers. 
- Test that the site is now available even when you stop your local server

## Deploying

A great step to take with your finished project would be to deploy it! 

## Bonus/Extend Your Project Further

For my chosen project extension, I decided to add an image from the desired Country if an image for the city doesn't pull from the API.