#-*- coding:utf-8 -*-
import ReSortPage
import GetData
import math
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

    result = ConEs.GetSimple(index, query)
    list = []
    for hit in result['hits']['hits']:
        PR = ConMongo.GetSimple(database, collection, hit['_id'])
        score = math.log10(PR*10000)*hit['_score']
        # score = hit['_score']
        list.append({'url': hit['_source']['url'], 'score': score, 'content': hit['_source']['content'], 'title': hit['_source']['title']})
    list = SortPage.ReSortSimp(list)
    # print list
    return jsonify(data=list)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
