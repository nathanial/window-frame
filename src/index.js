// @if NODE_ENV='production'
module.exports = {};
// @endif


// @if NODE_ENV='development'

import app from 'app';
import BrowserWindow from 'browser-window';


const WM_NCLBUTTONDOWN = Number.parseInt('0xA1');
const WM_NCHITTEST = Number.parseInt('0x84');
const HT_CAPTION = Number.parseInt('0x2');
const WM_NCCALCSIZE = Number.parseInt('0x83');
const WM_DEVICECHANGE = Number.parseInt('0x0219');

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    'min-width': 500,
    'min-height': 300,
    'auto-hide-menu-bar' : true,
    frame: false
  });
  console.log("BAM");
  mainWindow.hookWindowMessage(WM_NCCALCSIZE, function(w_param, l_param_pointer) {
    console.log("Calc Size", w_param, l_param_pointer);
  });
  console.log("Hooked", mainWindow.isWindowMessageHooked(WM_DEVICECHANGE));
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

// @endif
