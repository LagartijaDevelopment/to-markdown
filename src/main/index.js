'use strict';

import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import fs from 'fs';
const mammoth = require('mammoth');
const path = require('path');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 763,
    useContentSize: true,
	width: 1000,
	icon: path.join(__dirname, 'assets/web/icons/launcher-icon-72.png')
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipcMain.on('convert-file', (event, payload) => {
    mammoth.convertToMarkdown(payload)
      .then((result) => {
        event.sender.send('asynchronous-reply', result.value);
      });
  });

  ipcMain.on('download-file', (event, payload) => {
	var date = new Date();
	dialog.showSaveDialog({
			defaultPath: `post-${date}.md`,
			filters: [
				{ name: 'MD', extensions: ['md'] }
			]
		}, (fileName) => {
			if (fileName === undefined) {
				console.log('You didn\'t save the file');
				return;
			}
			// fileName is a string that contains the path and filename created in the save file dialog.
			fs.writeFile(fileName, payload.file, (err) => {
				if (err) throw err;
				event.sender.send('file-download-success');
			});
		}
	);
  });
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

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater';

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates();
});
 */
