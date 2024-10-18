#!/bin/sh

# # Run Prisma commands
# echo "Generating Prisma Client..."
pnpm dlx prisma generate

# # echo "Running Prisma migrations..."
pnpm dlx prisma migrate dev

echo "Database setup complete. Populating data base..."

echo $1

# Delete all records from tables
psql $1 -c "DELETE FROM \"InventoryTransaction\";"
psql $1 -c "DELETE FROM \"Product\";"
psql $1 -c "DELETE FROM \"Supplier\";"
psql $1 -c "DELETE FROM \"Category\";"

# Insert categories
psql $1 <<EOF
INSERT INTO "Category" (id, name, description) VALUES 
(1, 'Electronics', 'Devices and gadgets'),
(2, 'Books', 'Printed and digital books'),
(3, 'Clothing', 'Apparel and accessories');
EOF

# Insert suppliers
psql $1 <<EOF
INSERT INTO "Supplier" (id, name, "contactPerson", phone, email, address, website) VALUES 
(1, 'Global Tech Supplies', 'John Doe', '555-1234', 'johndoe@globaltech.com', '123 Tech Avenue, Silicon City', 'https://www.globaltechsupplies.com'),
(2, 'Book Haven Distributors', 'Jane Smith', '555-5678', 'janesmith@bookhaven.com', '456 Literature Lane, Booktown', 'https://www.bookhavendistributors.com'),
(3, 'Fashion Hub', 'Mike Johnson', '555-8765', 'mikejohnson@fashionhub.com', '789 Style Street, Fashion City', 'https://www.fashionhub.com');
EOF

# Insert products
psql $1 <<EOF
INSERT INTO "Product" (id, name, "categoryId", "supplierId", price, "quantity_in_stock", "restock_date", description, sku) VALUES 
(1, 'Smartphone X200', 1, 1, 699.99, 150, '2024-12-01', 'A high-end smartphone with cutting-edge features.', 'ELEC-SMX200'),
(2, 'Wireless Headphones', 1, 1, 199.99, 200, '2024-11-15', 'Noise-cancelling over-ear headphones.', 'ELEC-WH001'),
(3, 'Modern JavaScript Book', 2, 2, 39.99, 300, NULL, 'An in-depth guide to modern JavaScript.', 'BOOK-JS2024'),
(4, 'Classic Literature Set', 2, 2, 99.99, 50, '2024-11-20', 'A collection of classic literary works.', 'BOOK-CLSSET'),
(5, 'Mens Leather Jacket', 3, 3, 249.99, 75, '2024-12-05', 'Premium quality leather jacket for men.', 'CLOT-MLJKT'),
(6, 'Womens Designer Handbag', 3, 3, 349.99, 40, '2024-11-25', 'Elegant handbag crafted with fine materials.', 'CLOT-WDHBG');
EOF

# Insert inventory transactions
psql $1 <<EOF
INSERT INTO "InventoryTransaction" (id, "productId", "transactionType", quantity, date, remarks) VALUES 
(1, 1, 'restock', 150, '2024-10-01T09:00:00Z', 'Initial stock received from supplier.'),
(2, 2, 'restock', 200, '2024-10-02T10:30:00Z', 'Initial stock received from supplier.'),
(3, 3, 'restock', 300, '2024-10-03T11:15:00Z', 'Initial stock received from supplier.'),
(4, 4, 'restock', 50, '2024-10-04T12:45:00Z', 'Initial stock received from supplier.'),
(5, 5, 'restock', 75, '2024-10-05T13:30:00Z', 'Initial stock received from supplier.'),
(6, 6, 'restock', 40, '2024-10-06T14:00:00Z', 'Initial stock received from supplier.'),
(7, 1, 'sale', -20, '2024-10-10T15:20:00Z', 'Sold 20 units online.'),
(8, 3, 'sale', -50, '2024-10-11T16:00:00Z', 'Sold 50 units in-store.'),
(9, 5, 'sale', -10, '2024-10-12T17:15:00Z', 'Sold 10 units wholesale.'),
(10, 2, 'adjustment', -5, '2024-10-13T18:45:00Z', 'Damaged items removed from stock.');
EOF

echo "Data has been inserted successfully."
