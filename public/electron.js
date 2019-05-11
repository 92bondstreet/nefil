const {app, BrowserWindow} = require('electron');
const chokidar = require('chokidar');
const fs = require('fs');
const isDev = require('electron-is-dev');
const mime = require('mime');
const path = require('path');

const watcher = chokidar.watch('~/FHIR');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    'width': 1024,
    'height': 768,
    'webPreferences': {
      'nodeIntegration': true
    }
  });
  mainWindow.maximize();

  mainWindow.webContents.once('dom-ready', () => {
    watcher.on('add', what => {
      // get the mimetype
      const filemime = mime.getType(what);

      try {
        const data = fs.readFileSync(what, {'encoding': 'base64'});
        const blob = `data:${filemime};base64,${data}`;

        mainWindow.webContents.send('watch-desktop-files', blob);
      } catch (err) {
        console.error(err);
      }
    });
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null)); //eslint-disable-line
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
