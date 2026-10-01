const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const excelPath = path.resolve(__dirname, '../data/employee-data.xlsx');
const outputPath = path.resolve(__dirname, '../performance/test-data.json');

if (!fs.existsSync(excelPath)) {
  throw new Error(`Excel file not found: ${excelPath}`);
}

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

const cleaned = rows
  .filter((row) => row.firstName || row.middleName || row.lastName)
  .map((row) => ({
    firstName: String(row.firstName || '').trim(),
    middleName: String(row.middleName || '').trim(),
    lastName: String(row.lastName || '').trim(),
  }));

fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2));
console.log(`Exported ${cleaned.length} rows to ${outputPath}`);
