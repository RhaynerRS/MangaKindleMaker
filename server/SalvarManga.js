const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const sharp = require('sharp');
const ComprimeImagens = require('./ComprimeImagens.js')
var images = [];

async function geraMangaLivre(url, nomePasta, numero, paginaInicial) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}#/!page${paginaInicial}`);

  for (let i = 0; i < numero; i++) {
    setTimeout(() => { }, 5000);

    await page.evaluate(() => {
      const elements = document.querySelectorAll("a.scrollToTop");
      for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
    });

    const divSelector = ".manga-image"; // seleciona a div com a classe 'manga-image'
    const imgSelector = "img"; // seleciona a tag 'img' dentro da div

    // aguarda a existência da div e da imagem dentro dela
    await page.waitForSelector(divSelector);
    await page.waitForSelector(`${divSelector} ${imgSelector}`);

    let screenshotBuffer;
    let userImageFolderPath;
    let metadata;
    // seleciona a imagem dentro da div
    await page.waitForSelector(`${divSelector} ${imgSelector}`, { visible: true, timeout: 10000 })
      .then(async () => {
        const data = await page.$(`${divSelector} ${imgSelector}`);
        if (data) {
          const boundingBox = await data.boundingBox();
          if (boundingBox && boundingBox.width > 0) {
            screenshotBuffer = await data.screenshot();
            const image = sharp(screenshotBuffer);
            metadata = await image.metadata();
            userImageFolderPath = path.join(
              require("os").homedir(),
              "Pictures",
              nomePasta
            );
          }
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });


    mangaFolder = userImageFolderPath;
    fs.mkdir(userImageFolderPath, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
    if(metadata.width<metadata.height || (metadata.height*0.7)>=(metadata.width/2)){
      fs.writeFile(
        `${userImageFolderPath}/${images.length + 1}.png`,
        screenshotBuffer,
        (err) => {
          images.push(`${images.length + 1}.png`);
          if (err) {
            console.error(err);
            return;
          }
        }
      );
      ComprimeImagens(userImageFolderPath, `${images.length + 1}.png`)
    }

    const form = await page.$('div.page-next');
    await form.evaluate(form => form.click());
  }

  await browser.close();
}

async function numeroDePaginas(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}#`);
  setTimeout(() => { }, 5000);
  const element = await page.$('em[reader-total-pages=""]');
  let text = await page.evaluate((element) => element.textContent, element);
  await browser.close();
  return text;
}

async function BaixarImagens(url, nomePasta, paginaInicial = 0) {
  let numero = await numeroDePaginas(url);
  await geraMangaLivre(url, nomePasta, numero, paginaInicial);
  return images;
}

function ResetaImagens() {
  images = [];
}

module.exports = {
  BaixarImagens: BaixarImagens,
  ResetaImagens: ResetaImagens
}