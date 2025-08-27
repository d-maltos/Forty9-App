@echo off
echo Setting up Forty9 development environment...
echo.

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Setting up environment file...
if not exist .env (
    copy .env.example .env
    echo Environment file created. Please update .env with your settings.
) else (
    echo Environment file already exists.
)

echo.
echo Setting up database...
call npx prisma generate
if %errorlevel% neq 0 (
    echo Failed to generate Prisma client
    pause
    exit /b 1
)

call npx prisma db push
if %errorlevel% neq 0 (
    echo Failed to push database schema
    pause
    exit /b 1
)

echo.
echo ================================
echo Setup complete! 
echo.
echo To start the development server:
echo   npm run dev
echo.
echo Then open http://localhost:3000 in your browser
echo ================================
pause
