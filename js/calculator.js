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

  // Checklist if inputs were select
  GAS_INPUT_CHECK: false,
  SODA_INPUT_CHECK: false,
  LITER_INPUT_CHECK: false,

  initCalculator: function() {
    getInputValues();
  }
};

function getInputValues() {
  let gasSelect = document.getElementById("choice_gas_power");
  let gasChoice = gasSelect.options[gasSelect.selectedIndex].value;

  let sodastreamNumber = document.getElementById("choice_sodastream");
  let sodaChoice = sodastreamNumber.options[sodastreamNumber.selectedIndex].value;

  let literChoice = document.getElementById("choice_liters").value;

  // checkAllInputes(gasChoice, sodaChoice, literChoice);
  if (gasSelect.value != "noOption") {
    Calculator.GAS_INPUT_CHECK = true;
  }

  if (sodastreamNumber.value != "noOption") {
    Calculator.SODA_INPUT_CHECK = true;
  }

  if (literChoice > 0) {
    Calculator.LITER_INPUT_CHECK = true;
  }

  if (Calculator.GAS_INPUT_CHECK && Calculator.SODA_INPUT_CHECK && Calculator.LITER_INPUT_CHECK) {
    calculateLiterPrice(getGasCoverage(gasChoice), getSStreamerPrice(sodaChoice), literChoice);
    calculateMonthPrice(getGasCoverage(gasChoice), getSStreamerPrice(sodaChoice), literChoice);
  } else {
    //displayDisclaimer(); //TODO
    alert("Bitte alle Felder auswählen");
  }
}

function calculateLiterPrice(gasCoverage, sodaPrice, literAmount) {
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
  alert("Preis pro Liter: " + rounded_result);
}

function calculateMonthPrice(gasCoverage, sodaPrice, literAmount) {
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
  alert("Preis pro Monat: " + rounded_result);
  // document.getElementById("calc_result_month").value = rounded_result;
}

function getSStreamerPrice(sodaChoice) {
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
      alert("Wähle eine Sprudelstärke aus");
  }
  return sodaPrice;
}

function getGasCoverage(gasChoice) {
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
      alert("Wähle ein Sodastream aus");
  }
  return gasCoverage;
}

// // JQuery for button click
// $(function() {
//   $("#btn_result").click(function() {
//     /*
//     $("#result_currency_liter").removeClass("hide");
//     $("#result_currency_month").removeClass("hide");
//     $("#result_currency_liter").addClass("show");
//     $("#result_currency_month").addClass("show");
//     */
//   });
// });
