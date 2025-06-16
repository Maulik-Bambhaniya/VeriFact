import pandas as pd
import numpy as np
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.linear_model import LogisticRegression
import joblib

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Define the TextPreprocessor class
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

# Load the dataset
print("Loading dataset...")
train = pd.read_csv('dataset/train.csv')
train = train.fillna(' ')

# Prepare the data
print("Preparing data...")
X_train = train['title'] + ' ' + train['author'] + ' ' + train['text']
Y_train = train['label']

# Create and train the pipeline
print("Creating pipeline...")
pipeline = Pipeline([
    ('preprocess', TextPreprocessor()),
    ('vect', CountVectorizer(stop_words='english')),
    ('tfidf', TfidfTransformer(norm='l2')),
    ('clf', LogisticRegression(C=1e5, class_weight='balanced')),
])

print("Training pipeline...")
pipeline.fit(X_train, Y_train)

# Save the pipeline
print("Saving pipeline...")
filename = 'pipeline_final_new.sav'
joblib.dump(pipeline, filename)

print(f"Pipeline saved to {filename}")

# Test the pipeline
print("Testing pipeline...")
test_text = "This is a test news article about something that happened."
prediction = pipeline.predict([test_text])
print(f"Test prediction: {prediction}") 