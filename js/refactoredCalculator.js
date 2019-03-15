let Calculator = {
  // Price per liter water in euros
  WATER_PRICE: 0.002,

  // Equipment cost per month in euros
  EQUIPMENT_COST: 0.25,

  // Price Sodastreams in euros
  SodaStreamPower: 150,
  SodaStreamCrystal: 115,
  SodaStreamSource: 100,
  LevivoWassersprudler: 70,
  SodaStreamEasy: 60,
  Rosenstein: 60,
  SodaStreamCool: 55,
  SodaTrendClassic: 50,
  Aquabar: 35,

  // Amount gas power needs in liter
  WEAK_GAS: 60,
  MEDIUM_GAS: 55,
  STRONG_GAS: 50,

  // Price cylinder in euros
  CYCLINDER_PRICE: 9,

  // Results
  LiterResult: 0,
  MonthResult: 0,

  startProcess: function() {
    let gasSelect = document.getElementById("choice_gas_power");
    let gasChoice = gasSelect.options[gasSelect.selectedIndex].value;

    let sodastreamNumber = document.getElementById("choice_sodastream");
    let sodaChoice = sodastreamNumber.options[sodastreamNumber.selectedIndex].value;

    let literChoice = document.getElementById("choice_liters").value;

    Calculator.calculateLiterPrice(Calculator.getGasCoverage(gasChoice), Calculator.getSStreamerPrice(sodaChoice), literChoice);
    Calculator.calculateMonthPrice(Calculator.getGasCoverage(gasChoice), Calculator.getSStreamerPrice(sodaChoice), literChoice);
  },

  calculateLiterPrice: function(gasCoverage, sodaPrice, literAmount) {
    let literAmountMonth = literAmount * 30;
    let equipCostLiter = Calculator.EQUIPMENT_COST / literAmountMonth;

    // Deprecation over 3 years (36 months) per month
    let sodaWriteOffMonth = (sodaPrice / 36) / literAmountMonth;
    // Deprecation over 3 years (36 months) per month in cent
    let sodaWriteOffLiter = sodaWriteOffMonth / literAmountMonth;

    // Cylinder divided by gasCoverage in euros
    let cylinderPriceLiter = Calculator.CYCLINDER_PRICE / gasCoverage;

    let result = Calculator.WATER_PRICE + cylinderPriceLiter + equipCostLiter + sodaWriteOffMonth;

    // Converting to 2 digts after comma and * 100 for cent
    let num = Number(result * 100);
    let roundedString = num.toFixed(2);
    let rounded_result = Number(roundedString);

    // document.getElementById("calc_result_liter").value = rounded_result;
    Calculator.LiterResult = rounded_result;
    // alert("Preis pro Liter: " + rounded_result);
  },

  calculateMonthPrice: function(gasCoverage, sodaPrice, literAmount) {
    // * 30 for day in month
    let literAmountMonth = literAmount * 30;
    let literPriceMonth = literAmountMonth * Calculator.WATER_PRICE;

    // Deprecation over 3 years (36 months) per month
    let sodaWriteOffMonth = sodaPrice / 36;

    // Cylinder divided by gasCoverage in euros
    let cylinderPriceLiter = Calculator.CYCLINDER_PRICE / gasCoverage;
    let cylinderPriceMonth = cylinderPriceLiter * literAmountMonth;

    let result = literPriceMonth + cylinderPriceMonth + Calculator.EQUIPMENT_COST + sodaWriteOffMonth;

    // Converting to 2 digts after comma and * 100 for cent
    let num = Number(result);
    let roundedString = num.toFixed(2);
    let rounded_result = Number(roundedString);
    Calculator.MonthResult = rounded_result;
    // alert("Preis pro Monat: " + rounded_result);
    // document.getElementById("calc_result_month").value = rounded_result;
  },

  getSStreamerPrice: function(sodaChoice) {
    let sodaPrice;

    switch (sodaChoice) {
      case "SodaStreamPower":
        sodaPrice = Calculator.SodaStreamPower;
        break;
      case "SodaStreamCrystal":
        sodaPrice = Calculator.SodaStreamCrystal;
        break;
      case "SodaStreamSource":
        sodaPrice = Calculator.SodaStreamSource;
        break;
      case "Levivo":
        sodaPrice = Calculator.LevivoWassersprudler;
        break;
      case "SodaStreamEasy":
        sodaPrice = Calculator.SodaStreamEasy;
        break;
      case "Rosenstein":
        sodaPrice = Calculator.Rosenstein;
        break;
      case "SodaStreamCool":
        sodaPrice = Calculator.SodaStreamCool;
        break;
      case "SodaTrendClassic":
        sodaPrice = Calculator.SodaTrendClassic;
        break;
      case "Aquabar":
        sodaPrice = Calculator.Aquabar;
        break;
      default:
        console.log("sodaChoice error");
        // alert("Wähle eine Sprudelstärke aus");
    }
    return sodaPrice;
  },

  getGasCoverage: function(gasChoice) {
    let gasCoverage;

    switch (gasChoice) {
      case "gas_weak":
        gasCoverage = Calculator.WEAK_GAS;
        break;
      case "gas_medium":
        gasCoverage = Calculator.MEDIUM_GAS;
        break;
      case "gas_strong":
        gasCoverage = Calculator.STRONG_GAS;
        break;
      default:
        console.log("gasChoice error");
        // alert("Wähle ein Sodastream aus");
    }
    return gasCoverage;
  }
};

// JQuery Event handling
let inputs = new Array(false, false, false);

$("#btn_result").click(function(e) {
  e.preventDefault();
  Calculator.startProcess();
  document.getElementById('result_liter').innerHTML = Calculator.LiterResult + "€";
  document.getElementById('result_month').innerHTML = Calculator.MonthResult + "€";
});

$("#choice_gas_power").on('change', function() {
  inputs[0] = true;
  enableButton();
});

$("#choice_sodastream").on('change', function() {
  inputs[1] = true;
  enableButton();
});

$("#choice_liters").on('change', function() {
  inputs[2] = true;
  enableButton();
});

function enableButton() {
  if (inputs[0] && inputs[1] && inputs[2]) {
    $("#btn_result").prop('disabled', false);
  }
}
