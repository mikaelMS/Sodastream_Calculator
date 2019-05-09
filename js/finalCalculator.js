// Point for when liter sliders change (in px)
const BREAK_POINT_SLIDER = 762;

let inputChecks = new Array(false, false, false);

const START_WINDOW_SIZE = $(window).width();
// console.log("Start: " + START_WINDOW_SIZE);

let stillInStartScreen = true;

$(window).on('resize', function() {
  let currentWidth = $(window).width();
  // console.log("Current: " + currentWidth);

  // Mobile start case
  if (START_WINDOW_SIZE > BREAK_POINT_SLIDER && currentWidth > BREAK_POINT_SLIDER) {
    stillInStartScreen = true;
  }

  if (START_WINDOW_SIZE > BREAK_POINT_SLIDER && currentWidth <= BREAK_POINT_SLIDER) {
    stillInStartScreen = false;
  }

  if (START_WINDOW_SIZE <= BREAK_POINT_SLIDER && currentWidth > BREAK_POINT_SLIDER) {
    stillInStartScreen = false;
  }

  if (START_WINDOW_SIZE <= BREAK_POINT_SLIDER && currentWidth <= BREAK_POINT_SLIDER) {
    stillInStartScreen = true;
  }
  // console.log(stillInStartScreen);
  handleButtonDisability();
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

    if ($(window).width() > 762) {
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

// Choice gas Power
$("#choice_gas_power").on('change', function() {
  inputChecks[0] = true;
  handleButtonDisability();
});

// Choice SodaStream
$("#choice_sodastream").on('change', function() {
  inputChecks[1] = true;
  handleButtonDisability();
});

// Choice_liters on the scale
$("#choice_liters").on('change', function() {
  inputChecks[2] = true;
  handleButtonDisability();
});

// Choice_liters on the slider
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

    inputChecks[2] = true;
    handleButtonDisability();
  });

function handleButtonDisability() {
  // console.log(inputChecks);
  let scaleValue = document.getElementById("choice_liters").value;
  let currentWidth = $(window).width();

  if (stillInStartScreen === false) {
    inputChecks[2] = true;

    if (scaleValue === 0 && currentWidth > BREAK_POINT_SLIDER) {
      inputChecks[2] = false;
    }

    if (coolNumber === 0 && currentWidth <= BREAK_POINT_SLIDER) {
      inputChecks[2] = false;
    }

    // console.log("After start shit: " + inputChecks);
  }

  if (inputChecks[0] && inputChecks[1] && inputChecks[2]) {
    $("#btn_result").prop('disabled', false);
  } else {
    $("#btn_result").prop('disabled', true);
  }
}
