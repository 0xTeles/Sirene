import "dotenv/config"

export namespace Env {
    export const webhook = process.env.WEBHOOK
    export const github_token = process.env.GITHUB_TOKEN
}