# Github Action: launch CircleCI eb-ui release pipeline

Javascript-based action to release a eb-ui release pipeline in CircleCI.

## Inputs

 circlecitoken:
    description: 'Circle CI Token with permissions to run eb-ui pipeline'
    required: true
  env:  
    description: 'Environment'
    required: true
    default: 'qa' # qa | prod
  app:
    description: 'EB-UI application name'
    required: true
  versionToRelease:
    description: 'EB-UI application version to release'
    required: true
  bakePercentage: 
    description: 'Application version traffic allocation percentage'
    required: true
    default: '5' # 100 | 50 | 25 | 10 | 5
  currentVersion:
    description: 'EB-UI application current version'
    required: true
    default: '5'
  author:
    description: 'Release author'
    required: true
  slackChannel:
    description: 'Author team slack channel name'
    required: true
    default: 'eb-ui'

## Outputs

  result:
    description: 'The eb-ui circle-ci result'

## Example usage

```yaml
uses: carlosb/hello-world-javascript-action@v1.0.0
with:
  who-to-greet: 'Mona the Octocat'