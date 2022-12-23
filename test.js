const release = require('./release');

  const circlecitoken = '8dff383a0564445e32edb5f3337936e6bf552cfc';
  const env = 'production';
  const app = 'digital-content';
  const versionToRelease = '6.18.3';
  const bakePercentage = '5';
  const currentVersion = '6.18.3';
  const author = 'carloseb';
  const slackChannel = '#eb-ui';

  
  release(env, app, bakePercentage, versionToRelease, currentVersion,author,slackChannel, circlecitoken).then(r => {
    console.log('request done');
    r.text().then((text)=>{
      console.log('text:', text)
    })
  }).catch((e)=>{
    console.log('ERROR http request:', e);
  });
