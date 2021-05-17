//const fetch = require("node-fetch");  // não é preciso instalar
//import qs from "querystring"
//const qs = require("querystring");
var loginButton = document.getElementById("botaoIEntrar");
loginButton.addEventListener("click", function () {
  const SERVER_URL = "https://kidsuniverse.herokuapp.com/auth/login";

  var data = {};
  
  //data.username = "admin@kids.pt";
  //data.password = "kidsuniverse";
  //data.username = "manager@manager.com";
  //data.password = "manager";
  //data.username = "director@director.com";
  //data.password = "director"; 
  //data.username = child@child.com;
  //data.password = child;
  //data.username = c1@c1.com;
  //data.password = c1;

  data.username = document.getElementById("emailEntrar").value;
  data.password = document.getElementById("passwordEntrar").value;

  let formBody = [];

  for (const property in data) {
    const encodedKey = encodeURIComponent(property);
    const encondedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encondedValue);
  }

  formBody = formBody.join("&");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  };

  fetch(SERVER_URL, options)
    .then((response) => response.json())
    .then((responseData) => {
      const token = responseData.access_token;
      const user = responseData.user;
      console.log(user.profile);
      localStorage.setItem("token", token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("id", user.id);
      localStorage.setItem("birthdate", user.birthdate);
      localStorage.setItem("phone", user.phone_number);
      localStorage.setItem("username", user.username);
      localStorage.setItem("photo", user.photo);
      Swal.fire("De seguida, efetue reconhecimento facial", "", "info").then(
        (result) => {
          document.location.href = "cam_screen.html";
        }
      );
    })
    .catch((error) => {
      Swal.fire("Oops!", `Autenticação Falhada`, "error");
    });
});
