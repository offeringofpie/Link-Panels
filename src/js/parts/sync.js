export default {
  get: (func) => {
    chrome.storage.sync.get("options", func);
  },
  set: (object) => {
    chrome.storage.sync.set({
      "options": object
    }, () => {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
  },
  update: (fn) => {
    chrome.storage.sync.get("options", (opts) => {
      if (!chrome.runtime.error) {
        let settings = {
          width: opts.options.width,
          height: opts.options.height,
          isWide: opts.options.isWide
        };
        fn(settings);
      } else {
        console.error(chrome.runtime.error);
      }
    });
  }
}
