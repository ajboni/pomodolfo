const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const { NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
let mainWindow = null;


if (dev) {

	require('electron-reload')(path.join(__dirname, '..', '..', 'public'), {
		// electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
	})
};

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 500,
		height: 550,
		icon: path.join(__dirname, '..', '..', 'public', 'icon.png'),
		webPreferences: {
			nodeIntegration: true
		}
	})

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, '../..', 'public', 'index.html'))
	mainWindow.removeMenu()

	// minimize
	mainWindow.on('minimize', function (event) {
		event.preventDefault();
		mainWindow.hide();
	});

	mainWindow.on('close', function (event) {
		if (!app.isQuiting) {
			event.preventDefault();
			mainWindow.hide();
		}
	});

	const shell = require('electron').shell;

	mainWindow.webContents.on('will-navigate', (event, url) => {
		event.preventDefault()
		shell.openExternal(url)
	});


}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(createWindow).then()

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		// app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here. 


const iconPath = path.join(__dirname, 'trayIcon.png');
let tray = null;

app.on('ready', () => {
	tray = new Tray(iconPath)

	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Open', type: 'normal', click: () => {
				mainWindow.show();
			}
		},
		{

			label: 'About', type: 'normal', click: () => {
				mainWindow.show();
				mainWindow.webContents.send('changePage', 'about')
			}
		},
		{

			label: 'Toggle Developer Tool', type: 'normal', click: () => {
				mainWindow.webContents.openDevTools()
			}
		},
		{ type: 'separator' },
		{
			label: 'Exit', type: 'normal', click: () => {
				app.quit();
				app.exit();
			}
		}
	])

	tray.setToolTip('This is my application.')
	tray.setContextMenu(contextMenu)
})

