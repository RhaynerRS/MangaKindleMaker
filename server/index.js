const express = require("express");
const bodyParser = require("body-parser");
const {BaixarImagens, ResetaImagens} = require("./SalvarManga.js");
const GeraEpub = require("./GeraEpub.js");
const GeraMobi = require("./GeraMobi.js");
const path = require("path");
var cors = require("cors");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
const port = 3000;
app.post("/", async (req, res) => {
  let totalImages = [];
  let PathToEpub = path.join(require("os").homedir(), "Pictures",  req.body.nomePasta);

  for (let i = 0; i < req.body.urls.length; i++) {
    totalImages = [...await BaixarImagens(req.body.urls[i], req.body.nomePasta)];
  }
  ResetaImagens();
  
  await GeraEpub(totalImages,
    req.body.nomePasta,
    req.body.autor,
    PathToEpub,
    req.body.cover
  );
  
  await GeraMobi(path.join(PathToEpub, `${req.body.nomePasta}.epub`), req.body.nomePasta);

  res.send(req.body);
});
app.listen(port, () =>{});
