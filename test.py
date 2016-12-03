# # -*- coding:utf-8 -*-
from flask import Flask


app = Flask(__name__)
app.run(debug=True)
app.debug = True

@app.route('/')
def hello_word():
    print "hello world"


if __name__ == '__main__':
    app.run()

