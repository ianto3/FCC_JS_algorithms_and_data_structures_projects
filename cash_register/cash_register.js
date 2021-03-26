function checkCashRegister(price, cash, cid) {
    const currency = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    }
  
    let change = cash - price;
  
    // quickly obtain the total amount of cash available to  assess further calculations
    let total = cid.map(x => x[1]).reduce((sum, value) => sum + value);
  
    // handle first hand insufficient funds.
    if (total < change) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    } 

    // handle first hand exact change available.
    else if (total === change){
      return {status: "CLOSED", change: cid};
    } 

    else {
      const cid_after = [];
      for (let i = cid.length-1; i >= 0; i--){
        const subArr = cid[i];
        const currName = subArr[0];
        let currCash = subArr[1];
        const value = currency[currName];
        let amountToPay = 0;
        while (change/value >= 1 && currCash !== 0){
          currCash -= value;
          change -= value;
          /*
           Had to find a fix since there was a problem with float calculations
           ending up in using a penny less than necessary.
           */
          change = Math.round(change * 100) / 100;
          amountToPay += value;
        };
        // adds currency and amount used to cid_after array.
        amountToPay > 0 ? cid_after.push([currName, amountToPay]): null
      };
      // if there was still change left at this point, handle insufficient funds.
      if (change > 0) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
      };
      return {status: "OPEN", change: cid_after};
    };
  };
  
  /*
  Passed
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.
  
  Passed
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
  
  Passed
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
  
  Passed
  checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
  
  Passed
  checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
  
  Passed
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
  */