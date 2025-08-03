let div_number = 1;
let miniatures;

// Cambiar el … por %E2%80%A6
var dictionary = {
  "https://us.shein.com/Aloruh-Elegante-vestido-de-ganchillo-ajustado-sin…n-V-profundo-y-lazo-en-la-espalda-p-36113551.html":
    "6179-T1 - XS - C$700 (1), 6179-T2 - S - C$700 (3), 6179-T3 - M - C$700 (3), 6179-T4 - L - C$700 (2)",
  "https://us.shein.com/Aloruh-Elegante-y-sexy-vestido-de-ganchillo-ajust…scubierta-y-tirantes-finos-huecos-p-37715151.html":
    "6180-T1 - XS - C$700 (1), 6180-T2 - S - C$700 (3), 6180-T3 - M - C$700 (3), 6180-T4 - L - C$700 (2)",
  "https://us.shein.com/Aloruh-Vestido-de-playa-hecho-a-mano-con-cintura-…encillo,-adecuado-para-vacaciones-p-36012476.html":
    "6181-T1 - XS - C$660 (1), 6181-T2 - S - C$660 (2), 6181-T3 - M - C$660 (2), 6181-T4 - L - C$660 (2)",
  "https://us.shein.com/SHEIN-LUNE-Vestido-de-suéter-largo-con-cuello-en-…gas-y-elegante-hueco-para-mujeres-p-32726973.html":
    "6182-T1 - XS - C$730 (1), 6182-T2 - S - C$730 (3), 6182-T3 - M - C$730 (3), 6182-T4 - L - C$730 (2)",
  "https://us.shein.com/SHEIN-Muchic-Vestido-minimalista-elegante-de-unicolor-sin-espalda-para-mujer,-otoño-p-45191065.html":
    "6184-T1 - XS - C$730 (1), 6184-T2 - S - C$730 (2), 6184-T3 - M - C$730 (2), 6184-T4 - L - C$730 (2)",
  "https://us.shein.com/INAWLY-Vestido-corto-sexy-sin-mangas-con-estampado-de-teñido-anudado-para-mujeres-p-40500159.html":
    "6185-T1 - XS - C$660 (1), 6185-T2 - S - C$660 (2), 6185-T3 - M - C$660 (2), 6185-T4 - L - C$660 (1)",
  "https://us.shein.com/INAWLY-Vestido-elegante-a-media-pierna,-entallado…-tipo-teñido-anudado-para-mujeres-p-48238947.html":
    "6186-T1 - XS - C$660 (1), 6186-T2 - S - C$660 (2), 6186-T3 - M - C$660 (2), 6186-T4 - L - C$660 (1)",
  "https://us.shein.com/INAWLY-Vestido-negro-casual,-de-un-solo-color,-se…-espagueti-sin-espalda-para-mujer-p-39189166.html":
    "6187-T2 - S - C$730 (1), 6187-T3 - M - C$730 (1), 6187-T4 - L - C$730 (1)",
  "https://us.shein.com/SHEIN-MOD-Vestido-camisero-mini-con-estampado-de-cielo-estrellado-vintage-romántico-p-51649897.html":
    "6188-T1 - XS - C$770 (1), 6188-T2 - S - C$770 (1), 6188-T3 - M - C$770 (1), 6188-T4 - L - C$770 (1)",
};

// Encontrar el div que corresponde a las miniaturas
while (div_number < 50) {
  console.log(`Probando div_number: ${div_number}`);
  miniatures = document.evaluate(
    `/html/body/div[${div_number}]/div/div/div[2]/div/div[1]/ul/li`,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  if (miniatures.snapshotLength < 1) {
    div_number += 1;
    continue;
  }

  console.log(`Success! div_number: ${div_number}`);
  break;
}
let image_path = `/html/body/div[${div_number}]/div/div/div[2]/div/div[2]/div[1]/img`;

for (let i = 0; i < miniatures.snapshotLength; i++) {
  // Clickear cada miniatura para cambiar la imagen grande
  miniatures.snapshotItem(i).click();
  await sleep(1000);

  const element = getElementByXpath(image_path);

  try {
    console.log(`Link: ${element.src}`);
  } catch (error) {
    image_path = `/html/body/div[${div_number}]/div/div/div[2]/div/div[2]/div[2]/img`;
    continue;
  }

  await fetch(element.src, { mode: "cors" })
    .then((response) => response.blob())
    .then((blob) => {
      // Crear un enlace temporal para descargar el blob
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const image_name = dictionary[decodeURIComponent(document.URL)];
      a.href = url;
      a.download = `${image_name} (${i}).webp`; // Nombre del archivo
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Remover el enlace después de hacer clic
      URL.revokeObjectURL(url); // Limpiar el objeto URL temporal
    })
    .catch((err) => console.error("Error al descargar la imagen:", err));
}


//-----------------------------------------------------------------------------------------------
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}
