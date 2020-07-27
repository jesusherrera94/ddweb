const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain, shell} = require('electron')
var fs = require('fs')
var pdf = require('html-pdf');
var FileSaver = require('file-saver');
var ajaxRequest = require('ajax-request')
var optionsTo = {
                  format: 'Letter',
                  orientation: "portrait",
                  paginationOffset: 1, 
                  border: {
                    "top": "0.2in",            // default is 0, units: mm, cm, in, px
                    "right": "0.5in",
                    "bottom": "1in",
                    "left": "0.5in"
                  },
                  footer: {
                    "height": "15mm",
                    "contents": {
                       // Any page number is working. 1-based index
                      default: '<span style="color: #444;">Pág. {{page}}</span>' // fallback value
                    }
                  }
                  };

let win
var usr = '';


function readState(){
  var content;
// First I want to read the file
fs.readFile(path.join(__dirname,'config/st.txt'),'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    content = data;
    console.log('data '+content)
    win = new BrowserWindow({width: 1700, height: 900, icon: path.join(__dirname , 'img/DietDesignLogoXG2.ico'),webPreferences: {nodeIntegration: true}})
    win.loadURL(url.format ({
       pathname: path.join(__dirname, content=='0' ? 'Login_v3/index.html' : 'index.html'),
       protocol: 'file:',
       slashes: true
    }))
    readUsr();
});
}

function readUsr(){
  fs.readFile(path.join(__dirname, 'config/usr.txt'),'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    bypass(data);
});
}
function bypass(usrS){
usr = usrS;
console.log(usr);
}

function createWindow() {
  readState();
  
   //abre las opciones de desarrollador
  /* win.webContents.openDevTools();*/

   var options = [
  //'enable-tcp-fastopen',
  //'enable-experimental-canvas-features',
  'enable-experimental-web-platform-features',
  //'enable-overlay-scrollbars',
  //'enable-hardware-overlays',
  //'enable-universal-accelerated-overflow-scroll',
  //'allow-file-access-from-files',
  //'allow-insecure-websocket-from-https-origin',
  ['js-flags']
];

for(var i=0; i < options.length; ++i) {
  if (typeof options[i] === 'string')
    app.commandLine.appendSwitch(options[i]);
  else
    app.commandLine.appendSwitch(options[i][0], options[i][1]);
}
}

ipcMain.on('synchronous-message', (event, arg) => {
 pdf.create(arg, optionsTo).toFile('menu.pdf', function(err, res) {
    if (err) return console.log(err);
    event.returnValue = res.filename; // { filename: '/app/businesscard.pdf' }
  });
// Synchronous event emmision
})
//crear usuario
ipcMain.on('openTab', (event, arg) => {
  shell.openExternal("http://www.parallelsdev.com/services.html")
     event.returnValue = 'ok'
 // Synchronous event emmision
 })
// guardar el usuario
ipcMain.on('save-user', (event, arg) => {
   usr = arg;
  //Save user state
   fs.writeFile(path.join(__dirname,'config/st.txt'), '1', (err) => {
    if (err) {
      console.log("An error ocurred updating the file" + err.message);
        console.log(err);
        event.returnValue = '-1'
        return;
    }
    event.returnValue = '0'
    console.log("The file has been succesfully saved");
    });

    //save user posterior
    fs.writeFile(path.join(__dirname,'config/usr.txt'), usr, (err) => {
      if (err) {
        console.log("An error ocurred updating the file" + err.message);
          console.log(err);
          event.returnValue = '-1'
          return;
      }
      event.returnValue = '0'
      console.log("The file has been succesfully saved");
      });
  // Synchronous event emmision
  event.returnValue = usr;
})
// guardar el usuario
ipcMain.on('get-user', (event, arg) => {
  fs.writeFile(path.join(__dirname,'config/st.txt'), '0', (err) => {
    if (err) {
      console.log("An error ocurred updating the file" + err.message);
        console.log(err);
        event.returnValue = '-1'
        return;
    }
    event.returnValue = '0'
    console.log("The file has been succesfully saved");
    });
 // return user value
 event.returnValue = usr;
})

ipcMain.on('save-setting1', (event, arg) => {

  var txtFile = path.join(__dirname,"config/config.json");
  
  fs.writeFile(txtFile, arg, (err) => {
    if (err) {
      console.log("An error ocurred updating the file" + err.message);
        console.log(err);
        event.returnValue = '-1'
        return;
    }
    event.returnValue = '0'
    console.log("The file has been succesfully saved");
});

 })

app.on('ready', createWindow)


app.on('window-all-closed', logout);

app.on('session-end', logout);

function logout(){
  fs.writeFile(path.join(__dirname,'config/st.txt'), '0', (err) => {
    if (err) {
      console.log("An error ocurred updating the file" + err.message);
        console.log(err);
        event.returnValue = '-1'
        return;
    }
    console.log("The file has been succesfully saved");
    });
  ajaxRequest.post({
    url: 'https://dd-auth-server.herokuapp.com/logout',
  data: {user:usr}},app.quit
  );
}