#-*- coding:utf-8 -*-
import GetData
import SortPage
import OutputPage
import sys
import math

database = 'njusearch'
collection = 'njumatrix'
index = 'njusearch3'
query = '表彰学生教育管理创新奖的决定'

ConMongo = GetData.ConMongo()
ConEs = GetData.ConEs()
SortPage = SortPage.SortPage()

result = ConEs.GetSimple(index, query)
list = []
for hit in result['hits']['hits']:
    PR = ConMongo.GetSimple(database, collection, hit['_id'])
    score = math.log10(PR*10000)*hit['_score']
    # score = hit['_score']
    list.append({'url': hit['_source']['url'], 'score': score, 'content': hit['_source']['content']})

list = SortPage.SortSimp(list)
for i in list:
    print i['url'], i['score'], i['content'].encode('utf8')

