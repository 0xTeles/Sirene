"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlert = void 0;
const graphql_1 = require("@octokit/graphql");
const getAlert = (repo_owner, repo_name, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { repository } = yield (0, graphql_1.graphql)(`
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
  `, {
        headers: {
            authorization: `token ${token}`,
        },
    });
    return (_b = (_a = repository.vulnerabilityAlerts) === null || _a === void 0 ? void 0 : _a.edges) !== null && _b !== void 0 ? _b : [];
});
exports.getAlert = getAlert;
