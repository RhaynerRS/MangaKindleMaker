const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const ebookConverter =  require('node-ebook-converter');
var images = [];
var mangaFolder = "";

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
  const userImageFolderPath = path.join(
    require("os").homedir(),
    "Pictures",
    nomePasta
  );
  mangaFolder = userImageFolderPath;
  fs.mkdir(userImageFolderPath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
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

async function geraPdf() {
  const doc = new PDFDocument({
    margin: 0, // Sem margens
    margins: 0,
  });
  images.forEach((image, index) => {
    // Pega o caminho completo da imagem
    const imagePath = path.join(mangaFolder, image);

    // Adiciona uma nova página ao documento PDF
    if (index > 0) {
      doc.addPage();
    }
    console.log(doc.page.width);
    // Adiciona a imagem à página atual
    doc.image(imagePath, {
      fit: [doc.page.width, doc.page.height],
      size: [1448, 1072], // Tamanho da página
      align: "center", // Alinhamento horizontal
      valign: "center", // Alinhamento vertical
    });
  });
  doc.pipe(fs.createWriteStream(`${mangaFolder}/imagens.pdf`));
  doc.end();

  ebookConverter.convert({
    input: `${mangaFolder}/imagens.pdf`,
    output: `${mangaFolder}/imagens.epub`,
    authors: "Probably a bear...",
    delete: true
  })
}

async function BaixarImagens(url, nomePasta) {
  let numero = await numeroDePaginas(url);
  console.log("numero paginas: " + numero);
  for (let x = 2; x < numero; x++) {
    await geraMangaLivre(x, url, nomePasta);
  }
}

module.exports = BaixarImagens;
