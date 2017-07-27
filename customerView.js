var inquire = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({

	host: "localhost",
	port: 8889,
	user: "root",
	password: 'root',
	database: "bamazon"

});

connection.connect(function(err) {
  if (err) throw err;
});

connection.query("select * from `products`", function(err, rows) {
    
    if (err) return err;
	rows.forEach(function(value) {
		console.log("Item ID: " + value.item_id + " | Product Name: " + value.product_name + " | Price: $" + value.price + " | Stock: " + value.stock_quantity);
		console.log("__________________________________________________________________________");
	})
	customerPrompt();
	
});


function customerPrompt() {
    inquire.prompt([
		{
			type: 'text',
			message: 'Enter the Item ID of the product you wish to purchase: ',
			name: 'item',
			validate: function(value) {
				return (parseInt(value) > 0 && !isNaN(value));
			}
		},
		{	
			type: 'text',
			message: 'How many of the item would you like to purchase?',
			name: 'quantity',
			validate: function(value) {
				return (parseInt(value) > 0 && !isNaN(value));
			}

		}
	]).then(function(user){

		var quantity;
		var queryCheck = "select `item_id`,`stock_quantity`from `products` where `item_id` = ? and `stock_quantity` >= ?";
		connection.query(queryCheck, [user.item, user.quantity], function(err, rows) {

			if(rows.length > 0){
				quantity = parseInt(rows[0].stock_quantity);
				
				var queryUpdate = "UPDATE `products` SET `stock_quantity` = ? WHERE `item_id` = ?";
				connection.query(queryUpdate,[quantity - parseInt(user.quantity), user.item], function(err, result){
					if (err) throw err;
			 	
			  		console.log('You purchased ' + result.changedRows + ' of item #' + user.item);
				})
				
			}
			else{
			
				console.log("There is not enough of that item in stock.");	
				customerPrompt();
			}

			connection.end();

		});
	});
}




