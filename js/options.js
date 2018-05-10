let optionsElems = {
  data: document.querySelector('#data'),
  wide: document.querySelector('#wide'),
  width: document.querySelector('#width'),
  height: document.querySelector('#height'),
  experimental: document.querySelector('#experimental'),
  set: document.querySelector('#set')
};

optionsElems.width.onchange = () => {
  if (optionsElems.wide.checked) {
    optionsElems.height.value = Math.floor(optionsElems.width.value * 9 / 16);
  }
};
//width.value = 450;
optionsElems.wide.onchange = () => {
  if (optionsElems.wide.checked) {
    optionsElems.height.disabled = true;
  } else {
    optionsElems.height.disabled = false;
    optionsElems.height.value = Math.floor(optionsElems.width.value * 9 / 16);
  }
};

document.body.onload = () => {
  chrome.storage.sync.get('options', opts => {
    if (!chrome.runtime.lastError) {
      optionsElems.wide.checked = opts.checked;
      optionsElems.experimental.checked = opts.experimental;
      optionsElems.width.value = opts.width;
      optionsElems.height.value = opts.height;
    } else {
      console.error(chrome.runtime.lastError);
    }
  });
};

optionsElems.set.onclick = () => {
  chrome.storage.sync.set(
    {
      options: {
        width: parseInt(optionsElems.width.value),
        height: parseInt(optionsElems.height.value),
        isWide: optionsElems.wide.checked,
        experimental: optionsElems.experimental.checked
      }
    },
    () => {
      if (chrome.runtime.lastError) {
        console.log('Runtime error.');
      }
    }
  );
  window.close();
};
