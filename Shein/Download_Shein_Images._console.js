let div_number = 1;
let miniatures;

// Cambiar el … por %E2%80%A6
var dictionary = {
  "https://us.shein.com/Hauture-Body-con-detalle-de-pedrería,-hombro-descubierto-y-paneles-de-malla-p-36800991.html":
    "6847-T2 - S - C$700 (2), 6847-T3 - M - C$700 (2), 6847-T4 - L - C$700 (1)",
  "https://us.shein.com/Zolique-Body-sin-mangas-brillante-para-mujer-p-60383855.html":
    "6848-T2 - S - C$600 (2), 6848-T3 - M - C$600 (2), 6848-T4 - L - C$600 (1)",
  "https://us.shein.com/Sirith-Body-de-unicolor-con-cuello-asimétrico-drapeado,-elegante-y-sin-mangas-p-68278498.html":
    "6849-T2 - S - C$600 (2), 6849-T3 - M - C$600 (2), 6849-T4 - L - C$600 (1)",
  "https://us.shein.com/Sirith-Body-de-unicolor-con-cuello-asimétrico-plisado,-elegante-y-sin-mangas-p-68256742.html":
    "6850-T2 - S - C$600 (2), 6850-T3 - M - C$600 (2), 6850-T4 - L - C$600 (1)",
  "https://us.shein.com/Elenzga-Falda-de-mujer-con-decoración-de-rhinestones-de-colores-a-la-moda-p-180704135.html":
    "6851-T2 - S - C$700 (2), 6851-T3 - M - C$700 (2), 6851-T4 - L - C$700 (1)",
  "https://us.shein.com/Sweetra-Conjunto-de-3-piezas-de-moda-europea-y-am…asual-y-versátil-para-uso-diario-p-161252175.html":
    "6852-T2 - S - C$550 (3), 6852-T3 - M - C$550 (3), 6852-T4 - L - C$550 (3)",
  "https://us.shein.com/Sweetra-Conjunto-de-3-piezas-de-estilo-europeo-de…a-casual-versátil-para-uso-diario-p-95932321.html":
    "6853-T2 - S - C$550 (3), 6853-T3 - M - C$550 (3), 6853-T4 - L - C$550 (3)",
  "https://us.shein.com/SHEIN-EZwear-Camiseta-de-tirantes-minimalista-con…las-para-mujer,-uso-casual-diario-p-48901517.html":
    "6854-T2 - S - C$660 (2), 6854-T3 - M - C$660 (2), 6854-T4 - L - C$660 (1)",
  "https://us.shein.com/SHEIN-EZwear-Top-bandeau-con-perlas-para-mujer-p-41061623.html":
    "6855-T2 - S - C$660 (2), 6855-T3 - M - C$660 (2), 6855-T4 - L - C$660 (1)",
  "https://us.shein.com/SHEIN-EZwear-Blusa-informal-de-color-negro-sólido…tubo-y-decoración-con-lentejuelas-p-46489622.html":
    "6856-T2 - S - C$660 (2), 6856-T3 - M - C$660 (2), 6856-T4 - L - C$660 (1)",
  "https://us.shein.com/Firerie-Vestido-de-tirantes-finos-con-diseño-asim…-vacaciones,-en-primavera-verano-p-131734123.html":
    "6857-T2 - S - C$800 (2), 6857-T3 - M - C$800 (1), 6857-T4 - L - C$800 (1)",
  "https://us.shein.com/Firerie-Vestido-largo-ajustado-de-slip-con-giro-a…a-y-vacaciones,-color-albaricoque-p-59505563.html":
    "6858-T2 - S - C$800 (2), 6858-T3 - M - C$800 (1), 6858-T4 - L - C$800 (1)",
  "https://us.shein.com/SHEIN-EZwear-1-pieza-Vestido-ajustado-con-cuello-…e-moda,-para-mujer-en-color-negro-p-57721971.html":
    "6859-T2 - S - C$730 (2), 6859-T3 - M - C$730 (1), 6859-T4 - L - C$730 (1)",
  "https://us.shein.com/SHEIN-EZwear-Vestido-ceñido-de-un-hombro-de-punto-azul-marino-para-mujeres-p-78960465.html":
    "6860-T2 - S - C$730 (2), 6860-T3 - M - C$730 (1), 6860-T4 - L - C$730 (1)",
  "https://us.shein.com/SHEIN-BAE-Vestido-maxi-de-fiesta-sin-espalda-y-si…n-abertura-alta,-ajustado-al-Body-p-50891335.html":
    "6861-T2 - S - C$840 (2), 6861-T3 - M - C$840 (2), 6861-T4 - L - C$840 (1)",
  "https://us.shein.com/SHEIN-BAE-Vestido-largo-con-abertura-lateral-y-ti…on-espalda-descubierta-para-mujer-p-43698812.html":
    "6862-T2 - S - C$840 (2), 6862-T3 - M - C$840 (2), 6862-T4 - L - C$840 (1)",
  "https://us.shein.com/SHEIN-BAE-Vestido-mini-con-escote-bandeau-fruncid…-cola-de-pez,-para-uso-en-fiestas-p-47484134.html":
    "6863-T2 - S - C$770 (2), 6863-T3 - M - C$770 (2), 6863-T4 - L - C$770 (1)",
  "https://us.shein.com/SHEIN-BAE-Vestido-corto-de-fiesta-con-fruncido-brillante-tipo-bandeau-para-mujer-p-49557104.html":
    "6864-T2 - S - C$770 (2), 6864-T3 - M - C$770 (2), 6864-T4 - L - C$770 (1)",
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
// let image_path = `/html/body/div[${div_number}]/div/div/div[2]/div/div[2]/div[1]/img`;

for (let i = 0; i < miniatures.snapshotLength; i++) {
  // Clickear cada miniatura para cambiar la imagen grande
  // miniatures.snapshotItem(i).click();
  await sleep(1000);

  image_path = `/html/body/div[${div_number}]/div[2]/div/div[2]/div/div[2]/img[${
    i + 1
  }]`;
  const element = getElementByXpath(image_path);

  try {
    console.log(`Link: ${element.src}`);
  } catch (error) {
    // image_path = `/html/body/div[${div_number}]/div/div/div[2]/div/div[2]/div[2]/img`;
    // image_path = `/html/body/div[${div_number}]/div[2]/div/div[2]/div/div[2]/img[1]`;
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
