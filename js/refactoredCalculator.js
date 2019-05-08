var startWindowSize = 0;
$(window).on('load', function() {
  startWindowSize = $(this).width();
  console.log(startWindowSize);
});

var whatLiterToChoose = "";
// Window resize function
$(window).on('resize', function() {
  var win = $(this); //this = window
  console.log("hier");
  if (win.width() > 762) {
    whatLiterToChoose = "scale";
  }
  if (win.width() <= 762) {
    whatLiterToChoose = "slider";
  }

  if (startWindowSize - win.width() < 0 && win.width() > 762) {
    inputs[2] = false
    enableButton();
  } else {
    inputs[2] = true
    enableButton();
  }

  if (startWindowSize - win.width() > 0 && win.width() <= 762) {
    inputs[2] = false
    enableButton();
  } else {
    inputs[2] = true
    enableButton();
  }
});

// Range Slider
var max = 40,
  min = 0.5,
  step = 0.5,
  value = 0;
output = $('#range-slider__value').text(value.toFixed(1));
coolNumber = value;

let Calculator = {
  // Price per liter water in euros
  WATER_PRICE: 0.002,

  // Price dicounter water per liter in euros
  WATER_PRICE_DISCOUNTER: 0.13,

  // Price marken water per liter in euros
  WATER_PRICE_MARKEN: 0.30,

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
  LiterResultSodastream: 0,
  MonthResultSodastream: 0,

  LiterResultDiscounter: 0,
  MonthResultDiscounter: 0,

  LiterResultMarken: 0,
  MonthResultMarken: 0,

  startProcess: function() {
    let gasSelect = document.getElementById("choice_gas_power");
    let gasChoice = gasSelect.options[gasSelect.selectedIndex].value;

    let sodastreamNumber = document.getElementById("choice_sodastream");
    let sodaChoice = sodastreamNumber.options[sodastreamNumber.selectedIndex].value;

    let literChoice;

    console.log(whatLiterToChoose);
    if (whatLiterToChoose === "scale" || $(window).width() > 762) {
      literChoice = document.getElementById("choice_liters").value;
    } else {
      literChoice = coolNumber;
    }

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
    let rounded_result = String(roundedString);
    Calculator.LiterResultSodastream = rounded_result.replace(".", ",");

    let discounterResult = String((literAmount * Calculator.WATER_PRICE_DISCOUNTER).toFixed(2));
    Calculator.LiterResultDiscounter = discounterResult.replace(".", ",");

    let markenResult = String((literAmount * Calculator.WATER_PRICE_MARKEN).toFixed(2));
    Calculator.LiterResultMarken = markenResult.replace(".", ",");
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
    let rounded_result = String(roundedString);
    Calculator.MonthResultSodastream = rounded_result.replace(".", ",");

    let discounterResult = String((literAmount * Calculator.WATER_PRICE_DISCOUNTER * 30).toFixed(2));
    Calculator.MonthResultDiscounter = discounterResult.replace(".", ",");

    let markenResult = String((literAmount * Calculator.WATER_PRICE_MARKEN * 30).toFixed(2));
    Calculator.MonthResultMarken = markenResult.replace(".", ",");
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
var inputs = new Array(false, false, false);

$("#btn_result").click(function(e) {
  e.preventDefault();
  Calculator.startProcess();
  document.getElementById('result_liter_sodastream').innerHTML = Calculator.LiterResultSodastream + " " + "Cent";
  document.getElementById('result_month_sodastream').innerHTML = Calculator.MonthResultSodastream + "€";

  document.getElementById('result_liter_discounter').innerHTML = Calculator.LiterResultDiscounter + " " + "Cent";
  document.getElementById('result_month_discounter').innerHTML = Calculator.MonthResultDiscounter + "€";

  document.getElementById('result_liter_marken').innerHTML = Calculator.LiterResultMarken + " " + "Cent";
  document.getElementById('result_month_marken').innerHTML = Calculator.MonthResultMarken + "€";
  $("#results_table tr").fadeIn("slow");
});

//  Loading all rows after another (Currently in Development)
// var animateTable = function() {
//   var i = 1;
//   $("#results_table tr:nth-child("+i+")").fadeIn("slow");
//   i++;
//   setTimeout();
// }

$("#choice_gas_power").on('change', function() {
  inputs[0] = true;
  enableButton();
});

$("#choice_sodastream").on('change', function() {
  inputs[1] = true;
  enableButton();
});

$("#choice_liters").on('change', function() {
  if ((startWindowSize - 762) > 0) {
    inputs[2] = true;
    enableButton();
  }
});

$("#formControlRange")
  .attr({
    'max': max,
    'min': min,
    'step': step,
    'value': String(value)
  })
  .on('input change', function() {

    coolNumber = parseFloat(this.value);
    output.text(coolNumber.toFixed(1));

    if (document.getElementById("formControlRange").value > 0) {
      if ((startWindowSize - 762) <= 0) {
        inputs[2] = true;
        enableButton();
      }
    }
  });

function enableButton() {
  if (inputs[0] && inputs[1] && inputs[2]) {
    $("#btn_result").prop('disabled', false);
  } else {
    $("#btn_result").prop('disabled', true);
  }
}
