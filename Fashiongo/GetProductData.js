function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue;
}

let tableBody = getElementByXpath(
  "/html/body/div/div[15]/div[2]/div[2]/div/div[2]/div[6]/div[1]/table/tbody",
);

let styleRows = tableBody.children;

let items = [];

for (let styleCounter = 0; styleCounter < styleRows.length; styleCounter++) {
  let styleRow = styleRows[styleCounter];

  let styleNumber = styleRow.querySelector("td a, td div")?.textContent?.trim();
  let styleName = styleRow.querySelector("td p").textContent;

  let colorRows = styleRow.querySelectorAll("td table");

  // Dentro de cada estilo se segmenta por cadd color
  for (let colorCounter = 0; colorCounter < colorRows.length; colorCounter++) {
    let colorRow = colorRows[colorCounter];

    let colorName = colorRow.querySelector(
      "tbody > tr > td > ul > li:nth-child(2) > div > em",
    ).textContent;
    let sku = `${styleNumber} - ${colorName}`;
    let price = colorRow
      .querySelector(
        "tbody > tr > td > ul > li:nth-child(2) > div:nth-child(4)",
      )
      .textContent.replace("$", "");

    // Y aca se separa por talla y cantidad
    let sizes = colorRow.querySelectorAll(
      "tbody > tr > td > ul > li:nth-child(1) > ul > li",
    );
    let quantity = colorRow.querySelectorAll(
      "tbody > tr > td > ul > li:nth-child(2) > div:nth-child(2) > ul > li",
    );

    for (let sizeCounter = 0; sizeCounter < sizes.length; sizeCounter++) {
      let size = sizes[sizeCounter].textContent;
      let qty = quantity[sizeCounter].textContent;
      items.push([sku, styleName, size, qty, price]);
    }
  }
}

console.table(items);
