const core = require("@actions/core");
const release = require("./release");
const clearTrafficAllocationCache = require("./clearTrafficAllocationCache");
const waitToWorkflowEnd = require("./waitWorkflowEnd");

async function run() {
  const circlecitoken = core.getInput("circlecitoken");
  const env = core.getInput("env");
  const app = core.getInput("app");
  const versionToRelease = core.getInput("versionToRelease");
  const bakePercentage = core.getInput("bakePercentage");
  const currentVersion = core.getInput("currentVersion");
  const author = core.getInput("author");
  const slackChannel = core.getInput("slackChannel");
  const clearCache = core.getInput("clearCache");
  const EB_API_KEY = core.getInput("ebApiKey");

  console.log("Requesting the release to CircleCI...");
  console.log(`
  ********************************************************************************
  Release information:
  - Environment: ${env}
  - App: ${app}
  - Version: ${versionToRelease}
  - Traffic: ${bakePercentage}%
  - Current version: ${currentVersion}
  - Traffic allocation cache clean after release: ${clearCache}
  - Author: ${author}
  ********************************************************************************
  `);

  try {
    const { id } = await release(
      env,
      app,
      bakePercentage,
      versionToRelease,
      currentVersion,
      author,
      slackChannel,
      circlecitoken
    );

    console.log(`
    ********************************************************************************
      - Circle-CI job url: https://circleci.com/api/v2/pipeline/${id}/workflow
    ********************************************************************************`);

    await waitToWorkflowEnd(id, circlecitoken);

    if (clearCache === "true") {
      console.log("Trying to clear the traffic allocation cache...");
      await clearTrafficAllocationCache(app, EB_API_KEY);
      console.log("Traffic allocation cache cleared successfully!");
    }
    console.log(`
    ********************************************************************************
    -  Release completed!
    ********************************************************************************`);
  } catch (error) {
    console.log("Error:", error);
    core.setFailed("Release failed");
  }
}

run();
