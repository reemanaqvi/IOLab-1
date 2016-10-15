drop table if exists customers;
create table customers (
	customer_id INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL, 
	company TEXT NOT NULL,
	email TEXT NOT NULL,
	phone INTEGER NOT NULL
	);

drop table if exists addresses;
create table addresses (
	address_id INTEGER PRIMARY KEY,
	street_address TEXT NOT NULL,
	city TEXT NOT NULL,
	state TEXT NOT NULL,
	country TEXT NOT NULL,
	zip_code INTEGER NOT NULL,
	-- customer has a one-to-many relationship to address
	customer_id INTEGER,
	FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
	);

drop table if exists orders;
create table orders (
	order_id INTEGER PRIMARY KEY,
	name_of_part TEXT NOT NULL,
	manufacturer_of_part TEXT NOT NULL
	);

-- customer has a many-to-many relationship to order
drop table if exists customer_orders;
create table customer_orders (
	customer_id INTEGER,
	order_id INTEGER,
	id INTEGER PRIMARY KEY,
	FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
	FOREIGN KEY (order_id) REFERENCES orders(order_id)
	);
