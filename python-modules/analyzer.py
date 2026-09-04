"""
NLP Data Analyzer - Sentiment Analysis Service (Python)
Personal Developer Portfolio - Software Engineering Suite
"""

import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import io

# Inisialisasi Leksikon VADER Sentiment
analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(text: str) -> str:
    """Mengklasifikasikan polaritas teks menjadi Positive, Neutral, atau Negative."""
    if not isinstance(text, str):
        return "Neutral"
        
    scores = analyzer.polarity_scores(text)
    compound = scores['compound']
    
    if compound >= 0.05:
        return "Positive"
    elif compound <= -0.05:
        return "Negative"
    else:
        return "Neutral"

def process_file_data(file_content: bytes, filename: str):
    """Membaca file CSV/Excel dan menganalisis seluruh kolom review secara otomatis."""
    if filename.endswith('.csv'):
        df = pd.read_csv(io.BytesIO(file_content))
    elif filename.endswith('.xlsx'):
        df = pd.read_excel(io.BytesIO(file_content))
    else:
        raise ValueError("Format file tidak didukung. Gunakan CSV atau XLSX.")

    # Deteksi kolom teks / ulasan
    text_column = None
    for col in df.columns:
        if col.lower() in ['review', 'text', 'comment', 'ulasan', 'komentar']:
            text_column = col
            break
            
    if not text_column:
        for col in df.columns:
            if df[col].dtype == object:
                text_column = col
                break
                
    if not text_column:
        raise ValueError("Tidak ditemukan kolom teks di dalam dataset.")

    # Eksekusi Analisis Sentimen NLP menggunakan vektorisasi Pandas
    df['NLP_Sentiment'] = df[text_column].apply(analyze_sentiment)
    sentiment_counts = df['NLP_Sentiment'].value_counts().to_dict()

    return {
        "total_rows": len(df),
        "analyzed_column": text_column,
        "sentiment_stats": sentiment_counts,
        "sample_preview": df[[text_column, 'AI_Sentiment']].head(10).to_dict(orient='records')
    }

if __name__ == "__main__":
    sample_text = "Layanan platform web sangat memuaskan, performa cepat dan reliable."
    print(f"Uji Sentimen: '{sample_text}' -> Hasil: {analyze_sentiment(sample_text)}")
