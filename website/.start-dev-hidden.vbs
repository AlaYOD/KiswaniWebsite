Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = "D:\Kiswani\website"
shell.Run Chr(34) & "D:\Kiswani\website\.dev-server.cmd" & Chr(34), 0, False
