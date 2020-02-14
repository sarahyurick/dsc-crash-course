// Import express
const express = require('express');
//Import controller
const controller = require('./controller');
// Initialize the app
const app = express();
// this is a hack so that we can access localhost:8080 from an outside source.
// IRL you should try to restrict this to a specific domain.
const cors = require('cors');
app.use(cors());
//Use to parse JSON request bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded());
// Setup server port
var port = process.env.PORT || 3000;
//Route "/" endpoint to the controller
app.use('/', controller);
// Launch app to listen to specified port
app.listen(port, () => console.log('Running dsc-crash-course on port ' + port));
