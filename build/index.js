"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_alerts_1 = require("./helpers/get-alerts");
const parser_1 = require("./helpers/parser");
const discord_1 = require("./helpers/discord");
const env_1 = require("./env");
const api_1 = require("./api/api");
if (env_1.Env.mode === "api") {
    (0, api_1.Api)();
}
else if (env_1.Env.mode === "discord") {
    (0, get_alerts_1.getAlert)(env_1.Env.github_repository_owner, env_1.Env.github_repository_name).then((x) => {
        const y = JSON.parse(x);
        y.map(z => (0, discord_1.SendAlert)((0, parser_1.Parser)(z)));
    }).catch(console.error);
}
