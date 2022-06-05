export type Output = {
    Repository: string;
    Package: string;
    Vulnerability: string;
    Description: string;
    Severity: string;
    Vulnerable: string; 
    Patched: string;
    Link: string;
}

export type Owner = {login: string}

export type Repository = {name: string, owner: Owner}

export type Cvss = {score: Float32Array, vectorString: string}

export type FirstPatchedVersion = {identifier: string}

export type Package = {ecosystem: string, name: string}

export type Schema = {
    node: {
        id: string,
        repository: Repository
        securityAdvisory: {
            id: string, 
            description: string, 
            cvss: Cvss, 
            permalink: string, 
            severity: string, 
            summary: string
        },
        securityVulnerability: {
            firstPatchedVersion: FirstPatchedVersion,
            package: Package,
            vulnerableVersionRange: string,
            advisory: {cvss: Cvss, summary: string},
    
        }
        }
} 