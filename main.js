const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const db = require('./src/db');

app.setAppUserModelId('com.whatsappworkview');

let win;

function getAllowedChats() {
  try {
    const rows = db.prepare('SELECT name FROM allowed_chats ORDER BY name').all();
    return rows.map(r => r.name);
  } catch (err) {
    console.error('[DB] Falha ao ler allowed_chats', err);
    return [];
  }
}

function showCustomMessages() {
  try {
    const showMessages = db.prepare('SELECT value FROM app_config WHERE key = ?').get('show_custom_messages')?.value === 'true';
    return showMessages;
  } catch (err) {
    console.error('[DB] Falha ao ler allowed_chats', err);
    return false;
  }
}

function setAllowedChats(contacts) {
  const clear = db.prepare('DELETE FROM allowed_chats');
  const insert = db.prepare('INSERT OR IGNORE INTO allowed_chats (name) VALUES (?)');
  const tx = db.transaction(() => {
    clear.run();
    for (const name of contacts) insert.run(name);
  });
  tx();
  console.log(`[DB] Contatos atualizados (${contacts.length})`);
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'WWV - Whatsapp Work View',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: false,
      accessibleTitle: 'Whatsapp Work View',
    }
  });

  win.loadURL('https://web.whatsapp.com', {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });

  win.webContents.on('did-finish-load', () => {
    injectFilterScript();
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://web.whatsapp.com")) {
      return { action: "allow" };
    }
    shell.openExternal(url);
    return { action: "deny" };
  });
}

function injectFilterScript() {
  const injectPath = path.join(__dirname, 'scripts/inject.js');
  const code = fs.readFileSync(injectPath, 'utf8');
  const allowedChats = getAllowedChats();
  const showMessages = showCustomMessages();
  const finalCode = code.replaceAll('/*__ALLOWED__*/', JSON.stringify(allowedChats)).replace('/*__SHOW_MESSAGES__*/', showMessages ? 'true' : 'false');

  win.webContents.executeJavaScript(finalCode).catch(console.error);
}

const template = [
  {
    label: "Menu",
    submenu: [
      {
        label: "Contatos",
        click: () => {
          const settingsWin = new BrowserWindow({
            width: 500,
            height: 500,
            autoHideMenuBar: true,
            webPreferences: {
              preload: path.join(__dirname, 'preload.js'),
              contextIsolation: true,
              sandbox: false,
              nodeIntegration: false,
            }
          });

          settingsWin.loadFile(path.join(__dirname, 'ui', 'settings.html'));
        }
      },
      {
        label: "Dev",
        click: () => win.webContents.openDevTools()
      }
    ]
  }
];

ipcMain.handle('load-config', async () => getAllowedChats());
ipcMain.handle('load-settings', async () => {
  const row = db.prepare('SELECT value FROM app_config WHERE key = ?').get('show_custom_messages');
  return row ? row.value === 'true' : true;
});

ipcMain.on('save-config', (event, contacts) => setAllowedChats(contacts));
ipcMain.on('save-settings', (event, showMessages) => {
  db.prepare('INSERT OR REPLACE INTO app_config (key, value) VALUES (?, ?)').run(
    'show_custom_messages',
    showMessages ? 'true' : 'false'
  );
});

ipcMain.on('open-external', (event, url) => {
  shell.openExternal(url);
});

app.whenReady().then(() => {
  createWindow();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});