@echo off&setlocal enabledelayedexpansion

set dbpath=assets\map\

echo. 
echo 正在更新 !dbpath!
echo. 

TortoiseProc.exe /command:update /path:"!dbpath!"  /closeonend:1

del "assets\map\tmx.xx" 
path %path%;C:\Program Files\WinRAR
cd assets\map\
winrar a -x*.jpg -x*.png tmx.zip *
move tmx.zip tmx.xx
cd ..\..\
cd
echo 打包成功
echo.

echo 正在提交 !dbpath!
TortoiseProc.exe /command:commit /path:"!dbpath!" /logmsg:"%version%" /closeonend:1