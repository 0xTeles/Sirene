import { getAlert } from "./helpers/get-alerts";
import {Parser}  from "./helpers/parser"
import {SendAlert} from "./helpers/discord"
import { Env } from "./env";
import {Api} from "./api/api"


if (Env.mode === "api"){
    Api()
} else if (Env.mode === "discord"){
    getAlert(Env.github_repository_owner, Env.github_repository_name).then((x) => {
        const y: Array<any> = JSON.parse(x)
        y.map(z => SendAlert(Parser(z)))
    }).catch(console.error)
}