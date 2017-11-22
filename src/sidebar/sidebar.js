(function() {
  let bookmarklets = {};
  let gettingBookmarklets = browser.storage.local.get(null);
  gettingBookmarklets.then((data) => {
    for (key in data) {
      if (key !== 'domains')
        createCard(data[key]);
    }
  }, onError);
})();

function onError(err) {
  console.error(err);
}

function createCard(obj) {
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


document.querySelector('p.nav').addEventListener('click', setSettingsView);

function setSettingsView() {
  let navbar = document.querySelector('p.nav');
  navbar.textContent = '< Back to Bookmarklets'
  navbar.classList.add('settings-nav');
  
  let mainContentDiv = document.querySelector('div.main-content');
  mainContentDiv.innerHTML = `
  <div class="settings-container">
  <div class="settings-section domains">
  <p class="settings-section--title">Domains</p>
  <small class="settings-section--desc">
  Medium publications that do not have the 'medium.com' domain must be added here
  in order for Medium Bookmarklets to work on them.
  </small>
  <input type="button" class="outline addDomain" value="+ Add Domain" />
  </div>
  
  <button class="button save">Save</button>
  </div>
  `;

  setPreexistingDomainComponents();
  
  navbar.addEventListener('click', setMainView);
  document.querySelector('input.addDomain').addEventListener('click', addDomainComponent);
  document.querySelector('button.button.save').addEventListener('click', saveDomains);
}

function setMainView() {
  location.reload(true);
}

function addDomainComponent() {
  let settingSection__domain = document.querySelector('div.settings-section.domains');
  
  let domainDiv = document.createElement('div');
  domainDiv.classList.add('domain-input');
  domainDiv.innerHTML = `
  <input type="text" class="string domain" placeholder="e.g. medium.com" />
  <input type="button" class="outline remove" value="✕ Remove" />
  `;
  
  settingSection__domain.appendChild(domainDiv);
  
  let removeButtons = document.getElementsByClassName('outline remove');
  for (let i = 0; i < removeButtons.length; i++)
  removeButtons[i].addEventListener('click', removeDomainComponent);
}

function removeDomainComponent(e) {
  let settingSection__domain = document.querySelector('div.settings-section.domains');
  let domainComponent = e.target.parentElement;
  
  settingSection__domain.removeChild(domainComponent);
}

function setPreexistingDomainComponents() {
  let gettingDomains = browser.storage.local.get('domains');
  gettingDomains.then((data) => {
    if (data.domains.length > 0) {
      for (let i = 0; i < data.domains.length; i++) {
        addDomainComponent();
        let domainComponentsInput = document.getElementsByClassName('string domain');
        domainComponentsInput[i].value = data.domains[i];
      }
    }
  }, onError);
}

function saveDomains() {
  let domainComponentsInput = document.getElementsByClassName('string domain');
  let domains = [];

  for (let i = 0; i < domainComponentsInput.length; i++) {
    domains.push(domainComponentsInput[i].value);
  }

  browser.storage.local.set({domains});
}