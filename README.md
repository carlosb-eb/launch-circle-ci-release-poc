# Github Action: Launch CircleCI eb-ui release pipeline

Javascript-based action to release eb-ui applications calling CircleCI jobs.

## Usage

- Install octokit/rest:

```bash
npm install @octokit/rest --save
```

- Launch the job programatically:

```javascript
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: "YOUR_GITHUB_TOKEN_HERE"
});

return octokit.request(
  "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
  {
    owner: "carlosb-eb",
    repo: "launch-circle-ci-release-poc",
    workflow_id: "main.yml",
    ref: "main",
    inputs: {
      env: "", // Environment. Valid values: 'production' | 'qa';
      app: "", // npm package name. Examples: 'create', 'listings', etc
      bakePercentage: "", // Traffic allocation percentage. Valid values: '100' | '50' | '25' | '10' | '5'
      versionToRelease: "", // npm package version. Examples: '1.24.6' , '5.3.33', etc
      currentVersion: "", // npm package version. Example: 1.24.6
      author: "", // Github username. Example: carlosb-eb
      slackChannel: "", // Slack channel. Example: #eb-ui
      clearCache: "" // If traffic allocation cache must be cleared. Valid values: 'true' | 'false'
    }
  }
);
```
