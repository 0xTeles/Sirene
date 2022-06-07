import axios from "axios";
import { Output } from "../types";
import { Env } from "../env";

export const SendAlert = async (alert: Output, webhook:any) => {
        const message = `
        Repository: ${alert.Repository}
        Package: ${alert.Package}
        Vulnerability: ${alert.Vulnerability}       
        Description: ${alert.Description} 
        Severity: ${alert.Severity} 
        Vulnerable: ${alert.Vulnerable} 
        Patched: ${alert.Patched} 
        Link: ${alert.Link}`
        const data = {
            content: "```yaml\n"+message+"```",
            username: "Dependabot",
            avatar_url:  "https://avatars.githubusercontent.com/u/27347476?s=200&v=4",
        }
    try {
        return axios.post(webhook, data);
    } catch (error) {
        throw error;
    }
}