// Import stylesheets
import "./style.css";

// This import loads the firebase namespace.
import firebase from "firebase/app";

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/database";

import * as firebaseui from "firebaseui";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>Location Monitor</h1>`;

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
document.getElementById("currTime").innerHTML = time;

// Your web app's Firebase configuration 
var firebaseConfig = {
    apiKey: "AIzaSyDWuHSYJe2vyD6jMQNEMixC8nz04kvHL-U",
    authDomain: "hiker-project.firebaseapp.com",
    databaseURL: "https://hiker-project-default-rtdb.firebaseio.com",
    projectId: "hiker-project",
    storageBucket: "hiker-project.appspot.com",
    messagingSenderId: "239563715964",
    appId: "1:239563715964:web:df16c95c819fcfdb10e0f9"
  };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//establishes root of db
var rootRef = firebase
  .database()
  .ref()
  .limitToLast(5);

//var ref = rootRef.child();

// gets values from database and changes html
// gets values from database and changes html
rootRef.on("value", function(snap) {
  //re-initializes answer in html, so doesn't repeat
  document.getElementById("answer").innerHTML = "";
  //gets values for each element in data set

  snap.forEach(function(child) {
    var childData = child.val();
    var names = childData.traceLat;
    var zips = childData.traceLong;
    var timestmp = childData.traceTime;
    document.getElementById("answer").innerHTML +=
      "<tr><td> " +
      names +
      "</td> <td> " +
      zips +
      "</td> <td> " +
      timestmp +
      "</td> </tr>";
  });

  highlight_row();

});

function highlight_row() {
  console.log("highlight row");
  var table = document.getElementById("display-table");
  var cells = table.getElementsByTagName("td");
  console.log(cells.length);

  for (var i = 0; i < cells.length; i++) {
    // Take each cell
    var cell = cells[i];
    // do something on onclick event for cell
    cell.onclick = function() {
      // Get the row id where the cell exists
      console.log("click pressed.");
      var rowId = this.parentNode.rowIndex;

      var rowsNotSelected = table.getElementsByTagName("tr");
      for (var row = 0; row < rowsNotSelected.length; row++) {
        rowsNotSelected[row].style.backgroundColor = "";
        rowsNotSelected[row].classList.remove("selected");
      };
      var rowSelected = table.getElementsByTagName("tr")[rowId];
      rowSelected.style.backgroundColor = "yellow";
      rowSelected.className += " selected";

      var msg = "The ID of the company is: " + rowSelected.cells[0].innerHTML;
      msg += "\nThe cell value is: " + this.innerHTML;
      console.log(msg);
    };
  };
};
