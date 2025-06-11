const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const version = core.getInput('version');
    const resourceName = core.getInput('resource_name');
    const userId = core.getInput('user_id');
    const appId = core.getInput('app_id');
    const appKey = core.getInput('app_key');

    const payload = `{\r\n "Version":"${version}",\r\n "Resource Name": "${resourceName}"\r\n}`;

    const response = await axios.put(
      'https://dashboard.enov8.com/ecosystem/api/SystemInstance',
      payload,
      {
        headers: {
          'user-id': userId,
          'app-id': appId,
          'app-key': appKey,
          'Content-Type': 'text/plain'
        }
      }
    );

    core.info(`✅ Enov8 API responded: ${response.status}`);
    core.info(`Response Body: ${JSON.stringify(response.data)}`);
  } catch (error) {
    core.setFailed(`❌ Error: ${error.message}`);
  }
}

run();