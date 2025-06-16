from flask import Flask, abort, jsonify, request, render_template, send_from_directory
import joblib
from feature import *
import json
import os
from flask_cors import CORS
import re
import nltk
import pandas as pd
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.base import BaseEstimator, TransformerMixin

# Download required NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

# Define the TextPreprocessor class needed for loading the pipeline
class TextPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        self.lemmatizer = WordNetLemmatizer()
    
    def clean_text(self, text):
        text = re.sub(r'[^\w\s]', '', text)
        words = nltk.word_tokenize(text)
        words = [w for w in words if w.lower() not in self.stop_words]
        words = [self.lemmatizer.lemmatize(w.lower()) for w in words]
        return ' '.join(words)
    
    def fit(self, X, y=None):
        return self
    
    def transform(self, X, y=None):
        if not isinstance(X, pd.Series):
            X = pd.Series(X)
        return X.apply(self.clean_text)

# Load the new pipeline
pipeline = joblib.load('./pipeline_final_new.sav')

app = Flask(__name__, static_folder='veri-fact-main/dist', static_url_path='')
CORS(app)  # Enable CORS for all routes

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api', methods=['POST'])
def get_delay():
    result = request.form
    query_title = result['title']
    query_author = result['author']
    query_text = result['maintext']
    print(query_text)
    query = get_all_query(query_title, query_author, query_text)
    user_input = {'query': query}
    pred = pipeline.predict(query)
    print(pred)
    dic = {1: 'real', 0: 'fake'}
    return f'<html><body><h1>{dic[pred[0]]}</h1></body></html>'

# Catch all routes to enable client-side routing
@app.route('/<path:path>')
def catch_all(path):
    if path.startswith('api'):
        return abort(404)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=8080, debug=True)
