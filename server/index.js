const express = require("express");
const bodyParser = require("body-parser");
const {BaixarImagens, ResetaImagens} = require("./SalvarManga.js");
const GeraEpub = require("./GeraEpub.js");
const GeraMobi = require("./GeraMobi.js");
const path = require("path");
const api = require("./api");
const getManga = require("./axios.js")
var cors = require("cors");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set("views", "./static/");
app.use(express.static("./public/"))
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
const port = 3000;
app.post("/", async (req, res) => {
  let totalImages = [];
  let PathToEpub = path.join(require("os").homedir(), "Pictures",  req.body.nomePasta);

  totalImages = [...await getManga(req.body.NomeManga, req.body.nomePasta, req.body.CapInicial, req.body.CapFinal)];
  // await getManga(req.body.NomeManga, req.body.nomePasta, req.body.CapInicial, req.body.CapFinal)
  // ResetaImagens();
  
  await GeraEpub(totalImages,
    req.body.nomePasta,
    req.body.autor,
    PathToEpub,
    req.body.cover
  );
  
  await GeraMobi(path.join(PathToEpub, `${req.body.nomePasta}.epub`), req.body.nomePasta);

  res.send(`Seu mangá ${req.body.NomeManga} foi gerado com sucesso e foi salvo em ${PathToEpub}`);
});

app.get("/search/", (req, res) => {
  const name = req.query.q;
  api.search(name).then((response) => {
      res.send(response);
  });
});

app.get("/chapters/:id/", async (req, res) => {
  const id = req.params.id;
  var return_data = {
      "id_serie": undefined,
      "url_name": undefined,
      "name": undefined,
      "chapters": []
  };

  for (let i = 1; ; i++) {
      var result = await api.getChapters(id, i);
      
      // checa se as infos ja foram adicionadas para evitar ficar reescrevendo os valores.
      if (!return_data.name) { 
          return_data.id_serie = result.id_serie;
          return_data.url_name = result.url_name;
          return_data.name = result.name;
      }

      if (result.chapters.length > 0) {
          return_data.chapters = return_data.chapters.concat(result.chapters);
          continue;
      }
      break;
  }
  res.send(return_data);
});

app.get("/chapters/:id/:page/", async (req, res) => {
  const id = req.params.id;
  const page = req.params.page;

  var return_data = {
      "id_serie": undefined,
      "url_name": undefined,
      "name": undefined,
      "chapters": []
  };

  var result = await api.getChapters(id, page);

  return_data.chapters = result.chapters;

  // checa se as infos já foram adicionadas para evitar ficar reescrevendo os valores.
  if (!return_data.name) { 
      return_data.id_serie = result.id_serie;
      return_data.url_name = result.url_name;
      return_data.name = result.name;
  }

  res.send(return_data);
});

app.get('*', (req, res) => {
  res.header("401");
  res.render("html/401.html");
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}/`);
});
