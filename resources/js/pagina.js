async function FormCreateMangaHandler() {
  var form = document.getElementById("create-manga");
  var button = document.getElementById("signup");
  var signupArea = document.getElementById("signup-area");
  button.disabled = true;

  var spinner = document.createElement("div");
  spinner.className = "spinner-border text-primary";
  spinner.style = "margin-left:25px";
  spinner.role = "status";

  signupArea.appendChild(spinner);

  let formData = {
    name: form.querySelector("#name").value,
    start: parseInt(form.querySelector("#start").value),
    end: parseInt(form.querySelector("#end").value),
    author: form.querySelector("#author").value,
    cover: form.querySelector("#cover").value,
    folder: form.querySelector("#folder").value,
  };

  await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Tudo certo!",
        text: "Seu mangá foi salvo com sucesso",
        confirmButtonText: "ótimo",
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
        },
        confirmButtonColor: "#0d6efd",
      });
      button.disabled = false;
      signupArea.removeChild(spinner);
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Algo deu errado",
        text: "parece que algo não esta funcionando",
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: "btn btn-primary btn-lg",
        },
        confirmButtonColor: "#0d6efd",
      });
      button.disabled = false;
      signupArea.removeChild(spinner);
    });
}
