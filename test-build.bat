@echo off
echo ================================
echo Testing Local Build
echo ================================
echo.

REM 1. Clean previous build
echo Step 1: Cleaning previous build...
if exist "dist\public" rmdir /s /q "dist\public"

REM 2. Run build
echo.
echo Step 2: Building project...
call pnpm run build

REM 3. Check build result
if exist "dist\public" (
    echo.
    echo [SUCCESS] Build successful!
    echo.
    echo Build output:
    dir "dist\public"
    echo.

    REM 4. Preview locally
    echo Step 3: Starting preview server...
    echo Press Ctrl+C to stop the server
    echo.
    call pnpm run preview
) else (
    echo.
    echo [FAILED] Build failed! Please check the errors above.
    exit /b 1
)
