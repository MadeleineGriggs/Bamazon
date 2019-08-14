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
            break;
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
    connection.end();
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
        connection.end();
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
        var itemID = answers.add_stock;
        var itemQuantity = answers.add_numb;
        var queryString = 'SELECT * FROM products WHERE item_id = ?;'
        var filter = [itemID];
        
        connection.query(queryString, filter, function(error, results) {
            if (error) throw error;
            var quantityInStock = results[0].stock_quantity;
            var newQuantity = parseInt(quantityInStock) + parseInt(itemQuantity);
            console.log("\nYou would like to add stock to: " + results[0].product_name + ", item ID: " + itemID);
            console.log("You would like to add " + itemQuantity + " of this product.");
            console.log("\n--------------------------------------\n")
                updateStock(itemID, newQuantity);
            })

    });
}

function updateStock(itemID, newQuantity) {

    var itemID1 = itemID;
    var newQuantity1 = newQuantity;
    var queryString = 'UPDATE products SET stock_quantity=? WHERE item_id=?;';
    var filter = [newQuantity1, itemID1]
        connection.query(queryString,filter , function(error, results) {
            if (error) throw error;
            console.log("\nStock updated.");
        });
    connection.end();
}


function addProduct() {
    console.log("Manager would like to add a new product.")
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'product_name',
        message: "Please type the name of the product:\n",
        },
        {
        type: 'input',
        name: 'department_name',
        message: "Please type the department name:\n",
        },
        {
        type: 'input',
        name: 'price',
        message: "Please type the price of the product:\n",
        },
        {
        type: 'input',
        name: 'stock_quantity',
        message: "Please type amount of initial product stock:\n",
        }
    ])
    .then(answers => {
        var productName = answers.product_name;
        var departName = answers.department_name;
        var price = answers.price;
        var stockQuant = answers.stock_quantity;
        var queryString = 'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)'
        var filter = [productName, departName, price, stockQuant];
        connection.query(queryString, filter, function(error, results) {
            if (error) throw error;
            console.log("New Product Added.");
        });
        connection.end();
    });
}
