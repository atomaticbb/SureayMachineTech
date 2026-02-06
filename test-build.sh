#!/bin/bash

echo "================================"
echo "Testing Local Build"
echo "================================"

# 1. Clean previous build
echo ""
echo "Step 1: Cleaning previous build..."
rm -rf dist/public

# 2. Run build
echo ""
echo "Step 2: Building project..."
pnpm run build

# 3. Check build result
if [ -d "dist/public" ]; then
    echo ""
    echo "✓ Build successful!"
    echo ""
    echo "Build output:"
    ls -lh dist/public
    echo ""

    # 4. Preview locally
    echo "Step 3: Starting preview server..."
    echo "Press Ctrl+C to stop the server"
    echo ""
    pnpm run preview
else
    echo ""
    echo "✗ Build failed! Please check the errors above."
    exit 1
fi
