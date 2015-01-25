#!/usr/bin/python

import os
import subprocess
import getpass

def build():
	lib_name = "sequencer.js"
	tsc = 'tsc'
	use_shell = False
	watch_flag = "--watch"
	default_python = "python"

	if os.name == 'nt':
		tsc = "C:\\Users\\{0}\\AppData\\Roaming\\npm\\tsc".format(getpass.getuser())	
		use_shell = True
		default_python = "python.exe"
	
	# assemble command for build:
	lib_source_path = os.path.join("src", "SequencerLibrary.ts")
	lib_output_path = os.path.join("build", "js", lib_name)
	
	command = "{0} --sourcemap --target es5 {1} --out {2} {3}".format(
		tsc, 
		watch_flag,
		lib_output_path,
		lib_source_path
		)
		
	# execute the command:
	print("Running: '{0}'".format(command))
	subprocess.call(command, shell=use_shell)
	
if __name__ == "__main__":
	build()