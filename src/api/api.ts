import express, { Request, Response } from "express";
import { getAlert } from "../helpers/get-alerts";
import { Parser } from "../helpers/parser";
import { Env } from "../env";
const app = express()


export const Api = async (_, __, token: string) => {
    app.get("/api/:owner/:repo", async (req: Request, res: Response) => {
        const alerts = await getAlert(req.params.owner, req.params.repo, token)
        return res.json(
            alerts.map(element => Parser(element))
        )
    });
    app.get("*", (req: Request, res: Response) => res.sendFile("index.html", { root: __dirname }))
    app.listen(1337, () => {
        console.log("Server up 🚀.")
    })

}