chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "intialState") {
    localStorage.setItem("csvData", JSON.stringify(request.formData));
    localStorage.setItem("csvDataIndex", 0);
    console.log("🚀 ~ reader.onload= ~ request.formData:", request.formData);
  } else if (request.action === "nextSate") {
    console.log("🚀 ~ request.action:", request.action);
    localStorage.setItem(
      "csvDataIndex",
      parseInt(localStorage.getItem("csvDataIndex")) + 1
    );
  }

  const jsonParseData = JSON.parse(localStorage.getItem("csvData"));
  const jSONIndex = parseInt(localStorage.getItem("csvDataIndex"));
  const jsonData = jsonParseData[jSONIndex];

  const data = jsonData;

  filledDataForm(data);

  const formSubmitBtn = document.getElementById("individual");

  formSubmitBtn.addEventListener("click", function (event) {
    // formSubmitBtn.checkValidity()

    var newURL = "https://majhivasundhara.in/en/pledge/MQ%3D%3D";
    window.open(newURL, "_blank").focus();
    // filledDataForm(jsonData);
  });
  return true;
});

function filledDataForm(data) {
  let element = document.getElementById("country");
  element.value = data.country;
  element.dispatchEvent(new Event("change"));
  element.dispatchEvent(new Event("click"));

  let element1 = document.getElementById("state");
  element1.value = data.state;
  element1.dispatchEvent(new Event("change", { bubbles: true }));

  setTimeout(() => {
    let element2 = document.getElementById("district");
    element2.value = data.district;
    element2.dispatchEvent(new Event("change", { bubbles: true }));
    fillField(document.querySelector('input[name="living_in"]'), data.rd_city);
    setTimeout(() => {
      let element3 = document.getElementById("city");
      element3.value = data.city;
      element3.dispatchEvent(new Event("change", { bubbles: true }));
    }, 1000);
  }, 500);

  let element3 = document.getElementsByName("pledge[]")[0];
  element3.value = Math.floor(Math.random() * 3 + 1);
  element3.dispatchEvent(new Event("change", { bubbles: true }));

  // document.getElementById("name").value = data.name;

  fillField(document.querySelector('input[name="name"]'), data.name);
  fillField(document.querySelector('input[name="surname"]'), data.surname);
  fillField(document.querySelector('input[name="age"]'), data.age);
  fillField(document.querySelector('select[name="gender"]'), data.gender);
  fillField(
    document.querySelector('select[name="profession"]'),
    data.profession
  );
  // await page.waitForTimeout(2000);

  // fillField(document.querySelector('select[name="city"]'), data.city);

  // // await fillField(document.querySelector('input[name="Select Gram Panchayat"]'), data.gramPanchayat); // Uncomment if needed
  // // await fillField(document.querySelector('input[name="Select City"]'), data.city); // Uncomment if needed
  fillField(document.querySelector('input[name="mobile_no"]'), data.mobile_no);
  fillField(document.querySelector('input[name="email"]'), data.email);
  fillField(document.querySelector('select[name="source"]'), data.source);
  // Add code to submit the form if needed

  // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   // Parse CSV and fill form fields
  //   const csvData = request.csvData;
  //   console.log("🚀 ~ csvData:", csvData);
  //   // Your CSV parsing and form-filling logic here
  // });
}

function fillField(field, value) {
  if (field) {
    field.value = value;
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

// function parseCSV(file) {
//   console.log("🚀 ~ parseCSV ~ file:", file);
//   // Implement CSV parsing logic here
//   // Return an array of form data objects
// }

// function fillForm(formData) {
//   console.log("🚀 ~ fillForm ~ formData:", formData);
//   // Implement form filling logic here
// }
