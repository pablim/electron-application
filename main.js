//main.js

const { app, BrowserWindow, ipcMain, Tray, Menu  } = require('electron');
const data = require('./data');

let mainWindow = null;
app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,

        /**
         * Electron require() is not defined problem
         * 
         * Solution: As of version 5, the default for nodeIntegration changed 
         * from true to false. You can enable it when creating the Browser 
         * Window:
         * https://stackoverflow.com/questions/44391448/electron-require-is-not-defined
         *  */ 
        webPreferences: {
            nodeIntegration: true
        }
    });

    tray = new Tray(__dirname + '/app/img/home.png');
    let trayMenu = Menu.buildFromTemplate([
        { label: 'Cursos' },
        { label: '', type: 'separator' },
        { label: 'JavaScript', type: 'radio', 
            click: () => {
                mainWindow.send('curso-trocado', 'JavaScript');
            }  
        },
        { label: 'Java', type: 'radio',
            click: () => {
                mainWindow.send('curso-trocado', 'Java');
            } 
        },
        { label: 'Photoshop', type: 'radio',
            click: () => {
                mainWindow.send('curso-trocado', 'Photoshop');
            }
        }
    ]);
    tray.setContextMenu(trayMenu);

    //mainWindow.loadURL("https://www.alura.com.br");
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});


app.on('window-all-closed', () => {
      app.quit();
});

let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', () => {

    // caso não seja verificado a janela fica sendo sempre sobreposta
    if (sobreWindow == null) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 220,

            // Sempre sobreposta as outras janelas
            alwaysOnTop: true,

            // Remove os controles da janela
            frame: false,

            webPreferences: {
                nodeIntegration: true
            }
        });
    }

    /**
     * Evita que a variável seja destruída e garante que seja possível chamar a 
     * mesma janela depois que ela é fechada
     *  */ 
    sobreWindow.on('closed', () => {
        sobreWindow = null;
    });

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});

ipcMain.on('get-dados', (event, nome, email) => {
    console.log(nome);
    console.log(email);

    data.salvaDados(nome, email);
    
});
