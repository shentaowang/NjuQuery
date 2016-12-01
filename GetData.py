# -*- coding:utf-8 -*-
from elasticsearch import Elasticsearch
import pymongo


EsClient = Elasticsearch(['114.212.236.165:9200'])
MongoClient = connection = pymongo.MongoClient()

class ConMongo(object):
    def GetSimple(self, database, collection, id):
        db = MongoClient[database]
        collection = db[collection]
        result = collection.find_one({"_id": str(id)})
        PR = result['pr']
        return PR

class ConEs(object):
    def GetSimple(self, index, query):
        result = EsClient.search(
            index=str(index),
            analyzer='ik',
            body={
                "from": 0,
                "size": 20,
                "query": {
                    "term": {"content": str(query)}
                },
                # "sort": [{"_score": "desc"}]
            }
        )
        return result
