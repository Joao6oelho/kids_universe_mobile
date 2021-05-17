window.onload = function () {
  const SERVER_URL = "https://kidsuniverse.herokuapp.com/activities";
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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

        var table = document.getElementById("tabelaAtividades");

        for (var i = 0; i < activities.length; i++) {
          if (activities[i].status === "approved") {
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = `${activities[i].name}`;
            cell2.innerHTML = `${activities[i].description}`;
            cell3.innerHTML = `<a href="descricao.html?id=${activities[i].id}"> <i
            class="fas fa-chevron-right"> </i></a>`;
          }
        }
      });
  });
};
