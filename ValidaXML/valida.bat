@echo off
:: chcp 65001 >nul només ho canvia a UTF-8
chcp 65001 >nul
setlocal

echo ================================
echo   VALIDAR XML AMB DTD
echo ================================
echo.

:: Ruta a xmlstarlet (ajusta si cal)
set "XMLSTAR=xmlstarlet\xml.exe"

if not exist "%XMLSTAR%" (
    echo ✖ No s'ha trobat "%XMLSTAR%".
    echo    Comprova que la carpeta "xmlstarlet" es troba
    echo    al costat d'aquest .bat i que dins hi ha "xml.exe".
    echo.
    pause
    exit /b 1
)

:: ---------- Demanar XML fins que existeixi ----------
:ASK_XML
set "XML="
set /p XML=Introdueix el fitxer XML: 
if "%XML%"=="" (
    echo Has d'introduir un nom de fitxer.
    echo.
    goto ASK_XML
)
if not exist "%XML%" (
    echo ✖ El fitxer "%XML%" no existeix. Torna-ho a provar.
    echo.
    goto ASK_XML
)

echo.
echo [INFO] Comprovant si "%XML%" te DOCTYPE...

:: Buscar literal <!DOCTYPE dins del fitxer
findstr /I /C:"<!DOCTYPE" "%XML%" >nul
if %ERRORLEVEL%==0 (
    set "HASDOCTYPE=1"
) else (
    set "HASDOCTYPE=0"
)

if "%HASDOCTYPE%"=="0" goto SENSE_DOCTYPE
goto AMB_DOCTYPE

:: ---------- CAS 1: NO HI HA DOCTYPE, DEMANAR DTD ----------
:SENSE_DOCTYPE
echo No s'ha trobat cap DOCTYPE dins de "%XML%".
echo Cal indicar un DTD extern.
echo.

:ASK_DTD
set "DTD="
set /p DTD=Introdueix el fitxer DTD: 
if "%DTD%"=="" (
    echo Has d'introduir un nom de fitxer.
    echo.
    goto ASK_DTD
)
if not exist "%DTD%" (
    echo ✖ El fitxer "%DTD%" no existeix. Torna-ho a provar.
    echo.
    goto ASK_DTD
)

echo.
echo Validant "%XML%" amb el DTD "%DTD%"...
"%XMLSTAR%" val -e -d "%DTD%" "%XML%"
set "ERR=%ERRORLEVEL%"
goto FI_VALIDACIO

:: ---------- CAS 2: HI HA DOCTYPE, USAR-LO ----------
:AMB_DOCTYPE
echo S'ha detectat DOCTYPE dins de "%XML%".
echo Es fara servir el DTD indicat al DOCTYPE.
echo.
echo Validant "%XML%"...
"%XMLSTAR%" val -e "%XML%"
set "ERR=%ERRORLEVEL%"
goto FI_VALIDACIO

:: ---------- RESULTAT FINAL ----------
:FI_VALIDACIO
echo.
if "%ERR%"=="0" (
    echo ✓XML vàlid.
) else (
    echo ✖ XML NO vàlid. Codi d'error: %ERR%
)

echo.
pause
endlocal
