const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

async function getQuoteFromApi() {
  showLoadingSpinner();

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // If author is blank, add unknown
    authorText.innerText === ""
      ? (authorText.innerText = "Unknown")
      : (authorText.innerText = data.quoteAuthor);

    // Reduce font size for longer quotes
    data.quoteText.length > 50
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");

    quoteText.innerText = data.quoteText;

    removeLoadingSpinner();
  } catch (error) {
    getQuoteFromApi();
    return;
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterPostUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterPostUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuoteFromApi);
twitterBtn.addEventListener("click", tweetQuote);

// On Initial Load
getQuoteFromApi();
