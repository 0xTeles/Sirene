"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Parser = (y) => {
    //console.log(JSON.stringify(y.securityVulnerability.package))
    const o = {
        Repository: y.node.repository.name,
        Package: y.node.securityVulnerability.package.name,
        Vulnerability: y.node.securityVulnerability.advisory.summary,
        Description: y.node.securityAdvisory.description,
        Severity: y.node.securityAdvisory.severity,
        Vulnerable: y.node.securityVulnerability.vulnerableVersionRange,
        Patched: y.node.securityVulnerability.firstPatchedVersion.identifier,
        Link: y.node.securityAdvisory.permalink
    };
    return o;
};
exports.Parser = Parser;
