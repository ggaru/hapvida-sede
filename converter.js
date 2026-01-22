const xlsx = require('xlsx');
const fs = require ('fs');

const wb = xlsx.readFile('./files/HAPVIDA 26.xlsx');


const ws = wb.Sheets[wb.SheetNames[0]];

const dados = xlsx.utils.sheet_to_json(ws, {range:2});

fs.writeFileSync(
    './files/hapvida.json',
    JSON.stringify(dados,null,2)
);