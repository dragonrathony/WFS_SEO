// import modules
var WebPageTest = require('./lib/webPageTest');
const fs = require('fs')


// delete content in file
let dir = './pageSpeed/textfile/', fileName = 'PageSpeed.txt';
if (fs.existsSync(dir)) {
    fs.truncate(dir + fileName, 0, function () {
        console.log('PageSpeed.txt content is removed')
        // Run
        // const testUrl = 'https://css-tricks.com';
        const testUrl = 'https://www.forrent.com/';
        WebPageTest.run(testUrl, dir, fileName);
    })
}
