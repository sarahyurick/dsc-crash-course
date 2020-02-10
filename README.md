# Crash Course: Front End Development

## Understanding MV* Application Architecture

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eae09d7b-a76d-4f20-aedf-5a5a45e2061d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eae09d7b-a76d-4f20-aedf-5a5a45e2061d/Untitled.png)

In general, it's hard to maintain a non-modular codebase.  We accomplish this more easily by decoupling the ***model*** and the ***view.*** We'll cover the **"\*"** in the backend section.

### The Model

The model is responsible for the content found on a page of a web app.  It processes backend requests to fetch page data, and processes the data as necessary.  It feeds raw data to the view, without any information on how it should be displayed.

### The View

The view handles the presentation of the page.  It doesn't care what's being displayed, but it needs to look good.  It needs some interface to interact with the model so that it can retrieve the data.  There are many different approaches to this, some of which will be discussed later.

## Building a Front End

We're going to build a basic todo list application in Vue.js.  It's a lightweight frontend framework that uses the principles discussed previously.

### Installing Node.js and Vue.js

You'll need to install node.js from [https://nodejs.org/en/](https://nodejs.org/en/), or using your package manager of choice.  Once you've done that, install vue with `npm install -g @vue/cli`

### Creating a Project

We'll make a project called "todo-list" by running

`vue create todo-list`


# Crash Course: Back End Development
## The "\*" of MV* Architecture

While the model and the view organize and present the data for the frontend, the **"\*"**, most commonly the ***Controller***, is what manages the data and processing for the backend. This architecture is referred to as ***MVC***. There are other options, but the controller is probably the simplest, and most common.

## Controller
The controller is responsible for handling the application logic, taking input from the view, processing it, and updating the model, which then updates the view.

## REST APIs
The controller is the face of backend, and runs remotely on a server. The frontend, however, is viewed on a client's computer, separate from the backend. How the client and the server interact with each other is called the **REST API**.

The REST API is the API that other internet applications use to interact with your application. REST API calls come in the form of URLs. When you go to a website like `https://mywebsite.com/home` what you're doing is making an API call to the `mywesbite.com` server and telling it that you want to access whatever file or information is located at the `/home` endpoint. In a minute we'll see more about what a accessing a controller endpoint means.


## Building a Back End

We're going to build a backend REST API using Node.js. Our application will receive input from the client through our API, handle it, and then respond to the client by updating the model.

### Setting up the Project
Open up a terminal and navigate to the directory that you want to build your project in.
Type:</br></br>
```
> mkdir dsc-crash-course
> cd dsc-crash-course
> npm init
```
Change the data as you see fit. This will become your `package.json` file.

Now we are going to install our back end framework **ExpressJs**. ExpressJs provides us a selection of functions we can use to build a REST API. We'll see these function later.

In your terminal type:
```
> npm install express --save
```

Lastly, we want to install our database. For ease of use we'll be using `sqlite`, a lightweight database contained within our application so that we don't need to configure a separate SQL database. More commonly you'd create a `PostgreSQL, MSSQL, MySQL, etc` database. The way we access sqlite will be similar to that of these other common databases, and if you want to transition your application to using one of those databases it should be fairly simple.

Type:
```
> npm install sqlite3
```

Once it's downloaded with no errors, we can finally get to building the application.

### Building the Application

Now we want to create our main application file: `index.js`. Somewhat similar to how a java application will run the
```java
public static void main (String[] args){
  . . .
}
```
method when it runs, our Node.js application will run `index.js`. Here, we will define all of the configurations for our back end.

Go into your index.js file and add:
```js
// Import express
const express = require('express')
// Initialize the app
const app = express();
//Use to parse JSON request bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded());
// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running dsc-crash-course on port " + port);
});
```

Save and run ```node index``` in your terminal. You should see:
`"Running dsc-crash-course on port 8080"`

Now, if you open a browser and go to: `http://localhost:8080`, you should see `"Hello World with Express"`

### Restructuring the App

Now, although you could write your entire API in this one file, we picked the MVC architecture for the benefit of logical code separation. And if we're going to define a bunch of logic in how our API handles inputs, we probably shouldn't do it in the same file that configures our app for us.

So go ahead and create a `controller.js` file and open it. Here, we're going to redefine our `get endpoint` that we defined in the index.js file.

Add to your controller:
```js
// Initialize express router
const router = require('express').Router();

//Define default API response
router.get('/',
  //Define function to handle request
  function (req, res) {
      //Return the 200 (OK) status, and a JSON object
      res.status(200).json({
          status: 'API is Working',
          message: 'Welcome to the dsc-crash-course page',
      });
});

//Export the router methods
module.exports = router;
```

Lastly, we want to go back into our `index.js` file, add the line:
```js
//Import controller
const controller = require("./controller")
```

and replace:
```js
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
```
with:
```js
//Route "/" endpoint to the controller
app.use('/', controller);
```
Your index.js file should now look like:
```js
// Import express
const express = require('express')
//Import controller
const controller = require("./controller")
// Initialize the app
const app = express();
//Use to parse JSON request bodies
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded());
// Setup server port
var port = process.env.PORT || 8080;
//Route "/" endpoint to the controller
app.use('/', controller);
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running dsc-crash-course on port " + port);
});
```

Now, if we run `node index` again and return to our browser at `localhost:8080`, we should see the json that we defined in our controller: `{"status":"API is Working","message":"Welcome to the dsc-crash-course page"}`


### Using the Database
Now, we want the ability to store our data, and for this we need to use our `sqlite` database. Typically, the database access would be defined in another file, but for simplicity, we're going to handle the API requests and access the database in our controller.

Note: Although the queries are in SQLite syntax and are similar to most SQL database queries, the methods for creating, connecting, and querying those databases will vary depending on which one you choose. `db.run`, `db.all`, etc are not universal. You'll need to reference the documentation for your ipmlementation.

At the top of your `controller.js` file (after the router import) add the following code to create and connect to the database:
```js
//Import sqlite module
const sqlite3 = require('sqlite3').verbose();
//Initialize database and open a connection
//Define the db to be created in memory and error check
let db = new sqlite3.Database(':memory:', function(err) {
    if(err) {
        return console.error(err.message);
    }
    console.log('Connected to in memory SQlite database');
    //Create our table
    var initTablesQuery = 'CREATE TABLE todolist (item TEXT)';
    db.run(initTablesQuery);
});
```

### Creating our Endpoints
Now, we're going to define a new endpoint: `GET: /todolist` which will retrieve all the items in our todolist:
```js
//Define GET todolist endpoint
router.get('/todolist',
  //Function to handle request
  function (req, res) {
    //SQL query for todo list items
    const query = 'SELECT * FROM todolist';
    //Run query and process returned data
    db.all(query, [], function(err, todolist){
        if (err) {
            //If error, return error message
            res.status(500).json({
                error: err,
            });
            return console.log(err.message);
        }
        //Return the 200 (OK) status, and a JSON containing todolist
        res.status(200).json(todolist);
    });
});
```

If we were to run our app and try to access this endpoint at `localhost:8080/todolist`, we'd receive an empty json: `{}`. We need a way to add items to our list. Add the `POST /todolist` endpoint:

```js
//Define POST /todolist endpoint
router.post('/todolist',
  //Function to handle request
  function (req, res) {
    //Get request the item to add to the list  
    var newItem = req.body.item;
    //Insertion query
    const query = 'INSERT INTO todolist (item) VALUES(?)';
    //Insert new item into database
    db.run(query, [newItem], function(err, rows) {
        if (err) {
            res.status(500).json({
                error: err,
            });
            return console.log(err.message);
        }

        // Get the last insert id
        console.log(`A new item has been added with rowid ${this.lastID}`);
        //Return the 200 (OK) status, and a JSON containing todolist
        res.status(200).json({
            message: 'Item added',
        });
    });
});
```

Lastly, we want to be able to remove items from our list. We'll copy the same format as our previous endpoints, but instead run a query to delete our item by id. Add:
```js
//Define DELETE /todolist endpoint the {itemNumber} parameter
router.delete('/todolist/:itemNumber',
  //Function to handle request
  function (req, res) {
    //Get request the item id from the path parameters  
    var itemToDelete = req.params.itemNumber;
    //Delete query
    const query = 'DELETE FROM todolist WHERE rowid=?';
    //Delete item from database
    db.run(query, [itemToDelete], function(err) {
        if (err) {
            res.status(500).json({
                error: err,
            });
            return console.log(err.message);
        }
        //Return the 200 (OK) status, and the row of the deleted item
        res.status(200).json({
            message: `Item with item number ${this.changes} deleted`,
        });
    });
});
```

### Testing the Endpoints
Now, you are able to go into your browser at `localhost:8080/todolist` and get back an empty list of items. In order to add an item, we need to make a **POST** request, with a body containing a json defining the item we want to add.

For this, we will use Postman, which you can download here: https://www.postman.com/downloads/. Once it's installed and opened, make a new request, and enter `http://localhost:8080/todolist`. Be sure to run our back end server, and then hit **Send** in Postman. It should look like this:</br></br>
![](images/postmanGET.PNG)

Now, create another request, this time changing the method to **POST** and use the same URL to our endpoint. Click on Body, select raw, then from the dropdown menu on the right select JSON. Here enter:
```json
{
	"item" : "Buy groceries"
}
```
Click send. It should look like this:</br></br>
![](images/postmanPOST.PNG)

If you try the GET function again, it should return your "Buy groceries" item.  

Lastly, let's test the delete function. Make a new request, change the method to **DELETE**, use the same URL as the other two but add `/1` so you have `http://localhost:8080/todolist/1`.

Hit send. Then, go back to the get method and send again. It should return an empty array.

Great! Now we can add items, retrieve, and delete them from our database all via the REST API. There's one more HTTP method we should implement, PUT, which we would use for updating an item, given its ID. But we'll leave that up to you.
