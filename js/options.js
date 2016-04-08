var data = document.getElementById('data'),
  wide = document.getElementById('wide'),
  width = document.getElementById('width'),
  height = document.getElementById('height'),
  set = document.getElementById('set');

wide.onchange = function() {
  data.innerText += "text";
};

document.body.onload = function() {
  chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      document.getElementById("data").innerText = items.data;
    }
  });
};

document.getElementById("set").onclick = function() {
  var d = width.value;
  chrome.storage.sync.set({
    "data": d
  }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
  window.close();
};
