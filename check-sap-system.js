import { createRequire } from "module";
const require = createRequire(import.meta.url);

const base64 = require('base-64');
const readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Function to check if SAP OData system is reachable
  async function checkSAPSystem(endpoint, username, password) {

    endpoint = 'https://d4h.fiori.prysmiangroup.com/sap/opu/odata/sap/YFIN_VATCODEGUIDE_SRV_IT';

    try {
      // Send a GET request to the SAP OData endpoint
      let headers = new Headers();
      headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));

      const response = await fetch(endpoint, {method:'GET',
        headers: headers,
      })

          // If the status code is in the 2xx range, then the system is reachable
      if (response.status >= 200 && response.status < 300) {
        console.log('SAP OData system is reachable.');
      } else {
        console.log('SAP OData system is not reachable. Status:', response.status);
      }
    } catch (error) {
      // If an error occurs (e.g., network error, timeout), then the system is not reachable
      console.error('Error while trying to reach SAP OData system:', error.message);
    }


    
  }

  function askForSapSystem() {
    rl.question("Sap System Endpoint: ", (endpoint) => {

      rl.question("Username: ", (username) => {

        rl.stdoutMuted = true;
        rl.question("Password: ", async (password) => {

          // Call the function to check the SAP OData system
          checkSAPSystem();
          
          rl.close();
        });

        rl._writeToOutput = function _writeToOutput(stringToWrite) {
          if (rl.stdoutMuted)
            rl.output.write("*");
          else
            rl.output.write(stringToWrite);
        };
      })

    });
  }



  

