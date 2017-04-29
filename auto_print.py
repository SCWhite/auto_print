import time
import os

import requests

while(1):
	r = requests.get("http://140.134.25.193/take")

	if (r.content != ''):
		filename = "D:\\auto_print\\"
		filename += r.history[0].content.split('/')[-1]
		print(filename)
		with open(filename,'wb') as f:
		  f.write(r.content)
		cmd = "mspaint /p " + filename
		os.system(cmd)
	time.sleep(1)
