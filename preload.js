const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

function loadBase64(file) {
  try {
    const bitmap = fs.readFileSync(path.join(__dirname, 'assets', file));
    const ext = path.extname(file).slice(1);
    return `data:image/${ext};base64,${bitmap.toString('base64')}`;
  } catch (err) {
    console.error('[Preload] Falha ao carregar imagem base64:', file, err);
    return null;
  }
}

contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => ipcRenderer.send('open-external', url),
  loadConfig: () => ipcRenderer.invoke('load-config'),
  saveConfig: (data) => ipcRenderer.send('save-config', data),
  loadSettings: () => ipcRenderer.invoke('load-settings'),
  saveSettings: (settings) => ipcRenderer.send('save-settings', settings),
});

contextBridge.exposeInMainWorld('appAssets', {
  doguinho: loadBase64('doguinho.gif'),
});
