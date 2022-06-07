"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_alerts_1 = require("./helpers/get-alerts");
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const parser_1 = require("./helpers/parser");
const discord_1 = require("./helpers/discord");
const env_1 = require("./env");
const api_1 = require("./api/api");
const execModes = {
    api: api_1.Api,
    cli: (owner, repo, token) => __awaiter(void 0, void 0, void 0, function* () {
        const alerts = yield (0, get_alerts_1.getAlert)(owner, repo, token);
        return alerts.forEach(alert => (0, discord_1.SendAlert)((0, parser_1.Parser)(alert), env_1.Env.webhook));
    }),
    actions: (owner, repo, token) => __awaiter(void 0, void 0, void 0, function* () {
        const webHook = (0, core_1.getInput)("WEBHOOK");
        const alerts = yield (0, get_alerts_1.getAlert)(owner, repo, token);
        return alerts.forEach(alert => (0, discord_1.SendAlert)((0, parser_1.Parser)(alert), webHook));
    })
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const mode = process.argv[2] || "actions";
        if (mode === "actions") {
            return execModes.actions(github_1.context.repo.owner, github_1.context.repo.repo, (0, core_1.getInput)("TOKEN"));
        }
        if (!env_1.Env.github_repository_owner || !env_1.Env.github_repository_name || !env_1.Env.github_token) {
            throw new Error("Check your env variables 'github_repository_owner', 'github_repository_name' and 'github_token'");
        }
        return execModes[mode](env_1.Env.github_repository_owner, env_1.Env.github_repository_name, env_1.Env.github_token);
    });
}
main().catch(console.error);
