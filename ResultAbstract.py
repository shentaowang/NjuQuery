#coding:utf-8

import sys
import re

class Abstract(object):
	def AbstractSimple(self,wordlist,content):
		for tag in wordlist:
			location = re.search(tag[0],content)
			try:
				start = location.start()
				content = content[start-20:start+60]
				return content
			except Exception as e:
				pass
		return None
