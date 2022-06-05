import { getAlert } from "./get-alerts";
import {Parser}  from "./parser"
import {SendAlert} from "./discord"


const webhook = "https://discord.com/api/webhooks/983044697532563476/kJf8AVZw8oYYZsh6JUOlok0ObaiSOLHn8jXBYYU3umE_Bu6XrCeA5A7EueG7sS965KIe"
getAlert().then((x) => {
    const y: Array<any> = JSON.parse(x)
    y.map(z => SendAlert(webhook, Parser(z)))
}).catch(console.error)