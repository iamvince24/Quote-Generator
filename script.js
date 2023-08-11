const quoteContainer = document.getElementById('quote-container');
const quoteContent = document.getElementById('quote');
const authorContent = document.getElementById('author');
const newQuoteBtn = document.getElementById('button-content');
const loader = document.getElementById('loader');


let apiQuote = [];

// Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(){
    loading()
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    // console.log(quote);
    if (!quote.author) {
        authorContent.textContent = 'Unknown';
    } else {
        authorContent.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteContent.classList.add('long-quote');
    } else {
        quoteContent.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteContent.textContent = quote.text;
    complete() 
}

async function getQuote(){
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
    }catch(error){
        // do something
    }
}

getQuote();

newQuoteBtn.addEventListener('click', getQuote);
