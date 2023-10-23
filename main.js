
const { app, BrowserWindow } = require('electron');
try {
    require('electron-reloader')(module,{});
} catch (_) {}
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }
  });
  // if(process.platform==="darwin"){
  //   prompt.dock.setIcon(path.join(__dirname,"./public/icon/icon.png"))
  // }
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