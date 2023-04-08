const { exec } = require('node:child_process');
const path = require("path");

async function GeraMobi(PathToEpub, NomeArquivo) {
    exec(`cd ${path.join(__dirname)} & kindlegen.exe ${PathToEpub} -o ${NomeArquivo}.mobi`, () => {});
}

module.exports = GeraMobi;