var mysql      = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'merchant',
  password : 'merchantpassword',
  database : 'Bamazon'
});
 

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'merchant',
  password : 'merchantpassword',
  database : 'Bamazon'
});
 


connection.connect(function(err) {
    if (err) throw err;
    console.log("\nWelcome to Bamazon: Manager View\n");
    afterConnect();
});


function afterConnect() {
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'menu_options',
        message: "Please select the action you would like:\n",
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ])
    .then(answers => {
        switch(answers.menu_options) {
            case 'View Products for Sale':
                viewProducts();
            break;
            case 'View Low Inventory':
                viewInventory();
            break;
            case 'Add to Inventory':
                addInventory();
            case 'Add New Product':
                addProduct();
            break;
        }
    })
}

function viewProducts() {
    connection.query('SELECT * FROM products;', function (error, results, fields) {
        if (error) throw error;
        
        for (const value of results) {
            console.log("Item Id: " + value.item_id);
            console.log("Product Name: " + value.product_name);
            console.log("Price: $" + value.price);
            console.log("Stock Quantity: " + value.stock_quantity);
            console.log("\n----------------------------------- \n")
        }
    })

}

function viewInventory() {
    console.log("Manager would like to view low inventory.");
        var queryString = 'SELECT * FROM products WHERE stock_quantity < 5 ;'
        connection.query(queryString, function(error, results) {
            if (error) throw error;
            for (const value of results) {
                console.log("Item Id: " + value.item_id);
                console.log("Product Name: " + value.product_name);
                console.log("Price: $" + value.price);
                console.log("Stock Quantity: " + value.stock_quantity);
                console.log("\n----------------------------------- \n")
            }
        });
    };

function addInventory() {
    console.log("manager would like to add to inventory.");
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'add_stock',
        message: "Please type the item ID of the product that you would like to add stock to:\n",        
        },
        {
        type: 'input',
        name: 'add_numb',
        message: "Please type the amount of stock you are adding to this item:\n",        
        }
    ])
    .then(answers => {
        var queryString = 'SELECT * FROM products WHERE item_id = ?;'
        var filter = [itemID];
        connection.query(queryString, filter, function(error, results) {
            if (error) throw error;
        });

    });
}

function addProduct() {
    console.log("Manager would like to add a new product.")
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'menu_options',
        message: "Please select the action you would like:\n",
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ])
    .then(answers => {
        var queryString = 'SELECT * FROM products WHERE item_id = ?;'
        var filter = [itemID];
        connection.query(queryString, filter, function(error, results) {
            if (error) throw error;
        });

    });
}
