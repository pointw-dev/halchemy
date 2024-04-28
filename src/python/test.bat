@echo off
rd allure-results /s/q >nul 2>nul
pytest --alluredir allure-results
move allure-report/history allure-results
call allure generate --clean
call allure open
