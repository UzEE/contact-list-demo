# Contact List Demo
A demo app to explore Ember.js. This app is using a backend server runing on Sails.js.

## Installation

Make sure you have at least the latest LTS Release of Node.js. If not, you can [download 
it from here](https://nodejs.org/en/download/). Once you have Node installed, run:

```
> git clone https://github.com/UzEE/contact-list-demo.git
> cd contact-list-Demo
> npm -i g sails bower ember-cli@2.10
```

Once the pre-requisites are installed, you need to setup and launch the API server.

```
> cd api-server
> npm install
> sails lift
```

Sails should now be up and running on [http://localhost:1337](http://localhost:1337). 
Next we need to setup and launch our Ember.js app.

```
> cd ..
> cd web-app
> npm install 
> bower install
> ember serve
```

The Ember.js will be up and running at [http://localhost:4200](http://localhost:4200) by
default. If you need to build the app, run:

```
> ember build -prod
```

Ember will place the build output in the `/dist ` sub-directory. You may want to change 
the default API host name if your deployment machine would be running the server on another
URL. You can do that in your `config/environment.js` file.

```js
// ...
  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created

    // This is where your models will be served from. Expects a JSON API.
    API_HOST: 'http://localhost:1337'
  }
// ...
```

This should get the Ember app up and running.

## Todo

I'm tracking the progress of the app here.

- [x] Create a basic layout for the app.
- [x] Create a simple backend API to server data.
- [x] Create basic CRUD structure for models.
  - [x] Create a new screen.
  - [x] Create an edit screen.
  - [x] Create remove behaviours.
- [x] Handle responsiveness issues for small screens.
  - [x] Works on tablets.
  - [x] Works on phones.
- [ ] Create an image crop and upload component.
  - [x] Show default (randomly generated) avatar image if no image uploaded.
  - [ ] Implement a component in a modal to handle picture upload and cropping 
        workflow.
  - [ ] Add cropping logic (using `canvas`) or a library to provide a cropping interface.
  - [ ] Implement a file uploader to our custom backend server (possibly using 
        native `FormData`).
  - [ ] Add support for drag / drop pictures (nice to have).
- [x] Refactor code to make sure we follow Ember.js practices.
- [ ] Use a better Modal component than `confirm`.
- [ ] Load occupation enum list from server.
- [ ] Write unit and acceptance tests.
- [ ] Improve error handling and responses.
