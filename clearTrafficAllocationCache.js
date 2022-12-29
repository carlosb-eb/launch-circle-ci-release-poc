const fetch = require('node-fetch');

module.exports = function clearTrafficAllocationCache(applicationName, eventBriteToken){
    console.log('Cleaning cache of application: ', applicationName)
   return fetch(`https://www.eventbriteapi.com/v3/eb-ui/${applicationName}/?token=${eventBriteToken}`, {
     method: 'DELETE' 
   }).then(r =>r.json())
}