import sqlite3 as sql   # Allows writing SQL queries/syntax in Python

# this function includes customer and address
def insert_customer(first_name, last_name, company, email, phone, street_address, city, state, country, zip_code):
    # SQL statement to insert into database goes here. Writing SQL in Python
	with sql.connect("app.db") as con:   # the connections name is 'con'
		cur = con.cursor()     # cursor is a functionality of sqlite3
		cur.execute("INSERT INTO customers (first_name, last_name, company, email, phone) VALUES (?,?,?,?,?)",(first_name, last_name, company, email, phone))
		customer_id = cur.lastrowid    
        cur.execute("INSERT INTO addresses (customer_id, street_address, city, state, country, zip_code) VALUES (?,?,?,?,?,?)", (customer_id, street_address, city, state, country, zip_code))
        con.commit() # saves it

def retrieve_customers():
    # SQL statement to query database goes here (to get all the customer back)
    # it will convert all the rows into a dictionary format. 
    with sql.connect("app.db") as con:
    	con.row_factory = sql.Row
    	cur = con.cursor()
    	result = cur.execute("SELECT * FROM customers").fetchall()
    return result


def insert_order(customer_id, name_of_part, manufacturer_of_part):
    with sql.connect("app.db") as con:
        cur = con.cursor()
        cur.execute("SELECT order_id FROM orders WHERE name_of_part = ? AND manufacturer_of_part = ?", (name_of_part, manufacturer_of_part))
        order_id = cur.fetchone()
        if order_id is None:
            cur.execute("INSERT INTO orders (name_of_part, manufacturer_of_part) VALUES (?,?)", (name_of_part, manufacturer_of_part))
            order_id = cur.lastrowid
        else:
            order_id = order_id[0]
        cur.execute("INSERT INTO customer_orders (order_id, customer_id) VALUES (?,?)", (order_id, customer_id))
        con.commit()

def retrieve_orders():
    with sql.connect("app.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        result = cur.execute("SELECT customer_id, name_of_part, manufacturer_of_part FROM customer_orders JOIN orders ON customer_orders.order_id = orders.order_id").fetchall()
    return result
 