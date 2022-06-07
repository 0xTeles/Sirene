
import { Schema } from "../types"
import { Output } from "../types"

export const Parser = (schema: Schema): Output => ({
    Repository: schema.node.repository.name,
    Package: schema.node.securityVulnerability.package.name,
    Vulnerability: schema.node.securityVulnerability.advisory.summary,
    Description: schema.node.securityAdvisory.description,
    Severity: schema.node.securityAdvisory.severity,
    Vulnerable: schema.node.securityVulnerability.vulnerableVersionRange,
    Patched: schema.node.securityVulnerability.firstPatchedVersion.identifier,
    Link: schema.node.securityAdvisory.permalink
})