const fetch = require('node-fetch');


// https://circleci.com/docs/workflows/#states
const finished_statuses =["success", "not_run", "failed", "error" ,"canceled", "unauthorized"]
let MAX_REQUESTS_LIMIT = 20;

module.exports = function waitToWorkflowEnd(id, circlecitoken, secondsToRequestStatusAgain = 60){
    MAX_REQUESTS_LIMIT-=1;
    console.log(`waitToWorkflowEnd will call with workflow id "${id}" and circlecitoken ${circlecitoken}`);

    return fetch(`https://circleci.com/api/v2/pipeline/${id}/workflow`, {
        headers: {
            'Circle-Token': circlecitoken ,
            'content-type': 'application/json',
        },
    }).then(r => r.json()).then((response)=>{
      console.log('response: ', response);
      const r = response.items[0] || { status: 'running'};
      
      if(finished_statuses.includes(r.status) || MAX_REQUESTS_LIMIT === 0){ 
        return r.status;
      }
      return new Promise((resolve, reject)=>{
        console.log(`new request in ${secondsToRequestStatusAgain} seconds`)
        setTimeout(()=>{
          waitToWorkflowEnd(id).then(resolve).catch(reject);
        }, 1000 * secondsToRequestStatusAgain) 
      })
    })
  }
  
  // const in_progress_statuses = ["running", "not_run",  "on_hold" ]
