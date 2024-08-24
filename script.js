const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cardsContainer = document.querySelector('.news-grid');

const API_KEY = "1ac4065b88ec4e5a823b3bfcafc9c337";
const BASE_URL = "https://newsapi.org/v2/everything";


//Show the updated news from the pre-loaded content when starting the browser.
// const DEFAULT_QUERY = "India";
// window.addEventListener("load", () => fetchNews(DEFAULT_QUERY));

async function fetchNews(query) {
    try {
        const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&from=2024-08-21&sortBy=publishedAt&apiKey=${API_KEY}`);
        const data = await res.json();
        if (data.articles) {
            bindData(data.articles);
        } else {
            console.error('No articles found or error occurred.');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function bindData(articles) {
    cardsContainer.innerHTML = ""; 

    // Limit to 9 articles
    articles.slice(0, 9).forEach((article) => { 
        if (!article.urlToImage) return;

        // Create a new div element for each article
        const newsSection = document.createElement('div');
        newsSection.className = 'news-section';

        // Set inner HTML of the news section
        newsSection.innerHTML = `
            <img src="${article.urlToImage}" alt="News Image" class="news-image"/>
            <h3 class="news-title">${article.title}</h3>
            <p class="news-description">${article.description}</p>
            <a href="${article.url}" class="read-more">Read full article <span>➔</span></a>
        `;

        // Append the news section to the container
        cardsContainer.appendChild(newsSection);
    });
}

searchButton.addEventListener("click", () => {
    // Corrected from searchText to searchInput
    const query = searchInput.value;  
    if (!query) return;
    fetchNews(query);
});
