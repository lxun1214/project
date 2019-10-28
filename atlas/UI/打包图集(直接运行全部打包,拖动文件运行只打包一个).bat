@copy appconfig.xml %appdata%\TextureMerger\LOCALS~1\appconfig.xml
cls
@if "%1"=="" (
	@FOR /F %%i IN ('@dir /b') DO (
		"E:\Egret\TextureMerger\TextureMerger.exe" -p %cd%\%%i -o E:\项目\H5\project\H5Game\resource\res\%%i.json
	)
) else (
	echo %1
	echo %~nx1
	"E:\Egret\TextureMerger\TextureMerger.exe" -p %1 -o E:\项目\H5\project\H5Game\resource\res\%~nx1.json
)