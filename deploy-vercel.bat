@echo off
echo ================================
echo Deploying to Vercel
echo ================================
echo.

REM Check if vercel is installed
where pnpm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] pnpm is not installed!
    exit /b 1
)

echo Step 1: Checking Vercel authentication...
echo.

REM Login to Vercel
call pnpm vercel login

if %errorlevel% neq 0 (
    echo.
    echo [FAILED] Vercel login failed!
    exit /b 1
)

echo.
echo Step 2: Deploying to Vercel (Preview)...
echo.

REM Deploy to Vercel preview
call pnpm vercel

if %errorlevel% neq 0 (
    echo.
    echo [FAILED] Deployment failed!
    exit /b 1
)

echo.
echo ================================
echo [SUCCESS] Preview deployment complete!
echo ================================
echo.
echo To deploy to production, run:
echo   pnpm vercel --prod
echo.
