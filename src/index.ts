import { getAlert } from "./helpers/get-alerts";
import { getInput} from '@actions/core'
import { context } from '@actions/github'
import {Parser}  from "./helpers/parser"
import {SendAlert} from "./helpers/discord"
import { Env } from "./env";
import {Api} from "./api/api"
import axios from "axios";



if (Env.mode === "api"){
    Api()
} else if (Env.mode === "cli"){
    getAlert(Env.github_repository_owner, Env.github_repository_name, Env.github_token).then((x) => {
        const y: Array<any> = JSON.parse(x)
        y.map(z => SendAlert(Parser(z), Env.webhook))
    }).catch(console.error)
} else if (getInput("MODE") === "actions"){
    getAlert(context.repo.owner, context.repo.repo, getInput("TOKEN")).then((x) => {
        const y: Array<any> = JSON.parse(x)
        y.map(z => SendAlert(Parser(z), getInput("WEBHOOK")))
    }).catch(console.error)
}