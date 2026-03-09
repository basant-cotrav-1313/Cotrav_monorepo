@echo off
echo ===============================
echo CLEAN BUILD + DOCKER UP
echo ===============================

echo.
echo [1/6] Removing dist folders...
call npm run clean

echo.
echo [2/6] Building packages and services...
call npm run build

echo.
echo [3/6] Stopping all running containers...
call docker compose -f ../docker/docker-compose.yml down down

echo.
echo [4/6] Removing unused containers, images, volumes...
call docker system prune -f

echo.
echo [5/6] Building docker images...    
call docker compose -f ../docker/docker-compose.yml build --no-cache

echo.
echo [6/6] Starting containers...
call docker compose -f ../docker/docker-compose.yml up -d
echo.
echo ===============================
echo ALL SERVICES ARE UP 🚀
echo ===============================
