SET SQL_SAFE_UPDATES = 0;

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
		("Zelda's Master Sword", "Weapons", 13000, 19), 
		("Cloud's Buster Sword", "Weapons", 777, 15), 
		("Half-Life 2's Gravity Gun", "Weapons", 333, 2), 
		("Portal's Portal Gun", "Weapons", 1234, 3), 
		("Minecraft's Diamond Armor", "Armor", 35000, 1),
		("World of Warcraft's Tier 5 Warlock Armor", "Armor", 400, 5),
        ("Darth Vader's Armor", "Armor", 1977, 9),
        ("Save Crystals", "Helpful", 57, 15),
        ("Blue Shell", "Helpful", 64, 8),
        ("Pokeball", "Helpful", 807, 122)
        ;

SELECT * FROM products;