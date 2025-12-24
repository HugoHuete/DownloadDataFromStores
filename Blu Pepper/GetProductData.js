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
  
  '/html/body/div[1]/div/main/div/div/div[1]/table/tbody/tr'
);

let itemSets = [];

for (let i = 0; i < rows.length; i++) {
  let data = rows[i]

  let productName = data.children[0].children[0].textContent;
  let sku = data.children[1].textContent;

  let qty = Number(data.children[3].textContent);
  let price =
    data.children[2].textContent.replace(
      "$",
      ""
    );
  
  if (isNaN(price))
  {
    price = data.children[2].children[3].textContent.replace(
      "$",
      ""
    );
  }

  itemSets.push([sku, productName, qty, price]);
}

let items = [];
for (let i = 0; i < itemSets.length; i++) {
  let sku = itemSets[i][0];
  let productName = itemSets[i][1];
  let qty = itemSets[i][2] * 2; // Each set has 2 of each size

  let itemPrice = itemSets[i][3] / 6; // Each set has 6 items

  let sizeS = [sku, productName, "S", qty, itemPrice];
  let sizeM = [sku, productName, "M", qty, itemPrice];
  let sizeL = [sku, productName, "L", qty, itemPrice];

  items.push(sizeS);
  items.push(sizeM);
  items.push(sizeL);
}

console.table(items);
