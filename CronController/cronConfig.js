const schedule = require('node-schedule');
const fs = require('fs');
const moment = require('moment');

// var fileNew;

const CronJob = () => { schedule.scheduleJob('*/10 * * * * *', () => {
    var path = './localStorage/'+moment().format('YYYYMMDD_hhmmss') + ".json";
    const CreateFile = fs.writeFileSync(path, '{"ModData":[]}');
    console.log(moment().format('YYYYMMDD_hhmmss') +"  File Created..........");
    // fileName = moment().format('YYYYMMDD_hhmmss')+".json";
    check();
    // fileName = "test"
    // console.log(fileName);
    // return fileName;
},
); 
};

// const check = () => {for (let i = 0; i < 1; i++) {
//     fileName += i;
//     console.log(fileName);
//   } };

const check = () => {setInterval( function()
    {for (let i = 0; i < 1; i++) {
        let fileName = 1;
        fileName = fileName+1;
        console.log(fileName);}},
    1000)};


module.exports = {CronJob, check};