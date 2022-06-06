import { graphql } from "@octokit/graphql";
import { Repository } from "@octokit/graphql-schema";
import { Env
 } from "../env";
export const getAlert = async (repo_owner: any, repo_name: any, token: any): Promise<any> => {
  const { repository } = await graphql<{ repository: Repository }>(
  `
  {
    repository(owner:"${repo_owner}" name:"${repo_name}") {
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
  }
  `,
  {
    headers: {
      authorization: `token ${token}`,
    },
  }
)
if (JSON.stringify(repository.vulnerabilityAlerts?.edges) !== ""){
  return (JSON.stringify(repository.vulnerabilityAlerts?.edges))

}
}

