import { getAlert } from "./helpers/get-alerts";
import { getInput} from '@actions/core'
import { context } from '@actions/github'
import {Parser}  from "./helpers/parser"
import {SendAlert} from "./helpers/discord"
import { Env } from "./env";
import {Api} from "./api/api"
import axios from "axios";


const data = {
    content: `${getAlert(context.repo.owner, context.repo.repo, getInput("TOKEN"))}`,
    username: "Dependabot",
    avatar_url:  "https://avatars.githubusercontent.com/u/27347476?s=200&v=4",
}
const request = {
method: 'post',
url: getInput("WEBHOOK"),
headers: {
    'Content-Type': 'application/json'
},
data: data
};
axios(request)



if (Env.mode === "api"){
    Api()
} else if (Env.mode === "cli"){
    getAlert(Env.github_repository_owner, Env.github_repository_name, Env.github_token).then((x) => {
        const y: Array<any> = JSON.parse(x)
        y.map(z => SendAlert(Parser(z), Env.webhook))
    }).catch(console.error)
} else if (Env.mode === "actions"){
    getAlert(context.repo.owner, context.repo.repo, getInput("TOKEN")).then((x) => {
        const y: Array<any> = JSON.parse(x)
        y.map(z => SendAlert(Parser(z), getInput("WEBHOOK")))
    }).catch(console.error)
}