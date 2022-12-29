const core = require('@actions/core');
const release = require('./release');
const clearTrafficAllocationCache = require('./clearTrafficAllocationCache');
const waitToWorkflowEnd = require('./waitWorkflowEnd');

try {
  const circlecitoken = core.getInput('circlecitoken');
  const env = core.getInput('env');
  const app = core.getInput('app');
  const versionToRelease = core.getInput('versionToRelease');
  const bakePercentage = core.getInput('bakePercentage');
  const currentVersion = core.getInput('currentVersion');
  const author = core.getInput('author');
  const slackChannel = core.getInput('slackChannel');
  
  const clearCache = core.getInput('clearCache');
  const EB_API_KEY = core.getInput('ebApiKey');

  console.log('Requesting the release to CircleCI...')
  
  release(env, app, bakePercentage, versionToRelease, currentVersion,author,slackChannel, circlecitoken).then(r => {
    console.log('Response:', r);
    console.log('cache clear: ', clearCache)
    if(clearCache==="true"){
      console.log('waiting CircleCI workflow end');
      waitToWorkflowEnd(r.id, circlecitoken).then(r => {
        console.log(' CircleCI workflow finished');

        clearTrafficAllocationCache(app,EB_API_KEY).then(()=>{
          core.setOutput("cacheclear", 'done');
        }).catch(()=>{
          core.setFailed('EB API call to clear traffic allocation cache failed:' +  e);
        })
      }).catch((e)=>{
        console.log(' CircleCI workflow ERROR: ', e);
      });
    }else{
      core.setOutput("cacheclear", 'not done');
    }
  }).catch((e)=>{
    console.log('Error:', e);
    core.setFailed('Circle CI HTTP request failed:' +  e);
  });
  
} catch (error) {
  core.setFailed(error.message);
}
