const { app, BrowserWindow, Menu, screen, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

//快捷连接数据
let links = [];
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().size;
  //close Menu
  Menu.setApplicationMenu(null);
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    javascript: true,
    backgroundColor: '#1e1e1e ',
    darkTheme: true,
    //无边框
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'render.js'),
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

    if (process.env.NODE_ENV === 'development') {
      mainWindow.loadFile(path.join(__dirname, '..', 'dist/index.html'));
    } else {
      mainWindow.loadURL('http://localhost:8080/');
    }
    // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.fullScreenable = true;

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



ipcMain.on('open-window', (event, arg) => {
  console.log(arg) // prints "ping"

  shell.openExternal(arg.link)
  event.reply('open-window-reply', arg)
})
// 在主进程中.
// const { ipcMain } = require('electron')

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
});

//获取links.json中快捷方式数据
ipcMain.on('get-links', async (event, arg) => {
  console.log(arg);
  
  try {
    fs.readFile(path.resolve(__dirname, '..', 'data/links.json'), {
      encoding: 'UTF-8'
    },(err, file) => {
      //缓存到全局变量中
      let linksJson = JSON.parse(file.toString('UTF-8'))
      links = linksJson;
      event.reply('get-links', links);
    });
  } catch (err) {
    event.reply('get-links', 'error');
  }
});

//监听添加快捷方式图标事件
ipcMain.on('save-link', (event, { name, link, icon}) => {
  console.log(name);
  console.log(link);
  links.links.push({
    name,
    link,
    icon
  });
  fs.writeFile(path.resolve(__dirname, '..', 'data/links.json'), JSON.stringify(links, ' ', ' '), (err, file) => {
    if (err) {
      console.log('写文件失败');
    }
    console.log('写问文件成功');
    //更新数据
    event.reply('get-links', links);
  })
  // console.log(icon);
});