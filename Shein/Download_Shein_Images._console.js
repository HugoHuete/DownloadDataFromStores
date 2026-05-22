let div_number = 1;
let miniatures;

// Cambiar el … por %E2%80%A6
var dictionary = {
  
};
// Encontrar el div que corresponde a las miniaturas
while (div_number < 50) {
  console.log(`Probando div_number: ${div_number}`);
  miniatures = document.evaluate(
    `/html/body/div[${div_number}]/div/div/div[2]/div/div[1]/ul/li`,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
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
    null,
  ).singleNodeValue;
}
