#coding:utf-8

import sys
import re

<<<<<<< HEAD
=======

>>>>>>> 630a79de1cc0b13f1eb7711d3a430861adc3d43d
class Abstract:
	def AbstractSimple(a,wordlist,content):
		for tag in wordlist:
			print tag[0]
			location = re.search(tag[0],content)
			try:
				start = location.start()
				content = content[start-20:start+60]
				return content
			except Exception as e:
				pass
		return None
