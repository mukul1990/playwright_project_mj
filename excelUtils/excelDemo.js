const ExcelJS = require("exceljs");
const fs = require('fs');
const workbook = new ExcelJS.Workbook();

async function searchExcelData(sheet,searchText) {
  await workbook.xlsx.readFile("excelUtils/excelData/download.xlsx");
  const worksheet = workbook.getWorksheet(sheet);
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
     // console.log(cell.value);
      if (cell.value === searchText) {
        console.log(rowNumber, colNumber);
      }
    });
  });
 
}

async function modifyExcelData(rowNumber, colNumber,newValue) {
    await workbook.xlsx.readFile("excelUtils/excelData/download.xlsx");
  const worksheet = workbook.getWorksheet("Sheet1");
  const cell = worksheet.getCell(rowNumber, colNumber);
  console.log(cell.value);
  cell.value = newValue;
  await workbook.xlsx.writeFile("excelUtils/excelData/download.xlsx");
  
}
modifyExcelData(4,2,"Apple");
searchExcelData("Sheet1","Banana");