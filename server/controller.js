// Initialize express router
const router = require('express').Router();
//Import sqlite module
const sqlite3 = require('sqlite3').verbose();

//Initialize database and open a connection
//Define the db to be created or reopened in the local filesystem and error check
let db = new sqlite3.Database('./todo.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(res) {
    if (res) {
        return console.error(res.message);
    }
    console.log('Connected to todolist.db SQlite database');
    db.run('SELECT * FROM todolist', (res, err) => {
        if (res !== null) {
            db.run('CREATE TABLE todolist (id INTEGER PRIMARY KEY AUTOINCREMENT, item CHAR(50))');
        }
    });
});

//Define default API response
router.get(
    '/',
    //Define function to handle request
    (req, res) => {
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
    (req, res) => {
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
    (req, res) => {
        //Get request the item to add to the list
        let id = req.body.id;
        let item = req.body.item;
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

// PUT endpoint to update a todo item with a given id
router.put('/todolist', (req, res) => {
    let id = req.body.id;
    let item = req.body.item;
    const query = 'REPLACE INTO todolist (id, item) VALUES(?, ?)';
    // update database item with given id
    db.run(query, [ id, item ], (err) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
            return console.log(err.message);
        }
        // Return the 200 (OK) status, and the row of the modified item
        res.status(200).json({
            message: `Item with id ${this.changes} updated`,
        });
    });
});

router.delete(
    '/todolist/:itemId',
    //Function to handle request
    (req, res) => {
        //Get request the item id from the path parameters
        let itemId = req.params.itemId;
        //Delete query
        const query = 'DELETE FROM todolist WHERE id=?';
        //Delete item from database
        db.run(query, [ itemId ], function(err) {
            if (err) {
                res.status(500).json({
                    error: err,
                });
                return console.log(err.message);
            }
            //Return the 200 (OK) status, and the row of the deleted item
            res.status(200).json({
                message: `Item with id ${this.changes} deleted`,
            });
        });
    },
);

//Export the router methods
module.exports = router;
