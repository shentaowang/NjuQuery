#-*- coding:utf-8 -*-
import ReSortPage
import GetData
import ResultAbstract
import math
import jieba
import jieba.analyse
from optparse import OptionParser
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('test.html')

@app.route('/test')
def QueryMain():
    data = request.values
    query = data.get('query')
    database = 'njusearch'
    collection = 'njumatrix'
    index = 'njusearch3'
    query = query.encode('utf-8')
    ConMongo = GetData.ConMongo()
    ConEs = GetData.ConEs()
    SortPage = ReSortPage.SortPage()
    Abstract = ResultAbstract.Abstract()

    code_db = 'nju_web_code'
    code_collection = 'version3'

    result = ConEs.GetSimple(index, query)

    withWeight = True
    topK = int(10)
    wordlist = []
    wordlist = WordCut(query)
	
    list = []
    for hit in result['hits']['hits']:
	content = hit['_source']['content']
        abstract = Abstract.AbstractSetence(wordlist,content)
        if abstract==None:
            pass
        else:
            #PR = ConMongo.GetPr(database, collection, hit['_id'])
            url = ConMongo.GetUrl(code_db, code_collection, hit['_id'])
            PR = 1
            score = math.log10(PR*10000)*hit['_score']
            list.append({'url': url, 'score': score, 'content': abstract, 'title': hit['_source']['title']})

    # for hit in result['hits']['hits']:
    #     PR = ConMongo.GetSimple(database, collection, hit['_id'])
    #     score = math.log10(PR*10000)*hit['_score']
    #     # score = hit['_score']
    #     list.append({'url': hit['_source']['url'], 'score': score, 'content': hit['_source']['content'], 'title': hit['_source']['title']})
    list = SortPage.ReSortSimp(list)
    return jsonify(data=list)

def WordCut(query):
    withWeight = True
    topK = int(10)
    tags = jieba.analyse.extract_tags(query, topK=topK, withWeight=withWeight)
    return tags

if __name__ == '__main__':
    app.run(host='0.0.0.0')
