function adicionarCampo() {
  var formulario = document.getElementById("formManga");

  var formGroup = document.createElement("div");
  formGroup.className = "form-group mb-3";
  var novoCapitulo = document.createElement("input");
  novoCapitulo.classList.add("form-control");
  novoCapitulo.type = "text";
  novoCapitulo.name = "manga";
  novoCapitulo.placeholder = "Insira o link do capitulo";
  formGroup.appendChild(novoCapitulo);

  formGroup.appendChild(novoCapitulo);

  formulario.appendChild(formGroup);
}

function criarManga() {
  console.log(document.getElementById("testando"))
  var inps = document.getElementsByName('manga');
  var urls = [];
  var nomePastaManga = ''
  inps.forEach((input)=>{
    urls.push(input.value)
  })
  const body = {urls: urls}
  Swal.fire({
    title: "Qual o nome do arquivo?",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    icon: "info",
    customClass: {
      confirmButton: "btn btn-success",
    },
    confirmButtonText: "Ok",
  }).then((nomePasta)=>{
    $('#staticBackdrop').modal('show');
    return fetch("http://localhost:3000",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({urls: urls, nomePasta: nomePasta.value})
    }).then(()=>{
      $('#staticBackdrop').modal('hide');
      Swal.fire({
        icon: "success",
        title: "Tudo certo!",
        text: "Seu mangá foi salvo com sucesso",
        confirmButtonText: "ótimo",
      })
    })
  });
}
var checkbox = document.getElementById('testando')

function AdicionarCapaManga(checked) {
  let capa = document.getElementById('capaManga');
  if(checked)
    capa.innerHTML=`<div class="form-group mb-3">
    <input type="file" class="form-control" name="manga" id="exampleInputEmail1" aria-describedby="emailHelp"
      placeholder="Insira o link do capitulo">
  </div>`;
  else
    capa.innerHTML=null;
}

checkbox.addEventListener('change', function () {
  AdicionarCapaManga(this.checked)
})

