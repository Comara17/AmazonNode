create database bamazon;

use bamazon;

create table products (
	item_id int auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100),
    price decimal (10, 2) not null,
    stock_quantity int(10) not null,
    primary key(item_id)
);

select * from products;

insert into products (product_name, department_name, price, stock_quantity) 
values 
("Harry Potter", "Books", 19.99, 99),
("The Watchmen", "Movies & TV Shows", 9.99, 17),
("The Legend of Zelda", "Video Games", 59.99, 120),
("Gundam Model", "Arts & Crafts", 29.99, 8),
("Gibson Guitar", "Musical Instruments", 1299.99, 3),
("Peanut Butter", "Groceries", 3.49, 800),
("Nvidia GTX 1080TI", "Electronics", 799.99, 0),
("The Mona Lisa", "Art", 99999999.99, 1),
("Xbox One X", "Potatoes", 499.99, 20),
("MacBook Pro", "Computers", 4999.99, 5000);
