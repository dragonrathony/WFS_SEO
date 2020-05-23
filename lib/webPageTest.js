// import modules
var WebPageTest = require('WebPageTest');
const fs = require('fs');
const mkdirp = require('mkdirp')
require('dotenv').config()

// Setting up WebPageTest instance
const WebPageTestAPIKey = process.env.WebPageTestAPIKey || "A.6faad93636d939b4a49a4632fd7ecbc2";
if (!WebPageTestAPIKey) {
    console.error("🛡️ API Key is missing 🛡️");
}
var wpt = new WebPageTest('https://www.webpagetest.org/', WebPageTestAPIKey)


module.exports = {
    // run function
    async run(url, dir, fileName) {
        console.log('Started!!')
        wpt.runTest(url, {
            connectivity: 'Cable',
            location: 'Dulles:Chrome',
            firstViewOnly: false,
            runs: 1,
            pollResults: 5,
            video: true
        }, function processTestResult(err, result) {
            console.log('Load time:', result.data.average.firstView.loadTime)

            let loadTime = result.data.average.firstView.loadTime;
            let loadTimeSecond = (parseFloat(loadTime) / 1000).toFixed(1);
            let data = `${url} - ${loadTimeSecond}`;

            if (!fs.existsSync(dir)) {
                mkdirp(dir)
                    .then((made) => {
                        console.log(`made directories, starting with ${made}`);
                        fs.appendFile(`${dir}${fileName}`, data, (err) => {
                            console.log("Error:", err);
                            console.log('Successfully Done!!!');
                        });
                    })
                    .catch(err => console.log("Error: ", err));
            }
            else {
                fs.appendFile(`${dir}${fileName}`, data, (err) => {
                    console.log("Error:", err);
                    console.log('Successfully Done!!!');
                });
            }
        })
    }
};
