var data = document.getElementById('data'),
  wide = document.getElementById('wide'),
  width = document.getElementById('width'),
  height = document.getElementById('height'),
  set = document.getElementById('set');

var sync = {
  update: function() {
    chrome.storage.sync.get("options", function(settings) {
      if (!chrome.runtime.error) {
        width.value = settings.options.width;
        width.placeholder = settings.options.width;
        height.value = settings.options.height;
        height.placeholder = settings.options.height;
        if (settings.options.isWide) {
          wide.checked = true;
          height.disabled = true;
        }
      }
    });
  },
  set: function(object) {
    chrome.storage.sync.set({
      "options": object
    }, function() {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
  }
};
width.onchange = function() {
  if (wide.checked) {
    height.value = Math.floor(width.value * 9 / 16);
  }
};
//width.value = 450;
wide.onchange = function() {
  if (wide.checked) {
    height.disabled = true;
  } else {
    height.disabled = false;
    height.value = Math.floor(width.value * 9 / 16);
  }
};

document.body.onload = function() {
  sync.update();
};

document.getElementById("set").onclick = function() {
  var w = parseInt(width.value),
  h = parseInt(height.value),
  isWide = wide.checked;
  sync.set({
    width: w,
    height: h,
    isWide: isWide
  });
  window.close();
};
