import './parts/panel.js'
import sync from './parts/sync';
const browser = browser || chrome;

sync.get((options) => {
  if (typeof options.length === "undefined") {
    sync.set({
      width: 500,
      height: 281,
      isWide: true
    });
  }
});

browser.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});
