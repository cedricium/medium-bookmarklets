(() => {
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (Object.keys(changes).length === 1 && !changes.domains) {
      let url = Object.keys(changes)[0];
      if (changes[url].newValue) {
        findExistingCard(changes[url].newValue);
      } else if (changes[url].oldValue) {
        removeCard(changes[url].oldValue);
      }
    }
  });

  let gettingBookmarklets = browser.storage.local.get(null);
  gettingBookmarklets.then((data) => {
    // 1 key being the domain object; meaning no bookmarklets
    if (Object.keys(data).length === 1) {
      emptyStateContainer.classList.remove('hidden');
    }
    for (key in data) {
      if (key !== 'domains') {
        createCard(data[key]);
      }
    }
  }, onError);
})();


let numberOfCards = 0;
let emptyStateContainer = document.querySelector('div.empty-state');

function onError(err) {
  console.error(err);
}

function createCard(obj) {
  numberOfCards++;
  if (numberOfCards > 0) {
    emptyStateContainer.classList.add('hidden');
  }

  let url = obj.url;
  let id = obj.id;
  let title = obj.title;
  let author = obj.author;

  let completeURL = url + '#' + id;

  let mainContent = document.querySelector('div.main-content');

  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = id;
  card.dataset.url = url;
  card.dataset.title = title;

  let cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  cardContainer.dataset.urlRedirect = completeURL;

  cardContainer.innerHTML = `
    <p class="title">${title}</p>
    <p class="author"><em>${author}</em></p>
    <p class="url">${completeURL}</p>
  `;

  card.appendChild(cardContainer);
  mainContent.appendChild(card);

  cardContainer.addEventListener('click', function(e) {
    openBookmarklet(e.target.parentElement.dataset.urlRedirect);
  });
}

function removeCard(obj) {
  numberOfCards--;
  if (numberOfCards < 1) {
    emptyStateContainer.classList.remove('hidden');
  }

  let title = obj.title;

  let card = document.querySelector(`div.card[data-title="${title}"]`);
  let mainContent = document.querySelector('div.main-content');

  mainContent.removeChild(card);
}

function findExistingCard(obj) {
  let title = obj.title;
  let card = document.querySelector(`div.card[data-title="${title}"]`);

  if (card !== null) {
    updateCard(obj);
  } else {
    createCard(obj);
  }
}

function updateCard(obj) {
  let url = obj.url;
  let id = obj.id;
  let title = obj.title;

  let cardUrl = document.querySelector(`div.card[data-title="${title}"] div.card-container p.url`); // eslint-disable-line max-len
  let completeURL = url + '#' + id;
  cardUrl.textContent = completeURL;
  cardUrl.parentElement.dataset.urlRedirect = completeURL;
}

function openBookmarklet(url) {
  // let updating = browser.tabs.update({"url": url});
  browser.tabs.update({'url': url});
}

document.querySelector('p.nav').addEventListener('click', setSettingsView);
function setSettingsView() {
  let mainContentDiv = document.querySelector('div.main-content');
  let settingsContentDiv = document.querySelector('div.settings-content');

  emptyStateContainer.classList.add('hidden');
  mainContentDiv.classList.add('hidden');

  let navContainer = document.querySelector('div.heading');
  navContainer.classList.add('settings');

  let navbar = document.querySelector('p.nav');
  navbar.innerHTML = `<span class="icon">&#8592;</span> Back to Bookmarklets`;
  navbar.classList.add('settings-nav');

  settingsContentDiv.innerHTML = `
  <div class="settings-container">

  <div class="notification hidden">
  <p>✓ Settings successfully saved!</p>
  </div>

  <div class="settings-section instructions">
  <p class="settings-section--title">How to Use</p>
  <small class="settings-section--desc">
  To learn how to use Medium Bookmarklets, visit:
    <a href="https://github.com/cedricium/medium-bookmarklets#how-to-use">
      https://github.com/cedricium/medium-bookmarklets#how-to-use
    </a>
  .
  </small>
  </div>

  <div class="settings-section domains">
  <p class="settings-section--title">Domains</p>
  <small class="settings-section--desc">
  Publications on Medium that do not have the "medium.com" domain must be added
  here in order for bookmarklets to work on them.
  </small>
  <input type="button" class="outline addDomain" value="+ Add Domain" />
  </div>

  <button class="button save">Save</button>
  </div>
  `;

  setPreexistingDomainComponents();

  navbar.addEventListener('click', setMainView);
  document.querySelector('input.addDomain')
    .addEventListener('click', addDomainComponent);

  document.querySelector('button.button.save')
    .addEventListener('click', saveDomains);
}

function setMainView() {
  document.querySelector('div.main-content').innerHTML = '';
  document.querySelector('div.settings-content').classList.add('hidden');
  location.reload(true);
}

function addDomainComponent() {
  let settingsSectionDomain =
    document.querySelector('div.settings-section.domains');

  let domainDiv = document.createElement('div');
  domainDiv.classList.add('domain-input');
  domainDiv.innerHTML =
`<input type="text" class="string domain" placeholder="e.g. code.likeagirl.io">
<input type="button" class="outline remove" value="✕ Remove">`;

  settingsSectionDomain.appendChild(domainDiv);

  let removeButtons = document.getElementsByClassName('outline remove');
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', removeDomainComponent);
  }
}

function removeDomainComponent(e) {
  let settingsSectionDomain =
    document.querySelector('div.settings-section.domains');
  let domainComponent = e.target.parentElement;

  settingsSectionDomain.removeChild(domainComponent);
}

function setPreexistingDomainComponents() {
  let gettingDomains = browser.storage.local.get('domains');
  gettingDomains.then((data) => {
    if (data.domains.length > 0) {
      for (let i = 0; i < data.domains.length; i++) {
        addDomainComponent();
        let domainComponentsInput =
          document.getElementsByClassName('string domain');
        domainComponentsInput[i].value = data.domains[i];
      }
    }
  }, onError);
}

function saveDomains() {
  let notification = document.querySelector('div.notification');
  let domainComponentsInput = document.getElementsByClassName('string domain');
  let domains = [];

  for (let i = 0; i < domainComponentsInput.length; i++) {
    domains.push(domainComponentsInput[i].value);
  }

  let setting = browser.storage.local.set({domains});
  setting.then((data) => {
    notification.classList.remove('hidden');
    setTimeout(function() {
      notification.classList.add('hidden');
    }, 2200);
  });
}
