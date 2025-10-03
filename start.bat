@echo off
echo ======================================
echo   AI T-Shirt Designer
echo   Запуск Backend + Frontend
echo ======================================
echo.

echo [1/3] Проверка зависимостей backend...
cd server
if not exist node_modules (
    echo Устанавливаю зависимости backend...
    call npm install
) else (
    echo Backend зависимости уже установлены
)
echo.

echo [2/3] Запуск Backend сервера...
start "Backend Server" cmd /k "npm start"
echo Backend запускается на http://localhost:3001
echo.

echo [3/3] Ожидание 3 секунды...
timeout /t 3 /nobreak > nul
cd ..

echo Запуск Frontend...
start "Frontend Server" cmd /k "npm start"
echo.

echo ======================================
echo   Оба сервера запущены!
echo   Backend:  http://localhost:3001
echo   Frontend: http://localhost:3000
echo ======================================
echo.
echo Закройте это окно после того как откроется браузер
pause
