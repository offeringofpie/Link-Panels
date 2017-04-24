import './parts/panel.js'
import sync from './parts/sync';

sync.get((options) => {
  if (typeof options.length === "undefined") {
    sync.set({
      width: 500,
      height: 281,
      isWide: true
    });
  }
});
