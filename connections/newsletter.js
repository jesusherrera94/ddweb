var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyC15my71UTShnuhlVUfts73QvddW7HaqeQ",
    authDomain: "elimproject-77e5c.firebaseapp.com",
    databaseURL: "https://elimproject-77e5c.firebaseio.com",
    projectId: "elimproject-77e5c",
    storageBucket: "elimproject-77e5c.appspot.com",
    messagingSenderId: "339596715542",
    appId: "1:339596715542:web:f357181930ebfc26033737",
    measurementId: "G-RVLLDXEGED"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  module.exports = function(email){
    var db = firebase.database();
    var ref = db.ref("/newsletter");
    ref.push({
            "email":email,
        }); 
  }

