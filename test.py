# -*- coding:utf-8 -*-
from datetime import datetime
from elasticsearch import Elasticsearch

es = Elasticsearch(['114.212.236.165:9200'])

result = es.search(
    index='njusearch3',
    type='test1',
    # analyzer='ik',
    body={
        "from": 0,
        "size": 20,
        "query": {
            "term": {"content": "化工"}
        },
        "sort": [{"_score": "desc"}]
    }
)
print result['hits']['total']
for hit in result['hits']['hits']:
	print hit['_score'], hit['_source']['title'],hit['_source']['url']
