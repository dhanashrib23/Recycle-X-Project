@echo off

if "%1"=="" (
    echo Usage: connectMysql [IP_ADDRESS]
    echo Example: connectMysql 198.234.43.43
    exit /b 1
)

mysql -h %1 -u W2_87325_Dhanashri -p