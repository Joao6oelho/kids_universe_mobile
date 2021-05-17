//Limpa LocalStorage e volta para página de login
document
  .getElementsByClassName("logout")[0]
  .addEventListener("click", function (event) {
    Swal.fire({
      title: `Tem a certeza que quer sair da aplicação?`,
      showDenyButton: true,
      confirmButtonText: `Sim`,
      confirmButtonColor: `rgb(0, 140, 255)`,
      
      denyButtonText: `Cancelar`,
      denyButtonColor: `rgb(218, 7, 7)`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        document.location.href = "inicio.html";
      } else if (result.isDenied) {
        window.dispose();
      }
    });
  });
