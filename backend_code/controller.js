// Initialize express router
const router = require('express').Router();
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
