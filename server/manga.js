const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { Mutex } = require("async-mutex");
var images = [];

async function geraMangaLivre(pag, url, nomePasta) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}/0#/!page${pag}`);
  setTimeout(() => {}, 5000);

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

  // seleciona a imagem dentro da div
  const imageElements = await page.$(`${divSelector} ${imgSelector}`);
  const screenshotBuffer = await imageElements.screenshot();
  const userImageFolderPath = path.join(require('os').homedir(), 'Pictures', nomePasta);
  fs.mkdir(userImageFolderPath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log('Pasta criada com sucesso!');
  });
  fs.writeFile(
    `${userImageFolderPath}/image-${images.length + 1}.png`,
    screenshotBuffer,
    (err) => {
      images.push(`image-${images.length + 1}.png`);
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  console.log(`Image ${images.length + 1} saved.`);
  await browser.close();
}

async function numeroDePaginas(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}/0#`);
  setTimeout(() => {}, 5000);
  const element = await page.$('em[reader-total-pages=""]');
  let text = await page.evaluate((element) => element.textContent, element);
  await browser.close();
  return text;
}

async function BaixarImagens(url,nomePasta) {
  let numero = await numeroDePaginas(url);
  console.log("numero paginas: " + numero);
  for (let x = 2; x < numero; x++) {
    await geraMangaLivre(x, url, nomePasta);
  }
}

module.exports = BaixarImagens;