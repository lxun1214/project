@echo off&setlocal enabledelayedexpansion

set dbpath=config

echo. 
echo ���ڸ��� !dbpath!
echo. 

TortoiseProc.exe /command:update /path:"!dbpath!"  /closeonend:1

del "config\config.ce" 
path %path%;C:\Program Files\WinRAR\
cd config
winrar a config.zip *
move config.zip config.ce
cd ..\
cd
echo ����ɹ�
echo.

echo �����ύ !dbpath!
TortoiseProc.exe /command:commit /path:"!dbpath!" /logmsg:"%version%" /closeonend:1