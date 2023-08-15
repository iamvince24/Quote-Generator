const quoteContainer = document.getElementById("quote-container");
const quoteContent = document.getElementById("quote");
const authorContent = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const twitterBtn = document.getElementById("twitter");

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

function newQuote() {
  loading();
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  // console.log(quote);
  if (!quote.author) {
    authorContent.textContent = "Unknown";
  } else {
    authorContent.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    quoteContent.classList.add("long-quote");
  } else {
    quoteContent.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteContent.textContent = quote.text;
  complete();
}

async function getQuote() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    newQuote();
  } catch (error) {
    // do something
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteContent.innerText;
  const author = authorContent.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
