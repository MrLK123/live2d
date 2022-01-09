
// chrome.storage.sync.get("fileName", ({ fileName }) => {
//   setLive2dModel(fileNameList);
// });



function setLive2dModel (fileName) {
  var model_url = 'https://cdn.jsdelivr.net/gh/MrLK123/live2d/live2D/' + fileName;
  chrome.storage.sync.set({ fileName }, function () {
    var _fileName = chrome.storage.sync.get('fileName', { fileName });
    var fileName = _fileName || "cbjms_3503/cbjms_3503.model.json";
    // var model_url = 'https://cdn.jsdelivr.net/gh/MrLK123/live2d/live2D/cbjms_3503/cbjms_3503.model.json';
    var model_url = 'https://cdn.jsdelivr.net/gh/MrLK123/live2d/live2D/' + fileName;
    var loadLive = document.createElement("script");
    loadLive.innerHTML = '!function(){loadlive2d("live2d", "' + model_url + '");}()';
    document.body.appendChild(loadLive);
  });
}
let app = document.getElementById('app');
let fragment = document.createDocumentFragment();
fileNameList.forEach((item, index) => {
  const dom = document.createElement('button');
  dom.innerText = index + 1 + '号选手';
  dom.dataset.fileName = item;
  fragment.appendChild(dom);
})
app.addEventListener('click', async (e) => {
  if (!e.target || !e.target.dataset.fileName) {
    return;
  }
  const fileName = e.target.dataset.fileName;
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setLive2dModel,
    args: [fileName]
  });
});

app.appendChild(fragment);
