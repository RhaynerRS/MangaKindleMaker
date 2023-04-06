const express = require("express");
const bodyParser = require("body-parser");
const BaixarImagens = require("./manga.js");
const GeraMobi = require("./GeraMobi.js");
const path = require("path");
var cors = require("cors");
const { exec } = require("child_process");

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
  var dataToSend;
  // spawn new child process to call the python script
  let totalImages = [];
  for (let i = 0; i < req.body.urls.length; i++) {
    totalImages.push(...await BaixarImagens(req.body.urls[i], req.body.nomePasta));
  }
  console.log(totalImages);
  await GeraMobi(totalImages,
    req.body.nomePasta,
    "rhayner Rossmann",
    path.join(require("os").homedir(), "Pictures",  req.body.nomePasta)
  );
  res.send(req.body);
});
app.listen(port, () =>
  console.log(`Example app listening on port 
 ${port}!`)
);
