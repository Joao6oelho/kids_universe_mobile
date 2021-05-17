window.onload = function () {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetching all data from user
  fetch(`https://kidsuniverse.herokuapp.com/users/${id}`, opts)
    .then((response) => response.json())
    .then((dados) => {
      console.log(dados);

      var nome = document.getElementById("nome");
      nome.value = dados.name;

      var email = document.getElementById("email");
      email.value = dados.email;

      var data_nasc = document.getElementById("date");

      if (dados.birthdate == "null") {
        data_nasc.value = "";
      } else {
        data_nasc.value = dados.birthdate;
      }
    });
};
