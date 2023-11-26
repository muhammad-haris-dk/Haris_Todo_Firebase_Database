var firebaseConfig = {
  apiKey: "AIzaSyBxmLZvC10VgWjrSYiGoHDKKcprbL4QSpg",
  authDomain: "todoapp-83062.firebaseapp.com",
  databaseURL: "https://todoapp-83062-default-rtdb.firebaseio.com",
  projectId: "todoapp-83062",
  storageBucket: "todoapp-83062.appspot.com",
  messagingSenderId: "115159902561",
  appId: "1:115159902561:web:6684fb693e4daad0bf7d20",
};

var app = firebase.initializeApp(firebaseConfig);

// console.log(app);
var input = document.getElementById("inp");
firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    var liElement = document.createElement("li");

    var liText = document.createTextNode(data.val().value);

    liElement.setAttribute("class", "list");

    liElement.appendChild(liText);

    var editbtn = document.createElement("Button");

    var editbtntext = document.createTextNode("Edit");

    editbtn.setAttribute("onclick", "edit(this)");

    editbtn.setAttribute("id", data.val().key);

    editbtn.setAttribute("class", "edit");

    editbtn.appendChild(editbtntext);

    liElement.appendChild(editbtn);

    var delbtn = document.createElement("Button");

    var delbtntext = document.createTextNode("Delete");

    delbtn.setAttribute("onclick", "del(this)");

    delbtn.setAttribute("id", data.val().key);

    delbtn.setAttribute("class", "del");

    delbtn.appendChild(delbtntext);

    liElement.appendChild(delbtn);

    var list = document.getElementById("list");

    list.appendChild(liElement);
  });
function addItem() {
  var database = firebase.database().ref("todos");

  var key = database.push().key;
  var getInput = {
    value: input.value,
    key: key,
  };
  database.child(key).set(getInput);

  if (input.value == "") {
    var list = document.getElementById("list");
    alert("Please Enter Your Field");
    list.innerHTML = "";
    firebase.database().ref("todos").child(key).remove();
  }
  input.value = "";
}

function deleteAllItem() {
  var list = document.getElementById("list");

  list.innerHTML = "";

  firebase.database().ref().remove();
}
function del(d) {
  firebase.database().ref("todos").child(d.id).remove();
  d.parentNode.remove();
}
function edit(e) {
  var input = prompt("Updated Value");

  var editTodo = {
    value:input,
    key:e.id,
  }

  firebase.database().ref('todos').child(e.id).set(editTodo)

  e.parentNode.firstChild.nodeValue = input;
}
