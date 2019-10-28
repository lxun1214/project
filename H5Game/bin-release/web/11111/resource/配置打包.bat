@echo off&setlocal enabledelayedexpansion

set dbpath=config

echo. 
echo 正在更新 !dbpath!
echo. 

TortoiseProc.exe /command:update /path:"!dbpath!"  /closeonend:1

del "config\config.ce" 
path %path%;C:\Program Files\WinRAR\
cd config
winrar a config.zip *
move config.zip config.ce
cd ..\
cd
echo 打包成功
echo.

echo 正在提交 !dbpath!
TortoiseProc.exe /command:commit /path:"!dbpath!" /logmsg:"%version%" /closeonend:1