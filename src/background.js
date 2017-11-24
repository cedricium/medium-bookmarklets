(function () {
  let gettingDomains = browser.storage.local.get('domains');
  gettingDomains.then((storedDomains) => {
    console.log(storedDomains);
    if (Object.keys(storedDomains).length === 0) {
      setInitialDomains();
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
