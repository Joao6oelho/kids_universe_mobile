window.onload = function () {
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //id passado no URL do browser e que corresponde ao id da town hall
  var urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  fetch(
    `https://kidsuniverse.herokuapp.com/activities/${urlParams.get("id")}`,
    opts
  )
    .then((response) => response.json())
    .then((activity) => {
      //todos os input por defeitos estao readOnly = true
      document.querySelectorAll("input").forEach((input) => {
        input.readOnly = true;
      });
      console.log(activity);
      var description = document.getElementById("textodescri");
      description.value = activity.description;

      var espaco = document.getElementById("espaco");
      espaco.value = activity.locality;

      var date = document.getElementById("data");
      date.value = activity.start_date;

      // Parsing object to string to use localStorage as a solution to shadowing
      localStorage.setItem("activity", JSON.stringify(activity));

      fetchRegistrations();
    });

  //Registar na Atividade
  // Fetching users registrations
  function fetchRegistrations() {
    fetch(`https://kidsuniverse.herokuapp.com/registrations/profile`, opts)
      .then((response) => response.json())
      .then((registrations) => {
        var checker = [];
        console.log(registrations);
        var c = 0;

        // Removes registration if it's not of logged in user
        var user_id = localStorage.getItem("id");
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i].child_id != user_id) {
            registrations.splice(i, 1);
            i--;
          }
        }

        /* Creating array as intersection between approved activities and 
      activities the user is registered in */
        // Mega-Colossal-Humongous-Brain double for cycle stolen from PP

        // Reversing the previous parse and clearing localStorage
        var activity = JSON.parse(localStorage.getItem("activity"));
        localStorage.removeItem("activity");
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i].activity_id == activity.id) {
            checker[0] = activity;
            c++;
          }
        }

        if (checker[0] == null) {
          var inscritoBut = document.getElementById("botaoJ");
          inscritoBut.style.visibility = "hidden";

          // Current date (at time of register)
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, "0");
          var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          var yyyy = today.getFullYear();
          today = yyyy + "-" + mm + "-" + dd;

          // Creating data to post
          var dataRegistration = {};
          dataRegistration.activity_id = activity.id;
          dataRegistration.res_date = today;

          console.log(dataRegistration);

          // Post event
          var participBut = document.getElementById("botaoP");
          participBut.addEventListener("click", function () {
            console.log(dataRegistration);
            const token = localStorage.getItem("token");
            const options = {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataRegistration),
            };
            return fetch(
              "https://kidsuniverse.herokuapp.com/registrations",
              options
            )
              .then(function (response) {
                if (response.ok) {
                  Swal.fire(
                    "Inscrição efetuada com sucesso",
                    "",
                    "success"
                  ).then((result) => {
                    window.location = "atividades.html";
                  });
                }
              })
              .catch(function (err) {
                Swal.fire("Oops!", `Erro:${err}. Tente novamente.`, "error");
              });
          });
        } else {
          var inscritoBut = document.getElementById("botaoP");
          inscritoBut.style.visibility = "hidden";
        }
      });
  }
};
