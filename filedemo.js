const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();

async function readCSV() {

  const worksheet = await workbook.csv.readFile('utils/Defects.csv');

  worksheet.eachRow((row, rowNumber) => {
    if(rowNumber === 1) {
      console.log('Headers:', row.values);
    } else {    
    console.log(`Row ${rowNumber}:`, row.values);
    }
  });

}

readCSV().catch(console.error);