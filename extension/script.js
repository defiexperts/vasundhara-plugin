chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  // if (request.action === "startFilling") {
  //   const formData = parseCSV(request.file);
  //   fillForm(formData);
  // }

  const data = request.rowData;
  console.log("🚀 ~ request:", data);

  // document.getElementById("name").value = data.name;

  //   var field = $('#surname').val(data.surname);
  //   var field1 = $('#country').val(data.country);
  //   var field2 = $('#state').val(data.state);
  // $("#state").trigger("change");

  let element = document.getElementById("country");
  element.value = data.country;
  element.dispatchEvent(new Event("change"));
  element.dispatchEvent(new Event("click"));

  let element1 = document.getElementById("state");
  element1.value = data.state;
  element1.dispatchEvent(new Event("select"));
  element1.dispatchEvent(new Event("change"));

  var delayInMilliseconds = 1000; //1 second

  setTimeout(function () {
    let element2 = document.getElementById("district");
    element2.value = data.district;
    element2.dispatchEvent(new Event("change"));
  }, 1000);

  // fillField(document.querySelector('input[name="name"]'), data.name);
  // fillField(document.querySelector('input[name="surname"]'), data.surname);
  // fillField(document.querySelector('input[name="age"]'), data.age);
  // fillField(document.querySelector('select[name="gender"]'), data.gender);
  // fillField(
  //   document.querySelector('select[name="profession"]'),
  //   data.profession
  // );
  // fillField(document.querySelector('select[name="country"]'), data.country);
  // fillField(document.querySelector('select[name="state"]'), data.state);
  // setTimeout(1000);
  // fillField(document.querySelector('select[name="district"]'), data.district);
  // setTimeout(1000);
  // fillField(document.querySelector('input[name="living_in"]'), data.living_in);
  // fillField(document.querySelector('select[name="city"]'), data.city);
  // // // await fillField(document.querySelector('input[name="Select Gram Panchayat"]'), data.gramPanchayat); // Uncomment if needed
  // // // await fillField(document.querySelector('input[name="Select City"]'), data.city); // Uncomment if needed
  // fillField(document.querySelector('input[name="mobile_no"]'), data.mobile_no);
  // fillField(document.querySelector('input[name="email"]'), data.email);
  // fillField(document.querySelector('select[name="source"]'), data.source);
  // Add code to submit the form if needed

  // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   // Parse CSV and fill form fields
  //   const csvData = request.csvData;
  //   console.log("🚀 ~ csvData:", csvData);
  //   // Your CSV parsing and form-filling logic here
  // });
});

function fillField(selector, value) {
  var field = $(selector);
  if (field.length > 0) {
    if (field.is("input") || field.is("select")) {
      field.val(value);
    } else if (field.is("select")) {
      field.val(value);
      // Trigger change event to ensure any dependent fields get updated
      field.trigger("change");
    }
  }
}

// function parseCSV(file) {
//   console.log("🚀 ~ parseCSV ~ file:", file);
//   // Implement CSV parsing logic here
//   // Return an array of form data objects
// }

function fillForm(formData) {
  console.log("🚀 ~ fillForm ~ formData:", formData);
  // Implement form filling logic here
}
