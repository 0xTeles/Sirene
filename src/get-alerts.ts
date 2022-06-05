import { graphql } from "@octokit/graphql";
import { Repository } from "@octokit/graphql-schema";
import { Env
 } from "./env";
export const getAlert = async (): Promise<any> => {
  const { repository } = await graphql<{ repository: Repository }>(
  `
  {
    repository(owner:"${Env.github_repository_owner}" name:"${Env.github_repository_name}") {
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
      authorization: `token ${Env.github_token}`,
    },
  }
)
return (JSON.stringify(repository.vulnerabilityAlerts?.edges))
}

