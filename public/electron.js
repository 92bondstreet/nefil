/* eslint-disable no-process-env */
const {app, BrowserWindow} = require('electron');
const chokidar = require('chokidar');
const fs = require('fs');
const isDev = require('electron-is-dev');
const mime = require('mime');
const path = require('path');
const untildify = require('untildify');

require('dotenv').config();

const DEFAULT_FHIR_DIRECTORY = '~/FHIR';
const FHIR_DIRECTORY = untildify(process.env.FHIR_DIRECTORY || DEFAULT_FHIR_DIRECTORY);
const watcher = chokidar.watch(path.join(FHIR_DIRECTORY, '/**/*.pdf'));

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
      const name = path.basename(what);
      const filemime = mime.getType(what);

      try {
        const data = fs.readFileSync(what, {'encoding': 'base64'});
        const base64 = `data:${filemime};base64,${data}`;

        mainWindow.webContents.send('watch-desktop-files', {base64, name});
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
