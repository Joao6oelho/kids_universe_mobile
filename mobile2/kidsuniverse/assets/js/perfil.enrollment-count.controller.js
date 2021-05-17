window.onload = function () {
  // Fetching all activities
  const SERVER_URL = "https://kidsuniverse.herokuapp.com/activities";
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Creating and sorting array with only finished activities
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
          if (activities[i].status != "finished") {
            activities.splice(i, 1);
            i--;
          }
        }
        // Parsing object to string to use localStorage as a solution to shadowing
        localStorage.setItem("activitiesFinished", JSON.stringify(activities));
      });

    // Reversing the previous parse and clearing localStorage
    var activitiesFinished = JSON.parse(
      localStorage.getItem("activitiesFinished")
    );
    localStorage.removeItem("activitiesFinished");

    // Fetching user registrations
    fetch(`https://kidsuniverse.herokuapp.com/registrations/profile`, opts)
      .then((response) => response.json())
      .then((registrations) => {
        var participacoesUser = [];
        var c = 0;

        // Removes registration if it's not of logged in user
        var user_id = localStorage.getItem("id");
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i].child_id != user_id) {
            registrations.splice(i, 1);
            i--;
          }
        }

        /* Creating array as intersection between finished activities and 
        activities the user is registered in */
        // Mega-Colossal-Humongous-Brain double for cycle stolen from PP
        for (var i = 0; i < registrations.length; i++) {
          for (var j = 0; j < activitiesFinished.length; j++) {
            if (registrations[i].activity_id == activitiesFinished[j].id) {
              participacoesUser[c] = activitiesFinished[j];
              c++;
            }
          }
        }

        // Counting number of activities participated in
        var participated = participacoesUser.length;
        var count_field = document.getElementById("numero");
        count_field.innerHTML = participated;
        var user_field = document.getElementById("username");
        user_field.innerHTML = localStorage.getItem("username");
      });
  });
};
