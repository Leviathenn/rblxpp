@echo off


rem Made By Leviathenn


rem Compiler and flags
set CC=gcc
set CFLAGS=-Wall -Werror -fpic

rem Library name and source files
set SRC_DIR=wapi
set LIB_NAME=wapi
set SRC_FILES=%SRC_DIR%\wapi.c
set OBJ_FILES=%SRC_DIR%\wapi.o
set LIB_DLL=%SRC_DIR%\%LIB_NAME%.dll
set LIB_DLL_NAME=%LIB_NAME%.dll
set BUILD=.\build\

rem Check for a build directory

if not exist "%BUILD%" (
   mkdir %BUILD%
) 

if exist "%BUILD%%LIB_DLL_NAME%" (
   del /Q "%BUILD%%LIB_DLL_NAME%"
)

rem Start build process.

%CC% %CFLAGS% -c -o %OBJ_FILES% %SRC_FILES%
%CC% %CFLAGS% -shared -o %LIB_DLL% %OBJ_FILES%

rem Check for DLL

if exist "%LIB_DLL%" (
   rem Move DLL
   move /Y %LIB_DLL% %BUILD%\%LIB_DLL_NAME% >nul
   rem Clean up object files
   del /Q %OBJ_FILES%
   rem Check that all went well

   if exist "%OBJ_FILES%" (
      del /Q "%OBJ_FILES%
   ) else (
      echo WAPI has successfully built!
   )

)
rem Move the DLL


