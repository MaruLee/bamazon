SET SQL_SAFE_UPDATES = 0;

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(200),
    department_name VARCHAR(50),
    price DECIMAL(10, 2),
    stock_quantity INTEGER (99)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES 
		("Master Sword", "Weapons", 13000, 19), 
		("Buster Sword", "Weapons", 777, 15), 
		("Gravity Gun", "Weapons", 333, 2), 
		("Portal Gun", "Weapons", 1234, 3), 
		("Diamond Armor", "Armor", 35000, 1),
		("Tier 5 Warlock Armor", "Armor", 400, 5),
        ("Darth Vader's Armor", "Armor", 1977, 9),
        ("Save Crystals", "Helpful", 57, 15),
        ("Blue Shell", "Helpful", 64, 8),
        ("Pokeball", "Helpful", 807, 122)
        ;

SELECT * FROM products;