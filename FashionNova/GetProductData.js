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
  // /html/body/div[1]/div[1]/div[1]/div[2]/div/div[3]/ul[2]/li[10]/div[1]/span[2]/em
  // let rows = document.getElementsByClassName('account-order__line-item');
  let rows = getElementsByXpath(
    "/html/body/div[2]/main/div/div[2]/div/div[3]/div"
  );
  let itemsFn = [];
  
  for (let j = 0; j < rows.length; j++) {
    let row = rows[j];
    let name = row.children[1].children[0].children[0].textContent;
    let size = row.children[1].children[0].children[1].textContent;
    let price = row.children[1].children[1].children[0].children[0].textContent;
    let link = row.children[1].children[0].attributes.href.textContent;
    let qty = "";
  
      try {
        qty = row.children[1].children[1].children[1].textContent;
      } catch (error) {
        qty = row.children[1].children[0].textContent; // cambiar esto
      }
  
      itemsFn.push([name, size.split(' ')[1], qty.split(' ')[1], price, link]);
  }
  console.table(itemsFn);
  