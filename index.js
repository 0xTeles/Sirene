var axios = require('axios');
var data = JSON.stringify({
    query: `query {
      repository(owner:"0xteles" name:"cwchallenge") {
        vulnerabilityAlerts(last: 10) {
          edges {
            node {
              id
              repository {
                name
                owner {
                  login
                }
              }
              securityAdvisory {
                id
                description
                cvss {
                  score
                  vectorString
                }
                permalink
                severity
                summary
              }
              securityVulnerability {
                firstPatchedVersion {
                  identifier
                }
                package {
                  ecosystem
                  name
                }
                vulnerableVersionRange
                advisory {
                  cvss {
                    score
                    vectorString
                  }
                  summary
                }
              }
            }
          }
        }
      }
    }`,
    variables: {}
});

var config = {
    method: 'post',
    url: 'https://api.github.com/graphql',
    headers: {
        'Authorization': 'token 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',
        'Content-Type': 'application/json'
    },
    data: data
};

axios(config)
    .then(function(response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function(error) {
        console.log(error);
    });