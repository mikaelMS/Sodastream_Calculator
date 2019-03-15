let inputs = new Array(false, false, false);

$(document).ready(function() {
  $("#choice_gas_power").on('change', function() {
    inputs[0] = true;
    console.log(inputs);
    enableButton();
  });

  $("#choice_sodastream").on('change', function() {
    inputs[1] = true;
    console.log(inputs);
    enableButton();
  });

  $("#choice_liters").on('change', function() {
    inputs[2] = true;
    console.log(inputs);
    enableButton();
  });

  $("#btn_result").on('click', function() {
    alert("Hi");
  });

  console.log(inputs);
  function enableButton() {
    if (inputs[0] && inputs[1] && inputs[2]) {
      $("#btn_result").prop('disabled', false);
    }
  }
});
