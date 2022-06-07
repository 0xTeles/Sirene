"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
require("dotenv/config");
var Env;
(function (Env) {
    Env.webhook = process.env.WEBHOOK;
    Env.github_token = process.env.TOKEN;
    Env.github_repository_name = process.env.REPOSITORY_NAME;
    Env.github_repository_owner = process.env.REPOSITORY_OWNER;
})(Env = exports.Env || (exports.Env = {}));
