const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const version = core.getInput('version');
    const resourceName = core.getInput('resource_name');
    const userId = core.getInput('user_id');
    const appId = core.getInput('app_id');
    const appKey = core.getInput('app_key');

    const payload = {
      Version: version,
      "Resource Name": resourceName
    };

    const response = await axios.put(
      'https://dashboard.enov8.com/ecosystem/api/SystemInstance',
      payload,
      {
        headers: {
          'user-id': userId,
          'app-id': appId,
          'app-key': appKey,
          'Content-Type': 'application/json'
        }
      }
    );

    core.info(`✅ Enov8 API responded: ${response.status}`);
    core.info(`Response Body: ${JSON.stringify(response.data)}`);
  } catch (error) {
    if (error.response) {
      // The server responded with a status outside 2xx
      core.setFailed(`❌ API Error: ${error.response.status} ${error.response.statusText}`);
      core.error(`Response body: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // No response received
      core.setFailed(`❌ No response from Enov8 API.`);
      core.error(error.request);
    } else {
      // Other error
      core.setFailed(`❌ Request setup error: ${error.message}`);
    }
  }
}

run();
