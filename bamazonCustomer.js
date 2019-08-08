var mysql      = require('mysql');
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
    });
     
    connection.end();
}

var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });