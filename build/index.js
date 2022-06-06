"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_alerts_1 = require("./helpers/get-alerts");
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const parser_1 = require("./helpers/parser");
const discord_1 = require("./helpers/discord");
const env_1 = require("./env");
const api_1 = require("./api/api");
const axios_1 = __importDefault(require("axios"));
const data = {
    content: "```teste```",
    username: "Dependabot",
    avatar_url: "https://avatars.githubusercontent.com/u/27347476?s=200&v=4",
};
const request = {
    method: 'post',
    url: (0, core_1.getInput)("WEBHOOK"),
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};
(0, axios_1.default)(request);
if (env_1.Env.mode === "api") {
    (0, api_1.Api)();
}
else if (env_1.Env.mode === "cli") {
    (0, get_alerts_1.getAlert)(env_1.Env.github_repository_owner, env_1.Env.github_repository_name, env_1.Env.github_token).then((x) => {
        const y = JSON.parse(x);
        y.map(z => (0, discord_1.SendAlert)((0, parser_1.Parser)(z), env_1.Env.webhook));
    }).catch(console.error);
}
else if (env_1.Env.mode === "actions") {
    (0, get_alerts_1.getAlert)(github_1.context.repo.owner, github_1.context.repo.repo, (0, core_1.getInput)("TOKEN")).then((x) => {
        const y = JSON.parse(x);
        y.map(z => (0, discord_1.SendAlert)((0, parser_1.Parser)(z), (0, core_1.getInput)("WEBHOOK")));
    }).catch(console.error);
}
