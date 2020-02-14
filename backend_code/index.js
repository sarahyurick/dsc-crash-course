// Import express
const express = require('express');
//Import controller
const controller = require('./controller');
// Initialize the app
const app = express();
//Use to parse JSON request bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded());
// Setup server port
var port = process.env.PORT || 3000;
//Route "/" endpoint to the controller
app.use('/', controller);
// Launch app to listen to specified port
app.listen(port, function() {
    console.log('Running dsc-crash-course on port ' + port);
});
