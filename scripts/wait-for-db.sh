#!/bin/sh

# Run Prisma commands
echo "Generating Prisma Client..."
pnpm dlx prisma generate

echo "Running Prisma migrations..."
pnpm dlx prisma migrate dev

echo "Database setup complete. Populating data base..."
./seed.sh