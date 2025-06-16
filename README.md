# VeriFact: Unmasking Fake News with Data Science

VeriFact is a machine learning-powered web application designed to detect fake news articles. By analyzing the text content, author, and title of news articles, the system can classify whether a piece of news is likely to be real or fake.

![VeriFact Logo](veri-fact-main/public/verifact-icon.svg)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Dataset](#dataset)
- [Installation](#installation)
- [Usage](#usage)
- [Model Information](#model-information)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Project Overview

In today's digital age, misinformation spreads rapidly across social media and news platforms. VeriFact aims to combat this issue by providing a tool that can help users identify potentially fake news articles. The system uses natural language processing and machine learning techniques to analyze text content and make predictions.

## ✨ Features

- **Text Analysis**: Analyzes news article title, author, and content
- **Real-time Classification**: Instantly classifies news as real or fake
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **RESTful API**: Backend API for integration with other applications

## 💻 Technology Stack

### Frontend
- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- shadcn/ui component library

### Backend
- Python 3.x
- Flask web framework
- scikit-learn for machine learning
- NLTK for natural language processing
- Joblib for model serialization

## 📁 Project Structure

```
/
├── app.py                  # Flask application entry point
├── feature.py              # Feature extraction utilities
├── pipeline_final_new.sav  # Trained machine learning model
├── rebuild_pipeline.py     # Script to rebuild the ML pipeline
├── veri-fact-main/         # Frontend React application
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   └── dist/               # Built frontend files
└── dataset/                # Training and testing datasets
```

## 📊 Dataset

Due to GitHub's file size limitations, the dataset files are not included in this repository. You can download the complete dataset from the following Google Drive link:

[Download VeriFact Dataset(Train)](https://docs.google.com/spreadsheets/d/1XWHQb4blYdga8yZps2ACaH9fnpFiNg7YO1uPO13rXGQ/edit?usp=sharing)
[Download VeriFact Dataset(Test)]( https://docs.google.com/spreadsheets/d/1-6jAMe2m7v6aPxbtsszC-a3LEmAsqo5md8cqVvCmKxs/edit?usp=sharing)

After downloading, place the dataset files in the `dataset/` directory before training the model.

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Maulik-Bambhaniya/VeriFact.git
   cd verifact
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # On Windows
   .venv\Scripts\activate
   # On macOS/Linux
   source .venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install flask scikit-learn nltk pandas joblib flask-cors
   ```

4. Download required NLTK data:
   ```bash
   python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd veri-fact-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the frontend:
   ```bash
   npm run build
   ```

## 🖥️ Usage

1. Start the Flask server:
   ```bash
   python app.py
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

3. Enter the title, author, and text of a news article to analyze.

4. The system will classify the news as either "REAL" or "FAKE".

## 🧠 Model Information

The fake news detection model is built using:
- Text preprocessing with NLTK (tokenization, stopwords removal, lemmatization)
- TF-IDF vectorization for feature extraction
- Logistic Regression classifier

The model achieves approximately 96% accuracy on the validation set.

## 📡 API Reference

### Endpoint: `/api`

**Method**: POST

**Form Parameters**:
- `title`: The title of the news article
- `author`: The author of the news article
- `maintext`: The main content of the news article

**Response**:
- HTML content with the prediction ("real" or "fake")

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 