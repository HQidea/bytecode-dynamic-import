"use strict";
Object.defineProperty(exports, Symbol.toStringTag, {
  value: "Module"
});
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const __variableDynamicImportRuntimeHelper = function(glob, path2, segs) {
  const v = glob[path2];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise(function(_, reject) {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path2 + (path2.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
  });
};
const icon = path.join(__dirname, "../../resources/icon.png");
const store = {
  name: "store"
};
console.log("in main", store);
let module$1 = "module1";
__variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({
  "./dynamic/module1.ts": function() {
    return Promise.resolve().then(function() {
      return require("./module1-CwZeIoHg.js");
    });
  }
}), `./dynamic/${module$1}.ts`, 3).then(function() {
  console.log(`module ${module$1} loaded`);
});
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? {
      icon
    } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", function() {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler(function(details) {
    electron.shell.openExternal(details.url);
    return {
      action: "deny"
    };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(function() {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", function(_, window) {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", function() {
    return console.log("pong");
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
exports.store = store;
