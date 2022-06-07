import { getAlert } from "./helpers/get-alerts";
import { getInput } from '@actions/core'
import { context } from '@actions/github'
import { Parser } from "./helpers/parser"
import { SendAlert } from "./helpers/discord"
import { Env } from "./env";
import { Api } from "./api/api"


type ExecFunc = (owner: string, repo: string, token: string) => Promise<void>

const execModes: Record<string, ExecFunc> = {
    api: Api,
    cli: async (owner, repo, token) => {
        const alerts = await getAlert(owner, repo, token);
        return alerts.forEach(alert => SendAlert(Parser(alert), Env.webhook));
    },
    actions: async (owner, repo, token) => {
        const webHook = getInput("WEBHOOK");
        const alerts = await getAlert(owner, repo, token);
        return alerts.forEach(alert => SendAlert(Parser(alert), webHook));
    }
}


async function main() {
    const mode = process.argv[2] || "actions"
    if (mode === "actions") {
        return execModes.actions(context.repo.owner, context.repo.repo, getInput("TOKEN"));
    }

    if (!Env.github_repository_owner || !Env.github_repository_name || !Env.github_token) {
        throw new Error("Check your env variables 'github_repository_owner', 'github_repository_name' and 'github_token'")
    }

    return execModes[mode](Env.github_repository_owner, Env.github_repository_name, Env.github_token);
}

main().catch(console.error)