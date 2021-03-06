//npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');

//SQL database connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cumbersome',
    database: "bamazon"
});
con.connect(function (error) {
    if (error) throw error;
    console.log('Connected!');
    initialMenu();
});

//the welcome greeting displayed to the user
function initialMenu() {
    console.log("Welcome to Tom Nook's!");
    buyPrompt();
};

//mysql query pulls list of items
//inquirer prompt asks user for id and quantity of the item they wish to buy
//query checks stock and totals the cost for the user, then subtracts the amount purchased from the DB
function buyPrompt() {
        con.query('SELECT * FROM products;', function (error, results) {
        if (error) throw error;
        var promise1 = new Promise(function(resolve, reject) {
            displayInventory(setInventory(results));
            resolve();
        })
        promise1.then(function() {
            askQuestions();
        })
    })
};

//If another purchase is to be made 
function anotherBuy() {
    inquirer.prompt([
        {
            name: "answer",
            type: "list",
            message: "Can I get you anything else?",
            choices: ["Yes", "No"]
        }
    ])
        .then(function (userInput) {
            if (userInput.answer == "Yes") {
                buyPrompt();
            }
            else {
                console.log("Thank you, enjoy your adventure!");
            }
        })
};

function setInventory(queryResults) {
    var inventory = [];
    for (let i = 0; i < queryResults.length; i++) {
        inventory.push(queryResults[i]);
    }
    return inventory;
}

function displayInventory(inventory) {
    inventory.forEach(function (element) {
        console.log(
            "item no.: "
            + element.item_id + " | "
            + element.product_name + " | "
            + element.department_name + " | Bells "
            + element.price + " | "
            + element.stock_quantity
        );
    })
}

function askQuestions() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What would you like to purchase? Please enter the item number"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }
    ])
        .then(function (userInput) {
            con.query('SELECT * FROM products WHERE item_id=' + userInput.item_id + ';', function (error, results) {
                if (error) throw error;
                if (results[0].stock_quantity < userInput.quantity) {
                    console.log("Oh sorry, we're sold out!");
                    anotherBuy();
                }
                else {
                    var buyQuantity = userInput.quantity;
                    inquirer.prompt([
                        {
                            name: "answer",
                            type: "list",
                            message: "You want " + userInput.quantity + " " + results[0].product_name +
                                ". That will be " + userInput.quantity * results[0].price + " Bells. Is that OK?"
                            ,
                            choices: ["Yes", "No"]
                        }
                    ])
                        .then(function (userInput) {
                            let newQuantity = results[0].stock_quantity - buyQuantity;
                            if (userInput.answer == "Yes") {
                                con.query('UPDATE products SET stock_quantity=' + newQuantity + ' WHERE item_id="' + results[0].item_id + '";', function (error, results){
                                    if (error) throw error;
                                    console.log("Thank you!")
                                    anotherBuy();
                                });
                            }
                            else {
                                anotherBuy();
                            }
                        })
                }
            })
        })
}