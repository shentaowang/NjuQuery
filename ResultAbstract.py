#coding:utf-8

import sys
import re
AbstractLen = 100

class Abstract(object):
    def AbstractSimple(self, wordlist, content):
        for tag in wordlist:
            location = re.search(tag[0],content)
            try:
                start = location.start()
                content = content[start:start+AbstractLen]
                return content
            except Exception as e:
                pass
        return None

    def AbstractV2(self, wordlist, content):
        pass

