function getElementsByXpath(path) {
  result = document.evaluate(
    path,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  let elements = [];
  for (let i = 0; i < result.snapshotLength; i++) {
    elements.push(result.snapshotItem(i)); // Add each matched element to the array
  }
  return elements;
}

let rows = getElementsByXpath(
  '//*[@id="root"]/div/section/div/div[2]/div/div[2]/div/div/div/div[2]/div'
);
rows = rows.slice(3).slice(0, -2); // Elimina las primeras 3 filas que son encabezados y las últimas 2 que son totales

let itemSets = [];

for (let i = 0; i < rows.length; i++) {
  console.log("Fila " + i);
  let data =
    rows[i].children[0].children[0].children[0].children[1].children[0]
      .children[0];
  let sku = data.children[0].children[0].textContent;
  let color = data.children[0].children[1].children[1].textContent;
  // let skuName = sku + " " + color;

  let qty = data.children[1].children[0].children[1].textContent.replaceAll(
    " ",
    ""
  );
  let price =
    data.children[2].children[0].children[1].children[0].textContent.replace(
      "$",
      ""
    );

  itemSets.push([sku, color, qty, price]);
}

let items = [];
for (let i = 0; i < itemSets.length; i++) {
  let itemCode = itemSets[i][0];
  let itemName = itemSets[i][1];
  let qty = itemSets[i][2] / 3; // Each set has 2 of each size
  let itemPrice = itemSets[i][3];

  let sizeS = [itemCode, itemName, "S", qty, itemPrice];
  let sizeM = [itemCode, itemName, "M", qty, itemPrice];
  let sizeL = [itemCode, itemName, "L", qty, itemPrice];

  items.push(sizeS);
  items.push(sizeM);
  items.push(sizeL);
}

console.table(items);
