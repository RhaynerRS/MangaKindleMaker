const express = require("express");
const bodyParser = require("body-parser");
const {BaixarImagens, ResetaImagens} = require("./SalvarManga.js");
const GeraEpub = require("./GeraEpub.js");
const GeraMobi = require("./GeraMobi.js");
const path = require("path");
const api = require("./api");
const GetMangaImages = require("./GetMangaImages.js")
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
  let PathToEpub = path.join(require("os").homedir(), "Pictures",  req.body.folder);

  totalImages = [...await GetMangaImages(req.body.name, req.body.folder, req.body.start, req.body.end)];
  
  await GeraEpub(totalImages,
    req.body.folder,
    req.body.author,
    PathToEpub,
    req.body.cover
  );
  
  await GeraMobi(path.join(PathToEpub, `${req.body.folder}.epub`), req.body.folder);

  res.send(`Seu mangá ${req.body.name} foi gerado com sucesso e foi salvo em ${PathToEpub}`);
});

app.get('*', (req, res) => {
  res.header("401");
  res.render("html/401.html");
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}/`);
});
