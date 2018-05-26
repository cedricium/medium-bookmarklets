(() => {
  browser.storage.local.get('domains')
    .then((domainList) => {
      startScript(domainList);
  }, onError);
})();


function startScript(domainData) {
  let domains = domainData.domains;

  let currentURL = location.href;
  let currentHostname = location.hostname;

  if (!domains.includes(currentHostname)) {
    return;
  }

  initialize();
  window.setInterval(function() {
    if (currentURL !== location.href) {
      currentURL = location.href;
      location.reload(false);
    }
  }, 250);
}


let currentBookmarklet = '';


function onError(err) {
  console.error(err);
}


function initialize() {
  let gettingAllBookmarklets = browser.storage.local.get(null);
  gettingAllBookmarklets.then((results) => {
    addBookmarklet();
    let url = location.href;

    if (url in results) {
      let bookmarklet = results[url];
      displayBookmarklet(bookmarklet.id);
    }
  }, onError);
}


function addBookmarklet() {
  document.addEventListener('keyup', function(e) {
    let selectionData = getSelectionData();
    if (e.keyCode === 66 && selectionData.text) {
      if (currentBookmarklet !== selectionData.targetElement.id) {
        let title =
          document.getElementsByClassName('graf graf--title')[0] !== undefined
          ? document.getElementsByClassName('graf graf--title')[0].textContent
          : document.querySelector('title').textContent;
        let author =
          document.querySelector('a[property="cc:attributionName"]');
        author = author.textContent;

        let bookmarklet = {
          id: selectionData.targetElement.id,
          url: location.href,
          title: title,
          author: author,
        };

        storeBookmarklet(bookmarklet);
      }
    }
  });
}


function removeBookmarkletHighlight(id) {
  let bookmarklet = document.getElementById(id);
  bookmarklet.classList.remove('mb__bookmarklet');
  bookmarklet.onclick = () => {
    return false;
  };
}


function deleteBookmarklet(e) {
  removeBookmarkletHighlight(e.target.id);

  let deletingBookmarklet = browser.storage.local.remove(location.href);
  deletingBookmarklet.then(() => {
    displayNotification('deleted');
  }, onError);

  currentBookmarklet = null;
}


function storeBookmarklet(bookmarkletObj) {
  let url = bookmarkletObj.url;

  let storingBookmarklet = browser.storage.local.set({[url]: bookmarkletObj});
  storingBookmarklet.then(() => {
    displayNotification('added');
    displayBookmarklet(bookmarkletObj.id);
  }, onError);
}


function displayBookmarklet(bookmarkletID) {
  let previousBookmarklet = document.querySelector('.mb__bookmarklet');
  if (previousBookmarklet) {
    removeBookmarkletHighlight(previousBookmarklet.id);
  }

  currentBookmarklet = bookmarkletID;
  let bookmarklet = document.getElementById(bookmarkletID);
  bookmarklet.classList.add('mb__bookmarklet');
  bookmarklet.onclick = deleteBookmarklet;
}


function getSelectionData() {
  let selectionObj = null;
  let targetElement = null;
  let text = '';

  if (typeof window.getSelection !== 'undefined') {
    selectionObj = window.getSelection();
    text = selectionObj.toString();
    targetElement = (selectionObj.anchorNode.nodeType === 1)
      ? selectionObj.anchorNode : selectionObj.anchorNode.parentElement;
  }

  if (!targetElement.classList.contains('graf')) {
    return;
  }

  let selectionInfo = {
    'targetElement': targetElement,
    'text': text,
  };

  return selectionInfo;
}

function displayNotification(action) {
  let notification = document.getElementById('notification');
  if (notification === null) {
    notification = document.createElement('div');
    notification.id = 'notification';
    notification.classList.add('mb__hidden');

    document.body.appendChild(notification);
  }

  notification.textContent = `Bookmarklet successfully ${action}!`;
  notification.classList.remove('mb__hidden');
  setTimeout(() => {
    notification.classList.add('mb__hidden');
  }, 3000);
}
