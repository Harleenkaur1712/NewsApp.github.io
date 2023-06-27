const API_KEY ="e3790c8e8ac94320809aecf54c226029";
const url= "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`); //fetch is async function which provides promise to giving news  
    const data = await res.json(); // converting data in jason 
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";// everytime before calling data emptying the container 

    articles.forEach((article) => {
        if (!article.urlToImage) return; // without image we are returing back
        const cardClone = newsCardTemplate.content.cloneNode(true); // cloning every div
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage; // api article have url to image as well
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
// changing date into readable format
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    }); // redirect to news page when clicked  
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);// build data
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}
// search bar 
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value; // value entered in search
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

