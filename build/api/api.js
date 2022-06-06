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
exports.Api = void 0;
const express_1 = __importDefault(require("express"));
const get_alerts_1 = require("../helpers/get-alerts");
const parser_1 = require("../helpers/parser");
const app = (0, express_1.default)();
const Api = () => {
    app.get("/api/:owner/:repo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const alert = yield (0, get_alerts_1.getAlert)(req.params.owner, req.params.repo);
        const y = JSON.parse(alert);
        const k = [];
        y.forEach(element => {
            k.push((0, parser_1.Parser)(element));
        });
        res.json(k);
    }));
    app.get("/", (req, res) => {
        res.sendFile("index.html", { root: __dirname });
    });
    app.listen(1337);
};
exports.Api = Api;
