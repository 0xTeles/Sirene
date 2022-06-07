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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendAlert = void 0;
const axios_1 = __importDefault(require("axios"));
const SendAlert = (alert, webhook) => __awaiter(void 0, void 0, void 0, function* () {
    const message = `
        Repository: ${alert.Repository}
        Package: ${alert.Package}
        Vulnerability: ${alert.Vulnerability}       
        Description: ${alert.Description} 
        Severity: ${alert.Severity} 
        Vulnerable: ${alert.Vulnerable} 
        Patched: ${alert.Patched} 
        Link: ${alert.Link}`;
    const data = {
        content: "```yaml\n" + message + "```",
        username: "Dependabot",
        avatar_url: "https://avatars.githubusercontent.com/u/27347476?s=200&v=4",
    };
    try {
        return axios_1.default.post(webhook, data);
    }
    catch (error) {
        throw error;
    }
});
exports.SendAlert = SendAlert;
