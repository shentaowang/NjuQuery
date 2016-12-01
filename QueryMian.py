#-*- coding:utf-8 -*-
import GetData
import SortPage
import OutputPage
import sys
import math

database = 'njusearch'
collection = 'njumatrix'
index = 'njusearch3'
query = '南京'

ConMongo = GetData.ConMongo()
ConEs = GetData.ConEs()

result = ConEs.GetSimple(index, query)
list = []
for hit in result['hits']['hits']:
    PR = ConMongo.GetSimple(database, collection, hit['_id'])
    score = math.log10(PR*10000)*hit['_score']
    list.append({'url': hit['_source']['url'], 'score': score, 'content': hit['_source']['content']})

for i in list:
    print i['url'], i['score'], i['content'].encode('utf8')

