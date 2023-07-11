const fs = require('fs');
const path = require('path');

const dbFilePath = path.resolve(__dirname, 'savedata.json');

function readData() {
  try {
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read data from dsavedata.json:', error);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
    console.log('Data written to db.json');
  } catch (error) {
    console.error('Failed to write data to savedata.json:', error);
  }
}

module.exports = {
  readData,
  writeData,
};
