
const { app, BrowserWindow } = require('electron');
const path = require('path');
try {
    require('electron-reloader')(module,{});
} catch (_) {}
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    },
    icon:path.join(__dirname,"./build/icons/icon.png")
  });
  if(process.platform==="darwin"){
    app.dock.setIcon(path.join(__dirname,"./build/icons/icon.png"))
  }
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});