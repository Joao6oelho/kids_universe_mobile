window.onload = function () {
  // Fetching all activities
  const SERVER_URL = "https://kidsuniverse.herokuapp.com/activities";
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Creating and sorting array with only approved activities
  $(document).ready(function () {
    fetch(SERVER_URL, opts)
      .then((response) => response.json())
      .then((activities) => {
        console.log(activities);
        function compare(a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        }

        activities.sort(compare);

        // Filtering by status
        for (var i = 0; i < activities.length; i++) {
          if (activities[i].status !== "approved") {
            activities.splice(i, 1);
            i--;
          }
        }
        // Parsing object to string to use localStorage as a solution to shadowing
        localStorage.setItem("activitiesApproved", JSON.stringify(activities));
      });

    // Reversing the previous parse and clearing localStorage
    var activitiesApproved = JSON.parse(
      localStorage.getItem("activitiesApproved")
    );
    localStorage.removeItem("activitiesApproved");

    // Fetching users registrations
    fetch(`https://kidsuniverse.herokuapp.com/registrations/profile`, opts)
      .then((response) => response.json())
      .then((registrations) => {
        var inscricoesUser = [];
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
                for (var i = 0; i < registrations.length; i++) {
          for (var j = 0; j < activitiesApproved.length; j++) {
            if (
              registrations[i].activity_id == activitiesApproved[j].id
            ) {
              inscricoesUser[c] = activitiesApproved[j];
              c++;
            }
          }
        }

        // Table insertions
        var table = document.getElementById("tabelaInscricoes");
        console.log(inscricoesUser);
        for (var i = 0; i < inscricoesUser.length; i++) {
          var row = table.insertRow(0);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          cell1.innerHTML = `${inscricoesUser[i].name}`;
          cell2.innerHTML = `${inscricoesUser[i].description}`;
          cell3.innerHTML = `<button id="butaoDeleta" type="button" class="delete-action"><a> <i
        class="fas fa-trash"> </i></a></button>`;
          cell4.innerHTML = `${inscricoesUser[i].id}`;
          cell5.innerHTML = `<a href="descricao.html?id=${inscricoesUser[i].id}"> <i
          class="fas fa-chevron-right"> </i></a>`;
        }

        // Delete function
        $("button").click(function () {
          var $td = $(this).closest("tr").children("td"),
            len = $td.length + 1;

          var tableData = $td
            .map(function (i) { 
              if (i < len - 1) return $(this).text();
            })
            .get();
            console.log(tableData[3])
          const token = localStorage.getItem("token");
          const options = {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          Swal.fire({
            title: `Tem certeza se quer desinscrever da atividade ${tableData[0]}?`,
            showDenyButton: true,
            confirmButtonText: `Sim`,
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(
                `https://kidsuniverse.herokuapp.com/registrations/${tableData[3]}`,
                options
              ).then(function (responseData) {
                Swal.fire(
                  "Registos eliminados com sucesso.",
                  "",
                  "success"
                ).then((result) => {
                  window.location = "inscricoes.html";
                });
              });
            }
          });
        });
      });
  });
};
