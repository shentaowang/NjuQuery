#coding:utf-8

import sys
import re
AbstractLen = 100
SeparatePattern = u"。|\\n"    #the symbol use to saparate

class Abstract(object):
    def AbstractSimple(self, wordlist, content):
        for tag in wordlist:
            location = re.search(tag[0], content)
            try:
                start = location.start()
                content = content[start:start+AbstractLen]
                return content
            except Exception as e:
                pass
        return None

    def AbstractSetence(self, wordlist, content):
        for tag in wordlist:
            location = re.search(tag[0], content)
            try:
                word_loc = location.start()
                start = 0
                for m in re.finditer(SeparatePattern, content):
                    if m.start() > word_loc:
                        end = m.end()
                        break
                    else:
                        start = m.start()
                content = content[start:end]
                content = content.lstrip(u"。")
                return content
            except Exception as e:
                pass
        return None


