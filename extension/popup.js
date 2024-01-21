// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   const activeTab = tabs[0];

//   document
//     .getElementById("fillFormButton")
//     .addEventListener("click", async () => {
//       const fileInput = document.getElementById("csvFileInput");
//       const csvFile = fileInput.files[0];
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const csvData = e.target.result.split("\n");
//         const headers = csvData[0].split(",");
//         const formData = csvData.slice(1).map((row) =>
//           row.split(",").reduce((obj, value, index) => {
//             obj[headers[index]] = value;
//             return obj;
//           }, {})
//         );
//         console.log("🚀 ~ reader.onload= ~ formData:", formData);

//         for (const rowData of formData) {
//           try {
//             chrome.tabs.executeScript(null, {
//               code:
//                 "document.getElementById('name').value = '" +
//                 rowData["name"] +
//                 "'",
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.querySelector('input[name="surname"]').value = "${rowData.surname}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.querySelector('input[name="age"]').value = "${rowData.age}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('gender').value = "${rowData.gender}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('profession').value = "${rowData.profession}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('country').value = "${rowData.country}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('state').value = "${rowData.state}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('district').value = "${rowData.district}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('rd_city').value = "${rowData.living_in}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('city').value = "${rowData.city}"`,
//             });
//             setTimeout(1000);
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('mobile_no').value = "${rowData.mobile_no}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('email').value = "${rowData.email}"`,
//             });
//             chrome.tabs.executeScript(null, {
//               code: `document.getElementById('source').value = "${rowData.source}"`,
//             });
//           } catch (error) {
//             console.error("Error filling form:", error);
//           }
//         }
//       };
//       reader.readAsText(csvFile);
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submitBtn");
  // const csvFileInput = document.getElementById("csvFile");

  submitBtn.addEventListener("click", function () {
    const fileInput = document.getElementById("csvFile");
    const csvFile = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvData = e.target.result.split("\n");
      const headers = csvData[0].split(",");
      const formData = csvData.slice(1).map((row) =>
        row.split(",").reduce((obj, value, index) => {
          obj[headers[index]] = value;
          return obj;
        }, {})
      );
      console.log("🚀 ~ reader.onload= ~ formData:", formData);

      for (const rowData of formData) {
        console.log("🚀 ~ file:", rowData);
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
              action: "startFilling",
              rowData,
            });
          }
        );
        chrome.tabs.executeScript({
          file: "script.js",
        });
      }
    };
    reader.readAsText(csvFile);
  });
});
