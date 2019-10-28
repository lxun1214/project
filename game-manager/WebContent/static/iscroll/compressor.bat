@echo off
rem author thinkgem@163.com
echo Compressor JS and CSS?
pause
cd %~dp0

cd ../
call compressor\compressor.bat iscroll\css\iscroll.css
call compressor\compressor.bat iscroll\js\iscroll.js

echo.
echo Compressor Success
pause
echo on