@echo off
cd /d D:\Kiswani\website
"C:\Program Files\nodejs\npm.cmd" run dev > ".dev-server.log" 2> ".dev-server.err.log"
