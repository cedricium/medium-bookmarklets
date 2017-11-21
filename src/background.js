(function () {
  let gettingDomains = browser.storage.local.get('domains');
  gettingDomains.then((storedDomains) => {
    console.log(storedDomains);
    if (Object.keys(storedDomains).length === 0) {
      setInitialDomains();
    } else {
      testDomains();
    }
  }, onError);

  function setInitialDomains() {
    let domains = ['medium.com'];
    browser.storage.local.set({domains});
  }
})();

function onError(err) {
  console.error(err);
}


browser.storage.onChanged.addListener(function (changes, areaName) {
  console.log(changes);

  // if (!('domains' in changes))
    // updateSidebar(changes);
});
