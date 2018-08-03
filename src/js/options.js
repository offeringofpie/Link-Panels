import sync from './parts/sync.js';

let optionsElems = {
  data: document.getElementById('data'),
  wide: document.getElementById('wide'),
  width: document.getElementById('width'),
  height: document.getElementById('height'),
  experimental: document.getElementById('experimental'),
  set: document.getElementById('set')
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
  sync.update((options) => {
    optionsElems.wide.checked = options.isWide;
    optionsElems.experimental.checked = options.experimental;
    optionsElems.width.value = options.width;
    optionsElems.height.value = options.height;
    optionsElems.height.value = options.height;
  });
};

optionsElems.set.onclick = () => {
  sync.set({
    width: parseInt(optionsElems.width.value),
    height: parseInt(optionsElems.height.value),
    isWide: optionsElems.wide.checked,
    experimental: optionsElems.experimental.checked
  });
  window.close();
};
