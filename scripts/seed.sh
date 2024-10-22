#!/bin/sh

# # Run Prisma commands
# echo "Generating Prisma Client..."
pnpm dlx prisma generate

# # echo "Running Prisma migrations..."
pnpm dlx prisma migrate dev

echo "Database setup complete. Populating data base..."

echo "Database: " $DATABASE_URL

# Delete all records from tables
psql $DATABASE_URL -c "DELETE FROM \"InventoryTransaction\";"
psql $DATABASE_URL -c "DELETE FROM \"Product\";"
psql $DATABASE_URL -c "DELETE FROM \"Supplier\";"
psql $DATABASE_URL -c "DELETE FROM \"Category\";"

# Insert categories
psql $DATABASE_URL <<EOF
INSERT INTO "Category" (id, name, description) VALUES 
(10001, 'Electronics', 'Devices and gadgets'),
(10002, 'Books', 'Printed and digital books'),
(10003, 'Clothing', 'Apparel and accessories');
EOF

# Insert suppliers
psql $DATABASE_URL <<EOF
INSERT INTO "Supplier" (id, name, "contactPerson", phone, email, address, website) VALUES 
(10001, 'Global Tech Supplies', 'John Doe', '555-1234', 'johndoe@globaltech.com', '123 Tech Avenue, Silicon City', 'https://www.globaltechsupplies.com'),
(10002, 'Book Haven Distributors', 'Jane Smith', '555-5678', 'janesmith@bookhaven.com', '456 Literature Lane, Booktown', 'https://www.bookhavendistributors.com'),
(10003, 'Fashion Hub', 'Mike Johnson', '555-8765', 'mikejohnson@fashionhub.com', '789 Style Street, Fashion City', 'https://www.fashionhub.com');
EOF

# Insert products
psql $DATABASE_URL <<EOF
INSERT INTO "Product" (id, name, "categoryId", "supplierId", price, "quantity_in_stock", "restock_date", description, sku) VALUES 
(10001, 'Smartphone X200', 1, 1, 699.99, 150, '2024-12-01', 'A high-end smartphone with cutting-edge features.', 'ELEC-SMX200'),
(10002, 'Wireless Headphones', 1, 1, 199.99, 200, '2024-11-15', 'Noise-cancelling over-ear headphones.', 'ELEC-WH001'),
(10003, 'Modern JavaScript Book', 2, 2, 39.99, 300, NULL, 'An in-depth guide to modern JavaScript.', 'BOOK-JS2024'),
(10004, 'Classic Literature Set', 2, 2, 99.99, 50, '2024-11-20', 'A collection of classic literary works.', 'BOOK-CLSSET'),
(10005, 'Mens Leather Jacket', 3, 3, 249.99, 75, '2024-12-05', 'Premium quality leather jacket for men.', 'CLOT-MLJKT'),
(10006, 'Womens Designer Handbag', 3, 3, 349.99, 40, '2024-11-25', 'Elegant handbag crafted with fine materials.', 'CLOT-WDHBG');
EOF

# Insert inventory transactions
psql $DATABASE_URL <<EOF
INSERT INTO "InventoryTransaction" (id, "productId", "transactionType", quantity, date, remarks) VALUES 
(10001, 10001, 'restock', 150, '2024-10-01T09:00:00Z', 'Initial stock received from supplier.'),
(10002, 10002, 'restock', 200, '2024-10-02T10:30:00Z', 'Initial stock received from supplier.'),
(10003, 10003, 'restock', 300, '2024-10-03T11:15:00Z', 'Initial stock received from supplier.'),
(10004, 10004, 'restock', 50, '2024-10-04T12:45:00Z', 'Initial stock received from supplier.'),
(10005, 10005, 'restock', 75, '2024-10-05T13:30:00Z', 'Initial stock received from supplier.'),
(10006, 10006, 'restock', 40, '2024-10-06T14:00:00Z', 'Initial stock received from supplier.'),
(10007, 10001, 'sale', -20, '2024-10-10T15:20:00Z', 'Sold 20 units online.'),
(10008, 10003, 'sale', -50, '2024-10-11T16:00:00Z', 'Sold 50 units in-store.'),
(10009, 10005, 'sale', -10, '2024-10-12T17:15:00Z', 'Sold 10 units wholesale.'),
(100010, 10002, 'adjustment', -5, '2024-10-13T18:45:00Z', 'Damaged items removed from stock.');
EOF

echo "Data has been inserted successfully."
