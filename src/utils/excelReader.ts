import * as XLSX from 'xlsx';
import path from 'path';

export type EmployeeExcelRow = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export function getEmployeeDataFromExcel(
  excelPath = path.resolve(__dirname, '../../data/employee-data.xlsx')
): EmployeeExcelRow[] {
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' }) as Record<string, string>[];

  return rows.map((row) => ({
    firstName: String(row.firstName ?? '').trim(),
    middleName: String(row.middleName ?? '').trim(),
    lastName: String(row.lastName ?? '').trim(),
  })).filter((row) => row.firstName || row.middleName || row.lastName);
}

export function generateUniqueEmployeeId(prefix = 'EMP'): string {
  const suffix = `${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 90 + 10)}`;
  return `${prefix}${suffix}`.slice(0, 10);
}

export function generateRandomIndianEmployeeData() {
  const firstNames = [
    'Aarav', 'Vihaan', 'Aditya', 'Rohan', 'Karan', 'Ishaan', 'Aditi', 'Priya',
    'Ananya', 'Nisha', 'Pooja', 'Meera', 'Saanvi', 'Riya', 'Divya', 'Sneha',
    'Manas', 'Yash', 'Kabir', 'Tanish', 'Shruti', 'Anjali', 'Neha', 'Ritika'
  ];

  const middleNames = [
    'Nitin', 'Vikas', 'Suresh', 'Rajesh', 'Anand', 'Prakash', 'Sunil', 'Mahesh',
    'Deepak', 'Arjun', 'Harish', 'Vijay', 'Mohan', 'Rakesh', 'Kunal', 'Sahil',
    'Pankaj', 'Amit', 'Dev', 'Sameer', 'Kavita', 'Leena', 'Monica', 'Shreya'
  ];

  const lastNames = [
    'Sharma', 'Patel', 'Reddy', 'Nair', 'Singh', 'Iyer', 'Desai', 'Joshi',
    'Kapoor', 'Verma', 'Kumar', 'Gupta', 'Mehta', 'Chauhan', 'Malhotra', 'Saxena',
    'Murthy', 'Bhatia', 'Rao', 'Kulkarni', 'Bhatt', 'Mishra', 'Tripathi', 'Nandan'
  ];

  const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

  return {
    firstName: pick(firstNames),
    middleName: pick(middleNames),
    lastName: pick(lastNames),
  };
}
