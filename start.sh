#!/bin/sh

echo "=== Starting Shredder Blades Website ==="

# Ensure database directory exists
echo "Creating database directory..."
mkdir -p /app/prisma/data

# Run database migration
echo "Running database migration..."
if pnpm db:migrate:prod; then
  echo "✓ Database migration completed successfully"
else
  echo "⚠ Migration failed, trying fallback method..."
  
  # Fallback to db:push if migration fails
  if pnpm prisma db push --accept-data-loss; then
    echo "✓ Database schema pushed successfully"
  else
    echo "✗ Failed to initialize database schema"
    exit 1
  fi
fi

# Seed database if it's empty (optional)
echo "Checking if database needs seeding..."
if pnpm db:seed 2>/dev/null; then
  echo "✓ Database seeded successfully"
else
  echo "ℹ Database seeding skipped (database may already contain data)"
fi

# Start the application
echo "Starting application..."
exec node dist/index.js