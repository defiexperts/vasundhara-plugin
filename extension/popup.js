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

      console.log("🚀 ~ file:", formData);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        console.log("🚀 ~ activeTab:", activeTab);
        chrome.tabs.sendMessage(activeTab.id, {
          action: "intialState",
          formData,
        });
      });
      chrome.tabs.executeScript({
        file: "script.js",
      });
    };
    reader.readAsText(csvFile);
  });

  const nextBtn = document.getElementById("nextBtn");

  nextBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        action: "nextSate",
      });
    });
    chrome.tabs.executeScript({
      file: "script.js",
    });
  });
});
