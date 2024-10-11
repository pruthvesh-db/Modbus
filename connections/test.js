const fs = require('fs');
const modbus = require('../Models/dataModel');



const pathToDirectory = './localStorage';
var fileLength;
var lastFileName;
var readFilePath;
var newPath;
let data;
var time_out = 30000;


// fs.readdir(pathToDirectory, (error, files) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(files);
//     fileLength = files.length;
//     lastFileName = files[0];
//   }
// });

// console.log(fileLength);
// console.log(lastFileName);

const check = () => {setInterval( function()
  {{fs.readdir(pathToDirectory, (error, files) => {
    if (error) {
      console.log(error);
    } else {
      console.log(files);
      fileLength = files.length;
      lastFileName = files[0];
      console.log(fileLength);
      console.log(lastFileName);
      readFilePath = "./localStorage/"+lastFileName;
      newPath = "./SyncedFiles/"+lastFileName;
      
      // console.log(data);
      if(fileLength > 2){
        var time_out = 5000
      }else{time_out = 30000}
      if(fileLength > 1)
      {
      console.log("Test Running");
      data = JSON.parse(fs.readFileSync(readFilePath, 'utf-8'));
      // console.log(data);
      importData();
    }
    }
  });
  }},
  time_out)};
// const data = JSON.parse(fs.readFileSync(readFilePath, 'utf-8'))
// console.log(data);
// if(fileLength > 1){

// }

const importData = async () => {
    try {
      await modbus.create(data)
      console.log('data successfully imported');
      fs.rename(readFilePath, newPath,  function (err) {console.log("File Moved")});
      // to exit the process
      // process.exit()
    } catch (error) {
      // console.log('error', error)
      console.log("DB not COnnected")
    }
  }

// module.exports = importData;
// importData();
module.exports = check;