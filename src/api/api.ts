import express from "express";
import { getAlert } from "../helpers/get-alerts";
import { Parser } from "../helpers/parser";
import { Env } from "../env";
const app = express()


export const Api = () => {
    app.get("/api/:owner/:repo", async(req, res) => {
        const alert = await getAlert(req.params.owner, req.params.repo, Env.github_token)
        const y: Array<any> = JSON.parse(alert)
        const k: Array<any> = [];
        y.forEach(element => {
            k.push(Parser(element))
        });
        res.json(k)
    });
    app.get("/", (req, res ) => {
        res.sendFile("index.html", {root: __dirname})
    })
    app.listen(1337)
}