# -*- coding:utf-8 -*-
from elasticsearch import Elasticsearch
import pymongo


EsClient = Elasticsearch(['115.159.55.170:9200'])
MongoClient = connection = pymongo.MongoClient(connect=False)
QueryLimit = 20
# MongoClient = connection = pymongo.MongoClient('114.212.235.125:27017',connect=False)


class ConMongo(object):
    def GetSimple(self, database, collection, id):
        db = MongoClient[database]
        collection = db[collection]
        result = collection.find_one({"_id": int(id)})
        PR = result['pr']
        return PR

class ConEs(object):
    def GetSimple(self, index, query):
        result = EsClient.search(
            index=str(index),
            #analyzer='ik',
            body={
                "from": 0,
                "size": QueryLimit,
                "query": {
                    "query_string": {
                        "default_field": "content",
                        "query": str(query)
                    }
                },
                "sort": [{"_score": "desc"}]
            }
        )
        return result
