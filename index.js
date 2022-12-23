const core = require('@actions/core');
const release = require('./release');

try {
  const circlecitoken = core.getInput('circlecitoken');
  const env = core.getInput('env');
  const app = core.getInput('app');
  const versionToRelease = core.getInput('versionToRelease');
  const bakePercentage = core.getInput('bakePercentage');
  const currentVersion = core.getInput('currentVersion');
  const author = core.getInput('author');
  const slackChannel = core.getInput('slackChannel');

  console.log('Requesting the release to CircleCI...')
  
  release(env, app, bakePercentage, versionToRelease, currentVersion,author,slackChannel, circlecitoken).then(r => {
    console.log('Response:', r);
    console.log('https://app.circleci.com/pipelines/github/eventbrite/eb-ui/' + r.number)
    core.setOutput("result", 'deployed');
  }).catch((e)=>{
    console.log('Error:', e);
    core.setFailed('Circle CI HTTP request failed:' +  e);
  });
  
} catch (error) {
  core.setFailed(error.message);
}
