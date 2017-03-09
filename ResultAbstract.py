#coding:utf-8

import sys
import re

withWeight = True
topK = int(10)

def AbstractSimple(wordlist,content):
	for tag in wordlist:
		location = re.search(tag[0],content)
		try:
			start = location.start()
			content = content[start-10:start+30]
			return content
		except Exception as e:
			pass
		return None
