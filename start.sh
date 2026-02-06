#!/bin/sh

echo "=== Starting Shredder Blades Website ==="

# Ensure database directory exists
echo "Creating database directory..."
mkdir -p /app/prisma/data

# Ensure Prisma client is generated
echo "Generating Prisma client..."
if pnpm prisma generate; then
  echo "✓ Prisma client generated successfully"
else
  echo "✗ Failed to generate Prisma client"
  exit 1
fi

# Check if database file exists
DB_FILE="/app/prisma/data/database.db"
if [ ! -f "$DB_FILE" ]; then
  echo "Database file does not exist, creating new database..."
  
  # Try migration first
  echo "Attempting database migration..."
  if pnpm db:migrate:prod 2>/dev/null; then
    echo "✓ Database migration completed successfully"
  else
    echo "⚠ Migration failed, using schema push..."
    
    # Fallback to db:push to create tables
    if pnpm prisma db push --accept-data-loss --force-reset; then
      echo "✓ Database schema pushed successfully"
    else
      echo "✗ Failed to initialize database schema"
      echo "Database URL: $DATABASE_URL"
      ls -la /app/prisma/
      exit 1
    fi
  fi
else
  echo "Database file exists, checking schema..."
  
  # Verify tables exist by running a simple query
  if pnpm prisma db execute --stdin <<< "SELECT name FROM sqlite_master WHERE type='table';" >/dev/null 2>&1; then
    echo "✓ Database schema appears valid"
  else
    echo "⚠ Database exists but schema may be incomplete, pushing schema..."
    if pnpm prisma db push --accept-data-loss; then
      echo "✓ Database schema updated successfully"
    else
      echo "✗ Failed to update database schema"
      exit 1
    fi
  fi
fi

# Seed database if it's empty (optional)
echo "Checking if database needs seeding..."
if pnpm db:seed 2>/dev/null; then
  echo "✓ Database seeded successfully"
else
  echo "ℹ Database seeding skipped (database may already contain data)"
fi

# Final verification - test if we can query the Contact table
echo "Verifying database tables..."
if pnpm prisma db execute --stdin <<< "SELECT COUNT(*) FROM Contact;" >/dev/null 2>&1; then
  echo "✓ Database verification successful - Contact table exists"
else
  echo "✗ Database verification failed - tables do not exist"
  echo "Attempting final schema push..."
  pnpm prisma db push --accept-data-loss --force-reset
  if [ $? -ne 0 ]; then
    echo "✗ Final schema push failed"
    exit 1
  fi
fi

# Start the application
echo "Starting application..."
exec node dist/index.js