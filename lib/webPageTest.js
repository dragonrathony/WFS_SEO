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
const WebPageTestUrl = 'https://www.webpagetest.org/';
var wpt = new WebPageTest(WebPageTestUrl, WebPageTestAPIKey)
const wptOption = {
    connectivity: 'Cable',
    location: 'Dulles:Chrome',
    firstViewOnly: false,
    runs: 1,
    pollResults: 5,
    video: true
};


module.exports = {
    // run function
    async run(url, dir, fileName) {
        wpt.runTest(url, wptOption, function processTestResult(result) {
            if (typeof result === 'undefined') {
                console.log('Something went wrong. Please check your API key is valid');
                return;
            }
            console.log('result is', typeof result)
            let loadTime = result.data.average.firstView.loadTime;
            let loadTimeSecond = (parseFloat(loadTime) / 1000).toFixed(1);
            let data = `${url} - ${loadTimeSecond}`;
            if (!fs.existsSync(dir)) {
                mkdirp(dir)
                    .then((made) => {
                        console.log(`made directories, starting with ${made}`);
                        fs.appendFile(`${dir}${fileName}`, data, (err) => {
                            console.log("Error:", err);
                        });
                        console.log('Successfully Done!!!');
                    })
                    .catch(err => console.log("Error: ", err));
            }
            else {
                fs.appendFile(`${dir}${fileName}`, data, (err) => {
                    console.log("Error:", err);
                });
            }
        })
    }
};
