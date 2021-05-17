


function EditProfile() {

    const id = localStorage.getItem("id");
  
  var data = {};
  data.name = document.getElementById("nome").value; 
  let palavraPass = document.getElementById("pass").value;
  let rep_password = document.getElementById("conf").value;
  data.password = palavraPass;
  data.email = document.getElementById("email").value;
  const nasc = localStorage.getItem("birthdate");
  const phone =localStorage.getItem("phone");
  data.birthdate= nasc;
  data.phone_number= phone; 

 
  
  if (
    data.email === "" ||
    data.name === "" ||
    data.password === "" ||
    rep_password === ""
  ) {
    swal
      .fire({
        icon: "warning",
        title: "Alerta!",
        text: "Preencha todos os campos!",
        confirmButtonColor: `rgb(218, 7, 7)`,
      })
      .then(function () {
        console.log("The Ok Button was clicked.");
      });
    document.getElementById("pass").focus();
    return false;
  }  else if (palavraPass !== "" &&
  rep_password === ""|| palavraPass == "" &&
  rep_password !== "" ) {
    swal
      .fire({
        icon: "warning",
        title: "Alerta!",
        text: "Preencha ambos os campos!",
        confirmButtonColor: `rgb(218, 7, 7)`,
      })
      .then(function () {
        console.log("The Ok Button was clicked.");
      });
    document.getElementById("pass").focus();
    return false;
  
} else if (palavraPass != rep_password) {
    swal
      .fire({
        icon: "warning",
        title: "Alerta!",
        text: "Senhas diferentes!",
        confirmButtonColor: `rgb(218, 7, 7)`,
      })
      .then(function () {
        console.log("The Ok Button was clicked.");
      });
    document.getElementById("pass").focus();
    return false;
  } else {
    data.password = palavraPass;
  }


  console.log(data); //debugging para ver os dados que foram enviados


  const token = localStorage.getItem("token");
  const options = {
      method: "PUT",
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
  };

  console.log(data);
  //chamada fetch para envio dos dados para o servior via PUT
  fetch(
    `https://kidsuniverse.herokuapp.com/users/profile`,
    options
  )
    .then(function (response) {
      if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
      } else {
        console.log("Success PUT");
        console.log(response);
        swal
          .fire({
            icon: "success",
            title: "Sucesso!",
            text: "Perfil Atualizado",
            confirmButtonColor: `rgb(0, 140, 255)`,
          })
          .then(function () {
            // Redirect the user
            window.location.href = "./perfil.html";
          });
      }
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      alert("Submission error");
      console.error(err);
    });
}


