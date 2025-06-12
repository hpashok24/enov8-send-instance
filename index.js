const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const version = core.getInput('version');
    const system = core.getInput('system');
    const enivronment = core.getInput('environment');
    const appId = core.getInput('app_id');
    const appKey = core.getInput('app_key');
    const api_url = core.getInput('enov8_url');  // Now pulled from secrets if defined in workflow
     api_url=api_url+"/api/environmentinstance";
    
    const payload = {
      "System": system,
      "Environment":environment,
      "Version":version
    };

    const response = await axios.put(api_url, payload, {
      headers: {
        'user-id': appId,
        'app-id': appId,
        'app-key': appKey,
        'Content-Type': 'application/json'
      }
    });

    core.info(`✅ Enov8 API responded: ${response.status}`);
    core.info(`Response Body: ${JSON.stringify(response.data)}`);
  } catch (error) {
    if (error.response) {
      core.setFailed(`❌ API Error: ${error.response.status} ${error.response.statusText}`);
      core.error(`Response body: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      core.setFailed(`❌ No response from Enov8 API.`);
      core.error(error.request);
    } else {
      core.setFailed(`❌ Request setup error: ${error.message}`);
    }
  }
}

run();
