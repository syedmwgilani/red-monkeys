// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


console.log('process.argv: ', process.argv)
//parse all argv for the letter d after a '-' or look for '--debug'
const DEBUG = process.argv.find( x => /^-\w*d+\w*$|^--debug$/i.test(x) ) ? true : false
//parse all argv for the letter f after a '-' or look for '--full'
const FULLSCREEN = process.argv.find( x => /^-\w*f+\w*$|^--full$/i.test(x) ) ? true : false
//parse all argv for the letter r after a '-' or look for '--reload'
const RELOAD = process.argv.find( x => /^-\w*r+\w*$|^--reload$/i.test(x) ) ? true : false

global.DEBUG = DEBUG


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Launch fullscreen with DevTools open
   // TO USE: electron . -f -d -r
   // OR USE: electron . -fdr
   console.log('DEBUG: ', DEBUG)
   if (DEBUG) {
      mainWindow.webContents.openDevTools()
      require('devtron').install()
   }
   console.log('FULLSCREEN: ', FULLSCREEN)
   if (FULLSCREEN) {
      mainWindow.maximize()
   }
   console.log('RELOAD: ', RELOAD)
   if (RELOAD) {
      require('electron-reload')(__dirname)
   }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
