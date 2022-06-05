import { getAlert } from "./get-alerts";
import {Parser}  from "./parser"
import {SendAlert} from "./discord"

getAlert().then((x) => {
    const y: Array<any> = JSON.parse(x)
    y.map(z => SendAlert(Parser(z)))
}).catch(console.error)