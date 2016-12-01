#-*- coding:utf-8 -*-
from datetime import datetime
from elasticsearch import Elasticsearch

es = Elasticsearch(['114.212.236.165:9200'])

result = es.get(index='njusearch3', doc_type='test1', id=16)['_source']

print result['url']
print result['content']
