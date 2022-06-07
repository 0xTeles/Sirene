"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Parser = (schema) => ({
    Repository: schema.node.repository.name,
    Package: schema.node.securityVulnerability.package.name,
    Vulnerability: schema.node.securityVulnerability.advisory.summary,
    Description: schema.node.securityAdvisory.description,
    Severity: schema.node.securityAdvisory.severity,
    Vulnerable: schema.node.securityVulnerability.vulnerableVersionRange,
    Patched: schema.node.securityVulnerability.firstPatchedVersion.identifier,
    Link: schema.node.securityAdvisory.permalink
});
exports.Parser = Parser;
