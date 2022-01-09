let fileName = '95type_405/95type_405.model.json';
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ fileName });
});
