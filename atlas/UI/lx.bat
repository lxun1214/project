@copy appconfig.xml %appdata%\TextureMerger\LOCALS~1\appconfig.xml
cls
@if "%1"=="" (
	@FOR /F %%i IN ('@dir /b') DO (
		"C:\Program Files\Egret\TextureMerger\TextureMerger.exe" -p %cd%\%%i -o C:\project\H5Game\resource\res\%%i.json
	)
) else (
	echo %1
	echo %~nx1
	"C:\Program Files\Egret\TextureMerger\TextureMerger.exe" -p %1 -o C:\project\H5Game\resource\res\%~nx1.json
)