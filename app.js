"use strict";
// import { parse } from "csv-parse";

const puppeteer = require("puppeteer");
const fs = require("fs");
const parse = require("csv-parse");
const Tesseract = require("tesseract.js");
const axios = require("axios");
const Jimp = require("jimp");

// Function to read CSV file and return an array of objects
async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(parse.parse({ delimiter: "," }))
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Function to fill the form with CSV data
async function fillForm(browser, csvData) {
  const page = await browser.newPage();

  await page.goto("https://majhivasundhara.in/en/pledge/MQ%3D%3D");

  // Your form selectors may vary, update them accordingly
  await page.type('input[name="name"]', csvData[0]);
  await page.type('input[name="surname"]', csvData[1]);
  await page.type('input[name="age"]', csvData[2]);
  await page.select('select[name="gender"]', csvData[3]);
  await page.select('select[name="profession"]', csvData[4]);
  await page.select('select[name="country"]', csvData[5]);
  await page.select('select[name="state"]', csvData[6]);
  await page.waitForTimeout(1000);
  await page.select('select[name="district"]', csvData[7]);
  await page.waitForTimeout(2000);
  await page.type('input[name="living_in"]', csvData[8]);
  await page.select('select[name="city"]', csvData[9]);
  // await page.type('input[name="Select Gram Panchayat"]', csvData[10]);
  // await page.type('input[name="Select City"]', csvData[11]);
  await page.type('input[name="mobile_no"]', csvData[10]);
  await page.type('input[name="email"]', csvData[11]);
  await page.select('select[name="source"]', csvData[12]);

  // Add any necessary delay if required
  await page.waitForTimeout(2000);

  // Handle captcha
  // const captchaText = await handleCaptcha(page);
  // console.log("Captcha Text:", captchaText);
  // await page.type('input[name="captcha"]', captchaText);

  // Close the browser after form submission
  // await browser.close();
}

// Main function to orchestrate the process
async function main() {
  try {
    const filePath = "data.csv"; // Replace with the actual path to your CSV file
    const csvData = await readCSV(filePath);
    console.log("🚀 ~ main ~ csvData:", csvData);

    if (csvData.length > 0) {
      console.log("Opening browser...");
      const browser = await puppeteer.launch({ headless: false });
      console.log("Browser opened.");
      await fillForm(browser, csvData[0]); // Assuming the first row is headers
      console.log("🚀 ~ main ~ fillForm:", fillForm);
    } else {
      console.log("No data found in the CSV file.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
