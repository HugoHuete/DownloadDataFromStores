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
    
    let orders = getElementsByXpath(
      "/html/body/div[1]/div[1]/div[1]/div[2]/div/div[3]/ul[2]/li"
    );
    let ordersArray = [];
    
    for (let j = 0; j < orders.length; j++) {
      let orderDate = orders[j].children[0].children[0].textContent;
      let orderCode = orders[j].children[0].children[1].textContent;
      ordersArray.push([orderDate, orderCode.split(" ")[2]]);
    }
    
    console.table(ordersArray);