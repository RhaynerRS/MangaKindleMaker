function adicionarCampo() {
  var formulario = document.getElementById("formManga");

  var formGroup = document.createElement("div");
  formGroup.className = "form-group mb-3 ";
  formGroup.id = `comp-${Math.floor(Math.random() * (99999 - 10000) + 10000)}`
  formGroup.style = "display:flex;justify-content: center; align-items:center;";
  var excluirCapitulo = document.createElement("i");
  excluirCapitulo.className = "btn fa-solid fa-xmark text-danger cursor-pointer";
  excluirCapitulo.addEventListener("click", () => {
    let pai = document.getElementById("formManga");
    let elemento = document.getElementById(formGroup.id);
    pai.removeChild(elemento)
  })
  var novoCapitulo = document.createElement("input");
  novoCapitulo.classList.add("form-control");
  novoCapitulo.type = "text";
  novoCapitulo.name = "manga";
  novoCapitulo.placeholder = "Insira o link do capitulo";
  formGroup.appendChild(excluirCapitulo);
  formGroup.appendChild(novoCapitulo);

  formulario.appendChild(formGroup);
}

async function criarManga() {

  var inps = document.getElementsByName('manga');
  var urls = [];
  inps.forEach((input) => {
    urls.push(input.value)
  })
  document.getElementById("enviar").disabled = true;
  try {
    await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ urls: urls, nomePasta: document.getElementById("nomeManga")?.value ?? null, cover: document.getElementById("mangaCover")?.value ?? null, autor: document.getElementById("mangaAutor")?.value ?? null })
    }).then((res) => {
      document.getElementById("enviar").disabled = false;
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Tudo certo!",
          text: "Seu mangá foi salvo com sucesso",
          confirmButtonText: "ótimo",
        })
      }
    })
  } catch {
    document.getElementById("enviar").disabled = false;
  }
}

var capManga = document.getElementById('testando')
var autorManga = document.getElementById('autor')

function AdicionarCapaManga(checked) {
  let capa = document.getElementById('autorManga');
  if (checked)
    capa.innerHTML = `<div class="form-group mb-3">
    <input type="text" class="form-control" name="autor" id="mangaCover" aria-describedby="emailHelp"
      placeholder="Insira o link da capa">
  </div>`;
  else
    capa.innerHTML = null;
}

function AdicionarAutorManga(checked) {
  let capa = document.getElementById('capaManga');
  if (checked)
    capa.innerHTML = `<div class="form-group mb-3">
    <input type="text" class="form-control" name="cover" id="mangaAutor" aria-describedby="emailHelp"
      placeholder="Insira o nome do autor">
  </div>`;
  else
    capa.innerHTML = null;
}


capManga.addEventListener('change', function () {
  AdicionarCapaManga(this.checked)
})

autorManga.addEventListener('change', function () {
  AdicionarAutorManga(this.checked)
})

