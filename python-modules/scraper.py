"""
News & Feeds Scraper (Python)
Personal Developer Portfolio - Software Engineering Suite
"""

import requests
from bs4 import BeautifulSoup

def scrape_tech_news(limit: int = 15):
    """Menarik data berita industri teknologi dan publikasi terkini dari sumber publik."""
    url = "https://news.ycombinator.com/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }

    response = requests.get(url, headers=headers, timeout=10)
    if response.status_code != 200:
        raise Exception(f"Gagal menarik data: Kode status {response.status_code}")

    soup = BeautifulSoup(response.text, 'html.parser')
    news_list = []
    articles = soup.find_all('tr', class_='athing')

    for article in articles[:limit]:
        try:
            item_id = article.get('id')
            titleline = article.find('span', class_='titleline')
            anchor = titleline.find('a') if titleline else None

            title = anchor.text if anchor else "Tanpa Judul"
            link = anchor.get('href') if anchor else "#"

            subtext_row = article.find_next_sibling('tr')
            score_elem = subtext_row.find('span', class_='score') if subtext_row else None
            points = int(score_elem.text.split()[0]) if score_elem else 0

            news_list.append({
                "id": item_id,
                "title": title,
                "link": link,
                "points": points
            })
        except Exception:
            continue

    return news_list

if __name__ == "__main__":
    results = scrape_tech_news(5)
    print(f"Berhasil menarik {len(results)} berita.")
    for idx, item in enumerate(results, 1):
        print(f"{idx}. {item['title']} ({item['points']} poin)")
