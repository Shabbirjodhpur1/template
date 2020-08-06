const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
} 

 //Hide loading
function complete(){
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get quote from api
async function getQuote() {
    loading();
    const proxyurl ='https://cors-anywhere.herokuapp.com/';
    const apiurl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response =await fetch (proxyurl + apiurl);
        const data =await response.json();
        console.log(data);
        if (data.quoteAuthor==='') {
            authorText.innerText='Unkwon';
        } else {
            authorText.innerText=data.quoteAuthor;
        }
        //reduce font size for long quote
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText=data.quoteText;
        complete(); 
    } catch(error) {
        console.log(error);
    }
}
//tweet
function tweetQuote() {
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterurl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterurl,'_blank');
}
//event listener
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
//on load
getQuote();