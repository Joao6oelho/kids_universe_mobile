// Post event
window.onload = function () {
  var registBut = document.getElementById("botaoI");
  registBut.addEventListener("click", function () {
    // Value fetching
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var name = document.getElementById("nome").value;
    var username = document.getElementById("username").value;
    var birthdate = document.getElementById("date").value;

    // Validation
    if (email && password && name && username && birthdate !== null) {

      // Creating submission val
      var userdata = {};

      userdata.name = name;
      userdata.username = username;
      userdata.email = email;
      userdata.password = password;
      userdata.birthdate = birthdate;
      userdata.phone_number = "999999999";
      userdata.profile = "child";
      // Post method
      const options2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      };
      return fetch("https://kidsuniverse.herokuapp.com/auth/signup", options2)
        .then(function (response) {
          if (response.ok) {
            Swal.fire("Inscrição efetuada com sucesso", "", "success").then(
              (result) => {
                localStorage.clear();
                window.location = "entrar.html";
              }
            );
          }
          else {
            Swal.fire("Oops!", `Erro: Email já registado. Tente novamente.`, "error");
          }
        })
        .catch(function (err) {
          Swal.fire("Oops!", `Erro:${err}. Tente novamente.`, "error");
        });
    } else {
      Swal.fire("Preencha o formulário corretamente", "", "error");
      return;
    }
  });
};
