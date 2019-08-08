var mysql      = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'merchant',
  password : 'merchantpassword',
  database : 'Bamazon'
});
 


var started = false;

if (started === false) {
console.log("Welcome to Bamazon! \n");
started = true;
};
if (started == true){
    connection.connect();
 
    connection.query('SELECT * FROM products;', function (error, results, fields) {
      if (error) throw error;
      for (const value of results) {
          console.log("Item Id: " + value.item_id);
          console.log("Product Name: " + value.product_name);
          console.log("Price: $" + value.price);
          console.log("Stock Quantity: " + value.stock_quantity);
          console.log("\n----------------------------------- \n")
      }
      clientSelect();
    });
     
    // connection.end();
}


function clientSelect() {

    inquirer
    .prompt([
        {
        type: 'input',
        name: 'select_item',
        message: "Please type the item ID of the item you would like to purchase:\n "
        },
        {
        type: 'input',
        name: 'select_quantity',
        message: "Please type the quantity of the item you would like to purchase:\n "
        }
    ])
    .then(answers => {
        var itemID = answers.select_item;
        var itemQuantity = answers.select_quantity;
        var queryString = 'SELECT * FROM products WHERE item_id = ?;'
        var filter = [itemID];
        connection.query(queryString, filter, function(error, results) {
            if (error) throw error;
            var quantityInStock = results[0].stock_quantity;
            console.log("\nYou would like to purchase: " + results[0].product_name + ", item ID: " + itemID);
            console.log("You would like to purchase " + itemQuantity + " of this product.");
            console.log("\n--------------------------------------\n")
            if (itemQuantity > quantityInStock) {
                console.log("Sorry, we don't have enough of that product. There are " + quantityInStock + " of this product avaiable.\nPlease try your order again.");
            } else {
                console.log("Thank you for your purchase of " + itemQuantity + " " + results[0].product_name + ".");
            }
        });
        connection.end();

    });
}