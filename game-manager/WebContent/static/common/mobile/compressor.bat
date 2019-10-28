@echo off
rem author thinkgem@163.com
echo Compressor JS and CSS?
pause
cd %~dp0

cd ../../
call compressor\compressor.bat common\mobile\mobile.all.css
call compressor\compressor.bat common\mobile\mobile.all.js
call compressor\compressor.bat common\mobile\mobile.index.css
call compressor\compressor.bat common\mobile\mobile.me.css

echo.
echo Compressor Success
pause
echo on