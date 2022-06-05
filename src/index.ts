import { getAlert } from "./get-alerts";
import {Parser}  from "./parser"



getAlert().then((x) => {
    const y: Array<any> = JSON.parse(x)
    y.map(z => console.log(Parser(z)))
}).catch(console.error)