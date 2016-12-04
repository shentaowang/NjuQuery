# -*- coding:utf-8 -*-
class SortPage(object):
    def ReSortSimp(self, list):
        for i in range(len(list)):
            for j in range(len(list)-(i+1)):
                if list[j]['score'] < list[j+1]['score']:
                    temp = list[j]
                    list[j] = list[j+1]
                    list[j+1] = temp
        return list