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
  '//*[@id="the4-content"]/div[2]/div/div/div/div/div/section[1]/table/tbody/tr'
);

let itemSets = [];

for (let i = 0; i < rows.length; i++) {
  let [skuName, qty] = rows[i].children[0].textContent
    .replace("\n\t\t", "")
    .replace("\t", "")
    .split("×");

  qty = Number(qty[1]);
  price = Number(
    rows[i].children[1].textContent.replace("\n\t\t$", "").replace("\t", "")
  );

  itemSets.push([skuName, qty, price]);
}

let items = [];
for (let i = 0; i < itemSets.length; i++) {
  let itemName = itemSets[i][0];
  let qty = itemSets[i][1] * 2; // Each set has 2 of each size
  let itemPrice = itemSets[i][2] / 6;
  let sizeS = [itemName, "S", qty, itemPrice];
  let sizeM = [itemName, "M", qty, itemPrice];
  let sizeL = [itemName, "L", qty, itemPrice];

  items.push(sizeS);
  items.push(sizeM);
  items.push(sizeL);
}

console.table(items);
