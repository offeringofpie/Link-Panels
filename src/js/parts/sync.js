const browser = browser || chrome;

export default {
  get: (fn) => {
    browser.storage.sync.get("options", fn);
  },
  set: (object) => {
    browser.storage.sync.set({
      "options": object
    }, () => {
      if (browser.runtime.lastError) {
        console.log("Runtime error.");
      }
    });
  },
  update: (fn) => {
    browser.storage.sync.get("options", (opts) => {
      if (!browser.runtime.lastError) {
        let settings = {
          width: opts.options.width,
          height: opts.options.height,
          isWide: opts.options.isWide
        };
        fn(settings);
      } else {
        console.error(browser.runtime.lastError);
      }
    });
  }
}
