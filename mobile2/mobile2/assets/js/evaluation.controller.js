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
      console.log(activity);
      var activity_field = document.getElementById("activity");
      activity_field.value = activity.description;

      localStorage.setItem("activity_id", activity.id);

      fetchRegistrations();
    });

  //Registar na Atividade
  // Fetching users registrations
  function fetchRegistrations() {
    fetch(`https://kidsuniverse.herokuapp.com/registrations/profile`, opts)
      .then((response) => response.json())
      .then((registrations) => {
        console.log(registrations);

        // Removes registration if it's not of logged in user
        var user_id = localStorage.getItem("id");
        var activity_id = localStorage.getItem("activity_id");
        localStorage.removeItem("activity_id");
        for (var i = 0; i < registrations.length; i++) {
          if (
            registrations[i].child_id != user_id ||
            registrations[i].activity_id != activity_id
          ) {
            registrations.splice(i, 1);
            i--;
          }
        }
        console.log(registrations);

        // Inserting values in fields
        var notes = registrations[0].notes;
        if (
          notes != "" ||
          notes != " " ||
          notes != "  " ||
          notes != "   " ||
          notes != "    " ||
          notes != "     "
        ) {
          document.getElementById("notes").innerHTML = notes;
        }

        var rating = registrations[0].rating;

        if (rating == 1) {
          document.getElementById("star-1").checked = "true";
        }
        if (rating == 2) {
          document.getElementById("star-2").checked = "true";
        }
        if (rating == 3) {
          document.getElementById("star-3").checked = "true";
        }
        if (rating == 4) {
          document.getElementById("star-4").checked = "true";
        }        
        if (rating == 5) {
          document.getElementById("star-5").checked = "true";
        }

        // Creating data to post
        var dataEval = {};
        var res_date = registrations[0].res_date;
        console.log(res_date);
        dataEval.activity_id = activity_id;
        dataEval.res_date = res_date;

        console.log(dataEval);

        // Post event
        var avBut = document.getElementById("botaoA");
        avBut.addEventListener("click", function () {
          var notes = document.getElementById("notes").value;
          var rating = $("input[type='radio'][name='star']:checked").val();

          dataEval.notes = notes;
          dataEval.rating = rating;

          console.log(dataEval);

          const token = localStorage.getItem("token");
          const options = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataEval),
          };
          return fetch(
            `https://kidsuniverse.herokuapp.com/registrations/${activity_id}`,
            options
          )
            .then(function (response) {
              if (response.ok) {
                Swal.fire("Avaliação efetuada com sucesso", "", "success").then(
                  (result) => {
                    window.location = "participacoes.html";
                  }
                );
              }
            })
            .catch(function (err) {
              Swal.fire(
                "Erro!",
                `Erro:${err}. Por favor, tente novamente.`,
                "error"
              );
            });
        });
      });
  }
};
