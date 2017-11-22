(function() {
  let bookmarklets = {};
  let gettingBookmarklets = browser.storage.local.get(null);
  gettingBookmarklets.then((data) => {
    for (key in data) {
      if (key !== 'domains')
        createCard(data[key]);
    }
  });
})();


function createCard(obj) {
  console.log(obj);
  let url = obj.url,
      id = obj.id,
      title = obj.title,
      author = obj.author;
  
  let complete_url = url + '#' + id;

  let mainContent = document.querySelector('div.main-content');

  let card = document.createElement('div');
  card.classList.add('card');

  let cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  
  cardContainer.innerHTML = `
    <p class="title">${title}</p>
    <p class="author"><em>${author}</em></p>
    <p class="url">${complete_url}</p>
  `;

  card.appendChild(cardContainer);
  mainContent.appendChild(card);

  cardContainer.addEventListener('click', function(e) {
    openBookmarklet(complete_url);
  });
}


function openBookmarklet(url) {
  let updating = browser.tabs.update({"url": url});
}