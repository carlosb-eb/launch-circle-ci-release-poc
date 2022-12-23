const fetch = require('node-fetch');

module.exports = function release(
    env,
    app,
    bakePercentage,
    versionToRelease,
    currentVersion,
    author,
    slackChannel,
    circlecitoken
) {
    return fetch(
        'https://circleci.com/api/v2/project/gh/eventbrite/eb-ui/pipeline',
        {
          method: 'POST',
          headers: {
              'Circle-Token': circlecitoken,
              'content-type': 'application/json',
          },
          body: JSON.stringify({
              parameters: {
                  release_environment: env,
                  release_author: author,
                  release_data: JSON.stringify([
                      {
                          name: app,
                          versionToRelease,
                          currentVersion,
                          bakePercentage: bakePercentage + '',
                          slackChannel,
                      },
                  ]),
              },
          }),
      }
    ).then(r => r.json())
}
