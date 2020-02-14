// Initialize express router
const router = require('express').Router();
//Import sqlite module
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
//Initialize database and open a connection
//Define the db to be created in memory and error check
let db = new sqlite3.Database(':memory:', function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to todolist.db SQlite database');
    //Create our table
    var initTablesQuery = 'CREATE TABLE todolist (id INTEGER PRIMARY KEY AUTOINCREMENT, item CHAR(50))';
    db.run(initTablesQuery);
});

//Define default API response
router.get(
    '/',
    //Define function to handle request
    function(req, res) {
        //Return the 200 (OK) status, and a JSON object
        res.status(200).json({
            status: 'API is Working',
            message: 'Welcome to the dsc-crash-course page',
        });
    },
);

//Define GET todolist endpoint
router.get(
    '/todolist',
    //Function to handle request
    function(req, res) {
        //SQL query for todo list items
        const query = 'SELECT * FROM todolist ORDER BY id';
        //Run query and process returned data
        db.all(query, [], function(err, todolist) {
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
    },
);

//Define POST /todolist endpoint
router.post(
    '/todolist',
    //Function to handle request
    function(req, res) {
        //Get request the item to add to the list
        var id = req.body.id;
        var item = req.body.item;
        //Insertion query
        const query = 'INSERT INTO todolist (item) VALUES(?)';
        //Insert new item into database
        db.run(query, [ item ], function(err, rows) {
            if (err) {
                res.status(500).json({
                    error: err,
                });
                return console.log(err.message);
            }

            // Get the last insert id
            console.log(`A new item has been added with id ${this.lastID}`);
            //Return the 200 (OK) status, and a JSON containing todolist
            res.status(200).json({
                message: 'Item added',
            });
        });
    },
);

//Define DELETE /todolist endpoint the {itemNumber} parameter
router.delete(
    '/todolist/:itemId',
    //Function to handle request
    function(req, res) {
        //Get request the item id from the path parameters
        var id = req.params.itemId;
        //Delete query
        const query = 'DELETE FROM todolist WHERE id=?';
        //Delete item from database
        db.run(query, [ id ], function(err) {
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
    },
);

//Export the router methods
module.exports = router;
