const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function Showloader(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function Hideloader(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
function showNewQuote(){
    Showloader();

// Pick random quotes from apiQuotes array  
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

// Return Unknown author with "Unknown"
if (!quote.author) {
    authorText.textContent = 'Unknown';
}else {
    authorText.textContent = quote.author
}

// Shorten quote if lenght is long by reducing font size
if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
}else {
    quoteText.classList.remove('long-quote');
}

// Set the quote, Hide the loader
quoteText.textContent = quote.text;
Hideloader();
}
async function getQuotesFromAPI () {
    Showloader();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();

    } catch (error) {
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_black');
}
newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotesFromAPI();