@echo off
echo ======================================
echo   Cleaning up project...
echo ======================================
echo.

REM Delete duplicate .jsx files
echo Removing duplicate .jsx files...
del /F /Q "src\components\ApiKeyInput.jsx" 2>nul
del /F /Q "src\components\DesignGallery.jsx" 2>nul
del /F /Q "src\components\PromptInput.jsx" 2>nul
del /F /Q "src\components\SettingsPanel.jsx" 2>nul

REM Delete unused test files
echo Removing test files...
del /F /Q "src\App.test.js" 2>nul
del /F /Q "src\setupTests.js" 2>nul

REM Delete unused files
echo Removing unused files...
del /F /Q "src\App.css" 2>nul
del /F /Q "src\reportWebVitals.js" 2>nul
del /F /Q "src\logo.svg" 2>nul
del /F /Q "src\services\package.json" 2>nul

REM Delete documentation files (keep only essentials)
echo Removing old documentation...
del /F /Q "NEXT_STEPS.md" 2>nul
del /F /Q "START_HERE.md" 2>nul

echo.
echo ======================================
echo   Cleanup complete!
echo ======================================
pause
