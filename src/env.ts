import "dotenv/config"

export namespace Env {
    export const webhook = process.env.WEBHOOK
    export const github_token = process.env.GITHUB_TOKEN
    export const github_repository_name = process.env.REPOSITORY_NAME
    export const github_repository_owner = process.env.REPOSITORY_OWNER
}