import axios from "axios";
import { Output } from "./types";

export const SendAlert = async(webhook: string, alert: Output) => {
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
        const request = {
        method: 'post',
        url: webhook,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    const Send = await axios(request)
    if (Send.status !== 204){
        return "ERROR"
    }
    console.log("Ok")
    return Send
}